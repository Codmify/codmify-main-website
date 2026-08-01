export type Service = {
  title: string;
  reference: string;
  content: string;
  capabilities: string[];
  accent: string;
};

export const servicesHolder: Service[] = [
  {
    title: "Website Development",
    reference: "website-development",
    content: "Fast, responsive websites that present your business clearly and turn visits into enquiries.",
    capabilities: ["Corporate websites", "E-commerce", "CMS & blogs"],
    accent: "#008DE5",
  },
  {
    title: "Mobile App Development",
    reference: "mobile-development",
    content: "Useful iOS and Android apps designed around the everyday needs of your customers and team.",
    capabilities: ["Android & iOS", "Customer portals", "App strategy"],
    accent: "#6D5DFB",
  },
  {
    title: "Product Design",
    reference: "product-design",
    content: "Thoughtful product and brand experiences that make complex ideas simple, intuitive and memorable.",
    capabilities: ["UI/UX design", "Design systems", "Prototypes"],
    accent: "#E15C8E",
  },
  {
    title: "AI Integration",
    reference: "ai-integration",
    content: "Practical AI tools that automate repetitive work, improve support and help your team make faster decisions.",
    capabilities: ["AI assistants", "Workflow automation", "Knowledge search"],
    accent: "#00A990",
  },
  {
    title: "Data Analytics",
    reference: "data-analytics",
    content: "Clear dashboards and reporting that turn your business data into confident, measurable action.",
    capabilities: ["Live dashboards", "Reporting", "Data insights"],
    accent: "#F28C28",
  },
  {
    title: "Digital Marketing",
    reference: "digital-marketing",
    content: "Campaigns and content that put your brand in front of the right people and create meaningful growth.",
    capabilities: ["Social media", "Content strategy", "Paid campaigns"],
    accent: "#008DE5",
  },
  {
    title: "Project Delivery",
    reference: "project-delivery",
    content: "Reliable planning, communication and delivery that keep your digital project moving from idea to launch.",
    capabilities: ["Discovery", "Project management", "Ongoing support"],
    accent: "#121279",
  },
];

export const getServiceWhatsAppUrl = (service: Service) => {
  const message = `Hello Codmify team,\n\nI would like to discuss your ${service.title} service.\n\nBusiness name: \nIndustry: \nWhat I need help with: \nPreferred timeline: \n\nPlease share the next steps. Thank you.`;
  return `https://wa.me/2349031874139?text=${encodeURIComponent(message)}`;
};
