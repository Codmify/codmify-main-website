"use client";
import React, { useState } from "react";

const useHireUs = () => {
  const [selected, setSelected] = useState<String[]>([]);
  const handleClick = (value: string) => {
    setSelected((prevItems) => {
      const index = prevItems.indexOf(value);
      if (index !== -1) {
        return prevItems.filter((item) => item !== value);
      } else {
        return [...prevItems, value];
      }
    });
  };

  return { selected, setSelected, handleClick };
};

export default useHireUs;
