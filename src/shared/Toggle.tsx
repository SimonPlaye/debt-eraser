
import "./Toggle.css";

export const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}) => {
  return (
    <label className="toggle">
      <span className="toggle-label">{label}</span>

      <button
        type="button"
        role="switch"
        aria-checked={value}
        className={`toggle-switch ${value ? "on" : "off"}`}
        onClick={() => onChange(!value)}
      >
        <span className="toggle-thumb" />
      </button>
    </label>
  );
};