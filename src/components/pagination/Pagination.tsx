import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Pagination.css";

interface PaginationProps {
  setPage: (page: number) => void;
  totalCount: number;
  loading: boolean;
  pageSize: number;
  setPageSize: (pageSize: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { setPage, totalCount, loading, pageSize, setPageSize } = props;
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

  const pageSizeIncrement = () => {
    setPageSize(pageSize + 1);
  };

  const pageSizeDecrement = () => {
    setPageSize(pageSize - 1);
  };

  const renderPagination = () => {
    return (
      <div className="pagination">
        <button
          className="pagination__btn decrement"
          onClick={pageSizeDecrement}
        >
          -
        </button>
        <span className="pagination__limit">page limit: {pageSize}</span>
        <button
          className="pagination__btn increment"
          onClick={pageSizeIncrement}
        >
          +
        </button>
        <button
          className={
            currentPage === 1
              ? "pagination__btn prev disabled"
              : "pagination__btn"
          }
          onClick={goToPrevPage}
        >
          &lt;
        </button>
        <span className="pagination__page">
          page {currentPage} of {Math.ceil(totalCount / pageSize)}
        </span>
        <button
          className={
            currentPage === Math.ceil(totalCount / pageSize)
              ? "pagination__btn next disabled"
              : "pagination__btn"
          }
          onClick={goToNextPage}
        >
          &gt;
        </button>
      </div>
    );
  };

  if (loading) {
    return null;
  }
  return renderPagination();
};
