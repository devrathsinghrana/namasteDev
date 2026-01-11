import React, { useEffect, useState } from "react";

const ProgressBarComp = () => {
  //whenever width is updated in css browser needs to repaint again and again
  //so it leads to jerk issues when loading progress bar by increase width value in css dynamically
  //to avoid that we can use transform property to move the inner progress bar along x axis to animate increasing progress bar
  //transform property does not need repainting of browser so it will be smooth transition without jerk issues
  //as we will move the progress bar along x-axis
  const ProgressBar = ({ progress }) => {
    const [animatedProgressValue, setAnimatedProgressValue] = useState(0);
    useEffect(() => {
      setTimeout(() => {
        setAnimatedProgressValue(progress);
      }, 100);
    }, [progress]);
    return (
      <div className="progress-bar-outer">
        <div
          className="progress-bar-inner"
          style={{
            transform: `translateX(${animatedProgressValue - 100}%)`,
          }}
        />
        <span className="progress-value">{progress}%</span>
      </div>
    );
  };
  const progressBarValues = [0, 5, 10, 20, 30, 50, 80, 100];
  return (
    <div>
      {progressBarValues.map((progressValue, index) => (
        <ProgressBar
          key={`${index}-${progressValue}`}
          progress={progressValue}
        />
      ))}
    </div>
  );
};

export default ProgressBarComp;
