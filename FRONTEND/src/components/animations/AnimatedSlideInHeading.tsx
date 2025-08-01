import React from "react";
import "./AnimatedSlideInHeading.css";

interface AnimatedSlideInHeadingProps {
  text: string;
}

const AnimatedSlideInHeading: React.FC<AnimatedSlideInHeadingProps> = ({ text }) => {
  return (
    <h1 className="slidein-heading">
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className="slidein-char"
          style={{ animationDelay: `${idx * 0.07}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
};

export default AnimatedSlideInHeading; 