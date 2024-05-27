import { Loading } from "../loading";
import "./index.css";

export function StatusReturnApi({ isLoading, hasError }) {
  return (
    <>
      {isLoading  && <Loading />}
      {hasError && (<p className="warring">{hasError}</p>)}
    </>
  );
}
