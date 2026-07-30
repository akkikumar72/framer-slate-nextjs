"use client";

import { useEffect, useRef } from "react";

type ProgramInfo = {
  program: WebGLProgram;
  shaders: WebGLShader[];
  uniforms: Record<string, WebGLUniformLocation | null>;
};

type RenderTarget = {
  bind: (unit: number) => number;
  dispose: () => void;
  framebuffer: WebGLFramebuffer;
  height: number;
  texture: WebGLTexture;
  width: number;
};

type DoubleRenderTarget = {
  dispose: () => void;
  height: number;
  read: () => RenderTarget;
  swap: () => void;
  texelSizeX: number;
  texelSizeY: number;
  width: number;
  write: () => RenderTarget;
};

const VERTEX_SHADER = `
  precision highp float;

  varying vec2 vUv;
  attribute vec2 a_position;

  varying vec2 vL;
  varying vec2 vR;
  varying vec2 vT;
  varying vec2 vB;

  uniform vec2 u_texel;

  void main() {
    vUv = 0.5 * (a_position + 1.0);
    vL = vUv - vec2(u_texel.x, 0.0);
    vR = vUv + vec2(u_texel.x, 0.0);
    vT = vUv + vec2(0.0, u_texel.y);
    vB = vUv - vec2(0.0, u_texel.y);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const SPLAT_SHADER = `
  precision highp float;
  precision highp sampler2D;

  varying vec2 vUv;

  uniform sampler2D u_input_texture;
  uniform float u_ratio;
  uniform vec3 u_point_value;
  uniform vec2 u_point;
  uniform float u_point_size;

  void main() {
    vec2 point = vUv - u_point.xy;
    point.x *= u_ratio;

    vec3 splat =
      0.6 *
      pow(2.0, -dot(point, point) / u_point_size) *
      u_point_value;
    vec3 base = texture2D(u_input_texture, vUv).xyz;

    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

const DIVERGENCE_SHADER = `
  precision highp float;
  precision highp sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;

  uniform sampler2D u_velocity_texture;

  void main() {
    float left = texture2D(u_velocity_texture, vL).x;
    float right = texture2D(u_velocity_texture, vR).x;
    float top = texture2D(u_velocity_texture, vT).y;
    float bottom = texture2D(u_velocity_texture, vB).y;
    float divergence = 0.25 * (right - left + top - bottom);

    gl_FragColor = vec4(divergence, 0.0, 0.0, 1.0);
  }
`;

const PRESSURE_SHADER = `
  precision highp float;
  precision highp sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;

  uniform sampler2D u_pressure_texture;
  uniform sampler2D u_divergence_texture;

  void main() {
    float left = texture2D(u_pressure_texture, vL).x;
    float right = texture2D(u_pressure_texture, vR).x;
    float top = texture2D(u_pressure_texture, vT).x;
    float bottom = texture2D(u_pressure_texture, vB).x;
    float divergence = texture2D(u_divergence_texture, vUv).x;
    float pressure = (left + right + bottom + top - divergence) * 0.25;

    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

const GRADIENT_SHADER = `
  precision highp float;
  precision highp sampler2D;

  varying highp vec2 vUv;
  varying highp vec2 vL;
  varying highp vec2 vR;
  varying highp vec2 vT;
  varying highp vec2 vB;

  uniform sampler2D u_pressure_texture;
  uniform sampler2D u_velocity_texture;

  void main() {
    float left = texture2D(u_pressure_texture, vL).x;
    float right = texture2D(u_pressure_texture, vR).x;
    float top = texture2D(u_pressure_texture, vT).x;
    float bottom = texture2D(u_pressure_texture, vB).x;
    vec2 velocity = texture2D(u_velocity_texture, vUv).xy;

    velocity.xy -= vec2(right - left, top - bottom);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

const ADVECTION_SHADER = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D u_velocity_texture;
  uniform sampler2D u_input_texture;
  uniform vec2 u_texel;
  uniform vec2 u_output_textel;
  uniform float u_dt;
  uniform float u_dissipation;

  vec4 bilerp(sampler2D sampler, vec2 uv, vec2 texelSize) {
    vec2 samplePosition = uv / texelSize - 0.5;
    vec2 index = floor(samplePosition);
    vec2 fraction = fract(samplePosition);

    vec4 a = texture2D(
      sampler,
      (index + vec2(0.5, 0.5)) * texelSize
    );
    vec4 b = texture2D(
      sampler,
      (index + vec2(1.5, 0.5)) * texelSize
    );
    vec4 c = texture2D(
      sampler,
      (index + vec2(0.5, 1.5)) * texelSize
    );
    vec4 d = texture2D(
      sampler,
      (index + vec2(1.5, 1.5)) * texelSize
    );

    return mix(
      mix(a, b, fraction.x),
      mix(c, d, fraction.x),
      fraction.y
    );
  }

  void main() {
    vec2 coordinate =
      vUv -
      u_dt *
      bilerp(u_velocity_texture, vUv, u_texel).xy *
      u_texel;
    vec4 velocity =
      bilerp(u_input_texture, coordinate, u_output_textel);

    gl_FragColor = u_dissipation * velocity;
  }
`;

const DISPLAY_SHADER = `
  precision highp float;

  varying vec2 vUv;

  uniform float u_ratio;
  uniform float u_img_ratio;
  uniform float u_disturb_power;
  uniform sampler2D u_output_texture;
  uniform sampler2D u_velocity_texture;
  uniform sampler2D u_text_texture;
  uniform float u_canvas_scale;
  uniform float u_inner_scale;

  vec2 getImageUv() {
    vec2 uv = vUv - 0.5;
    uv *= u_canvas_scale;
    uv /= u_inner_scale;

    float containerAspect = u_ratio;
    float imageAspect = u_img_ratio;
    vec2 scale = vec2(1.0);

    if (containerAspect > imageAspect) {
      scale.y = imageAspect / containerAspect;
    } else {
      scale.x = containerAspect / imageAspect;
    }

    uv *= scale;
    return uv + 0.5;
  }

  vec2 getFrameUv() {
    vec2 uv = vUv - 0.5;
    uv *= u_canvas_scale;
    uv /= u_inner_scale;
    return uv + 0.5;
  }

  float getFrameAlpha(vec2 uv, float frameWidth) {
    float alpha =
      smoothstep(0.0, frameWidth, uv.x) *
      smoothstep(1.0, 1.0 - frameWidth, uv.x);
    alpha *=
      smoothstep(0.0, frameWidth, uv.y) *
      smoothstep(1.0, 1.0 - frameWidth, uv.y);
    return alpha;
  }

  vec3 sampleImageSmooth(vec2 uv) {
    vec2 clampedUv = clamp(uv, 0.0, 1.0);
    vec3 base =
      texture2D(
        u_text_texture,
        vec2(clampedUv.x, 1.0 - clampedUv.y)
      ).rgb;

    float below = step(uv.y, 0.0);
    float above = step(1.0, uv.y);
    float left = step(uv.x, 0.0);
    float right = step(1.0, uv.x);
    float outOfBounds = max(max(below, above), max(left, right));

    if (outOfBounds > 0.0) {
      float distance = 0.002;
      vec3 sum = vec3(0.0);

      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x - distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y - distance, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x, 0.0, 1.0),
          1.0 - clamp(clampedUv.y - distance, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x + distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y - distance, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x - distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x, 0.0, 1.0),
          1.0 - clamp(clampedUv.y, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x + distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x - distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y + distance, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x, 0.0, 1.0),
          1.0 - clamp(clampedUv.y + distance, 0.0, 1.0)
        )
      ).rgb;
      sum += texture2D(
        u_text_texture,
        vec2(
          clamp(clampedUv.x + distance, 0.0, 1.0),
          1.0 - clamp(clampedUv.y + distance, 0.0, 1.0)
        )
      ).rgb;

      base = sum / 9.0;
    }

    return base;
  }

  void main() {
    float offset = texture2D(u_output_texture, vUv).r;
    vec2 velocity = texture2D(u_velocity_texture, vUv).xy;
    velocity += 0.001;

    vec2 imageUv = getImageUv();
    imageUv -=
      u_disturb_power *
      normalize(velocity) *
      offset;
    imageUv -=
      u_disturb_power *
      normalize(velocity) *
      offset;

    vec2 frameUv = getFrameUv();
    frameUv -=
      u_disturb_power *
      normalize(velocity) *
      offset;

    vec3 image = sampleImageSmooth(imageUv);
    float opacity = getFrameAlpha(frameUv, 0.002);

    gl_FragColor = vec4(image * opacity, opacity);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number,
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Unable to create the hero shader.");
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Hero shader compilation failed.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  fragmentSource: string,
): ProgramInfo {
  const vertexShader = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(
    gl,
    fragmentSource,
    gl.FRAGMENT_SHADER,
  );
  const program = gl.createProgram();

  if (!program) {
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error("Unable to create the hero shader program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.bindAttribLocation(program, 0, "a_position");
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Hero shader linking failed.";
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    throw new Error(message);
  }

  const uniforms: Record<string, WebGLUniformLocation | null> = {};
  const uniformCount = gl.getProgramParameter(
    program,
    gl.ACTIVE_UNIFORMS,
  ) as number;

  for (let index = 0; index < uniformCount; index += 1) {
    const uniform = gl.getActiveUniform(program, index);

    if (uniform) {
      uniforms[uniform.name] = gl.getUniformLocation(program, uniform.name);
    }
  }

  return {
    program,
    shaders: [vertexShader, fragmentShader],
    uniforms,
  };
}

function createRenderTarget(
  gl: WebGLRenderingContext,
  width: number,
  height: number,
): RenderTarget {
  const texture = gl.createTexture();
  const framebuffer = gl.createFramebuffer();

  if (!texture || !framebuffer) {
    throw new Error("Unable to create a hero fluid render target.");
  }

  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGB,
    width,
    height,
    0,
    gl.RGB,
    gl.FLOAT,
    null,
  );

  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    gl.COLOR_ATTACHMENT0,
    gl.TEXTURE_2D,
    texture,
    0,
  );
  gl.viewport(0, 0, width, height);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    bind(unit) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      return unit;
    },
    dispose() {
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
    },
    framebuffer,
    height,
    texture,
    width,
  };
}

function createDoubleRenderTarget(
  gl: WebGLRenderingContext,
  width: number,
  height: number,
): DoubleRenderTarget {
  let readTarget = createRenderTarget(gl, width, height);
  let writeTarget = createRenderTarget(gl, width, height);

  return {
    dispose() {
      readTarget.dispose();
      writeTarget.dispose();
    },
    height,
    read: () => readTarget,
    swap() {
      const previousReadTarget = readTarget;
      readTarget = writeTarget;
      writeTarget = previousReadTarget;
    },
    texelSizeX: 1 / width,
    texelSizeY: 1 / height,
    width,
    write: () => writeTarget,
  };
}

function initializeLiquidHero(
  canvas: HTMLCanvasElement,
  container: HTMLDivElement,
) {
  const gl = canvas.getContext("webgl", { alpha: true });

  if (!gl) {
    return () => undefined;
  }

  gl.getExtension("OES_texture_float");
  gl.getExtension("OES_texture_float_linear");
  gl.clearColor(0, 0, 0, 0);

  let splatProgram: ProgramInfo;
  let divergenceProgram: ProgramInfo;
  let pressureProgram: ProgramInfo;
  let gradientProgram: ProgramInfo;
  let advectionProgram: ProgramInfo;
  let displayProgram: ProgramInfo;

  try {
    splatProgram = createProgram(gl, SPLAT_SHADER);
    divergenceProgram = createProgram(gl, DIVERGENCE_SHADER);
    pressureProgram = createProgram(gl, PRESSURE_SHADER);
    gradientProgram = createProgram(gl, GRADIENT_SHADER);
    advectionProgram = createProgram(gl, ADVECTION_SHADER);
    displayProgram = createProgram(gl, DISPLAY_SHADER);
  } catch {
    return () => undefined;
  }

  const programs = [
    splatProgram,
    divergenceProgram,
    pressureProgram,
    gradientProgram,
    advectionProgram,
    displayProgram,
  ];
  const positionBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();

  if (!positionBuffer || !indexBuffer) {
    return () => undefined;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]),
    gl.STATIC_DRAW,
  );
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array([0, 1, 2, 0, 2, 3]),
    gl.STATIC_DRAW,
  );
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  let velocity: DoubleRenderTarget | null = null;
  let displacement: DoubleRenderTarget | null = null;
  let divergence: RenderTarget | null = null;
  let pressure: DoubleRenderTarget | null = null;
  let imageTexture: WebGLTexture | null = null;
  let imageAspect = 1;
  let animationFrame = 0;
  let disposed = false;

  const pointer = {
    active: false,
    dx: 0,
    dy: 0,
    moved: false,
    x: 0.65 * container.clientWidth,
    y: 0.5 * container.clientHeight,
  };

  const disposeTargets = () => {
    velocity?.dispose();
    displacement?.dispose();
    divergence?.dispose();
    pressure?.dispose();
    velocity = null;
    displacement = null;
    divergence = null;
    pressure = null;
  };

  const resize = () => {
    const width = Math.max(1, container.clientWidth);
    const height = Math.max(1, container.clientHeight);
    const deviceScale = Math.min(window.devicePixelRatio || 1, 2);
    const overscan = 1.2;

    canvas.width = Math.max(
      2,
      Math.round(width * overscan * deviceScale),
    );
    canvas.height = Math.max(
      2,
      Math.round(height * overscan * deviceScale),
    );
    canvas.style.width = `${width * overscan}px`;
    canvas.style.height = `${height * overscan}px`;

    const aspect = width / height;
    const baseResolution = 128 + ((4 - 1) * 384) / 9;
    const simulationWidth = Math.max(2, Math.round(baseResolution * aspect));
    const simulationHeight = Math.max(2, Math.round(baseResolution));

    disposeTargets();
    velocity = createDoubleRenderTarget(
      gl,
      simulationWidth,
      simulationHeight,
    );
    displacement = createDoubleRenderTarget(
      gl,
      simulationWidth,
      simulationHeight,
    );
    divergence = createRenderTarget(
      gl,
      simulationWidth,
      simulationHeight,
    );
    pressure = createDoubleRenderTarget(
      gl,
      simulationWidth,
      simulationHeight,
    );
  };

  const draw = (target: RenderTarget | null = null) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    if (target) {
      gl.viewport(0, 0, target.width, target.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  const pointerPosition = () => {
    const width = container.clientWidth * 1.2;
    const height = container.clientHeight * 1.2;
    const horizontalInset = 0.5 * (width - container.clientWidth);
    const verticalInset = 0.5 * (height - container.clientHeight);

    return {
      u: (pointer.x + horizontalInset) / width,
      v: 1 - (pointer.y + verticalInset) / height,
    };
  };

  const updatePointer = (clientX: number, clientY: number) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rawX = x - pointer.x;
    const rawY = y - pointer.y;
    const magnitude = Math.hypot(rawX, rawY);
    const impulseScale = Math.min(1, 40 / Math.max(1, magnitude));

    pointer.moved = true;
    pointer.dx = 6 * rawX * impulseScale;
    pointer.dy = 6 * rawY * impulseScale;
    pointer.x = x;
    pointer.y = y;
  };

  const resetPointer = (clientX: number, clientY: number) => {
    const rect = container.getBoundingClientRect();
    pointer.x = clientX - rect.left;
    pointer.y = clientY - rect.top;
    pointer.dx = 0;
    pointer.dy = 0;
    pointer.moved = false;
  };

  const onMouseEnter = (event: MouseEvent) => {
    pointer.active = true;
    resetPointer(event.clientX, event.clientY);
  };
  const onMouseLeave = () => {
    pointer.active = false;
    pointer.moved = false;
  };
  const onMouseMove = (event: MouseEvent) => {
    if (pointer.active) {
      updatePointer(event.clientX, event.clientY);
    }
  };
  const onClick = (event: MouseEvent) => {
    if (pointer.active) {
      updatePointer(event.clientX, event.clientY);
    }
  };
  const onTouchStart = (event: TouchEvent) => {
    pointer.active = true;

    if (event.targetTouches[0]) {
      resetPointer(
        event.targetTouches[0].clientX,
        event.targetTouches[0].clientY,
      );
    }
  };
  const onTouchEnd = () => {
    pointer.active = false;
    pointer.moved = false;
  };
  const onTouchMove = (event: TouchEvent) => {
    if (!pointer.active || !event.targetTouches[0]) {
      return;
    }

    event.preventDefault();
    updatePointer(
      event.targetTouches[0].clientX,
      event.targetTouches[0].clientY,
    );
  };

  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("mouseleave", onMouseLeave);
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("click", onClick);
  canvas.addEventListener("touchstart", onTouchStart, { passive: true });
  canvas.addEventListener("touchend", onTouchEnd, { passive: true });
  canvas.addEventListener("touchmove", onTouchMove, { passive: false });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();

  const image = new Image();
  image.decoding = "async";
  image.src = "/fuel/hero.png";
  image.onload = () => {
    if (disposed) {
      return;
    }

    imageAspect = image.naturalWidth / Math.max(1, image.naturalHeight);
    imageTexture = gl.createTexture();

    if (!imageTexture) {
      return;
    }

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      image,
    );
  };

  const render = () => {
    if (
      disposed ||
      !velocity ||
      !displacement ||
      !divergence ||
      !pressure
    ) {
      return;
    }

    if (!imageTexture) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clear(gl.COLOR_BUFFER_BIT);
      animationFrame = window.requestAnimationFrame(render);
      return;
    }

    const deltaTime = 1 / 60;

    if (pointer.moved) {
      pointer.moved = false;
      const point = pointerPosition();

      gl.useProgram(splatProgram.program);
      gl.uniform1i(
        splatProgram.uniforms.u_input_texture,
        velocity.read().bind(1),
      );
      gl.uniform1f(
        splatProgram.uniforms.u_ratio,
        container.clientWidth / Math.max(1, container.clientHeight),
      );
      gl.uniform2f(splatProgram.uniforms.u_point, point.u, point.v);
      gl.uniform3f(
        splatProgram.uniforms.u_point_value,
        pointer.dx,
        -pointer.dy,
        0,
      );
      gl.uniform1f(splatProgram.uniforms.u_point_size, 0.0025);
      draw(velocity.write());
      velocity.swap();

      gl.uniform1i(
        splatProgram.uniforms.u_input_texture,
        displacement.read().bind(1),
      );
      gl.uniform3f(
        splatProgram.uniforms.u_point_value,
        0.05,
        0,
        0,
      );
      draw(displacement.write());
      displacement.swap();
    }

    gl.useProgram(divergenceProgram.program);
    gl.uniform2f(
      divergenceProgram.uniforms.u_texel,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform1i(
      divergenceProgram.uniforms.u_velocity_texture,
      velocity.read().bind(1),
    );
    draw(divergence);

    gl.useProgram(pressureProgram.program);
    gl.uniform2f(
      pressureProgram.uniforms.u_texel,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform1i(
      pressureProgram.uniforms.u_divergence_texture,
      divergence.bind(1),
    );

    for (let index = 0; index < 16; index += 1) {
      gl.uniform1i(
        pressureProgram.uniforms.u_pressure_texture,
        pressure.read().bind(2),
      );
      draw(pressure.write());
      pressure.swap();
    }

    gl.useProgram(gradientProgram.program);
    gl.uniform2f(
      gradientProgram.uniforms.u_texel,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform1i(
      gradientProgram.uniforms.u_pressure_texture,
      pressure.read().bind(1),
    );
    gl.uniform1i(
      gradientProgram.uniforms.u_velocity_texture,
      velocity.read().bind(2),
    );
    draw(velocity.write());
    velocity.swap();

    gl.useProgram(advectionProgram.program);
    gl.uniform2f(
      advectionProgram.uniforms.u_texel,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform2f(
      advectionProgram.uniforms.u_output_textel,
      velocity.texelSizeX,
      velocity.texelSizeY,
    );
    gl.uniform1i(
      advectionProgram.uniforms.u_velocity_texture,
      velocity.read().bind(1),
    );
    gl.uniform1i(
      advectionProgram.uniforms.u_input_texture,
      velocity.read().bind(1),
    );
    gl.uniform1f(advectionProgram.uniforms.u_dt, deltaTime);
    gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.97);
    draw(velocity.write());
    velocity.swap();

    gl.uniform2f(
      advectionProgram.uniforms.u_output_textel,
      displacement.texelSizeX,
      displacement.texelSizeY,
    );
    gl.uniform1i(
      advectionProgram.uniforms.u_input_texture,
      displacement.read().bind(2),
    );
    gl.uniform1f(advectionProgram.uniforms.u_dt, 8 * deltaTime);
    gl.uniform1f(advectionProgram.uniforms.u_dissipation, 0.98);
    draw(displacement.write());
    displacement.swap();

    gl.useProgram(displayProgram.program);
    gl.uniform1i(
      displayProgram.uniforms.u_velocity_texture,
      velocity.read().bind(2),
    );
    gl.uniform1f(
      displayProgram.uniforms.u_ratio,
      container.clientWidth / Math.max(1, container.clientHeight),
    );
    gl.uniform1f(displayProgram.uniforms.u_img_ratio, imageAspect);
    gl.uniform1f(displayProgram.uniforms.u_disturb_power, 0.8);
    gl.uniform1i(
      displayProgram.uniforms.u_output_texture,
      displacement.read().bind(1),
    );
    gl.uniform1f(displayProgram.uniforms.u_canvas_scale, 1);
    gl.uniform1f(
      displayProgram.uniforms.u_inner_scale,
      0.8333333333333334,
    );
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture);
    gl.uniform1i(displayProgram.uniforms.u_text_texture, 0);
    draw();

    animationFrame = window.requestAnimationFrame(render);
  };

  animationFrame = window.requestAnimationFrame(render);

  return () => {
    disposed = true;
    window.cancelAnimationFrame(animationFrame);
    resizeObserver.disconnect();
    image.onload = null;

    canvas.removeEventListener("mouseenter", onMouseEnter);
    canvas.removeEventListener("mouseleave", onMouseLeave);
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("click", onClick);
    canvas.removeEventListener("touchstart", onTouchStart);
    canvas.removeEventListener("touchend", onTouchEnd);
    canvas.removeEventListener("touchmove", onTouchMove);

    disposeTargets();

    if (imageTexture) {
      gl.deleteTexture(imageTexture);
    }

    gl.deleteBuffer(positionBuffer);
    gl.deleteBuffer(indexBuffer);
    programs.forEach((programInfo) => {
      gl.deleteProgram(programInfo.program);
      programInfo.shaders.forEach((shader) => gl.deleteShader(shader));
    });
  };
}

export function FuelLiquidHero({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(min-width: 1200px) and (prefers-reduced-motion: no-preference)",
    );
    let dispose: () => void = () => undefined;

    const synchronize = () => {
      dispose();
      dispose = mediaQuery.matches
        ? initializeLiquidHero(canvas, container)
        : () => undefined;
    };

    synchronize();
    mediaQuery.addEventListener("change", synchronize);

    return () => {
      mediaQuery.removeEventListener("change", synchronize);
      dispose();
    };
  }, []);

  return (
    <div aria-hidden="true" className={className} ref={containerRef}>
      <canvas ref={canvasRef} />
    </div>
  );
}
