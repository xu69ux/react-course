import "../../styles/Pagination.css";

interface PaginationProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { page, setPage, totalPages } = props;

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className={
          page === 1 ? "pagination__btn prev disable" : "pagination__btn"
        }
        onClick={prevPage}
      >
        &lt;
      </button>
      <span className="pagination__page">
        page {page} of {totalPages}
      </span>
      <button
        className={
          page === totalPages
            ? "pagination__btn next disable"
            : "pagination__btn"
        }
        onClick={nextPage}
      >
        &gt;
      </button>
    </div>
  );
};
