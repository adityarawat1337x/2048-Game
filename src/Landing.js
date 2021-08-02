import React from "react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./landing.css";
const pageTranstion = {
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: "-100%",
  },
};

export default function Landing() {
  return (
    <>
      <motion.section
        initial="out"
        animate="in"
        exit="out"
        variants={pageTranstion}
      >
        <div className="box">
          <div className="container">
            <motion.div
              className="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: 1.2 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="title">2048</h3>
              <Link to="/game">Let's Play</Link>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
