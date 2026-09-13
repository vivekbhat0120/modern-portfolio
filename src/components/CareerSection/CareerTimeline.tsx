import { ScrollTimeline } from "../lightswind/scroll-timeline";
import {
  Globe,
  Layout,
  Shield,
  Plug,
  Cloud,
} from "lucide-react";

export const CareerTimeline = () => {
  const careerEvents = [
    {
      title: "Custom Web Applications",
      description:
        "Developing tailored web applications to meet unique business needs. From concept to deployment, I create robust and scalable web solutions that streamline operations.",
      icon: <Globe className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      title: "Interactive UI Development",
      description:
        "Building dynamic and engaging user interfaces with modern JavaScript frameworks like React and Vue. Enhance user interaction with smooth animations and intuitive navigation.",
      icon: <Layout className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      title: "Security & Maintenance",
      description:
        "Providing ongoing website maintenance and security updates. I monitor for vulnerabilities, apply patches, and ensure your web applications remain secure and up-to-date.",
      icon: <Shield className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      title: "API Integration",
      description:
        "Integrating third-party APIs to enhance functionality and streamline workflows. I connect your applications with external services for payment processing, data retrieval, and more.",
      icon: <Plug className="h-4 w-4 mr-2 text-primary" />,
    },
    {
      title: "Cloud Deployment",
      subtitle: "CreativeSpark Agency",
      description:
        "Deploying web applications to cloud platforms like AWS, Azure, and Render. I ensure scalable and reliable hosting solutions for your web projects.",
      icon: <Cloud className="h-4 w-4 mr-2 text-primary" />,
    },
  ];

  return (
    <div id="career">
      <ScrollTimeline
        events={careerEvents}
        title="What I Do"
        subtitle="Delivering comprehensive digital solutions that cover the entire lifecycle of professional product engineering."
        animationOrder="staggered"
        cardAlignment="alternating"
        cardVariant="elevated"
        parallaxIntensity={0.15}
        revealAnimation="fade"
        progressIndicator={true}
        lineColor="bg-primary/20"
        activeColor="bg-primary"
        progressLineWidth={3}
        progressLineCap="round"
      />
    </div>
  );
};
