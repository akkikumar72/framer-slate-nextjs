export type LegalSection = {
  heading: string;
  items?: readonly string[];
  level: 3 | 4;
  paragraphs: readonly string[];
};

export const legalSections: readonly LegalSection[] = [
  {
    heading: "Introduction",
    level: 3,
    paragraphs: [
      "We are committed to protecting your privacy and providing a secure and enjoyable online experience. This Privacy Policy governs the manner in which we collect, use, maintain, and disclose information collected from users of the product website.",
    ],
  },
  {
    heading: "Personal identification information",
    level: 4,
    paragraphs: [
      "We may collect personal identification information from Users in various ways, including but not limited to when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site.",
      "Users may be asked for, as appropriate, name, email address, mailing address, phone number, and payment information. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us.",
    ],
  },
  {
    heading: "Non-personal identification information",
    level: 4,
    paragraphs: [
      "We may collect non-personal identification information whenever Users interact with our Site. This may include the browser name, computer type, operating system, Internet service provider, and other technical connection information. " +
        "This information can also include device characteristics, browser language, screen dimensions, and general connection data used to support and improve the Site experience.",
    ],
  },
  {
    heading: "Payment information",
    level: 4,
    paragraphs: [
      "We may collect payment information when Users make a purchase on our Site. This information is used only to process payments and is securely handled by our payment processing partners.",
    ],
  },
  {
    heading: "How we use collected information",
    level: 3,
    paragraphs: [
      "Dashfluence may collect and use Users’ personal information for the following purposes:",
    ],
    items: [
      "To process transactions: We may use information Users provide when placing an order only to service that order. We do not share it except as necessary to provide the service.",
      "To send periodic emails: We may use the email address provided for order processing to send updates and respond to inquiries, questions, or other requests.",
    ],
  },
  {
    heading: "How we protect your information",
    level: 3,
    paragraphs: [
      "We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of personal information, usernames, passwords, transaction information, and data stored on our Site.",
    ],
  },
  {
    heading: "Sharing your personal information",
    level: 3,
    paragraphs: [
      "We do not sell, trade, or rent Users’ personal identification information. We may share generic aggregated demographic information not linked to personal identification information with trusted partners and affiliates for the purposes outlined above.",
    ],
  },
  {
    heading: "Cookies",
    level: 3,
    paragraphs: [
      "Our Site may use cookies to enhance User experience. Users’ web browsers place cookies on their hard drive for record-keeping and sometimes to track information. Users may refuse cookies or choose to receive an alert when cookies are sent. Some parts of the Site may then not function properly.",
    ],
  },
  {
    heading: "Changes to this privacy policy",
    level: 3,
    paragraphs: [
      "We may update this privacy policy at any time and revise the updated date on this page. We encourage Users to check this page for changes and stay informed about how we protect the personal information we collect. You agree that it is your responsibility to review this privacy policy periodically.",
    ],
  },
];
