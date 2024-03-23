"use client";

import PulseLoader from "react-spinners/PulseLoader";

interface LoadingProps {
  color?: string;
}

const LoadingItem: React.FC<LoadingProps> = ({ color = "red" }) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PulseLoader color={color} />
    </div>
  );
};

export default LoadingItem;
