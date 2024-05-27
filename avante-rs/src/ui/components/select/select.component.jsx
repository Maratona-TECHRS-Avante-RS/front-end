import { FormControl, InputLabel } from "@mui/material";
import "./index.css";
import MenuItem from "@mui/material/MenuItem";
import { default as Slt } from "@mui/material/Select";

export function Select({ children, id, defaultOption, label, ...props }) {
  const idLabel = `${id}-label`;

  return (
    <FormControl sx={{ width: '100%', maxWidth: 500 }} >
      <InputLabel id={idLabel}>{label}</InputLabel>

      <Slt {...props} labelId={idLabel} id={id} label={label}>
        
        <MenuItem select value="" disabled>
          {defaultOption}
        </MenuItem>

        {children}
      </Slt>
    </FormControl>
  );
}
