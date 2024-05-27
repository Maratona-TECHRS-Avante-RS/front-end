import "./index.css";

export function Container({ additionalClass, children }) {
  const fullClassName = additionalClass
    ? `container ${additionalClass}`
    : "container";
  return <div className={fullClassName}>{children}</div>;
}
