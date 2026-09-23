import { asset } from "@/lib/assets";
import { ButtonLink, Reveal, Section } from "@/components/ui";
export default function NotFound() {
  return (
    <Section className="nue-not-found">
      <div className="nue-identity">
        <Reveal name="not-found-avatar" scale={0.6} y={0} duration={0.6}>
          <div className="nue-avatar">
            <img
              src={asset("7t0fnBIap7x0FKYUcuji3wGt54.jpg")}
              alt="404 Image"
            />
          </div>
        </Reveal>
        <Reveal name="not-found-title" delay={0.2} duration={0.4} bounce={0.2}>
          <h1>404 - Page not found</h1>
        </Reveal>
      </div>
      <Reveal name="not-found-copy" delay={0.4}>
        <p>
          The page you’re looking for doesn’t exist or has been moved. Try going
          back to the homepage or explore other sections of the site.
        </p>
      </Reveal>
      <Reveal name="not-found-home" delay={0.6} scale={0.8} y={0}>
        <ButtonLink href="/nue">Back to home</ButtonLink>
      </Reveal>
    </Section>
  );
}
