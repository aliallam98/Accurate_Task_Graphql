/* eslint-disable react/prop-types */
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Size switch demo" } };

export default function SwitchState({ active, setActive }) {
  return (
    <div>
      <Switch
        {...label}
        checked={active}
        onChange={() => setActive((prev) => !prev)}
      />
    </div>
  );
}
