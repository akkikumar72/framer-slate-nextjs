export const trustedLogos = [
  "/rivero/assets/df78dd170f317693.svg",
  "/rivero/assets/0dd2090f12ada355.svg",
  "/rivero/assets/a8c15a53fbd5c323.svg",
  "/rivero/assets/cd4d7a7bed1e01d3.svg",
  "/rivero/assets/792d95436eeec5ad.svg",
  "/rivero/assets/8626a1977dcc9694.svg",
];

export const planFeatures = [
  "Up to 20 employees",
  "Basic HR & Payroll tools",
  "Attendance tracking",
  "Limited support",
  "Basic Customizable",
  "Email Support",
];

export const pricingV1Comparison = [
  ["Task Management", "3", "Unlimited", "Unlimited"],
  ["Team Collaboration", "Basic", "Advanced", "Custom"],
  ["Calendar & Scheduling", "5", "20", "Unlimited"],
  ["Analytics & Reporting", "Basic", "Advanced", "Custom"],
  ["Third-Party Apps", "5GB", "50GB", "Unlimited"],
  ["File Sharing & Storage", "Basic", "Advanced", "Custom"],
  ["Accounting Tools", "Basic", "Advanced", "Custom"],
  ["CRM Integration", "Basic", "Advanced", "Custom"],
  ["Workflow Automation", "10", "50", "Unlimited"],
  ["AI-Powered Insights", "Basic", "Advanced", "Custom"],
  ["Customer Support", "Limited", "Full", "Full"],
] as const;

export const pricingV2Comparison = [
  ["Ai agent support", "10", "Unlimited", "-"],
  ["API integration", "-", "Unlimited", "✓"],
  ["Collaboration tools", "10", "-", "Unlimited"],
  ["Advanced automation", "-", "-", "✓"],
  ["Ai agent support", "-", "-", "Unlimited"],
  ["24/7 support", "-", "-", "✓"],
  ["Document management", "Unlimited", "✓", "✓"],
  ["Smart Support Agent", "10", "Unlimited", "Unlimited"],
] as const;

export const team = [
  ["Brooklyn Simmons", "CEO", "/rivero/assets/RHE75JePNQOzus8RBMbWAjItQrI.png"],
  ["Wade Warren", "HR Director", "/rivero/assets/E4ueDSQI5Qz7ftL3We37zDL0zgk.png"],
  ["Robert Fox", "Lead Developer", "/rivero/assets/MrPaQOdOxk7N4em7adgRC40nR2w.png"],
  ["Jacob Jones", "Product Designer", "/rivero/assets/ieDvNvmAQx7U7XqQ8sv27Wh9rGg.png"],
  ["Cody Fisher", "Marketing Head", "/rivero/assets/VCQTaCeSMjohmSuI9YmTyL16k.png"],
  ["Guy Hawkins", "Head of Sales", "/rivero/assets/gyqRSpNCckzGclNerQoKg27Ma0.png"],
  ["Devon Lane", "Sales Manager", "/rivero/assets/G5YtlkJa24g6GBK767UW2HDEJ5s.png"],
  ["Courtney Henry", "UI/UX Designer", "/rivero/assets/K2uUvzNetej3OLmKkQm7HbxZck.png"],
] as const;

export type Review = { quote: string; name: string; role: string; avatar: string };

export const reviews: Review[] = [
  { quote: "This platform has completely changed how we manage attendance, payroll, and team performance. Everything is automated, easy to track, and simple to use.", name: "Michael Carter", role: "HR Manager", avatar: "/rivero/assets/7d300913e4796d43.svg" },
  { quote: "The automation features are a lifesaver! No more manual data entry or payroll errors. The reports and insights are very helpful.", name: "James Anderson", role: "Team Lead", avatar: "/rivero/assets/d47acc453b432e23.svg" },
  { quote: "From onboarding to performance reviews, everything is organized in one place. It’s truly made HR stress-free.", name: "David Thompson", role: "Operations Manager", avatar: "/rivero/assets/30c9ca93a7f5c1b7.svg" },
  { quote: "The support team is truly outstanding. They helped us set everything up in just one day, and the training materials were incredibly easy to follow.", name: "David Collins", role: "CEO", avatar: "/rivero/assets/cf0e3d35fd34d6d4.png" },
  { quote: "Payroll errors were a huge problem before. Since switching, everything has been running smoothly.", name: "Christopher Reed", role: "CEO", avatar: "/rivero/assets/a1de9296fa420011.png" },
  { quote: "Simple, clean, and powerful.", name: "Benjamin Morris", role: "CEO", avatar: "/rivero/assets/5316c39ffd5b15fb.png" },
  { quote: "We love how everything is stored safely in the cloud and accessible anytime. The automation features are top-notch and have completely changed how we manage attendance, payroll, and team performance.", name: "Jane Cooper", role: "Founder at Nexora", avatar: "/rivero/assets/90cbc2835aa9d6f2.svg" },
  { quote: "We automated payroll and attendance, and it cut our manual work in half. Highly recommended for small growing teams.", name: "Daniel Johnson", role: "Project Manager", avatar: "/rivero/assets/246801ef6244db09.svg" },
  { quote: "As our company scaled, managing HR manually became impossible. This platform helped us stay organized and efficient, and it’s now a vital part of our daily operations. The automation features are a lifesaver, with no more manual data entry or payroll errors.", name: "William Parker", role: "HR Director", avatar: "/rivero/assets/17f5939679c34949.svg" },
  { quote: "Our distributed team can easily log attendance and apply for leave from anywhere, helping us manage our remote workforce more efficiently.", name: "Christopher Lewis", role: "CEO", avatar: "/rivero/assets/a1de9296fa420011.png" },
  { quote: "From attendance tracking to performance reviews, every feature feels polished and intuitive. Our entire HR workflow is now faster, more accurate, and much easier to manage.", name: "James Walker", role: "CEO", avatar: "/rivero/assets/b2901f122cb9ef0c.png" },
  { quote: "As our company scaled, managing HR manually became impossible. This platform keeps us organized and efficient. The automation features save us from manual data entry and payroll errors.", name: "Matthew Turner", role: "CEO", avatar: "/rivero/assets/b513395c0f68da72.png" },
  { quote: "Payroll errors were a huge problem before. Since switching, everything runs smoothly, accurately, and on time. The difference is absolutely unbelievable.", name: "Ryan Mitchell", role: "CEO", avatar: "/rivero/assets/5cb73f77d8385618.png" },
  { quote: "This platform completely transformed how we manage attendance.", name: "Lucas Richardson", role: "CEO", avatar: "/rivero/assets/b513395c0f68da72.png" },
  { quote: "The customer service team helped us get started in no time. Their training sessions made the setup process incredibly smooth and made our work much easier.", name: "Matthew Harris", role: "HR Specialist", avatar: "/rivero/assets/e7e671b1b36af720.svg" },
  { quote: "The customer service team helped us get started in no time. Their training sessions made the setup super smooth.", name: "Andrew Collins", role: "Founder", avatar: "/rivero/assets/5be6c8d8e8989a7f.svg" },
  { quote: "It’s affordable, efficient, and loaded with useful features, perfect for startups that need a full HR solution without high costs.", name: "Brian Mitchell", role: "Finance Officer", avatar: "/rivero/assets/d7f740d5f960e31a.svg" },
  { quote: "As a small business, we needed something simple yet powerful. This platform gives us enterprise-level features without unnecessary complexity.", name: "Michael Brooks", role: "CEO", avatar: "/rivero/assets/5cb73f77d8385618.png" },
  { quote: "I love how quickly the system integrates with our existing tools. It feels like everything works together now, including Slack.", name: "Andrew Parker", role: "CEO", avatar: "/rivero/assets/5316c39ffd5b15fb.png" },
  { quote: "We moved from spreadsheets to this HR system, and the difference is unbelievable. The dashboard gives everything we need.", name: "Jonathan Hayes", role: "CEO", avatar: "/rivero/assets/5c04c6b3ce789266.png" },
];

export const legalSections = [
  ["Acceptance of Terms", "Automation is redefining how modern HR teams operate. Instead of spending countless hours on repetitive tasks like attendance tracking, payroll calculations, and leave approvals, businesses can now streamline everything with intelligent workflows. By eliminating manual processes."],
  ["Use of the Service", "Employee engagement is no longer optional, it is essential for productivity and retention. With communication tools, instant notifications, and self-service features, employees feel more connected to their workplace."],
  ["Acceptance of Terms", "Payroll is one of the most sensitive HR responsibilities, and even small mistakes can lead to frustration and compliance risks. Modern HR systems revolutionize payroll by automating calculations, tax deductions, and payouts with unmatched accuracy. Real-time attendance syncing ensures payroll."],
  ["Use of Services", "Data is transforming HR from a support function to a strategic powerhouse. With advanced reporting and analytics, HR teams can identify patterns, predict workforce needs, and make informed decisions that drive growth.\n\nFrom performance tracking to attendance trends, detailed insights help companies optimize productivity, reduce turnover, and build more effective HR strategies. Data-driven HR empowers."],
  ["Use of the Service", "A smooth onboarding experience sets the tone for new employees and significantly boosts retention. Digital onboarding tools allow businesses to create structured workflows that guide new hires through documents, training modules, and orientation tasks. Everything is accessible from one platform, reducing confusion and ensuring a consistent onboarding journey. This not only saves HR time but also helps new employees feel welcomed."],
  ["Account Registration", "Traditional performance reviews often feel overwhelming or outdated. With modern performance management tools, companies can track goals, provide real-time feedback, and support employees with continuous improvement. Managers gain visibility into team progress, while employees understand expectations more clearly."],
  ["Subscription & Payment", "All intellectual property rights in Biotix, including software, branding, and content, belong to Biotix or its licensors. You are granted a limited license to use the platform for its intended purpose but may not modify, distribute, or reproduce any part of it without permission."],
  ["Limitation of Liability", "Manual attendance tracking leads to inconsistencies, delays, and unnecessary administrative work. A centralized attendance system provides real-time updates, accurate records, and automated syncing with payroll. Businesses can set rules, approve leave requests in seconds, and track productivity with ease. With everything linked across departments, attendance becomes effortless, enabling better planning, reduced absenteeism, and improved workforce management."],
  ["Termination of Service", "Security and compliance are critical for HR teams, especially when handling sensitive employee data. Modern HR software includes robust encryption, secure access controls, and automated audit trails to keep information safe.\n\nCompliance tools ensure businesses follow local labor laws, tax regulations, and record-keeping requirements. This protects the company from fines, ensures employee trust, and creates a secure, reliable HR ecosystem."],
  ["Modifications to Terms", "The best HR solutions do not work alone, they connect with the tools your team already uses. Integrations with payroll systems, communication apps, cloud storage platforms, and project management."],
  ["Intellectual Property", "Digital transformation in HR is no longer a luxury, it is a necessity for organizations aiming to scale efficiently. By moving HR processes online, businesses can reduce costs, eliminate unnecessary paperwork, and improve collaboration across teams.\n\nDigital tools make operations faster, smarter, and more transparent while supporting remote and hybrid work environments. Companies that embrace HR technology gain a significant competitive advantage, becoming more agile and adaptive in a rapidly changing world."],
] as const;
