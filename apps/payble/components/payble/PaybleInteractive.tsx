"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";

export const faqItems = [
  {
    question: "How do I link my bank accounts to Payble?",
    answer:
      "Open the Accounts area, choose Add Account, and follow the secure connection steps for your bank. Payble then keeps balances and transactions synced automatically.",
  },
  {
    question: "Is Payble secure to use with my financial information?",
    answer:
      "Yes. Payble uses encrypted connections and read-only account access. Your banking credentials are never stored by Payble.",
  },
  {
    question: "Can I set multiple savings goals?",
    answer:
      "Yes. Create as many goals as you need, choose a target and date for each one, and track every goal separately.",
  },
  {
    question: "How do real-time budget alerts work?",
    answer:
      "Payble watches your spending against the limits you set and sends a clear notification when you are close to or over a budget.",
  },
  {
    question: "Can I use Payble with multiple accounts and credit cards?",
    answer:
      "Yes. Connect checking, savings, and credit card accounts to see one complete view of your finances.",
  },
  {
    question: "What insights does Payble provide about my spending?",
    answer:
      "You get category trends, recurring-payment detection, upcoming bills, budget forecasts, and personalized recommendations.",
  },
  {
    question: "Is there a free version of Payble?",
    answer:
      "Yes. The free plan includes the essentials, and paid plans unlock automation, deeper insights, and expanded account connections.",
  },
  {
    question: "How do automated savings work?",
    answer:
      "Choose a rule or goal, and Payble schedules small transfers based on your preferences while keeping upcoming expenses in view.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="payble-section payble-faq" aria-labelledby="payble-faq-title">
      <div className="payble-container payble-faq__grid">
        <div className="payble-faq__intro">
          <span className="payble-kicker">FAQ</span>
          <h2 id="payble-faq-title">Common Questions &amp; Answers</h2>
          <p>
            Everything you need to know about getting started and making the
            most of Payble.
          </p>
          <a className="payble-text-link" href="mailto:hello@payble.com">
            Still have questions? <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="payble-faq__items">
          {faqItems.map((item, index) => (
            <div className="payble-faq__item" key={item.question}>
              <button
                type="button"
                aria-expanded={open === index}
                onClick={() => setOpen(open === index ? -1 : index)}
              >
                <span>{item.question}</span>
                <span aria-hidden="true">{open === index ? "−" : "+"}</span>
              </button>
              <div className={open === index ? "is-open" : ""}>
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Freelance Designer",
    image: "/payble/testimonials/sarah.avif",
    quote:
      "Payble has completely changed the way I manage an irregular income. I can see what is safe to spend and still stay ahead of every bill.",
  },
  {
    name: "Emily Carter",
    role: "Product Manager",
    image: "/payble/testimonials/emily.avif",
    quote:
      "The automated budgets are clear, calm, and genuinely useful. For the first time, I know exactly where my money is going.",
  },
  {
    name: "John Wilson",
    role: "Small Business Owner",
    image: "/payble/testimonials/john.avif",
    quote:
      "Having all of my accounts in one place saves me hours. The forecasts help me make decisions before a cash-flow problem appears.",
  },
  {
    name: "David Kim",
    role: "Software Engineer",
    image: "/payble/testimonials/david.avif",
    quote:
      "Payble turns saving into something automatic. The small recommendations add up without making my day-to-day spending feel restricted.",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((value) => (value + 1) % testimonials.length),
      6500,
    );
    return () => window.clearInterval(timer);
  }, []);

  const testimonial = testimonials[active];

  return (
    <section
      className="payble-section payble-testimonials"
      aria-labelledby="payble-testimonials-title"
    >
      <div className="payble-container">
        <div className="payble-section-heading">
          <span className="payble-kicker">Testimonials</span>
          <h2 id="payble-testimonials-title">How Payble is Changing Lives</h2>
          <p>Real people. Clearer money decisions. Less financial stress.</p>
        </div>
        <div className="payble-testimonial-card" aria-live="polite">
          <div className="payble-testimonial-card__visual">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="(max-width: 810px) 100vw, 470px"
            />
          </div>
          <div className="payble-testimonial-card__quote">
            <span aria-hidden="true" className="payble-quote-mark">
              “
            </span>
            <blockquote>{testimonial.quote}</blockquote>
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
            <div className="payble-carousel-controls">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setActive(
                    (value) =>
                      (value - 1 + testimonials.length) % testimonials.length,
                  )
                }
              >
                ←
              </button>
              <span>
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(testimonials.length).padStart(2, "0")}
              </span>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() =>
                  setActive((value) => (value + 1) % testimonials.length)
                }
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const alerts = [
  {
    title: "Budget Limit Alerts",
    description:
      "Know the moment a category is approaching its limit and adjust before you overspend.",
    value: "Dining budget",
    status: "82% used",
    tone: "orange",
  },
  {
    title: "Upcoming Bill Reminders",
    description:
      "See what is due next and receive a friendly reminder before the payment date.",
    value: "Internet bill",
    status: "Due in 3 days",
    tone: "blue",
  },
  {
    title: "Unusual Spending Alerts",
    description:
      "Get a clear signal when a purchase is outside your normal spending pattern.",
    value: "Large transaction",
    status: "$620 detected",
    tone: "pink",
  },
];

export function AlertTabs() {
  const [active, setActive] = useState(0);
  const item = alerts[active];

  return (
    <section className="payble-section payble-alerts">
      <div className="payble-container payble-alerts__grid">
        <div>
          <span className="payble-kicker">Smart notifications</span>
          <h2>Real-Time Budget Alerts</h2>
          <p>
            Stay on top of every important money moment without constantly
            checking your accounts.
          </p>
          <div className="payble-alert-tabs" role="tablist">
            {alerts.map((alert, index) => (
              <button
                key={alert.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
              >
                <span>{alert.title}</span>
                <small>{alert.description}</small>
              </button>
            ))}
          </div>
        </div>
        <div className={`payble-alert-preview tone-${item.tone}`}>
          <div className="payble-phone-bar">
            <span>9:41</span>
            <span>● ● ●</span>
          </div>
          <div className="payble-alert-notification">
            <span className="payble-alert-notification__icon">$</span>
            <div>
              <small>Payble · now</small>
              <strong>{item.value}</strong>
              <p>{item.status}. Tap to review your plan.</p>
            </div>
          </div>
          <div className="payble-alert-orbit" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

export function PricingPlans({ compact = false }: { compact?: boolean }) {
  const [yearly, setYearly] = useState(false);
  const plans = [
    {
      name: "Basic",
      description: "Ideal for beginners getting started with budgeting.",
      price: 0,
      features: [
        "Expense Tracking",
        "Single Account Sync",
        "Basic Budgets",
        "1 Savings Goal",
        "Payment Reminders",
        "Email Support",
      ],
    },
    {
      name: "Plus",
      description: "For users who want deeper insights into their finances.",
      price: 10,
      popular: true,
      features: [
        "Unlimited accounts",
        "Advanced Budgets",
        "5 Savings Goals",
        "AI Insights",
        "Real-Time Alerts",
        "Monthly Reports",
        "Priority Support",
      ],
    },
    {
      name: "Premium",
      description: "Ideal for advanced users or business owners.",
      price: 20,
      features: [
        "All Plus Features",
        "Unlimited Savings Goals",
        "Financial Forecasting",
        "Custom Reports",
        "Expense Breakdown",
        "Real-Time Insights",
        "24/7 Support",
        "Data Export",
      ],
    },
  ];

  return (
    <section
      className={`payble-section payble-pricing${compact ? " is-compact" : ""}`}
      aria-labelledby="payble-pricing-title"
    >
      <div className="payble-container">
        {!compact && (
          <div className="payble-section-heading">
            <span className="payble-kicker">Pricing Plans</span>
            <h2 id="payble-pricing-title">
              Flexible Pricing for Every Lifestyle
            </h2>
            <p>
              Payble’s plans offer you everything you need to manage your
              finances effortlessly, with options tailored to your unique
              needs.
            </p>
          </div>
        )}
        <div className="payble-price-toggle" aria-label="Billing interval">
          <button
            type="button"
            className={!yearly ? "is-active" : ""}
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={yearly ? "is-active" : ""}
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly <span>Save 20%</span>
          </button>
        </div>
        <div className="payble-price-grid">
          {plans.map((plan) => {
            const price =
              plan.price === 0
                ? "$0"
                : `$${Math.round(plan.price * (yearly ? 0.8 : 1))}`;
            return (
              <article
                key={plan.name}
                className={plan.popular ? "is-popular" : ""}
              >
                {plan.popular && <span className="payble-popular">Popular</span>}
                <h3>{plan.name}</h3>
                <p>{plan.description}</p>
                <div className="payble-price">
                  <strong>{price}</strong>
                  <span>/month</span>
                </div>
                <small>{yearly ? "- paid yearly" : "- paid monthly"}</small>
                <a className="payble-button" href="/contact">
                  Get Started
                </a>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span aria-hidden="true">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function NewsletterForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    setMessage(
      email.includes("@")
        ? "You’re on the list. Watch your inbox."
        : "Enter a valid email address.",
    );
  }

  return (
    <form className="payble-newsletter__form" onSubmit={submit} noValidate>
      <label className="payble-sr-only" htmlFor="payble-newsletter-email">
        Email address
      </label>
      <input
        id="payble-newsletter-email"
        name="email"
        type="email"
        placeholder="your@email.com"
        autoComplete="email"
        required
      />
      <button className="payble-button" type="submit">
        Subscribe <span aria-hidden="true">↗</span>
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

export function ContactForm() {
  const [message, setMessage] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.reset();
    setMessage("Thanks. Your message is ready for the Payble team.");
  }

  return (
    <form className="payble-contact-form" onSubmit={submit}>
      <div className="payble-contact-form__row">
        <label>
          Full Name
          <input
            name="fullName"
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </label>
        <label>
          Phone Number
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />
        </label>
      </div>
      <label>
        Email
        <input
          name="email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          required
        />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell us a little about your question..."
          rows={5}
          required
        />
      </label>
      <label className="payble-contact-form__consent">
        <input type="checkbox" required />
        <span>
          I agree to the{" "}
          <a href="/useful/privacy-policy">Privacy Policy</a> and{" "}
          <a href="/useful/cookie-policy">Cookie Policy</a>.
        </span>
      </label>
      <button className="payble-button" type="submit">
        Send Message <span aria-hidden="true">↗</span>
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
