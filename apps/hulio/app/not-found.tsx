import { Button } from '@/components/shared';
export default function NotFound() { return <section className="error-page container"><p className="error-code">404</p><h1>Oops...</h1><p>The page you’re looking for doesn’t exist, may have been moved, or is no longer available.</p><Button href="/hulio" className="green-button">Back to Home</Button></section>; }
