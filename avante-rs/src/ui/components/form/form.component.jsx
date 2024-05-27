import { forwardRef } from "react";
import "./index.css";

function FormComponent({ children, className, ...props }, ref) {
  return (
    <form {...props} className={className} ref={ref}>
      {children}
    </form>
  );
}
export const Form = forwardRef(FormComponent);
