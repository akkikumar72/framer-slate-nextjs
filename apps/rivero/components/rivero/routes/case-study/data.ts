export type CaseStudy = {
  slug: string;
  title: string;
  description: string;
  author: string;
  role: string;
  avatar: string;
  cover: string;
};

export const caseStudies: CaseStudy[] = [
  { slug: "how-improved-hr-efficiency-by-60", title: "How Improved HR Efficiency by 60%", description: "Discover how businesses like yours transformed their HR operations with our all-in-one management.", author: "Michael Reed", role: "Software Designer", avatar: "/rivero/assets/7627e864c878b59e.svg", cover: "/rivero/assets/a3f407ca109c1002.png" },
  { slug: "optimizing-hr-systems-for-growth", title: "Optimizing HR Systems for Growth", description: "Explore how organizations simplified workforce management with our solutions.", author: "James Carter", role: "Front-End Engineer", avatar: "/rivero/assets/CzFtZNQnFG9VCZx5wWHu9Eq8lU.png", cover: "/rivero/assets/2c88243865b00823.png" },
  { slug: "hr-analytics-driving-strategic-decisions", title: "HR Analytics Driving Strategic Decisions", description: "Find out how businesses improved compliance through our all-in-one system.", author: "Emily Stone", role: "Application Architect", avatar: "/rivero/assets/xvwGoGo8qbPT5rxsuevYnuTjF4.jpg", cover: "/rivero/assets/3f5d39c85bdf9be4.png" },
  { slug: "improving-compliance-across-hr-departments", title: "Improving Compliance Across HR Departments", description: "See how companies reduced payroll errors using our integrated automated HR management tools.", author: "Sarah Blake", role: "Application Architect", avatar: "/rivero/assets/yyftj9GyPdSHeE7M2hsRaLMbdco.jpeg", cover: "/rivero/assets/72527fb7dc4b3bae.png" },
  { slug: "reducing-errors-in-hr-operations", title: "Reducing Errors in HR Operations", description: "Find out how businesses improved compliance through our all-in-one system.", author: "David Brooks", role: "Front-End Engineer", avatar: "/rivero/assets/ErNK7q4sNjGX9cZMflOd8namw6c.jpeg", cover: "/rivero/assets/6a6749bb598f01a6.png" },
  { slug: "digital-transformation-in-hr-operations", title: "Digital Transformation in HR Operations", description: "Explore how organizations simplified workforce management with our solutions.", author: "Daniel Hayes", role: "Application Architect", avatar: "/rivero/assets/h2gb8r0VRjPfCOvyoZXogeSZds.jpeg", cover: "/rivero/assets/c463e01fad72e1a5.png" },
  { slug: "what-specific-hr-or-payroll-issues", title: "What Specific HR Or Payroll Issues", description: "See how companies have streamlined their payroll processes using our unified and efficient platform.", author: "Andrew Hill", role: "Software Designer", avatar: "/rivero/assets/65hoB9I3kOoH2uWyevbrvfQybY.jpeg", cover: "/rivero/assets/a897ff168394bf52.png" },
];

export const caseStudyBySlug = new Map(caseStudies.map((study) => [study.slug, study]));

export const articleSections = [
  { title: "Manual Payroll Processing", body: "Manual payroll processing can be time-consuming, error-prone, and stressful for HR teams. Calculating salaries, deductions, taxes, and overtime by hand often leads to mistakes that frustrate employees." },
  { title: "Fragmented Employee Data", body: "Inefficient attendance tracking creates confusion and slows down HR operations. Relying on spreadsheets, paper forms, or disconnected tools makes it difficult to accurately monitor employee hours." },
  { title: "Compliance and Legal Risks", body: "Compliance and legal risks are a major challenge for HR teams, especially when handling payroll and employee data manually. Ensuring adherence to labor laws, tax regulations, and reporting requirements can be time-consuming and complex. Mistakes or missing records may result in fines, penalties, or audits, putting the company at risk. Without automated systems.", afterImage: "/rivero/assets/6a6749bb598f01a6.png" },
  { title: "Inefficient Performance Management", body: "Inefficient performance management can hinder employee growth and overall organizational productivity. Without a centralized system to track goals, provide feedback, and manage reviews, performance evaluations often become inconsistent and delayed." },
  { title: "Multi-System Integration Challenges", body: "Multi-system integration challenges can significantly slow down HR operations. When payroll, attendance, performance, and other business tools operate in isolation, data must be entered manually across multiple platforms, increasing the risk of errors and inconsistencies. Managers spend extra time reconciling information, tracking updates, and ensuring all systems reflect accurate employee data. Without seamless integration, workflows become fragmented, productivity suffers, and decision-making is delayed, making it difficult for businesses to scale efficiently." },
];

export const tableOfContents = [
  "Information We Collect from All Our Users",
  "How We Use the Data You Provide",
  "Protecting Your Code and Project Data",
  "Sharing Data with Third-Party Service Providers",
  "How We Use Cookies and Tracking Tools",
  "Security Practices to Keep Your Data Safe",
  "Future Changes to This Privacy Policy Document",
];
