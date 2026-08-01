"use client";

import { useEffect, useRef } from "react";
import styles from "./JaydenFluidBackground.module.css";

const vertexShaderSource = `#version 300 es
in vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x),
    f.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  mat2 rotation = mat2(0.82, -0.57, 0.57, 0.82);
  for (int i = 0; i < 5; i++) {
    value += amplitude * noise(p);
    p = rotation * p * 2.03 + 0.13;
    amplitude *= 0.5;
  }
  return value;
}

vec3 ribbon(
  vec2 p,
  float center,
  float slope,
  float amplitude,
  float frequency,
  float phase,
  float width,
  vec3 color
) {
  float wave = center + slope * p.x;
  wave += amplitude * sin(p.x * frequency + phase);
  wave += 0.07 * sin(p.x * (frequency * 2.3) - phase * 0.7);
  float distanceToBand = abs(p.y - wave);
  float body = smoothstep(width + 0.24, width - 0.02, distanceToBand);
  float inner = smoothstep(width, width * 0.18, distanceToBand);
  float edge = smoothstep(width + 0.045, width, distanceToBand)
    - smoothstep(width, width - 0.035, distanceToBand);
  return color * (body * 0.11 + inner * 0.17 + edge * 0.95);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_resolution.x / u_resolution.y;

  float time = u_time * 0.16;
  float domain = fbm(p * 1.04 + vec2(time * 0.06, -time * 0.035));
  vec2 warped = p;
  warped.y += (domain - 0.5) * 0.26;
  warped.x += (fbm(p * 0.78 - vec2(time * 0.035, 0.0)) - 0.5) * 0.11;

  vec3 color = vec3(0.0);
  vec3 ember = vec3(1.0, 0.115, 0.015);
  vec3 flame = vec3(1.0, 0.285, 0.035);
  vec3 amber = vec3(1.0, 0.43, 0.075);

  color += ribbon(
    warped,
    -0.54,
    -0.33,
    0.25,
    1.64,
    time * 0.58 + 1.1,
    0.16,
    ember
  );
  color += ribbon(
    warped,
    -0.10,
    0.18,
    0.33,
    1.27,
    time * 0.43 - 0.8,
    0.18,
    flame
  );
  color += ribbon(
    warped,
    0.47,
    -0.22,
    0.22,
    1.88,
    -time * 0.36 + 2.4,
    0.13,
    amber
  );

  float rightBloom = exp(-2.8 * length((p - vec2(1.24, 0.13)) * vec2(0.72, 1.0)));
  float leftBloom = exp(-3.4 * length((p - vec2(-1.27, -0.16)) * vec2(0.78, 1.0)));
  color += flame * rightBloom * (0.25 + domain * 0.12);
  color += ember * leftBloom * 0.18;

  float centerFalloff = smoothstep(0.0, 0.84, abs(p.x));
  color *= 0.67 + centerFalloff * 0.33;

  float grain = hash(gl_FragCoord.xy + floor(u_time * 18.0)) - 0.5;
  color += grain * 0.018;
  color = pow(max(color, 0.0), vec3(0.88));

  outColor = vec4(color, 1.0);
}
`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) {
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function JaydenFluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
      stencil: false,
    });

    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      canvas.dataset.fallback = "true";
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "true";
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const buffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let startTime = performance.now();
    let isVisible = true;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolutionLocation, width, height);
    };

    const render = (now: number) => {
      resize();
      const elapsed = reducedMotion.matches ? 4.2 : (now - startTime) / 1000;
      gl.uniform1f(timeLocation, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!reducedMotion.matches && isVisible && !document.hidden) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const restart = () => {
      window.cancelAnimationFrame(animationFrame);
      if (reducedMotion.matches) {
        render(startTime + 4200);
      } else if (isVisible && !document.hidden) {
        startTime = performance.now() - Math.min(performance.now() - startTime, 60000);
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        restart();
      },
      { rootMargin: "120px" },
    );
    const resizeObserver = new ResizeObserver(resize);
    const onVisibilityChange = () => restart();

    observer.observe(canvas);
    resizeObserver.observe(canvas);
    reducedMotion.addEventListener("change", restart);
    document.addEventListener("visibilitychange", onVisibilityChange);
    resize();
    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      resizeObserver.disconnect();
      reducedMotion.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className={styles.background} aria-hidden="true">
      <svg
        className={styles.flowArtwork}
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1280 952"
      >
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            height="160%"
            id="jayden-flow-soft"
            width="160%"
            x="-30%"
            y="-30%"
          >
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter
            colorInterpolationFilters="sRGB"
            height="180%"
            id="jayden-flow-edge"
            width="180%"
            x="-40%"
            y="-40%"
          >
            <feGaussianBlur result="blur" stdDeviation="7" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="jayden-flow-left" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#ff5a21" />
            <stop offset="0.52" stopColor="#e93d11" />
            <stop offset="1" stopColor="#8e1503" />
          </linearGradient>
          <linearGradient id="jayden-flow-right" x1="1" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#ff6a25" />
            <stop offset="0.48" stopColor="#d9340c" />
            <stop offset="1" stopColor="#5e0c01" />
          </linearGradient>
        </defs>

        <g className={styles.leftFlow}>
          <path
            d="M-145 290C-5 190 122 194 190 327C267 480 364 523 522 626C667 721 731 862 810 1027"
            filter="url(#jayden-flow-soft)"
            opacity=".34"
            stroke="url(#jayden-flow-left)"
            strokeLinecap="round"
            strokeWidth="105"
          />
          <path
            d="M-145 290C-5 190 122 194 190 327C267 480 364 523 522 626C667 721 731 862 810 1027"
            filter="url(#jayden-flow-edge)"
            opacity=".9"
            stroke="url(#jayden-flow-left)"
            strokeLinecap="round"
            strokeWidth="4"
          />
          <path
            d="M-112 337C12 244 94 268 150 374C222 509 333 576 478 665C605 742 672 854 738 1007"
            filter="url(#jayden-flow-soft)"
            opacity=".18"
            stroke="#ff4416"
            strokeLinecap="round"
            strokeWidth="48"
          />
        </g>

        <g className={styles.rightFlow}>
          <path
            d="M1422 318C1304 342 1288 420 1162 468C1032 518 989 574 899 695C814 808 734 881 621 1019"
            filter="url(#jayden-flow-soft)"
            opacity=".42"
            stroke="url(#jayden-flow-right)"
            strokeLinecap="round"
            strokeWidth="170"
          />
          <path
            d="M1410 346C1290 373 1268 439 1155 482C1026 531 976 590 886 708C800 820 716 894 606 1024"
            filter="url(#jayden-flow-edge)"
            opacity=".68"
            stroke="#ff5520"
            strokeLinecap="round"
            strokeWidth="3"
          />
        </g>
      </svg>
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
}
