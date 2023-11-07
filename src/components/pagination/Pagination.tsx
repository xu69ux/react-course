import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

import "../../styles/Pagination.css";

interface IPaginationProps {
  totalResults: number;
}

export const Pagination: FC<IPaginationProps> = (props) => {
  const {
    pageSize,
    setPageSize,
    loadingResults,
    currentPage,
    setCurrentPage,
    searchResponse,
  } = useSearch();
  const { totalResults } = props;
  const navigate = useNavigate();

  const goToPrevPage = () => {
    const prevPage = currentPage - 1;
    navigate(`/search/page/${String(prevPage)}`);
    setCurrentPage(prevPage);
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    navigate(`/search/page/${String(nextPage)}`);
    setCurrentPage(nextPage);
  };

  const pageSizeIncrement = () => {
    setPageSize(pageSize + 1);
    navigate(`/search/page/1`);
    setCurrentPage(1);
  };

  const pageSizeDecrement = () => {
    setPageSize(pageSize - 1);
    navigate(`/search/page/1`);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    if (searchResponse?.total === 0) {
      return null;
    }
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
          page {currentPage} of {Math.ceil(totalResults / pageSize)}
        </span>
        <button
          className={
            currentPage === Math.ceil(totalResults / pageSize)
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

  if (loadingResults) {
    return null;
  }
  return renderPagination();
};
