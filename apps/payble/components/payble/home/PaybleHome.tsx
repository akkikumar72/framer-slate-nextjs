import Image from "next/image";
import Link from "next/link";
import {
  AlertTabs,
  FAQ,
  PricingPlans,
  Testimonials,
} from "@/components/payble/PaybleInteractive";
import {
  BlogTeasers,
  DownloadApp,
  Newsletter,
  SectionHeading,
} from "@/components/payble/PaybleShared";
import "@/components/payble/home.css";

const stats = [
  {
    value: "80%",
    text: "Our AI-powered budgeting tools help users save an average of 20% more by identifying areas for spending reduction.",
  },
  {
    value: "$1.6M +",
    text: "Payble users have collectively saved over half a million dollars toward their financial goals, from vacations to emergency funds.",
  },
  {
    value: "95%",
    text: "With real-time tracking and personalized financial insights, all our users experience greater peace of mind with their finances.",
  },
  {
    value: "2.8M +",
    text: "Payble has helped users monitor over a million transactions, giving them full visibility and control over their spending habits.",
  },
];

const roadblocks = [
  {
    title: "Problems",
    tone: "pink",
    items: [
      "Struggling to track all your expenses in one place?",
      "Overspending without realizing it?",
      "Difficult to save for long-term goals?",
    ],
  },
  {
    title: "Handle",
    tone: "orange",
    items: [
      "Managing multiple accounts can feel overwhelming.",
      "Without real-time updates, it’s easy to lose track of spending.",
      "Saving for long-term goals requires consistency and planning.",
    ],
  },
  {
    title: "Solutions",
    tone: "green",
    items: [
      "Payble integrates all your accounts in one dashboard.",
      "Receive real-time alerts when you’re approaching your budget limits.",
      "Set custom savings goals and let AI automate the path to reaching them.",
    ],
  },
];

const managementFeatures = [
  {
    title: "Expense Tracking",
    description:
      "Automatically track, categorize, and analyze all your expenses in real-time, across all connected accounts.",
    points: [
      "Real-Time Updates",
      "Automatic Categorization",
      "Unified Account View",
      "Detailed Spending Insights",
    ],
    asset: "/payble/features/recent-expenses.svg",
    tone: "blue",
  },
  {
    title: "Multi-Account Sync",
    description:
      "Effortlessly link all your bank accounts, credit cards, and payment platforms in one dashboard for a unified view of your finances.",
    points: [
      "All Accounts in One Place",
      "Financial Management",
      "Real-Time Synchronization",
      "Financial Overview",
    ],
    asset: "/payble/features/bank-accounts.svg",
    tone: "pink",
  },
  {
    title: "Custom Budgets",
    description:
      "Create personalized budgets for specific categories like groceries, entertainment, and transportation, and monitor your spending against these limits.",
    points: [
      "Personalized Spending Limits",
      "Real-Time Budget Tracking",
      "Flexible Adjustments",
      "Visual Spending Alerts",
    ],
    asset: "/payble/features/ai-budget.svg",
    tone: "orange",
  },
];

const savingsFeatures = [
  {
    title: "Savings Goals",
    text: "Set, track, and achieve your financial goals with ease.",
    symbol: "◎",
  },
  {
    title: "AI Savings Recommendations",
    text: "Get personalized insights to boost your savings.",
    symbol: "✦",
    asset: "/payble/features/savings-recommendation.svg",
  },
  {
    title: "Round-Up Savings",
    text: "Save small amounts automatically with every purchase.",
    symbol: "↗",
  },
  {
    title: "Automated Savings Transfers",
    text: "Automate your savings for stress-free financial growth.",
    symbol: "⇄",
  },
  {
    title: "Goal Progress Tracking",
    text: "Watch your savings grow with real-time progress updates.",
    symbol: "◔",
    asset: "/payble/features/savings-chart.svg",
  },
];

const integrations = [
  "Chase",
  "Stripe",
  "PayPal",
  "Monzo",
  "Wise",
  "Revolut",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
];

export default function PaybleHome() {
  return (
    <main className="payble-home">
      <section className="payble-home-hero">
        <div className="payble-home-hero__dots" aria-hidden="true" />
        <div className="payble-container payble-home-hero__copy">
          <span className="payble-kicker">Smart AI for Your Finances</span>
          <h1>Your AI-Powered Financial Assistant</h1>
          <p>
            From detailed budgeting to custom savings goals, Payble seamlessly
            automates every step of your financial journey, helping you achieve
            lasting financial freedom with ease.
          </p>
          <div className="payble-home-hero__actions">
            <Link className="payble-button" href="/pricing">
              Start Saving Now
            </Link>
            <a className="payble-home-hero__presentation" href="#payble-results">
              <span aria-hidden="true">▶</span> Presentation
            </a>
          </div>
        </div>
        <div className="payble-home-hero__dashboard">
          <Image
            src="/payble/ui/dashboard-hero.avif"
            alt="Payble financial dashboard with balances, budgets, goals, and spending insights"
            fill
            priority
            sizes="(max-width: 810px) 900px, 1450px"
          />
        </div>
      </section>

      <section className="payble-trusted" aria-label="Trusted companies">
        <div className="payble-container">
          <span>Trusted by people at</span>
          <div>
            <strong>BRIGHT</strong>
            <strong>Northstar</strong>
            <strong>Wavespace</strong>
            <strong>Portland</strong>
            <strong>Novus</strong>
          </div>
        </div>
      </section>

      <section className="payble-section payble-stats" id="payble-results">
        <div className="payble-container">
          <SectionHeading
            kicker="Impressive Stats"
            title="Our Results in Numbers"
            description="Discover the real impact Payble has made on budgeting, saving, and financial health across our growing community."
          />
          <div className="payble-stats__grid">
            {stats.map((stat) => (
              <article key={stat.value}>
                <h3>{stat.value}</h3>
                <p>{stat.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="payble-section payble-roadblocks">
        <div className="payble-container">
          <SectionHeading
            kicker="Financial Roadblocks"
            title="Struggle Financial Situations?"
            description="We get it. Payble simplifies the process of tracking, budgeting, and saving, so you can stress less."
          />
          <div className="payble-roadblocks__grid">
            {roadblocks.map((column) => (
              <article className={`tone-${column.tone}`} key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {managementFeatures.map((feature, index) => (
        <section
          className={`payble-management tone-${feature.tone}`}
          key={feature.title}
        >
          <div
            className={`payble-container payble-management__grid${
              index % 2 ? " is-reversed" : ""
            }`}
          >
            <div className="payble-management__copy">
              <span className="payble-kicker">Financial Management</span>
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
              <ul>
                {feature.points.map((point) => (
                  <li key={point}>
                    <span aria-hidden="true">✓</span>
                    {point}
                  </li>
                ))}
              </ul>
              <Link className="payble-text-link" href="/features">
                Read More About This <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <div className="payble-management__visual">
              <div aria-hidden="true" />
              <Image
                src={feature.asset}
                alt={`${feature.title} interface`}
                width={560}
                height={420}
              />
            </div>
          </div>
        </section>
      ))}

      <section className="payble-section payble-savings">
        <div className="payble-container">
          <SectionHeading
            kicker="Smart Savings"
            title="Optimize Your Savings Journey"
            description="Whether it’s a vacation or an emergency fund, we’ll help you get there faster."
          />
          <div className="payble-savings__grid">
            {savingsFeatures.map((feature, index) => (
              <article
                key={feature.title}
                className={index === 1 ? "is-wide" : ""}
              >
                <span className="payble-savings__icon" aria-hidden="true">
                  {feature.symbol}
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                {feature.asset && (
                  <Image
                    src={feature.asset}
                    alt=""
                    width={420}
                    height={240}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <AlertTabs />

      <section className="payble-section payble-integrations">
        <div className="payble-container">
          <div className="payble-section-heading">
            <span className="payble-kicker">Seamless Connections</span>
            <h2>Integrate with Your Favorite Tools</h2>
            <p>
              Connect all your financial accounts and apps effortlessly to
              manage your money in one place.
            </p>
            <Link className="payble-text-link" href="/features">
              Read Documentation <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="payble-integrations__viewport">
          <div className="payble-integrations__track">
            {[...integrations, ...integrations].map((name, index) => (
              <span key={`${name}-${index}`}>
                <i aria-hidden="true">{name.slice(0, 1)}</i>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <PricingPlans />
      <FAQ />
      <DownloadApp />
      <BlogTeasers />
      <Newsletter />
    </main>
  );
}
