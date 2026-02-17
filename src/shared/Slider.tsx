import "./Slider.css";

export const Slider = ({
  title,
  value,
  setValue,
  minValue = 0,
  maxValue = 1,
  step = 0.01,
}: {
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
  step?: number;
}) => {
  return (
    <div>
      <label htmlFor="slider">
        {title}: {Math.round(value * 1000) / 10}%
      </label>
      <input
        type="range"
        className="custom-slider"
        id="slider"
        min={minValue}
        max={maxValue}
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    </div>
  );
};
