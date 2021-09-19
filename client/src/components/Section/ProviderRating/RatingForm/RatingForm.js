import React from "react";
import Star from "./Star";

const RatingStars = () => {
  const [gradeIndex, setGradeIndex] = useState();

  const GRADES = ["Malo", "Pobre", "Bueno", "Muy bueno", "Ecelente"];

  const activeStar = {
    fill: "yellow",
  };

  const changeGradeIndex = (index) => {
    setGradeIndex(index);
  };

  return (
    <div className="star-container">
      <h1 className="result">
        {GRADES[gradeIndex] ? GRADES[gradeIndex] : "Sin valoración aún"}
      </h1>
      <div className="stars">
        {GRADES.map((grade, index) => (
          <Star
            index={index}
            key={grade}
            changeGradeIndex={changeGradeIndex}
            style={gradeIndex > index ? activeStar : {}}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingStars;
