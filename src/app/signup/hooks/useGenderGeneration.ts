import { useState } from "react";

const useGenderGeneration = () => {
  const [gender, setGender] = useState("");
  const [generation, setGeneration] = useState("");

  return { gender, setGender, generation, setGeneration };
};

export default useGenderGeneration;
