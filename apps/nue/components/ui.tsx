import type { AnchorHTMLAttributes, ReactNode } from "react";
export { Reveal } from "./reveal";

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`nue-section ${className}`}>
      {children}
    </section>
  );
}
export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="nue-section-heading">{children}</h2>;
}
export function ButtonLink({
  children,
  variant = "dark",
  className = "",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <a className={`nue-button nue-button-${variant} ${className}`} {...props}>
      <span className="nue-button-label">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
    </a>
  );
}
export function MediaFrame({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`nue-media-frame ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
