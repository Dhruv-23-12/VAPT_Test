import React from "react";
import "./AnimatedScaleInHeading.css";

interface AnimatedScaleInHeadingProps {
  text: string;
}

const AnimatedScaleInHeading: React.FC<AnimatedScaleInHeadingProps> = ({ text }) => {
  const words = text.split(" ");
  return (
    <h2 className="scalein-heading">
      {words.map((word, idx) => (
        <span
          key={idx}
          className={"scalein-word animate"}
          style={{ animationDelay: `${idx * 0.15}s` }}
        >
          {word}{" "}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedScaleInHeading; 