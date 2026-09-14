import { asset } from "./site";

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  role: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  authorImage: string;
  body: BlogBlock[];
};

const articleBody: BlogBlock[] = [
  {
    type: "paragraph",
    text: "Every team that ships agents eventually builds a dashboard. Latency, cost, success rate  a wall of charts that looks reassuring right up until a customer reports something the charts never caught. The problem isn’t the dashboard. It’s when it tells you.",
  },
  {
    type: "paragraph",
    text: "Dashboards are a trailing indicator. By the time a regression shows up as a dip in your success-rate chart, it has already reached production and, worse, real users. The fix is to move quality checks to the same place we catch every other regression: continuous integration.",
  },
  { type: "heading", text: "The case for evals-as-tests" },
  {
    type: "paragraph",
    text: "An eval is just a test with a fuzzier assertion. Instead of expect(x).toBe(2), you assert that an agent’s output satisfies a rubric: did it resolve the ticket, stay in policy, and avoid hallucinating an order number? Run that assertion on every pull request and quality stops being a vibe.",
  },
  {
    type: "quote",
    text: "If a regression can reach production, it will. The only reliable place to stop it is before the merge button.",
  },
  { type: "heading", text: "Building evals from real traces" },
  {
    type: "paragraph",
    text: "The best eval cases come from production. When an agent run goes wrong, that trace is a perfect regression test capture the inputs, pin the expected behavior, and add it to the suite. Over time your eval set becomes a museum of every bug you’ve ever fixed.",
  },
  {
    type: "image",
    src: asset("JB0rOM8FFjp6x8UqtTxDM1brO8"),
    alt: "Details Image",
  },
  { type: "heading", text: "Wiring it into the pipeline" },
  {
    type: "paragraph",
    text: "Make the eval suite a required check. On every pull request, the runtime spins up the agent, replays each case, and scores it against the rubric. If the pass rate drops below your threshold, the merge is blocked  same as a failing unit test.",
  },
  {
    type: "list",
    items: [
      "Run the full suite on every PR, not just nightly.",
      "Gate merges on a pass-rate threshold you control.",
      "Surface the diff: which cases regressed, and why.",
    ],
  },
  { type: "heading", text: "The payoff" },
  {
    type: "paragraph",
    text: "Once evals live in CI, the dashboard becomes what it should have been all along: a way to discover new failure modes, not a tripwire for old ones. Every new bug you find becomes a case, and your agent gets monotonically more reliable with each release.",
  },
  {
    type: "paragraph",
    text: "That’s the whole trick. Stop watching for regressions in production. Catch them where they’re cheap to fix — before the merge.",
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "why-ci-evaluations-matter",
    title: "Why CI Evaluations Matter",
    excerpt: "Streamline AI coordination, task delegation, and agent management in real time.",
    author: "Alex Kim",
    role: "Co-founder & CTO",
    date: "April 18",
    category: "Engineering",
    readTime: "12 min",
    image: asset("CkSV0zKUKJzdqfTJ0Rzcup1ej0"),
    authorImage: asset("GvIIYiCvs1fSYrsqT9kkYqRv4Y"),
    body: articleBody,
  },
  {
    slug: "orbital-3.0-multi-agent-runtime",
    title: "Orbital 3.0: Multi-Agent Runtime",
    excerpt: "Planning, hand-offs, and orchestration across fleets of agents now generally available.",
    author: "Maya Chen",
    role: "Product Designer",
    date: "May 28",
    category: "Product",
    readTime: "5 min",
    image: asset("ZAKEE4aU9P4ThwPRKJukOoNYAEM"),
    authorImage: asset("VRCIzuKvwJOgR1hAoNTWx6AXLQ"),
    body: articleBody,
  },
  {
    slug: "measuring-agent-reliability",
    title: "Measuring Agent Reliability",
    excerpt: "A practical framework for turning production runs into a regression-proof eval set.",
    author: "Noah Williams",
    role: "AI Engineer",
    date: "June 16",
    category: "Research",
    readTime: "11 min",
    image: asset("WqGloGDsSdGexoRNasZMblX22o"),
    authorImage: asset("FYlqe6aY3Ct6SwchBW6sbYjQ"),
    body: articleBody,
  },
  {
    slug: "build-a-support-agent-fast",
    title: "Build a Support Agent Fast",
    excerpt: "From an empty project to a deployed ticket-resolver, step by step.",
    author: "Olivia Martin",
    role: "Software Engineer",
    date: "Apr 13",
    category: "Tutorials",
    readTime: "7 min",
    image: asset("ruyx8iIGnyMS37JQFGY1oJolcU"),
    authorImage: asset("FmOM5bVyJLP4fHwhOvqYKnh9CM"),
    body: articleBody,
  },
  {
    slug: "zero-downtime-agent-deployments",
    title: "Zero-Downtime Agent Deployments",
    excerpt: "Blue/green cutovers when your agent carries durable memory between runs.",
    author: "Ethan Brooks",
    role: "Product Manager",
    date: "July 21",
    category: "Engineering",
    readTime: "8 min",
    image: asset("A4utJeJMG76mVYLtiL0mAgPrvtI"),
    authorImage: asset("kuWRz6h9wfS01zDjYOJ2nedg"),
    body: articleBody,
  },
  {
    slug: "we-raised-our-series-b",
    title: "We Raised Our Series B",
    excerpt: "$48M to expand the connector ecosystem and self-hosted deployment.",
    author: "Sophia Lee",
    role: "UX Researcher",
    date: "Apr 19",
    category: "Company",
    readTime: "4 min",
    image: asset("50vetcXViLbvw9RBQPyZpEwZOY"),
    authorImage: asset("Mffka1tVEiiKlHHSfYs80eZdjM"),
    body: articleBody,
  },
  {
    slug: "guardrails-now-enforced",
    title: "Guardrails, Now Enforced",
    excerpt: "Cost ceilings, PII redaction, and approval gates move from advisory to enforced.",
    author: "Lucas Kim",
    role: "Data Scientist",
    date: "May 09",
    category: "Product",
    readTime: "6 min",
    image: asset("7zTg5jhVqhxpE9nyoZcE4mKXbE"),
    authorImage: asset("L4b5UeEi1PWFR2z9QiTgzqhxSQ"),
    body: articleBody,
  },
  {
    slug: "what-we-learned-from-2m-runs",
    title: "What We Learned from 2M Runs",
    excerpt: "The failure modes that actually matter  and the patterns that prevent them.",
    author: "James Wilson",
    role: "Growth Lead",
    date: "April 14",
    category: "Research",
    readTime: "13 min",
    image: asset("WM2acdhVQtGcphtkTuOkWBq0Io"),
    authorImage: asset("EA9vKg4iBqKSuSWfegrHjsONxOI"),
    body: articleBody,
  },
  {
    slug: "connecting-snowflake-safely",
    title: "Connecting Snowflake Safely",
    excerpt: "Safe, read-only warehouse access with scoped permissions and full audit.",
    author: "Ava Taylor",
    role: "Solutions Architect",
    date: "April 21",
    category: "Tutorials",
    readTime: "10 min",
    image: asset("fftDPG2s9OLvlNi7n5pzpF8aFi4"),
    authorImage: asset("DoKbsXcl5ZReOq7ohtTjCq1GIqI"),
    body: articleBody,
  },
];

export const featuredBlogPosts = blogPosts.slice(0, 3);

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
