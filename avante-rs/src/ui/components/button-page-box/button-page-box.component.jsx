import { Button } from "../index";
import "./index.css";

export function ButtonPageBox({ page, setPage, totalPages }) {
  function proximaPagina(proxima) {
    if (proxima) {
      setPage((olderPage) => olderPage + 1);
    } else {
      setPage((olderPage) => olderPage - 1);
    }
  }

  return (
    <div className="page-box">
      <Button
        children="Previous"
        onClick={() => proximaPagina(false)}
        additionalClass="button-page"
      />
      <span>
        {page + 1} - {totalPages}
      </span>
      <Button
        children="Next"
        onClick={() => proximaPagina(true)}
        additionalClass="button-page"
      />
    </div>
  );
}
