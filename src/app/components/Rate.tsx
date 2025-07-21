import { Rate as AntRate } from "antd";

interface RateProps {
  value: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: number;
}

const Rate = ({ value, onChange, disabled, size = 32 }: RateProps) => {
  return (
    <AntRate
      value={value}
      onChange={onChange}
      disabled={disabled}
      style={{
        fontSize: `${size}px`,
        textAlign: "right",
        width: "100%",
      }}
    />
  );
};

export default Rate;
