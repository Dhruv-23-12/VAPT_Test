import React from "react";
import "./AnimatedScaleInHeading.css";

interface AnimatedSlideInTextProps {
  text: string;
}

const AnimatedSlideInText: React.FC<AnimatedSlideInTextProps> = ({ text }) => {
  return (
    <p className="slidein-subheading">
      {text.split("").map((char, idx) => (
        <span
          key={idx}
          className={"slidein-char animate"}
          style={{ animationDelay: `${idx * 0.02 + 0.5}s` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </p>
  );
};

export default AnimatedSlideInText; 