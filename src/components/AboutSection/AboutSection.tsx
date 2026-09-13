import { motion } from "framer-motion";

export const AboutSection = () => {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-24">
      <motion.div
        className="flex flex-col gap-8 items-center text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Passionate about <span className="text-gradient-primary">Digital Excellence</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am a developer with expertise in React, JavaScript, HTML, and CSS, focused on building responsive 
              and user-centric web applications. Skilled in modern UI frameworks like SASS, Bootstrap, and 
              Material UI to deliver clean and scalable designs. Experienced in API integration and 
              third-party services, with working knowledge of Node.js, MongoDB, and PostgreSQL. Familiar 
              with deploying applications on AWS and Render. Committed to clean code, continuous learning, 
              and delivering high-quality user experiences.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

