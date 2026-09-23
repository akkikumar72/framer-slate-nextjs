import { Footer, Sidebar } from "@/components/shell";
export default function RocoLayout({ children }: { children: React.ReactNode }) { return <><a className="roco-skip" href="#main-content">Skip to content</a><Sidebar/><div className="roco-content"><main id="main-content">{children}</main><Footer/></div></>; }
