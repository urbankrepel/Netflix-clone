"use client";
import React, { useState } from "react";
import Select from "./Select";

const SelectResolution = () => {
  const [selectedResolution, setSelectedResolution] = useState("");

  const resolutions = ["480p", "720p", "1080p", "1440p", "4k"];

  const handleResolutionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const resolution = event.target.value;
    console.log(resolution);
  };

  return (
    <form>
      <label htmlFor="resolution">Select Resolution:</label>
      <div className="flex gap-x-2">
        <Select options={resolutions} onChange={handleResolutionChange} />
      </div>
    </form>
  );
};

export default SelectResolution;
