export type Integration = {
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export const integrations: Integration[] = [
  { slug: "fusematrix", name: "FuseMatrix", description: "Seamlessly connect with WorkSync to automate your HR workflows—from tracking tasks to efficiently managing your team.", icon: "/rivero/assets/5cb9bb4da0e196d2.png" },
  { slug: "paylink", name: "PayLink", description: "Sync your payroll with PayLink eliminate manual calculations Automatic updates, tax calculations and real-time.", icon: "/rivero/assets/b73569043c9da0ce.png" },
  { slug: "teamconnect", name: "TeamConnect", description: "Keep your teams in the TeamConnect. Receive instant notification approvals, leave requests, and company.", icon: "/rivero/assets/9c0d6ec5b9eb94c5.png" },
  { slug: "cloudhub", name: "CloudHub", description: "Store and access employee documents securely with CloudHub. From contracts to onboarding files, all critical.", icon: "/rivero/assets/a5cdc78e03d9e3f9.png" },
  { slug: "shiftmaster", name: "ShiftMaster", description: "Automate employee scheduling a with ShiftMaster. Sync shifts attendance, and manage to shift swaps.", icon: "/rivero/assets/e455a754dd5c3d2a.png" },
  { slug: "talentflow", name: "TalentFlow", description: "Streamline your recruitment process with TalentFlow. Automatically import candidate information and manage applications.", icon: "/rivero/assets/d0a0f917dd67b232.png" },
  { slug: "slackmate", name: "SlackMate", description: "Receive instant HR updates through SlackMate. Get notifications for approvals, payroll changes, or team updates.", icon: "/rivero/assets/baeddeb698cbeb84.png" },
  { slug: "taskboard", name: "TaskBoard", description: "Track HR tasks, goals, and employee performance using TaskBoard. Assign responsibilities, monitor progress.", icon: "/rivero/assets/3a84a2fb41bd030c.png" },
  { slug: "hrbridge", name: "HRBridge", description: "Combine HR and financial operations with FinanceTrack. Manage expenses, employee reimbursements, and budgets efficiently.", icon: "/rivero/assets/67192fff05503581.png" },
];

export const integrationBySlug = new Map(integrations.map((integration) => [integration.slug, integration]));

export const integrationSteps = [
  { title: "Step 1: Initial Configuration Setup", body: "Begin by logging into your Optiflow account and navigating to the integrations dashboard. Locate the FuseMatrix integration option and click \"Connect.\" You’ll be prompted to authorize the connection by entering your FuseMatrix API key, which can be generated from your FuseMatrix settings. Ensure both accounts are active and properly configured for a smooth setup." },
  { title: "Step 2: Data Mapping and Synchronization.", body: "Once the connection is established, define the data fields to be shared between Optiflow and FuseMatrix. Use Optiflow’s intuitive mapping tool to align fields such as customer data, task details, or project updates. This ensures seamless synchronization of information, preventing duplication or mismatched entries." },
  { title: "Step 3: Workflow Automation Configuration.", body: "Leverage Optiflow's automation features to define workflows that trigger actions in FuseMatrix. For example, a completed task in Optiflow can automatically update project progress in FuseMatrix. Set up notifications and conditions to ensure alignment between systems, streamlining collaboration and reducing manual effort." },
  { title: "Step 4: Integration Testing and Deployment.", body: "Before going live, perform a comprehensive test of the integration. Use sample data to validate that updates in Optiflow reflect accurately in FuseMatrix and vice versa. Once verified, deploy the integration and monitor performance during the initial weeks. Adjust settings as necessary to optimize functionality and ensure seamless operation." },
];
