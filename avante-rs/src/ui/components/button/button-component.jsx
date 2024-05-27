import "./index.css"; 
import {default as Btn} from '@mui/material/Button';


export function Button({ children, additionalClass, ...props }) {
  const fullClassName = additionalClass
    ? `button ${additionalClass}`
    : "button";
  return (
    <Btn variant="contained" className={fullClassName} {...props}>
      {children}
    </Btn>
  );
}
