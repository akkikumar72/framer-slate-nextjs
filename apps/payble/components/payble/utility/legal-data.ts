export type LegalBlock = {
  tag: "H3" | "P" | "LI";
  text: string;
};
export type LegalDocument = {
  title: string;
  blocks: LegalBlock[];
};

export const legalDocuments: Record<string, LegalDocument> = {
  "privacy-policy": {
    "title": "Privacy Policy",
    "blocks": [
      {
        "tag": "P",
        "text": "At Payble, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services. By using Payble, you agree to the terms outlined in this policy."
      },
      {
        "tag": "H3",
        "text": "1. Information We Collect"
      },
      {
        "tag": "P",
        "text": "We collect various types of information to provide and improve our service. This includes:"
      },
      {
        "tag": "P",
        "text": "Information that identifies you as an individual, such as:"
      },
      {
        "tag": "LI",
        "text": "Full name"
      },
      {
        "tag": "LI",
        "text": "Email address"
      },
      {
        "tag": "LI",
        "text": "Phone number"
      },
      {
        "tag": "LI",
        "text": "Billing information (e.g., credit card details)"
      },
      {
        "tag": "P",
        "text": "When you link your accounts to Payble, we collect:"
      },
      {
        "tag": "LI",
        "text": "Bank account and transaction data"
      },
      {
        "tag": "LI",
        "text": "Credit card information"
      },
      {
        "tag": "LI",
        "text": "Payment history and details from connected financial institutions"
      },
      {
        "tag": "P",
        "text": "We collect information about how you interact with Payble, such as:"
      },
      {
        "tag": "LI",
        "text": "IP address"
      },
      {
        "tag": "LI",
        "text": "Browser type"
      },
      {
        "tag": "LI",
        "text": "Device information"
      },
      {
        "tag": "LI",
        "text": "Pages visited and actions taken within the app or website"
      },
      {
        "tag": "LI",
        "text": "Log-in and log-out times"
      },
      {
        "tag": "H3",
        "text": "2. How We Use Your Information"
      },
      {
        "tag": "P",
        "text": "Payble uses the collected information to:"
      },
      {
        "tag": "LI",
        "text": "Provide, maintain, and improve the service"
      },
      {
        "tag": "LI",
        "text": "Personalize your experience and provide customized insights"
      },
      {
        "tag": "LI",
        "text": "Process payments for subscriptions and services"
      },
      {
        "tag": "LI",
        "text": "Send you important notifications about your account"
      },
      {
        "tag": "LI",
        "text": "Analyze usage patterns to optimize performance and features"
      },
      {
        "tag": "LI",
        "text": "Respond to customer service requests and resolve issues"
      },
      {
        "tag": "H3",
        "text": "3. Sharing Your Information"
      },
      {
        "tag": "P",
        "text": "We do not sell or rent your personal information to third parties. However, we may share your data with:"
      },
      {
        "tag": "LI",
        "text": "Service Providers: Third-party vendors (e.g., payment processors, analytics providers) who assist in delivering our services."
      },
      {
        "tag": "LI",
        "text": "Legal Compliance: If required by law, we may disclose your information to governmental authorities, regulators, or other entities to comply with legal obligations."
      },
      {
        "tag": "LI",
        "text": "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
      },
      {
        "tag": "H3",
        "text": "4. Data Security"
      },
      {
        "tag": "P",
        "text": "We take your data security seriously and implement a variety of measures to protect your personal and financial information:"
      },
      {
        "tag": "LI",
        "text": "Encryption: All data is encrypted both in transit and at rest using industry-standard encryption protocols."
      },
      {
        "tag": "LI",
        "text": "Access Controls: Only authorized personnel have access to your personal information, and they are bound by strict confidentiality agreements."
      },
      {
        "tag": "LI",
        "text": "Secure Authentication: We use secure authentication methods, such as two-factor authentication (2FA), to protect your account."
      },
      {
        "tag": "P",
        "text": "However, no method of transmission over the internet is 100% secure, and while we strive to protect your information, we cannot guarantee absolute security."
      },
      {
        "tag": "H3",
        "text": "5. Data Retention"
      },
      {
        "tag": "P",
        "text": "We retain your personal and financial information for as long as your account is active or as needed to provide our services. After you close your account, we may retain certain data to comply with legal obligations, resolve disputes, and enforce our agreements."
      },
      {
        "tag": "H3",
        "text": "6. Your Data Rights"
      },
      {
        "tag": "P",
        "text": "Depending on your location and applicable laws, you may have the following rights concerning your personal information:"
      },
      {
        "tag": "LI",
        "text": "Access: You have the right to request access to the personal information we hold about you."
      },
      {
        "tag": "LI",
        "text": "Correction: You can request corrections to any inaccurate or incomplete personal information."
      },
      {
        "tag": "LI",
        "text": "Deletion: You can request the deletion of your personal information, subject to legal or regulatory obligations."
      },
      {
        "tag": "LI",
        "text": "Data Portability: You have the right to request a copy of your data in a structured, machine-readable format."
      },
      {
        "tag": "LI",
        "text": "Objection: You can object to certain processing activities, such as receiving marketing emails."
      },
      {
        "tag": "P",
        "text": "To exercise these rights, please contact us at email@payble.com."
      },
      {
        "tag": "H3",
        "text": "7. Cookies and Tracking Technologies"
      },
      {
        "tag": "P",
        "text": "Payble uses cookies and similar tracking technologies to enhance your experience on our site:"
      },
      {
        "tag": "LI",
        "text": "Essential Cookies: These cookies are necessary for the website to function correctly."
      },
      {
        "tag": "LI",
        "text": "Performance Cookies: These cookies help us analyze how users interact with our services to improve performance."
      },
      {
        "tag": "LI",
        "text": "Marketing Cookies: We may use cookies to deliver targeted advertising based on your browsing behavior."
      },
      {
        "tag": "P",
        "text": "You can control the use of cookies through your browser settings. However, disabling cookies may affect the functionality of Payble."
      },
      {
        "tag": "H3",
        "text": "8. Third-Party Links"
      },
      {
        "tag": "P",
        "text": "Our service may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We recommend reviewing the privacy policies of any third-party websites you visit."
      },
      {
        "tag": "H3",
        "text": "9. Children's Privacy"
      },
      {
        "tag": "P",
        "text": "Payble is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we discover that we have collected data from a child, we will take steps to delete it immediately."
      },
      {
        "tag": "H3",
        "text": "10. Changes to This Privacy Policy"
      },
      {
        "tag": "P",
        "text": "We may update this Privacy Policy from time to time. When changes are made, we will notify you via email or an in-app notification. We encourage you to review this policy periodically to stay informed about how we are protecting your information."
      },
      {
        "tag": "H3",
        "text": "11. Contact Us"
      },
      {
        "tag": "P",
        "text": "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\nEmail: email@payble.com\nAddress: 42 Market Avenue Westminster London W1B 4DE United Kingdom"
      },
      {
        "tag": "P",
        "text": "By using Payble, you consent to the terms of this Privacy Policy."
      }
    ]
  },
  "cookie-policy": {
    "title": "Cookie Policy",
    "blocks": [
      {
        "tag": "P",
        "text": "At Payble, we use cookies and similar tracking technologies to enhance your experience, analyze website performance, and deliver targeted advertising. This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies."
      },
      {
        "tag": "H3",
        "text": "1. What Are Cookies?"
      },
      {
        "tag": "P",
        "text": "Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. They help websites recognize your device, store your preferences, and track user activity to improve the overall experience."
      },
      {
        "tag": "P",
        "text": "There are two main types of cookies:"
      },
      {
        "tag": "LI",
        "text": "Session Cookies: Temporary cookies that are deleted when you close your browser."
      },
      {
        "tag": "LI",
        "text": "Persistent Cookies: These remain on your device for a set period or until you delete them."
      },
      {
        "tag": "H3",
        "text": "2. How We Use Cookies"
      },
      {
        "tag": "P",
        "text": "Payble uses cookies to improve the functionality of our website, personalize your experience, and analyze usage patterns. The cookies we use fall into the following categories:"
      },
      {
        "tag": "LI",
        "text": "These cookies are necessary for the website to function correctly. Without them, certain features like logging in or accessing secure areas of the site would not be possible."
      },
      {
        "tag": "LI",
        "text": "Performance cookies collect anonymous information about how users interact with our website. They help us understand which pages are popular, how users navigate the site, and any errors they encounter, so we can improve the overall experience."
      },
      {
        "tag": "LI",
        "text": "Functional cookies remember your preferences and choices (e.g., language settings, account preferences), ensuring that the website works in a way that suits your needs."
      },
      {
        "tag": "LI",
        "text": "These cookies collect information about your browsing habits and are used to deliver advertisements that are relevant to your interests. They may also limit the number of times you see an ad and measure the effectiveness of advertising campaigns."
      },
      {
        "tag": "LI",
        "text": "We use analytics tools like Google Analytics to understand how users engage with our platform. These cookies provide us with aggregated data on website traffic and behavior, enabling us to improve our services."
      },
      {
        "tag": "H3",
        "text": "3. Third-Party Cookies"
      },
      {
        "tag": "P",
        "text": "In addition to our own cookies, third-party services (such as advertising partners or analytics providers) may place cookies on your device. These cookies help deliver personalized content, analyze traffic, and track performance across other websites."
      },
      {
        "tag": "LI",
        "text": "Google Analytics: Tracks website usage and user interactions."
      },
      {
        "tag": "LI",
        "text": "Facebook Pixel: Helps deliver targeted ads to users based on their activity."
      },
      {
        "tag": "LI",
        "text": "Payment Providers: For secure payment processing, cookies from payment gateways may be used."
      },
      {
        "tag": "P",
        "text": "Please refer to the privacy and cookie policies of these third parties for more details on how they use cookies."
      },
      {
        "tag": "H3",
        "text": "4. Your Cookie Preferences"
      },
      {
        "tag": "P",
        "text": "You have the ability to manage or delete cookies at any time by adjusting your browser settings. However, please note that disabling cookies may impact the functionality of certain parts of the Payble website."
      },
      {
        "tag": "LI",
        "text": "Browser Settings: Most browsers allow you to control cookies through their settings. You can set your browser to notify you when cookies are being used or block them altogether.\n\nFor Chrome: Go to Settings > Privacy and Security > Cookies and other site data.\n\nFor Safari: Go to Preferences > Privacy.\n\nFor Firefox: Go to Options > Privacy & Security > Cookies and Site Data."
      },
      {
        "tag": "P",
        "text": "Browser Settings: Most browsers allow you to control cookies through their settings. You can set your browser to notify you when cookies are being used or block them altogether."
      },
      {
        "tag": "LI",
        "text": "For Chrome: Go to Settings > Privacy and Security > Cookies and other site data."
      },
      {
        "tag": "LI",
        "text": "For Safari: Go to Preferences > Privacy."
      },
      {
        "tag": "LI",
        "text": "For Firefox: Go to Options > Privacy & Security > Cookies and Site Data."
      },
      {
        "tag": "P",
        "text": "You can opt out of targeted advertising through various third-party services:"
      },
      {
        "tag": "LI",
        "text": "Google Ads Settings: adssettings.google.com"
      },
      {
        "tag": "LI",
        "text": "Facebook Ad Preferences: facebook.com/ads/preferences"
      },
      {
        "tag": "P",
        "text": "Additionally, you can opt out of certain advertising cookies by visiting the Network Advertising Initiative’s Opt-Out Page: www.networkadvertising.org/choices"
      },
      {
        "tag": "H3",
        "text": "5. Changes to This Cookie Policy"
      },
      {
        "tag": "P",
        "text": "We may update this Cookie Policy from time to time to reflect changes in our use of cookies or changes in legal or regulatory requirements. Any updates will be posted on this page, and we encourage you to review the policy periodically."
      },
      {
        "tag": "H3",
        "text": "6. Contact Us"
      },
      {
        "tag": "P",
        "text": "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\nEmail: email@payble.com\nAddress: 42 Market Avenue Westminster London W1B 4DE United Kingdom"
      },
      {
        "tag": "P",
        "text": "By continuing to use Payble, you consent to the use of cookies as described in this Cookie Policy."
      }
    ]
  },
  "terms-of-service": {
    "title": "Terms of Service",
    "blocks": [
      {
        "tag": "P",
        "text": "Welcome to Payble! By using our services, you agree to the following terms and conditions. Please read them carefully before using Payble."
      },
      {
        "tag": "H3",
        "text": "1. Acceptance of Terms"
      },
      {
        "tag": "P",
        "text": "By accessing and using Payble’s website and services, you agree to comply with and be bound by these Terms of Serviceand our Privacy Policy. If you do not agree with any part of these terms, you must stop using the service."
      },
      {
        "tag": "H3",
        "text": "2. Changes to Terms"
      },
      {
        "tag": "P",
        "text": "We reserve the right to modify these terms at any time. When changes are made, we will notify you via email or an in-app notification. It is your responsibility to review these terms periodically. Continued use of Payble after modifications indicates your acceptance of the updated terms."
      },
      {
        "tag": "H3",
        "text": "3. Account Registration"
      },
      {
        "tag": "P",
        "text": "To use Payble, you must be at least 18 years old or have reached the legal age of majority in your country."
      },
      {
        "tag": "P",
        "text": "When creating an account, you agree to provide accurate, up-to-date information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. If you suspect any unauthorized use, you must notify us immediately."
      },
      {
        "tag": "H3",
        "text": "4. Subscription and Payments"
      },
      {
        "tag": "P",
        "text": "Payble offers a free plan with limited features, allowing you to access basic services like single-account tracking and basic budgeting tools."
      },
      {
        "tag": "P",
        "text": "For advanced features such as multi-account sync, AI insights, and automated savings, you can subscribe to our Plus or Premium plans. Subscription fees are billed monthly or annually, depending on your selection."
      },
      {
        "tag": "P",
        "text": "When subscribing to a paid plan, you authorize Payble to charge your provided payment method on a recurring basis. You may update your payment information at any time through your account settings."
      },
      {
        "tag": "P",
        "text": "You can cancel your subscription at any time through your account settings. Upon cancellation, your access to paid features will remain active until the end of the billing period. Refunds are subject to our Refund Policy, and refunds are not provided for partially used billing periods."
      },
      {
        "tag": "H3",
        "text": "5. Use of Service"
      },
      {
        "tag": "P",
        "text": "We grant you a non-exclusive, non-transferable license to access and use Payble solely for personal, non-commercial purposes in accordance with these terms."
      },
      {
        "tag": "P",
        "text": "You agree not to:"
      },
      {
        "tag": "LI",
        "text": "Use Payble for illegal or unauthorized purposes."
      },
      {
        "tag": "LI",
        "text": "Attempt to hack, reverse-engineer, or modify any part of the service."
      },
      {
        "tag": "LI",
        "text": "Impersonate another person or misrepresent your affiliation with Payble."
      },
      {
        "tag": "LI",
        "text": "Use any automated means (e.g., bots or scrapers) to access Payble without our prior consent."
      },
      {
        "tag": "P",
        "text": "We reserve the right to suspend or terminate your account if we detect any violation of these terms, fraudulent activity, or misuse of our services. You may also terminate your account at any time by contacting our support team."
      },
      {
        "tag": "H3",
        "text": "6. Data and Privacy"
      },
      {
        "tag": "P",
        "text": "By using Payble, you consent to the collection and use of your personal information as outlined in our Privacy Policy. This includes collecting data from your financial institutions for tracking and insights purposes."
      },
      {
        "tag": "P",
        "text": "We prioritize data security and use encryption and other protective measures to safeguard your information. However, no method of data transmission over the internet is 100% secure, and we cannot guarantee absolute security."
      },
      {
        "tag": "H3",
        "text": "7. Intellectual Property"
      },
      {
        "tag": "P",
        "text": "All content, design elements, trademarks, and other materials available on Payble are the property of Payble or its licensors. You may not reproduce, modify, or distribute any content without our express written consent."
      },
      {
        "tag": "H3",
        "text": "8. Third-Party Links and Services"
      },
      {
        "tag": "P",
        "text": "Payble may contain links to third-party websites or services. We do not endorse or assume any responsibility for the content or practices of third-party sites. You access them at your own risk and should review their respective terms and privacy policies."
      },
      {
        "tag": "H3",
        "text": "9. Disclaimers"
      },
      {
        "tag": "P",
        "text": "Payble provides tools and insights to help you manage your finances, but we do not offer financial, tax, or legal advice. You should consult a professional before making any significant financial decisions."
      },
      {
        "tag": "P",
        "text": "While we strive to ensure uninterrupted access to Payble, we do not guarantee that the service will always be available, error-free, or secure. Service interruptions may occur due to maintenance, system upgrades, or unforeseen technical issues."
      },
      {
        "tag": "P",
        "text": "Payble is provided on an \"as is\" and \"as available\" basis without warranties of any kind, either express or implied. We disclaim all warranties, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, and non-infringement."
      },
      {
        "tag": "H3",
        "text": "10. Limitation of Liability"
      },
      {
        "tag": "P",
        "text": "To the fullest extent permitted by law, Payble and its affiliates will not be liable for any indirect, incidental, special, or consequential damages arising from your use of the service, including but not limited to loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages."
      },
      {
        "tag": "P",
        "text": "In no event will Payble’s total liability for any claims exceed the amount you paid to us in the last 12 months for the services provided."
      },
      {
        "tag": "H3",
        "text": "11. Governing Law"
      },
      {
        "tag": "P",
        "text": "These terms are governed by and construed in accordance with the laws of [Insert Country/State], without regard to its conflict of laws principles. Any legal disputes related to these terms will be resolved exclusively in the courts of Great Britain."
      },
      {
        "tag": "H3",
        "text": "12. Contact Us"
      },
      {
        "tag": "P",
        "text": "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\nEmail: email@payble.com\nAddress: 42 Market Avenue Westminster London W1B 4DE United Kingdom"
      },
      {
        "tag": "H3",
        "text": "13. Entire Agreement"
      },
      {
        "tag": "P",
        "text": "These Terms of Service, along with our Privacy Policy and Cookie Policy, constitute the entire agreement between you and Payble regarding your use of the service. Any prior agreements, communications, or understandings are superseded by these terms."
      },
      {
        "tag": "P",
        "text": "By using Payble, you acknowledge that you have read, understood, and agree to these terms."
      }
    ]
  },
  "refund-policy": {
    "title": "Refund Policy",
    "blocks": [
      {
        "tag": "P",
        "text": "At Payble, we strive to provide exceptional service to our users. If for any reason you are not satisfied with our services or you encounter issues with your subscription, this Refund Policy explains how you can request a refund and outlines the eligibility criteria."
      },
      {
        "tag": "H3",
        "text": "1. Eligibility for Refunds"
      },
      {
        "tag": "P",
        "text": "Refunds are only available for paid subscription plans (e.g., Plus and Premium). Refund eligibility depends on the type of subscription, the date of purchase, and the reason for the refund request. Here’s an overview of our refund criteria:"
      },
      {
        "tag": "LI",
        "text": "Monthly Subscriptions: Refund requests must be submitted within 7 days of the subscription start date. Refunds are not available for partially used months."
      },
      {
        "tag": "LI",
        "text": "Annual Subscriptions: You can request a refund within 14 days of the initial purchase of an annual subscription, provided you have not significantly used the service."
      },
      {
        "tag": "P",
        "text": "The following are not eligible for refunds:"
      },
      {
        "tag": "LI",
        "text": "Promotional or discounted plans"
      },
      {
        "tag": "LI",
        "text": "Free trials converted into paid plans"
      },
      {
        "tag": "LI",
        "text": "One-time purchases or add-ons"
      },
      {
        "tag": "H3",
        "text": "2. Refund Request Process"
      },
      {
        "tag": "P",
        "text": "To request a refund, please follow these steps:"
      },
      {
        "tag": "LI",
        "text": "Contact our Customer Support team by email at [Insert Support Email]."
      },
      {
        "tag": "LI",
        "text": "Include your account details (email, username) and the reason for the refund request."
      },
      {
        "tag": "LI",
        "text": "We may ask for additional details or documentation if necessary."
      },
      {
        "tag": "P",
        "text": "Refund requests must be submitted within the timeframe specified above (7 days for monthly subscriptions, 14 days for annual subscriptions). Any requests outside these timeframes will not be eligible for a refund."
      },
      {
        "tag": "H3",
        "text": "3. Refund Processing"
      },
      {
        "tag": "P",
        "text": "Once we receive your refund request, our team will review it and determine eligibility. Refunds are typically approved if:"
      },
      {
        "tag": "LI",
        "text": "The request is made within the specified timeframe."
      },
      {
        "tag": "LI",
        "text": "There is a valid reason (e.g., service issues, dissatisfaction with the product)."
      },
      {
        "tag": "LI",
        "text": "You have not extensively used the service during the billing cycle."
      },
      {
        "tag": "LI",
        "text": "Approved refunds will be processed within 10 business days."
      },
      {
        "tag": "LI",
        "text": "Refunds will be credited to the original payment method used at the time of purchase."
      },
      {
        "tag": "LI",
        "text": "Depending on your financial institution, it may take additional time for the refunded amount to appear on your statement."
      },
      {
        "tag": "H3",
        "text": "4. Cancellations and Refunds for Future Billing Cycles"
      },
      {
        "tag": "P",
        "text": "If you cancel your subscription, you will continue to have access to Payble’s paid features until the end of your billing cycle (monthly or annual). No refunds will be provided for unused portions of the billing period after cancellation."
      },
      {
        "tag": "LI",
        "text": "Monthly Subscribers: You can cancel anytime, but no refunds will be issued for the remaining days in the month."
      },
      {
        "tag": "LI",
        "text": "Annual Subscribers: You can cancel at any time, but refunds will only be provided if you cancel within the first 14 days."
      },
      {
        "tag": "H3",
        "text": "5. Free Trial Policy"
      },
      {
        "tag": "P",
        "text": "Payble may offer free trials for new users. If you choose to subscribe to a paid plan at the end of your free trial, you will be charged for the subscription. Refunds are not available for users who fail to cancel before the free trial ends."
      },
      {
        "tag": "H3",
        "text": "6. Contact Us"
      },
      {
        "tag": "P",
        "text": "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\nEmail: email@payble.com\nAddress: 42 Market Avenue Westminster London W1B 4DE United Kingdom"
      },
      {
        "tag": "H3",
        "text": "7. Changes to This Policy"
      },
      {
        "tag": "P",
        "text": "We reserve the right to modify or update this Refund Policy at any time. When changes are made, we will notify you via email or an in-app notification. It is your responsibility to review the policy periodically to stay informed about your refund rights."
      },
      {
        "tag": "P",
        "text": "By subscribing to Payble’s paid plans, you agree to this Refund Policy."
      }
    ]
  }
};
