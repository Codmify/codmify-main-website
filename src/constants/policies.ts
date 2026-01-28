export interface PolicySection {
  title: string;
  key: string;
  content: string;
  list?: string[];
}

export const termsAndConditions: PolicySection[] = [
  {
    title: "Introduction",
    key: "introduction",
    content:
      'Welcome to Codmify Hub ("Company," "we," "our," or "us"). By accessing our website (https://codmify.com), engaging our agency services, or using any of our proprietary platforms and applications, you agree to be bound by these Terms and Conditions.',
  },
  {
    title: "Services & Products",
    key: "services-products",
    content: "Codmify Hub operates as a hybrid technology company providing:",
    list: [
      "Agency Services: Software development, UI/UX design, Project Management, Digital Marketing, and Talent Solutions.",
      "Proprietary Platforms: We own and operate third-party applications (including digital marketplaces, listing websites, and SaaS tools) where users can create accounts, upload content, and conduct transactions.",
    ],
  },
  {
    title: "Agency Projects (Service Engagement)",
    key: "agency-projects",
    content:
      "This section applies to clients hiring Codmify for development or marketing services.",
    list: [
      'Scope: For custom projects, a specific proposal or contract ("Service Agreement") will be issued outlining the scope, timeline, and deliverables.',
      "Revisions: Unless otherwise stated, design and development projects include two (2) rounds of revisions. Additional revisions are billed at our standard hourly rate.",
      "Delays: Codmify Hub is not responsible for delays caused by the Client's failure to provide necessary content, access, or feedback in a timely manner.",
      "Client Ownership: Upon full payment of all fees, the Client is granted full ownership of the final deliverables (e.g., source code).",
    ],
  },
  {
    title: "Use of Codmify Proprietary Platforms",
    key: "proprietary-platforms",
    content:
      "This section applies to users (e.g., Authors, Sellers, Buyers) of apps built and owned by Codmify.",
    list: [
      "User Accounts: You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.",
      "User-Generated Content (UGC): If you upload content (e.g., books, listings, comments) to our platforms, you retain ownership of your content. However, you grant Codmify a non-exclusive license to display, distribute, and promote this content on the platform.",
      "Prohibited Content: You may not upload content that is illegal, offensive, plagiarized, or violates intellectual property rights. Codmify reserves the right to remove any content without notice.",
      "Marketplace Transactions: If you sell products via our platforms, Codmify is not a party to the transaction between buyers and sellers unless explicitly stated. We are not liable for the quality or delivery of items sold by third-party users.",
    ],
  },
  {
    title: "Payments and Invoicing",
    key: "payments",
    content: "",
    list: [
      "Agency Projects: Unless otherwise agreed, a non-refundable deposit (typically 30-60%) is required before work begins. Late payments (7+ days) incur a 5% fee.",
      "Platform Fees: For our proprietary apps, we may charge transaction fees, subscription fees, or commissions on sales. These fees will be clearly displayed at the point of sale/checkout.",
    ],
  },
  {
    title: "Intellectual Property Rights",
    key: "intellectual-property",
    content: "",
    list: [
      "Agency Work: As stated in Section 3, Clients own paid-for deliverables.",
      "Codmify Platforms: Codmify Hub retains all rights, title, and interest in our proprietary platforms, including the underlying software, source code, design, and trademarks. You may not reverse-engineer or copy our platforms.",
    ],
  },
  {
    title: "Talent Marketplace & Hiring",
    key: "talent-marketplace",
    content: "If you use Codmify to hire talent:",
    list: [
      "Non-Circumvention: You agree not to hire Codmify-introduced talent directly outside of our platform for a period of 12 months without our written consent or payment of a placement fee.",
    ],
  },
  {
    title: "Limitation of Liability",
    key: "limitation-liability",
    content: "Codmify Hub shall not be liable for:",
    list: [
      "Indirect or consequential damages (including lost profits).",
      "Content posted by users on our proprietary platforms.",
      "Disputes between buyers and sellers on our marketplaces.",
      "Our total liability is limited to the amount paid by you to Codmify in the 12 months preceding the claim.",
    ],
  },
  {
    title: "Termination",
    key: "termination",
    content: "",
    list: [
      "Agency: Either party may terminate with notice. Client pays for work done; deposits are non-refundable without cause.",
      "Platforms: We reserve the right to suspend or ban user accounts on our apps for violation of terms (e.g., fraud, posting hate speech).",
    ],
  },
  {
    title: "Governing Law",
    key: "governing-law",
    content:
      "These Terms shall be governed by the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Lagos State.",
  },
  {
    title: "Contact Us",
    key: "contact-us",
    content: "For legal inquiries, please contact us at codmify@gmail.com.",
  },
];

export const privacyPolicy: PolicySection[] = [
  {
    title: "Information We Collect",
    key: "information-collected",
    content:
      "We collect information to provide services to agency clients and users of our apps:",
    list: [
      "Personal Information: Name, email, phone number, and billing details provided via forms, 'Hire Us' pages, or account registration on our apps.",
      "User Content: Information you upload to our platforms (e.g., book descriptions, author bios, profile images).",
      "Transaction Data: Details of purchases or sales made through our marketplaces.",
      "Talent Data: Resumes and portfolios from applicants.",
    ],
  },
  {
    title: "How We Use Your Information",
    key: "how-we-use",
    content: "",
    list: [
      "To deliver agency services (Development, Design).",
      "To operate and manage user accounts on our platforms.",
      "To facilitate marketplace transactions and payouts to sellers/authors.",
      "To match businesses with tech talent.",
      "To improve functionality via analytics.",
    ],
  },
  {
    title: "Data Sharing",
    key: "data-sharing",
    content: "We do not sell your personal data. We may share data with:",
    list: [
      "Team Members: Freelancers/staff working on your project.",
      "Platform Users: On our marketplaces, limited public profile info (e.g., Author Name) is visible to other users.",
      "Payment Processors: To facilitate secure payments (e.g., Paystack, Stripe).",
      "Legal Compliance: If required by law.",
    ],
  },
  {
    title: "Data Security",
    key: "data-security",
    content:
      "We implement industry-standard security measures. However, no method of transmission over the Internet is 100% secure.",
  },
  {
    title: "Your Rights",
    key: "your-rights",
    content:
      "You have the right to request access to, correction of, or deletion of your personal data. Contact codmify@gmail.com.",
  },
];

export const refundPolicy: PolicySection[] = [
  {
    title: "Agency Services (Web/App Development)",
    key: "agency-services",
    content: "",
    list: [
      "Deposits: Initial deposits (mobilization fees) are non-refundable. This covers resource allocation and scheduling.",
      "Completed Work: No refunds will be issued for work that has been completed and approved/deployed.",
      "Cancellation: If you cancel mid-project, you are billed for work completed up to that date.",
    ],
  },
  {
    title: "Proprietary Platforms (Digital Products/Marketplace)",
    key: "digital-products",
    content:
      "Digital Goods: Due to the nature of digital content (e.g., ebooks, software downloads purchased on our platforms), all sales are generally final and non-refundable.",
    list: [
      "Exceptions: Refunds may be granted at our discretion if: The file is corrupted or technically defective, or the content violates our terms (e.g., a fake listing).",
      "Subscriptions: Platform subscriptions can be cancelled anytime, but refunds are not issued for the current active billing cycle.",
    ],
  },
  {
    title: "Marketing Services",
    key: "marketing-services",
    content:
      "Marketing retainers are paid in advance and are non-refundable for the active month. Cancellations must be made 30 days in advance.",
  },
];

export const faqs = [
  {
    question: "What technologies do you use for development?",
    answer:
      "We use a wide range of modern technologies including HTML/CSS, Python, PHP, React, Next.js, and Node.js. We pick the best stack for your project's scalability.",
  },
  {
    question: "Does Codmify build its own products?",
    answer:
      "Yes! Aside from building for clients, we operate our own digital platforms (such as niche marketplaces and tools). We understand the product lifecycle because we are product owners ourselves.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "A standard business website typically takes 2-4 weeks, while custom software or mobile apps may take 8-12 weeks or more.",
  },
  {
    question: "Do you require a deposit to start agency work?",
    answer:
      "Yes, we typically require a 30-60% deposit to mobilize our team. The balance is due upon completion or milestones.",
  },
  {
    question: "If I sell on a Codmify marketplace, when do I get paid?",
    answer:
      "Payout terms vary by platform. Typically, funds are held for a clearing period (e.g., 3-7 days) to ensure customer satisfaction before being released to your wallet/bank.",
  },
  {
    question: "Who owns the code for Client projects?",
    answer:
      "Once the final invoice is paid, the Client owns 100% of the intellectual property for their custom project. (Note: This does not apply to Codmify's own proprietary platforms).",
  },
  {
    question: "Do you offer post-launch support?",
    answer:
      "Yes, we offer maintenance packages to ensure your website or software remains secure and updated.",
  },
];
