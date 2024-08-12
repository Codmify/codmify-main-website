import { ProjectProps, QualificationProps, ServiceProps } from "./types";
import { IoBriefcaseOutline } from "react-icons/io5";
import { GoPeople } from "react-icons/go";
import { RxCalendar } from "react-icons/rx";
import { LiaPenNibSolid } from "react-icons/lia";

export const qualification: QualificationProps[] = [
  {
    years: "3+",
    title: "projects Done",
    icon: IoBriefcaseOutline,
  },
  {
    years: "6+",
    title: "Experienced Tech Experts",
    icon: GoPeople,
  },
  {
    years: "5+",
    title: "Years Of Experience",
    icon: RxCalendar,
  },
];
export const services: ServiceProps[] = [
  {
    title: "UI/UX Design",
    desc: "We will help you create user-friendly and visually appealing interfaces for websites and mobile apps...",
    icon: LiaPenNibSolid,
    url: "",
  },
  {
    title: "Web development",
    desc: "We use a variety of programming languages including HTML, CSS, Python, Java to develop scalable and secure websites...",
    icon: LiaPenNibSolid,
    url: "",
  },
  {
    title: "Project Management",
    desc: "We manage your projects with efficiency, ensuring timely delivery and clear communication...",
    icon: LiaPenNibSolid,
    url: "",
  },
  {
    title: "Graphic design",
    desc: "We create captivating visuals that elevate your brand and communicate your message...",
    icon: LiaPenNibSolid,
    url: "",
  },
];
export const projects: ProjectProps[] = [
  {
    title: "AgentVue",
    desc: "The project aims to create an innovative desktop and mobile application focused on a unique illustration-based interface tailored for AI agents. ",
    image: "/project1.png",
    url: "",
  },
  {
    title: "FrameSync",
    desc: "A Video Collaborative Platform and dynamic solution designed to revolutionize the video production process. ",
    image: "/project2.png",
    url: "",
  },
  {
    title: "iSpeak",
    desc: "Introducing iSpeak, a revolutionary app designed to bridge the communication gap for individuals who face challenges in articulating complete sentences.",
    image: "/project3.png",
    url: "",
  },
];
export const testimonials = [
  {
    img: "/dummyImg1.png",
    desc: "The design team captured our brand perfectly with stunning visuals. Their creativity and professionalism made the process effortless. We're very pleased with the results.",
    name: "Mike Tosin",
    position: "Executive Engineer",
  },
  {
    img: "/dummyImg2.png",
    desc: "Fantastic experience! They understood our vision and delivered beautiful graphics. Professional and detail-oriented, they made the project easy. Highly recommended!.",
    name: "Oreoluwa Mide",
    position: "Content Creator",
  },
  {
    img: "/dummyImg3.png",
    desc: "Exceptional designs that elevated our brand. Quick, creative, and professional. We've received great feedback and look forward to working together again!.",
    name: "Anthony Johnson",
    position: "Data Analyst",
  },
];
export const ourProjects = [
  {
    title: "AgentVue",
    desc: "The project aims to create an innovative desktop and mobile application focused on a unique illustration-based interface tailored for AI agents. Rather than a traditional website, this application will offer a dynamic sideview of an office building, providing users with a clear and intuitive visual representation of each agent's capabilities and functions.",
    additionalDesc:
      "This distinctive approach will enhance user engagement and simplify interactions with AI agents, making complex tasks more accessible and comprehensible.",
    image: "/project1.png",
    url: "",
  },
  {
    title: "FrameSync",
    desc: "A Video Collaborative Platform, a dynamic solution designed to revolutionize the video production process. This innovative tool empowers individuals and teams to seamlessly review and provide feedback on video projects, ensuring the final product meets the highest standards of excellence.",
    additionalDesc:
      "At the heart of our platform is a robust feature set inspired by industry-leading platforms like frame.io. Tailored for professionals working with video editors, our platform facilitates a collaborative environment where every frame is meticulously examined and critiqued. ",
    image: "/project2.png",
    url: "",
  },
  {
    title: "iSpeak",
    desc: "iSpeak, a revolutionary app was designed to bridge the communication gap for individuals who face challenges in articulating complete sentences. iSpeak employs cutting-edge technology to not only capture speech, but also enhance its clarity and comprehension for listeners. With this innovative solution, anyone can now engage in meaningful conversations without the need to strain or maintain close proximity. ",
    additionalDesc:
      "Say goodbye to communication barriers and embrace a world where everyone's voice is heard loud and clear ",
    image: "/project3.png",
    url: "",
  },
];
export const servicesTitles = [
  "UI/UX DESIGN",
  "Project Management",
  "WEBSITE DEVELOPMENT",
  "GRAPHIC DESIGN",
  "BRAND DESIGN",
  "Software Development",
  "MARKETING",
];
