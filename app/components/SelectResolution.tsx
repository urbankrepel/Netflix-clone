"use client";
import React, { useState } from "react";
import Select from "./Select";

interface SelectResolutionProps {
  tier: number;
  openUpgradeModal: () => void;
}

const SelectResolution: React.FC<SelectResolutionProps> = ({
  tier,
  openUpgradeModal,
}) => {
  const [selectedResolution, setSelectedResolution] = useState<number>(0);

  const resolutions = ["480p", "720p", "1080p", "1440p", "4k"];
  const tierForResolutions = [0, 1, 1, 2, 3];

  const handleResolutionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (tier < 1) {
      return;
    }
    const resolution = resolutions.indexOf(event.target.value);
    if (tierForResolutions[resolution] > tier) {
      openUpgradeModal();
      return;
    }
    setSelectedResolution(resolution);
  };

  return (
    <form>
      <label htmlFor="resolution">Select Resolution:</label>
      <div className="flex gap-x-2">
        <Select
          options={resolutions}
          onChange={handleResolutionChange}
          value={resolutions[selectedResolution]}
        />
      </div>
    </form>
  );
};

export default SelectResolution;
