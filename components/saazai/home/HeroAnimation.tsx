import Image from "next/image";
import styles from "./HomePage.module.css";

const perspectivePlane =
  "matrix3d(0.866025, 0.5, 0, 0, -1, 0.57735, 0, 0, 0.123968, 0.0908301, 1, -0.000833333, 0, 0, 0, 1)";

const badgePlane =
  "matrix3d(0.866025, 0.5, 0, 0, -0.832436, 0.674093, 0, 0, 0.0281738, 0.0281738, 1, -0.000833333, 0, 0, 0, 1)";

type HeroBadgeProps = {
  className: string;
  icon: string;
  iconSize: number;
  motionClassName: string;
};

function HeroBadge({
  className,
  icon,
  iconSize,
  motionClassName,
}: HeroBadgeProps) {
  return (
    <div className={`${styles.heroBadgeStage} ${className}`}>
      <div
        className={styles.heroBadgePlane}
        style={{ transform: badgePlane }}
      >
        <div className={styles.heroBadgeShadow} />
        <div className={`${styles.heroBadgeFace} ${motionClassName}`}>
          <Image alt="" height={iconSize} src={icon} width={iconSize} />
        </div>
      </div>
    </div>
  );
}

export function HeroAnimation() {
  return (
    <div aria-hidden="true" className={styles.heroVisual}>
      <svg
        className={styles.heroRailNetwork}
        fill="none"
        viewBox="0 0 1352 788"
      >
        <g
          stroke="#eee8ec"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.35"
        >
          <path d="M1375 16 1164 138c-13 8-13 20 0 28l196 113" />
          <path d="M1375 74 1209 170c-13 8-13 20 0 28l151 87" />
          <path d="m1375 225-176 102c-14 8-14 20 0 28l176 102" />
          <path d="m1375 281-136 78c-14 8-14 21 0 29l136 78" />
          <path d="m1052 221 108 63c13 8 13 20 0 28L987 412" />
          <path d="m994 188 166 96c13 8 13 20 0 28L918 452" />
          <path d="m831 348 246 142c14 8 14 21 0 29L895 624" />
          <path d="m751 393 326 188c14 8 14 21 0 29L945 686" />
          <path d="M-31 679 171 562c13-8 34-8 48 0l191 111" />
          <path d="m-31 734 247-143c13-8 35-8 48 0l207 120" />
          <path d="m130 788 161-93c13-8 35-8 48 0l155 90" />
          <path d="M380 528 570 418c13-8 35-8 48 0l229 132" />
          <path d="m427 555 143-83c13-8 35-8 48 0l194 112" />
        </g>
        <g fill="#f0ebee">
          {Array.from({ length: 11 }, (_, row) =>
            Array.from({ length: 12 }, (_, column) => (
              <circle
                cx={794 + column * 24}
                cy={300 + row * 14}
                key={`${row}-${column}`}
                r=".9"
              />
            )),
          )}
        </g>
      </svg>

      <svg className={`${styles.heroCaret} ${styles.heroCaretLeft}`} viewBox="0 0 34 34">
        <path d="m7 21 10-10 10 10M7 29l10-10 10 10" />
      </svg>
      <svg className={`${styles.heroCaret} ${styles.heroCaretRight}`} viewBox="0 0 34 34">
        <path d="m7 21 10-10 10 10M7 29l10-10 10 10" />
      </svg>

      <div className={styles.heroUpperAssembly}>
        <svg className={styles.heroConnectorLeft} viewBox="0 0 213 225">
          <defs>
            <linearGradient id="hero-connector-left" x1=".74" x2=".34" y1=".12" y2=".75">
              <stop stopColor="#f5f0f0" />
              <stop offset="1" stopColor="#f5f0f0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M1.5 104.767 0 0l1.5 2.993L3 4.49l210 121.73-2.5 98.78Z"
            fill="url(#hero-connector-left)"
          />
        </svg>
        <svg className={styles.heroConnectorRight} viewBox="0 0 198 103">
          <defs>
            <linearGradient id="hero-connector-right" x1=".74" x2=".29" y1=".12" y2=".84">
              <stop stopColor="#f5f0f0" />
              <stop offset="1" stopColor="#f5f0f0" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="m0 67.251 70.463-67.251.947 1.427a35.6 35.6 0 0 0 4.257 5.217l.52.522a31 31 0 0 0 2.83 2.44 27.9 27.9 0 0 0 8.309 3.966L198 42.474 137.754 103Z"
            fill="url(#hero-connector-right)"
          />
        </svg>

        <svg className={styles.heroUpperSlab} viewBox="0 0 335 203">
          <path
            d="M112.535 0c4.222 0 8.406.941 11.564 2.792l.002.001 204.314 118.789.003.002c3.053 1.747 4.49 4.027 4.577 6.153l.005.205-.094 8.178v.006c0 2.271-1.515 4.644-4.675 6.451l-.003.002-96.206 55.628c-3.207 1.854-7.416 2.793-11.637 2.793-4.223 0-8.406-.94-11.566-2.792l-.001-.001L4.599 79.419l-.003-.002-.291-.171C1.352 77.469.014 75.262.014 73.059v-4.881l.337-.328.285-.279h.029c0-.009-.004-.017-.004-.025l.047-.044c.015.016.022.036-.002-.014-.025-.049-.079-.163-.191-.273l-.501-.49v-1.853H0c.025-2.228 1.469-4.585 4.692-6.453l-.001-.001 96.208-55.624C104.105.941 108.313 0 112.535 0Z"
            fill="#fafafa"
            stroke="#efefef"
            strokeWidth=".18"
            transform="translate(1.089 1.036)"
          />
        </svg>

        <svg className={styles.heroUpperNotch} viewBox="0 0 66 44">
          <path
            d="M4.158 24.396 41.144 2.406C46.702-.875 53.715-.786 59.181 2.583c6.561 4.078 6.377 13.39-.273 17.203L25.384 39.205c-6.561 3.813-14.668 3.725-21.137-.266l-.273-.176c-5.374-3.371-5.283-11.086.184-14.367Z"
            fill="rgba(255,255,255,.4)"
            transform="translate(1 .545)"
          />
        </svg>

        <svg className={styles.heroIconPanel} viewBox="0 0 205 118">
          <path
            d="M4.427 54.064c-5.84 3.381-5.934 8.773-.093 12.062l83.652 47.338c5.84 3.381 15.296 3.381 21.139 0l90.483-51.53c5.841-3.381 5.841-8.771.091-12.06L116.143 2.536c-5.841-3.381-15.298-3.381-21.138 0Z"
            fill="#fff"
            stroke="#f3eff2"
            strokeWidth=".45"
            transform="translate(0 .67)"
          />
        </svg>

        <div className={styles.heroPrism}>
          <div className={styles.heroPrismBottom} />
          <div className={styles.heroPrismTop}>
            <svg viewBox="0 0 24 24">
              <defs>
                <linearGradient id="hero-prism-o" x1="0" x2="1" y1=".48" y2=".52">
                  <stop stopColor="#f77373" />
                  <stop offset="1" stopColor="#814bee" />
                </linearGradient>
              </defs>
              <path
                d="M15.75 20.25v2.25h-9v-2.25h-4.5v-4.5H0v-9h2.25v-2.25H4.5V2.25h2.25V0H9v2.25H6.75V4.5H4.5V18h2.25v2.25h9Zm0-18h-2.25V0h2.25v2.25h4.5v4.5h2.25v9h-2.25V18H18v2.25h-2.25V18H18V4.5h-2.25Z"
                fill="url(#hero-prism-o)"
                transform="translate(.75 .75)"
              />
            </svg>
          </div>
          <svg className={styles.heroPrismGlowLeft} viewBox="0 0 60 54">
            <defs>
              <linearGradient id="hero-prism-left" x1=".57" x2=".39" y1=".18" y2="1">
                <stop stopColor="#f77373" stopOpacity=".4" />
                <stop offset=".44" stopColor="#c762f6" stopOpacity=".2" />
                <stop offset="1" stopColor="#814bee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M8.26 33.497 0 0c.302 1.223 1.161 2.232 2.32 2.724l.46.196 3.997 1.589 42.767 12.629 7.528 34.707Z"
              fill="url(#hero-prism-left)"
              transform="translate(1 1)"
            />
          </svg>
          <svg className={styles.heroPrismGlowRight} viewBox="0 0 80 40">
            <defs>
              <linearGradient id="hero-prism-right" x1=".58" x2=".37" y1=".19" y2="1">
                <stop stopColor="#f77373" stopOpacity=".4" />
                <stop offset="1" stopColor="#814bee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 23.991 25.705 0a14.5 14.5 0 0 0 2.683 2.965l.604.47a27 27 0 0 0 1.898 1.272l.341.194a25.5 25.5 0 0 0 5.412 2.183L80 18.074 55.684 40Z"
              fill="url(#hero-prism-right)"
            />
          </svg>
        </div>
      </div>

      <div className={styles.heroPromptStage}>
        <div
          className={styles.heroPromptPlane}
          style={{ transform: perspectivePlane }}
        >
          <Image
            alt=""
            fill
            priority
            sizes="300px"
            src="/saazai/assets/91ce62d914b728b1.avif"
          />
        </div>
      </div>

      <div className={styles.heroLoaderStage}>
        <div
          className={styles.heroLoaderPlane}
          style={{ transform: perspectivePlane }}
        >
          <Image
            alt=""
            fill
            priority
            sizes="176px"
            src="/saazai/assets/20825aeeec0edae3.svg"
          />
        </div>
      </div>

      <HeroBadge
        className={styles.heroBadgeGreen}
        icon="/saazai/assets/c2b31b6030585db3.svg"
        iconSize={36}
        motionClassName={styles.heroBadgeMotionGreen}
      />
      <HeroBadge
        className={styles.heroBadgePink}
        icon="/saazai/assets/435536d5e2a43882.svg"
        iconSize={36}
        motionClassName={styles.heroBadgeMotionPink}
      />
      <HeroBadge
        className={styles.heroBadgeRed}
        icon="/saazai/assets/b319cfa1e0749cf6.svg"
        iconSize={42}
        motionClassName={styles.heroBadgeMotionRed}
      />
    </div>
  );
}
