import Link from "next/link";
import { palmerAsset } from "@/components/palmer/assets";
import { articles, projects } from "@/components/palmer/data";
import {
  PalmerDeferredVideo,
  PalmerHeroReel,
  PalmerHomeMotion,
} from "./PalmerHomeClient";
import styles from "./PalmerHome.module.css";

type SectionMetaProps = {
  index: string;
  title: string;
  japanese: string;
  role: string;
};

const services = [
  {
    index: "01",
    title: "Art Direction",
    description:
      "We guide every visual decision from start to finish, ensuring clarity, emotion, and impact across every touchpoint.",
  },
  {
    index: "02",
    title: "Brand Identity",
    description:
      "From strategy to execution, we shape consistent brand systems that speak clearly and feel uniquely ownable.",
  },
  {
    index: "03",
    title: "Motion Direction",
    description:
      "We use motion as a design tool, adding clarity, rhythm, and energy to digital experiences with intention.",
  },
  {
    index: "04",
    title: "Framer Sites",
    description:
      "Design meets execution with real-time, scalable websites, all crafted natively inside Framer for speed and precision.",
  },
];

const experience = [
  ["Clavmen Studio", "2022 - present", "Art Director & Designer", "Tokyo"],
  ["Modular Eight", "2020 - 2022", "Senior Developer", "Osaka"],
  ["Haus of Signal", "2018 - 2020", "Creative Technologist", "Berlin"],
  ["Studio Orbit", "2016 - 2018", "UI/UX Designer", "Dallas"],
  ["Novaform Labs", "2014 - 2016", "Junior Designer", "Kyoto"],
];

const testimonials = [
  {
    quote:
      "Akihiko elevated every layer of our brand’s online presence. From motion details to structural layout, every piece felt crafted and intentional. The site not only looked beautiful but performed well too, and the entire collaboration process was smooth.",
    name: "Lisa Kuroda",
    role: "Founder, Studio Analog",
    image: "5emb8oOwafbQsfWVIaaZ12WcTM.png",
    mark: "analog",
  },
  {
    quote:
      "Akihiko approaches every project with a deep sense of purpose. His work is never just about the surface, it’s about how each element functions, connects, and flows. He brings logic, sharpness, and confidence to every decision, and his build quality.",
    name: "Daniel Reyes",
    role: "Director, Framehaus",
    image: "O8QHzRBHCQM4fDoxXZEZmECZs.png",
    mark: "framehaus",
  },
  {
    quote:
      "His ability to merge storytelling with clean interaction design is unmatched. Akihiko understands not just how things should look, but why they should look that way, and that insight came through in every part of the work.",
    name: "Mei Tanaka",
    role: "UX Designer, Nuro",
    image: "nfHihiND3hFVe8PsrYPUstbAcQ.jpg",
    mark: "nuro",
  },
  {
    quote:
      "Working with Akihiko was more than just hiring a designer, it felt like bringing on a creative partner who truly understood our goals. He took our raw ideas, added clarity, and transformed them into something that not only looked stunning.",
    name: "Julian Pierce",
    role: "Director, Vektor Inc.",
    image: "1NojF9yywMvqzHNbp79Nt0uTs.png",
    mark: "Vektor",
  },
  {
    quote:
      "Akihiko brings a rare balance of creativity and discipline. He’s incredibly fast without ever sacrificing attention to detail. From early ideation to the final product, his process is intentional, his communication is clear.",
    name: "Hana Samoto",
    role: "CEO, Willow Studio",
    image: "vYFurv3Bhpru2Pn28GNGdN5WOk.png",
    mark: "willow",
  },
];

const awards = [
  {
    count: "27x",
    name: "Awwwards",
    description:
      "Recognized for bold interaction, structured visual rhythm, and design consistency across creative categories.",
    images: [
      "5QMl4IurwLvQ40GhcE9evVfTQW0.png",
      "TGpbpkV9gbzPz61ATQTzIwpBBPU.jpg",
      "41QaDdGvmS3kEQL4oJyWQuJz8.png",
      "dfa6kXeZNdp07AUexK86lC0Av1Q.png",
    ],
  },
  {
    count: "14x",
    name: "FWA",
    description:
      "Awarded for outstanding execution, seamless animation, and originality in modern digital experiences.",
    images: [
      "PxLb8BDiVT7EGmdeXqCrY6sAc.png",
      "aPQiidta60oegcTH3cTfAPygffo.png",
      "J1Q74WRyFPKRGnwpdricaO9Ad0.png",
      "7zDvQk8tt3iZmAn51N2mbMG6pM.png",
    ],
  },
  {
    count: "09x",
    name: "CSSDA",
    description:
      "Celebrated for front-end excellence, design innovation, and development precision across multiple showcases.",
    images: [
      "XNRYGgOFhpafGTgRg64oNix1dc.png",
      "Z2NHZ6NBGhRJSliWFhlR4dZSSA8.png",
      "higLDZKTZifAO3UujqIIRQCVTM.png",
      "JR6gofaz38J5kX4BQiMcn7nob4.png",
    ],
  },
  {
    count: "08x",
    name: "Dribbble",
    description:
      "Highlighted for strong typographic systems, visual hierarchy, and thoughtful layout built with intent.",
    images: [
      "vhHIJv4PmmgQ1TXOzia8Qs7b5g.png",
      "GsvUhduUuKpqabW4bstAZkXg2I.png",
      "gSYRlBgpTRIsra86H4SkUPaCm4E.png",
      "jA1qpVSmkaG1iOloC5NZWxJfofQ.png",
    ],
  },
];

const plans = [
  {
    price: "$99",
    name: "Starter Plan.",
    description:
      "Perfect for small launches and personal sites that need a fast online presence.",
    points: [
      "One-page Framer site",
      "Custom layout & visuals",
      "Mobile-first responsive build",
      "Fast delivery (within 7 days)",
      "Design system setup",
      "SEO-ready structure",
      "Basic CMS integration",
      "Contact form setup",
    ],
  },
  {
    price: "$299",
    name: "Growth Plan.",
    description:
      "Designed for growing brands that need flexibility and CMS support.",
    points: [
      "Up to 5 pages",
      "Framer CMS-powered sections",
      "Component-based structure",
      "Motion design & transitions",
      "Clean UX-focused layout",
      "Device-optimized responsiveness",
      "Style guide system",
      "Email capture / integrations",
    ],
  },
  {
    price: "$899",
    name: "Full Scope Plan.",
    description:
      "Best for studios or teams needing structure and enterprise-level execution.",
    points: [
      "10+ pages with CMS",
      "Advanced layout strategy",
      "Full brand system support",
      "Animation direction",
      "Custom-built components",
      "Framer CMS training",
      "Launch support + QA",
      "Performance optimization",
    ],
  },
];

const clientCards = [
  {
    asset: "EzwClJ2Vn62LFoIphoP2kTBvQUc.mp4",
    label: "Cairo",
    className: styles.clientOne,
    video: true,
  },
  {
    asset: "rmeBLxZhEpvUaEnrIirzHJQynwc.png",
    label: "Manila.",
    className: styles.clientTwo,
  },
  {
    asset: "yw1GCZxhNp9c0ifxjP3zVlEc.png",
    label: "Mori",
    className: styles.clientThree,
  },
  {
    asset: "Ehe42PKiSCrm7iEv3XiwdHbR4.mp4",
    label: "Novo",
    className: styles.clientFour,
    video: true,
  },
  {
    asset: "KOQjQrydrJvVSvzcz2fLyVMiuBc.png",
    label: "olso",
    className: styles.clientFive,
  },
];

const articlePreviews = [
  {
    main: "7uG4BhwVaiwETVmXbIX3b81RuRw.png",
    inset: "Ma6QjV4s6M3aDB1yx2zZTsvfw.png",
  },
  {
    main: "X8dp4VYqMPiYUc91IS8zJtaSg.png",
    inset: "I9zD3HhAEBHp7kFu73FETZTj5A8.png",
  },
  {
    main: "3E2J9orCMTWzLWz1Wycx5lBwyAo.png",
    inset: "gykz5t3Atm9UtfI5YcnYcpGmng.png",
  },
  {
    main: "FtLqkZe3KwZWnfRLOTtcw7gbCMg.png",
    inset: "PbYC4rG1Wy23pyEryQ1m4f1MivU.png",
  },
];

function formatArticleDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function SectionMeta({ index, title, japanese, role }: SectionMetaProps) {
  return (
    <div className={styles.sectionMeta}>
      <p>
        © {title} <span>{japanese}</span>
      </p>
      <p>(WDX® — {index})</p>
      <p>{role}</p>
    </div>
  );
}

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack}>
        <span>{children}</span>
        <span>{children}</span>
      </div>
    </div>
  );
}

function ArrowLink({
  href,
  children,
  light = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <Link
      className={`${styles.arrowLink} ${light ? styles.arrowLinkLight : ""}`}
      href={href}
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export function PalmerHome() {
  return (
    <>
      <PalmerHomeMotion />
      <section className={styles.hero}>
        <div className={styles.heroLead}>
          <div className={styles.heroCopy}>
            <h1>
              <span>Pattern Dimensions</span>
              <span>and Moments that</span>
              <span>Connect and Leave a</span>
              <span>
                Bold <span className={styles.heroJapanese}>イメージ.</span>
              </span>
            </h1>
          </div>
          <PalmerHeroReel
            label="Palmer project reel"
            posterSrc="/palmer/assets/palmer-hero-reference.jpg"
            videoSrc="/palmer/assets/EzwClJ2Vn62LFoIphoP2kTBvQUc.mp4"
          />
          <div
            aria-label="Creative disciplines"
            className={styles.heroDisciplines}
          >
            <span>Art Direction</span>
            <span>Branding</span>
            <span>Strategy</span>
            <span>Web Design</span>
          </div>
        </div>
        <p className={styles.heroName}>
          Akihiko<sup>™</sup>
        </p>
      </section>

      <section className={styles.intro}>
        <SectionMeta
          index="02"
          title="Curated Interfaces"
          japanese="ビジュアル"
          role="Digital Designer"
        />
        <div className={styles.introRoles}>
          <span>Visual</span>
          <span>Freelancer</span>
          <span>Digital Nomad</span>
          <span>Creative Developer</span>
        </div>
        <div className={styles.introBody}>
          <div className={styles.introPortrait}>
            <img
              src={palmerAsset("tY8u6w6WcMvM2lq1ng3voV3T5k.jpg")}
              alt="Editorial portrait"
              loading="lazy"
            />
          </div>
          <div className={styles.introStatement}>
            <p>
              13+ years<sup>™</sup> of digital form, sharp interactions, and
              relentless creative discipline and effort.
            </p>
            <ArrowLink href="/contact">Contact</ArrowLink>
          </div>
        </div>
        <div className={styles.logoRail} aria-label="Selected collaborators">
          {[
            "liDp6RqOmZpoiyriU2da9i9ZRNM.png",
            "6IX9srHugK666NPKQJythMbMME.png",
            "3cl6kEyD2XtSr3RQpeBuJPLW0DA.png",
            "np97j2F8KUZ2HLiullJ6eZCAlsQ.png",
            "f0y1IAXP7xxPZoecHyx9XHFdiHA.png",
          ].map((asset, index) => (
            <img
              key={asset}
              src={palmerAsset(asset)}
              alt={`Partner mark ${index + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className={styles.work}>
        <SectionMeta
          index="03"
          title="Featured Projects"
          japanese="プロジェクト"
          role="Creative Development"
        />
        <Marquee>Featured Works©</Marquee>
        <div className={styles.workIntro}>
          <p>
            Every project is a chance to blend design and development, shaping
            bold interactive ideas into sleek digital realities, built with
            intent, speed, and visual clarity that attracts lot of peoples.
          </p>
          <ArrowLink href="/work">See works</ArrowLink>
        </div>
        <div className={styles.projectGrid}>
          {projects.map((project, index) => {
            const title =
              project.slug === "arc-bloom" ? "Arc & Bloom" : project.title;

            return (
              <Link
                aria-label={`View ${title} project`}
                className={styles.projectCard}
                data-palmer-project
                href={`/work/${project.slug}`}
                key={project.slug}
              >
                <span className={styles.projectImage}>
                  <img
                    alt=""
                    aria-hidden="true"
                    className={styles.projectBackdrop}
                    loading="lazy"
                    src={project.images[1]}
                  />
                  <img
                    alt={`${title} project preview`}
                    className={styles.projectInset}
                    loading="lazy"
                    src={project.images[0]}
                  />
                  <span className={styles.projectRibbon}>
                    <span>{project.service}</span>
                  </span>
                  <span className={styles.projectFocusView}>VIEW</span>
                </span>
                <span className={styles.projectDetails}>
                  <span className={styles.projectTitleTrack}>
                    <strong>{title}</strong>
                    <strong aria-hidden="true">{title}</strong>
                  </span>
                  <span>({String(index + 1).padStart(2, "0")})</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.services}>
        <SectionMeta
          index="04"
          title="Capabilities"
          japanese="サービス内容"
          role="Digital Execution"
        />
        <div className={styles.headingRow}>
          <h2>Services</h2>
          <span>(6)</span>
        </div>
        <div className={styles.whiteRail}>
          <span>Precise</span>
          <span>Structured</span>
          <span>Focused</span>
          <span>Visual Language</span>
        </div>
        <div className={styles.serviceRows}>
          {services.map((service) => (
            <article key={service.title}>
              <span className={styles.serviceIndex}>{service.index}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.profile}>
        <SectionMeta
          index="05"
          title="Personal Profile"
          japanese="プロフィール"
          role="Visual Thinker"
        />
        <div className={styles.profileHeadline}>
          <p>
            Blending design and code with functional clarity and creative
            precision. Delivering thoughtful digital systems with structure,
            flow, and expressive interaction.
          </p>
          <img
            src={palmerAsset("tFXdT1GAWfzky0TCheIFtJR4O3I.png")}
            alt=""
            loading="lazy"
          />
          <PalmerDeferredVideo
            className={styles.profileVideo}
            src={palmerAsset("fEkvm0HYUUFHc0WiH6ssCVGITR0.mp4")}
          />
        </div>
        <div className={styles.profileBottom}>
          <div className={styles.profileStack}>
            <img
              src={palmerAsset("5emb8oOwafbQsfWVIaaZ12WcTM.png")}
              alt="Akihiko editorial profile"
              loading="lazy"
            />
            <img
              src={palmerAsset("yUjsrtPDoJaAyLT8KHf8xhtWa8A.png")}
              alt=""
              loading="lazy"
            />
          </div>
          <div>
            <p>
              We bridge creative direction with real-world execution,
              combining design and development into one seamless workflow to
              deliver digital experiences that are thoughtful, fast, and
              built to perform.
            </p>
            <ArrowLink href="/work">See works</ArrowLink>
          </div>
        </div>
      </section>

      <section className={styles.experience}>
        <SectionMeta
          index="05"
          title="Experience"
          japanese="エクスペリエンス"
          role="Digital Craft"
        />
        <div
          className={styles.experienceTitle}
          aria-label="Craft. Tenure. Priceless. Practice."
        >
          <div className={styles.experienceTitleTrack} aria-hidden="true">
            <span>Craft.</span>
            <span>Tenure.</span>
            <span>Priceless</span>
            <span>Practice.</span>
          </div>
          <img
            className={styles.experiencePortrait}
            src={palmerAsset("Lb6dFhKJo6UvYVXUafcZv0n5E.jpg")}
            alt=""
            loading="lazy"
          />
          <img
            className={styles.experienceMark}
            src={palmerAsset("4oaOsuXcxdhxXiQToWWNNSmbM.png")}
            alt=""
            loading="lazy"
          />
        </div>
        <div className={styles.experienceLabels}>
          <span>Tenure</span>
          <span>Global</span>
          <span>Creative Collabs</span>
          <span>Studio</span>
          <span>Creative Partnerships</span>
        </div>
        <div className={styles.experienceRows}>
          {experience.map(([company, years, role, location]) => (
            <div key={company}>
              <h3>{company}</h3>
              <p>{years}</p>
              <p>{role}</p>
              <p>{location}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.testimonials}>
        <SectionMeta
          index="06"
          title="Testimonials"
          japanese="レビュー"
          role="Real Feedback"
        />
        <Marquee>Testimonial© - Reviews</Marquee>
        <div className={styles.testimonialAction}>
          <ArrowLink href="/contact">Get in touch</ArrowLink>
        </div>
        <div className={styles.testimonialGrid}>
          {testimonials.map((testimonial, index) => (
            <article className={styles.testimonialCard} key={testimonial.name}>
              <span className={styles.quoteMark}>“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <footer>
                <img
                  src={palmerAsset(testimonial.image)}
                  alt={testimonial.name}
                  loading="lazy"
                />
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
                <b>{testimonial.mark}</b>
                <span>0{index + 1}</span>
              </footer>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.awards}>
        <SectionMeta
          index="07"
          title="Awards"
          japanese="アワード"
          role="Selected Honors"
        />
        <div className={styles.headingRow}>
          <h2>Awards</h2>
          <span>(3)</span>
        </div>
        <div className={styles.whiteRail}>
          <span>Awwwards</span>
          <span>CSSD</span>
          <span>Framer</span>
          <span>Dribbble</span>
        </div>
        <div className={styles.awardRows}>
          {awards.map((award) => (
            <article key={award.name}>
              <strong>{award.count}</strong>
              <h3>{award.name}</h3>
              <p>{award.description}</p>
              <div>
                {award.images.map((image) => (
                  <img
                    alt=""
                    key={image}
                    loading="lazy"
                    src={palmerAsset(image)}
                  />
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.clients} data-palmer-client-section>
        <SectionMeta
          index="08"
          title="Brand Partners"
          japanese="パートナー"
          role="Creative Teams"
        />
        <div className={styles.clientHeading}>
          <h2>Clients</h2>
          <span>(3)</span>
        </div>
        <div className={styles.clientStage} data-palmer-client-scene>
          <p className={styles.clientGhost}>Client</p>
          {clientCards.map((card, index) => (
            <div
              className={`${styles.clientCard} ${card.className}`}
              data-palmer-client-card={index}
              key={card.label}
            >
              {card.video ? (
                <PalmerDeferredVideo src={palmerAsset(card.asset)} />
              ) : (
                <img
                  alt=""
                  loading="lazy"
                  src={palmerAsset(card.asset)}
                />
              )}
              <span>{card.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.pricing}>
        <SectionMeta
          index="09"
          title="Project Pricing"
          japanese="プラン"
          role="Custom Quotes"
        />
        <div className={styles.headingRow}>
          <h2>
            <span className={styles.pricingDesktopTitle}>Pick Plans.</span>
            <span className={styles.pricingTabletTitle}>Priceless.</span>
            <span className={styles.pricingMobileTitle}>Starter.</span>
          </h2>
        </div>
        <div className={styles.whiteRail}>
          <span>Custom Options</span>
          <span>Transparent</span>
          <span>Design Packages</span>
          <span>Pricing Tiers</span>
        </div>
        <div className={styles.planGrid}>
          {plans.map((plan, index) => (
            <article key={plan.name}>
              <div className={styles.planTop}>
                <span>0{index + 1}</span>
                <span>/Month</span>
              </div>
              <strong>{plan.price}</strong>
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <ul>
                {plan.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <ArrowLink href="/contact" light>
                Start a project
              </ArrowLink>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.blog}>
        <SectionMeta
          index="10"
          title="Visual Journal"
          japanese="ジャーナル"
          role="Creative Notes"
        />
        <Marquee>Featured Article©</Marquee>
        <div className={styles.articleList}>
          {articles.map((article, index) => (
            <article className={styles.articleCard} key={article.slug}>
              <Link
                className={styles.articleMainImage}
                href={`/article/${article.slug}`}
              >
                <img
                  src={palmerAsset(articlePreviews[index].main)}
                  alt=""
                  loading="lazy"
                />
              </Link>
              <div className={styles.articleContent}>
                <div className={styles.articleInset}>
                  <img
                    src={palmerAsset(articlePreviews[index].inset)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <span>0{index + 1}</span>
                <h3>{article.title}</h3>
                <strong className={styles.articleDate}>
                  {formatArticleDate(article.date)}
                </strong>
                <p>{article.excerpt}</p>
                <div className={styles.articleMeta}>
                  <span>{article.category}</span>
                  <span>{article.readTime}</span>
                  <span>{article.location}</span>
                  <span>{article.date}</span>
                </div>
                <ArrowLink href={`/article/${article.slug}`}>
                  View
                </ArrowLink>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
