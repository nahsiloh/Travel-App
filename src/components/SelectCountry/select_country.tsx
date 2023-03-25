import React from "react";
import { useState } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";

const SelectCountry: React.FC = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");

  const selectCountry = (val: string) => {
    setCountry(val);
  };

  const selectRegion = (val: string) => {
    setRegion(val);
  };

  return (
    <div>
      <CountryDropdown value={country} onChange={(val) => selectCountry(val)} />
      <RegionDropdown
        country={country}
        value={region}
        onChange={(val) => selectRegion(val)}
      />
    </div>
  );
};

export default SelectCountry;
