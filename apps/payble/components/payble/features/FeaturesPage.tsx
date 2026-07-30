import Image from "next/image";
import Link from "next/link";
import { PageHero, DownloadApp, Newsletter } from "../PaybleShared";
import { AlertTabs, Testimonials } from "../PaybleInteractive";

const featureSections = [
  {
    id: "expense-tracking",
    title: "Expense Tracking",
    description:
      "Automatically track, categorize, and analyze all your expenses in real-time, across all connected accounts.",
    points: [
      "Real-Time Updates",
      "Automatic Categorization",
      "Unified Account View",
      "Detailed Spending Insights",
    ],
    href: "/blog/stay-in-control-how-ai-insights-can-prevent-overspending",
    visual: "expense",
  },
  {
    id: "multi-account-sync",
    title: "Multi-Account Sync",
    description:
      "Effortlessly link all your bank accounts, credit cards, and payment platforms in one dashboard for a unified view of your finances.",
    points: [
      "All Accounts in One Place",
      "Financial Management",
      "Real-Time Synchronization",
      "Financial Overview",
    ],
    href: "/blog/why-multi-account-sync-is-the-key-to-streamlining-your-finances",
    visual: "accounts",
  },
  {
    id: "custom-budgets",
    title: "Custom Budgets",
    description:
      "Create personalized budgets for specific categories like groceries, entertainment, and transportation, and monitor your spending against these limits.",
    points: [
      "Personalized Spending Limits",
      "Real-Time Budget Tracking",
      "Flexible Adjustments",
      "Visual Spending Alerts",
    ],
    href: "/blog/how-ai-can-help-you-create-custom-budgets-tailored-to-your-needs",
    visual: "budgets",
  },
] as const;

function Tick() {
  return (
    <span className="pbf-check" aria-hidden="true">
      <svg viewBox="0 0 16 16">
        <path d="m3.2 8.1 3.1 3.1 6.5-6.5" />
      </svg>
    </span>
  );
}

function ExpenseVisual() {
  return (
    <div className="pbf-expense-visual">
      <div className="pbf-visual-caption">
        <span>Overview</span>
        <span>This Month</span>
      </div>
      <Image
        src="/payble/features/recent-expenses.svg"
        alt="Payble expense tracking interface with recent transactions"
        width={620}
        height={514}
        sizes="(max-width: 810px) calc(100vw - 64px), 560px"
      />
    </div>
  );
}

function AccountVisual() {
  return (
    <div className="pbf-account-visual" aria-label="Connected financial accounts">
      <span className="pbf-orbit pbf-orbit--one" aria-hidden="true" />
      <span className="pbf-orbit pbf-orbit--two" aria-hidden="true" />
      <div className="pbf-account-card pbf-account-card--bank">
        <Image
          src="/payble/features/bank-accounts.svg"
          alt="Connected bank accounts"
          width={300}
          height={228}
        />
      </div>
      <div className="pbf-account-card pbf-account-card--credit">
        <Image
          src="/payble/features/credit-cards.svg"
          alt="Connected credit cards"
          width={300}
          height={228}
        />
      </div>
      <div className="pbf-account-card pbf-account-card--payments">
        <Image
          src="/payble/features/payment-platforms.svg"
          alt="Connected payment platforms"
          width={300}
          height={228}
        />
      </div>
      <div className="pbf-sync-dot" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

function BudgetVisual() {
  return (
    <div className="pbf-budget-visual">
      <div className="pbf-budget-visual__recommendation">
        <Image
          src="/payble/features/ai-budget.svg"
          alt="AI budget recommendation"
          width={428}
          height={127}
        />
      </div>
      <div className="pbf-budget-visual__breakdown">
        <Image
          src="/payble/features/budget-breakdown.svg"
          alt="Budget breakdown by category"
          width={700}
          height={352}
          sizes="(max-width: 810px) calc(100vw - 64px), 560px"
        />
      </div>
    </div>
  );
}

function FeatureVisual({ type }: { type: (typeof featureSections)[number]["visual"] }) {
  if (type === "expense") {
    return <ExpenseVisual />;
  }
  if (type === "accounts") {
    return <AccountVisual />;
  }
  return <BudgetVisual />;
}

function FinancialFeature({
  feature,
  index,
}: {
  feature: (typeof featureSections)[number];
  index: number;
}) {
  return (
    <section
      className={`pbf-financial pbf-financial--${feature.visual}`}
      id={feature.id}
      aria-labelledby={`${feature.id}-title`}
    >
      <div className="payble-container pbf-financial__inner">
        <div className="pbf-financial__copy">
          <span className="payble-kicker">Financial Management</span>
          <h2 id={`${feature.id}-title`}>{feature.title}</h2>
          <p>{feature.description}</p>
          <ul>
            {feature.points.map((point) => (
              <li key={point}>
                <Tick />
                {point}
              </li>
            ))}
          </ul>
          <Link className="payble-text-link" href={feature.href}>
            Read More About This <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="pbf-financial__art">
          <FeatureVisual type={feature.visual} />
        </div>
      </div>
      <span className="payble-sr-only">Section {index + 1} of 3</span>
    </section>
  );
}

function SavingsGoalsCard() {
  return (
    <article className="pbf-saving-card pbf-saving-card--goal">
      <div className="pbf-saving-card__copy">
        <span className="pbf-saving-icon" aria-hidden="true">⌁</span>
        <h3>Savings Goals</h3>
        <p>Set, track, and achieve your financial goals with ease.</p>
      </div>
      <div className="pbf-goal-widget">
        <span className="pbf-goal-widget__label">New MacBook</span>
        <div className="pbf-goal-widget__ring">
          <strong>74%</strong>
        </div>
        <div className="pbf-goal-widget__totals">
          <span>$1,479 saved</span>
          <span>$2,000 goal</span>
        </div>
      </div>
    </article>
  );
}

function RecommendationCard() {
  return (
    <article className="pbf-saving-card pbf-saving-card--recommendation">
      <div className="pbf-saving-card__copy">
        <span className="pbf-saving-icon" aria-hidden="true">✦</span>
        <h3>AI Savings Recommendations</h3>
        <p>Get personalized insights to boost your savings.</p>
      </div>
      <div className="pbf-recommendation-asset">
        <Image
          src="/payble/features/savings-recommendation.svg"
          alt="Personalized AI savings recommendation"
          width={400}
          height={127}
        />
      </div>
    </article>
  );
}

function RoundUpCard() {
  const amounts = ["-$1.25", "-$0.75", "+$25.50", "-$0.50"];
  return (
    <article className="pbf-saving-card pbf-saving-card--roundup">
      <div className="pbf-saving-card__copy">
        <span className="pbf-saving-icon" aria-hidden="true">↗</span>
        <h3>Round-Up Savings</h3>
        <p>Save small amounts automatically with every purchase.</p>
      </div>
      <div className="pbf-roundup-list" aria-label="Recent round-up transactions">
        {amounts.map((amount, index) => (
          <div key={`${amount}-${index}`}>
            <span className={`pbf-merchant pbf-merchant--${index + 1}`} aria-hidden="true">
              {["N", "A", "S", "U"][index]}
            </span>
            <span>
              <strong>{["Netflix", "Amazon", "Starbucks", "Uber"][index]}</strong>
              <small>Round-up transfer</small>
            </span>
            <b className={amount.startsWith("+") ? "is-positive" : ""}>{amount}</b>
          </div>
        ))}
      </div>
    </article>
  );
}

function AutomatedCard() {
  return (
    <article className="pbf-saving-card pbf-saving-card--automated">
      <div className="pbf-saving-card__copy">
        <span className="pbf-saving-icon" aria-hidden="true">⟳</span>
        <h3>Automated Savings Transfers</h3>
        <p>Automate your savings for stress-free financial growth.</p>
      </div>
      <div className="pbf-transfer-widget">
        <span>
          <small>Next automatic transfer</small>
          <strong>$250.00</strong>
        </span>
        <span className="pbf-transfer-widget__date">
          <small>Scheduled</small>
          <strong>Oct 25</strong>
        </span>
        <div className="pbf-transfer-route" aria-hidden="true">
          <span>$</span>
          <i />
          <span>✓</span>
        </div>
      </div>
    </article>
  );
}

function ProgressCard() {
  return (
    <article className="pbf-saving-card pbf-saving-card--progress">
      <div className="pbf-saving-card__copy">
        <span className="pbf-saving-icon" aria-hidden="true">◷</span>
        <h3>Goal Progress Tracking</h3>
        <p>Watch your savings grow with real-time progress updates.</p>
      </div>
      <div className="pbf-progress-chart">
        <Image
          src="/payble/features/savings-chart.svg"
          alt="Savings goal progress chart"
          width={551}
          height={354}
          sizes="(max-width: 810px) calc(100vw - 72px), 530px"
        />
      </div>
    </article>
  );
}

function SavingsJourney() {
  return (
    <section
      className="pbf-savings"
      aria-labelledby="pbf-savings-title"
    >
      <div className="payble-container">
        <div className="payble-section-heading pbf-savings__heading">
          <span className="payble-kicker">Smart Savings</span>
          <h2 id="pbf-savings-title">Optimize Your Savings Journey</h2>
          <p>
            Whether it&apos;s a vacation or an emergency fund, we&apos;ll help
            you get there faster.
          </p>
        </div>
        <div className="pbf-savings-grid">
          <SavingsGoalsCard />
          <RecommendationCard />
          <RoundUpCard />
          <AutomatedCard />
          <ProgressCard />
        </div>
      </div>
    </section>
  );
}

const integrations = [
  { name: "Stripe", mark: "S", tone: "blue" },
  { name: "PayPal", mark: "P", tone: "deep-blue" },
  { name: "Wise", mark: "W", tone: "green" },
  { name: "Revolut", mark: "R", tone: "black" },
  { name: "Monzo", mark: "M", tone: "coral" },
  { name: "Cash App", mark: "$", tone: "lime" },
  { name: "Venmo", mark: "V", tone: "sky" },
  { name: "Apple Pay", mark: "●", tone: "black" },
] as const;

function IntegrationStrip() {
  const rows = [...integrations, ...integrations];
  return (
    <section className="pbf-integrations" aria-labelledby="pbf-integrations-title">
      <div className="payble-container">
        <div className="payble-section-heading pbf-integrations__heading">
          <span className="payble-kicker">Seamless Connections</span>
          <h2 id="pbf-integrations-title">Integrate with Your Favorite Tools</h2>
          <p>
            Connect all your financial accounts and apps effortlessly to manage
            your money in one place.
          </p>
        </div>
      </div>
      <div className="pbf-marquee" aria-label="Supported financial platforms">
        <div className="pbf-marquee__track">
          {rows.map((integration, index) => (
            <span className="pbf-integration-pill" key={`${integration.name}-${index}`}>
              <i className={`tone-${integration.tone}`} aria-hidden="true">
                {integration.mark}
              </i>
              {integration.name}
            </span>
          ))}
        </div>
      </div>
      <div className="pbf-integrations__link">
        <Link className="payble-text-link" href="/contact">
          Read Documentation <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}

export default function FeaturesPage() {
  return (
    <main className="payble-features-page">
      <PageHero
        kicker="Features"
        title="Smarter Money Management"
        description="Unlock the full potential of your finances with Payble’s advanced tools, including personalized budgets, AI-driven insights, and automatic savings transfers."
      />
      {featureSections.map((feature, index) => (
        <FinancialFeature key={feature.id} feature={feature} index={index} />
      ))}
      <SavingsJourney />
      <AlertTabs />
      <IntegrationStrip />
      <Testimonials />
      <DownloadApp />
      <Newsletter />
    </main>
  );
}
