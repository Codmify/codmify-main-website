import { IconType } from "react-icons";

export interface QualificationProps {
  years: string;
  title: string;
  icon: IconType;
}
export interface ServiceProps {
  icon: IconType;
  title: string;
  desc: string;
  url: string;
}
export interface ProjectProps {
  title: string;
  desc: string;
  image: string;
  url: string;
}

export interface PortfolioProject extends ProjectProps {
  additionalDesc: string;
  images?: string[];
  links?: { label: string; url: string }[];
}
