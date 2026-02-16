import { Slider } from "./Slider";
import "./SliderGrid.css";

type SliderConfig = {
  title: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

export const SliderGrid = ({
  sliders,
  maxValue = 0.1,
  step = 0.001,
  columns = 3,
}: {
  sliders: SliderConfig[];
  maxValue?: number;
  step?: number;
  columns?: number;
}) => {
  return (
    <div
      className="slider-grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {sliders.map(({ title, value, setValue }) => (
        <Slider
          key={title}
          title={title}
          value={value}
          setValue={setValue}
          maxValue={maxValue}
          step={step}
        />
      ))}
    </div>
  );
};
