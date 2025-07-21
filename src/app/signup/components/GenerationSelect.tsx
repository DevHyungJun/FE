import { Select, SelectItem } from "@nextui-org/react";
import { GENERATIONS } from "@/constants/signup";

interface GenerationSelectProps {
  generation: string;
  setGeneration: (generation: string) => void;
}

export default function GenerationSelect({
  generation,
  setGeneration,
}: GenerationSelectProps) {
  return (
    <Select
      label="연령대"
      placeholder="고객님의 연령대를 선택해주세요"
      className="w-[50%]"
      selectedKeys={[generation]}
      onChange={(e) => setGeneration(e.target.value)}
      variant="underlined"
    >
      {GENERATIONS.map((gen) => (
        <SelectItem key={gen.key} value={gen.key}>
          {gen.label}
        </SelectItem>
      ))}
    </Select>
  );
}
