"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const nav = [
  ["hero", "Home", "nav-home.svg"],
  ["project", "Projects", "nav-projects.svg"],
  ["about", "About", "nav-about.svg"],
  ["contact", "Contact", "nav-contact.svg"],
];
export function Dock() {
  const path = usePathname();
  const [active, setActive] = useState("");
  useEffect(() => {
    if (path != "/nue") {
      setActive("project");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-10% 0px -50% 0px" },
    );
    nav.forEach(([id]) => {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [path]);
  return (
    <nav className="nue-dock" aria-label="Main navigation">
      {nav.map(([id, label, icon]) => (
        <a
          key={id}
          href={`/nue#${id}`}
          aria-current={active === id ? "location" : undefined}
        >
          <img src={`/nue/assets/${icon}`} alt="" />
          <span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
