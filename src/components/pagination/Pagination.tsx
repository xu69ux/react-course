import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../redux/slices/searchSlice";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import "../../styles/Pagination.css";

interface IPaginationProps {
  totalResults: number;
}

export const Pagination: FC<IPaginationProps> = (props) => {
  const dispatch = useDispatch();
  const { pageSize, currentPage, searchResponse, loadingResults } = useSelector(
    (state: RootState) => state.search,
  );
  const { totalResults } = props;
  const navigate = useNavigate();

  const goToPrevPage = () => {
    const prevPage = currentPage - 1;
    navigate(`/search/page/${String(prevPage)}`);
    dispatch(actions.setCurrentPage(prevPage));
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    navigate(`/search/page/${String(nextPage)}`);
    dispatch(actions.setCurrentPage(nextPage));
  };

  const pageSizeIncrement = () => {
    dispatch(actions.setPageSize(pageSize + 1));
    navigate(`/search/page/1`);
    dispatch(actions.setCurrentPage(1));
  };

  const pageSizeDecrement = () => {
    dispatch(actions.setPageSize(pageSize - 1));
    navigate(`/search/page/1`);
    dispatch(actions.setCurrentPage(1));
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
          data-testid="prev-page"
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
          data-testid="next-page"
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
