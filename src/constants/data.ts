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
    title: "Web development",
    desc: "We use a variety of programming languages including HTML, CSS, Python, Java to develop scalable and secure websites...",
    icon: LiaPenNibSolid,
    url: "/services",
  },
  {
    title: "UI/UX Design",
    desc: "We will help you create user-friendly and visually appealing interfaces for websites and mobile apps...",
    icon: LiaPenNibSolid,
    url: "/services",
  },
  {
    title: "Project Management",
    desc: "We manage your projects with efficiency, ensuring timely delivery and clear communication...",
    icon: LiaPenNibSolid,
    url: "/services",
  },
  {
    title: "Graphic design",
    desc: "We create captivating visuals that elevate your brand and communicate your message...",
    icon: LiaPenNibSolid,
    url: "/services",
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
    title: "VAAD Media",
    desc: "VAAD Media specializes in innovative outdoor advertising solutions, offering a wide range of services including out-of-home media planning, graphic design, and printing. The agency helps brands engage with their target audience through billboards, digital screens, and other formats, providing demographic and location data to optimize campaigns. With a focus on creative and unconventional marketing strategies, VAAD Media ensures that client messages stand out in crowded environments.",
    additionalDesc: "",
    image: "/vaad-media.png",
    url: "https://www.vaad.com.ng/",
  },
  {
    title: "Depane Topup",
    desc: "Depane Topup is an online platform that allows users to easily recharge mobile phones. It offers a convenient and user-friendly interface, enabling quick transactions. The platform is designed for both individuals and businesses looking for a seamless way to manage their top-up and payment needs.",
    additionalDesc: "",
    image: "/depane-topup.png",
    url: "https://depanetopup.com/",
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
