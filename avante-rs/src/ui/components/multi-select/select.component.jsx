import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { default as Slt } from "@mui/material/Select";

export function MultiSelect({ children, id, defaultOption, label, ...props }) {
  const idLabel = `${id}-label`;

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450,
      },
    },
  };

  return (
    <FormControl sx={{ width: '100%', maxWidth: 500  }} >
    <InputLabel id={idLabel}>{label}</InputLabel>
    
      <Slt
      {...props}
        labelId={idLabel}
        input={<OutlinedInput label={label} />}
        id={id}

        multiple
        MenuProps={MenuProps}
      >
        {children}
      </Slt>
    </FormControl>
  );
}
