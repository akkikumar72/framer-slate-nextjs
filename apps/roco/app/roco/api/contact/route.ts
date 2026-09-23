import { NextResponse } from "next/server";
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Please enter a valid message." }, { status: 400 }); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return NextResponse.json({ error: "Please enter a valid message." }, { status: 400 });
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!name || name.length > 200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320 || !message || message.length > 10000) return NextResponse.json({ error: "Please enter your name, a valid email, and a message." }, { status: 400 });
  const endpoint = process.env.ROCO_CONTACT_ENDPOINT;
  if (!endpoint) return NextResponse.json({ error: "Message delivery is not configured yet. Please use a contact link to get in touch." }, { status: 503 });
  try {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, message }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error("Delivery failed");
    return NextResponse.json({ message: "Thanks! Your message has been sent." });
  } catch { return NextResponse.json({ error: "Your message could not be sent. Please try again or use a contact link." }, { status: 502 }); }
}
