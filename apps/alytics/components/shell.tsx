import Link from "next/link";
import { Button, Logo } from "./shared";

const sections = ["Features", "Benefits", "Integrations", "Pricing", "FAQ"];

export { Header } from './Header';

export function Footer() {
  return <footer className="site-footer"><div className="container"><div className="footer-top">
    <div className="footer-brand"><Link href="/alytics"><Logo /></Link><p>Turn complex data into clear, actionable insights so you can make smarter decisions and drive growth with confidence</p><Button>Join Newsletter</Button></div>
    <div className="footer-columns"><div><h3>Sections</h3>{sections.map(label => <Link key={label} href={`/alytics/#${label.toLowerCase()}`}>{label}</Link>)}</div>
      <div><h3>Socials</h3><a href="https://www.instagram.com/">Instagram</a><a href="https://x.com/">Twitter/X</a><a href="https://www.linkedin.com/">Linkedin</a></div>
      <div><h3>Pages</h3><Link href="/alytics">Home</Link><Link href="/alytics/newsletter">Newsletter</Link><Link href="/alytics/blog">Blogs</Link><Link href="/alytics/404">404</Link></div>
    </div></div><div className="footer-bottom"><a href="https://x.com/axadkhaleel">Template by Asad Khaleel</a><span>© 2024 Alytics</span></div></div></footer>;
}
