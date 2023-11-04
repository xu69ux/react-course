import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Pagination.css";

interface PaginationProps {
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { setPage, totalPages } = props;
  const [limit, setLimit] = useState(20);
  const params = useParams();
  const currentPage = Number(params.page);
  const navigate = useNavigate();

  const goToPrevPage = () => {
    const prevPage = currentPage - 1;
    navigate(`/search/page/${String(prevPage)}`);
    setPage(prevPage);
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    navigate(`/search/page/${String(nextPage)}`);
    setPage(nextPage);
  };

  const limitIncrement = () => {
    setLimit((prevState: number) => prevState + 1);
  };

  const limitDecrement = () => {
    setLimit((prevState: number) => prevState - 1);
  };

  return (
    <div className="pagination">
      <button className="pagination__btn decrement" onClick={limitDecrement}>
        -
      </button>
      <span className="pagination__limit">page limit: {limit}</span>
      <button className="pagination__btn increment" onClick={limitIncrement}>
        +
      </button>
      <button
        className={
          currentPage === 1 ? "pagination__btn prev disable" : "pagination__btn"
        }
        onClick={goToPrevPage}
      >
        &lt;
      </button>
      <span className="pagination__page">
        page {currentPage} of {totalPages}
      </span>
      <button
        className={
          currentPage === totalPages
            ? "pagination__btn next disable"
            : "pagination__btn"
        }
        onClick={goToNextPage}
      >
        &gt;
      </button>
    </div>
  );
};
