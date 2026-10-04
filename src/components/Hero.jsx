import "./Hero.css";
import { motion } from "motion/react";

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Prediction Intelligence
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <span>Understand </span>
        <span> the</span>
        <span> market </span>
        <span>before </span>
        <span>you </span>
        <span>trade</span>
      </motion.h1>

      <motion.a
        href="#markets"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        Explore Market
      </motion.a>
    </motion.section>
  );
};

export default Hero;
