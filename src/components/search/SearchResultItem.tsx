import { FC } from "react";
import { Link } from "react-router-dom";
import { ISearchResult } from "../../types/types";

interface SearchResultItemProps {
  result: ISearchResult;
  onClick: () => void;
}

export const SearchResultItem: FC<SearchResultItemProps> = ({
  result,
  onClick,
}) => {
  return (
    <li key={result.id}>
      <Link
        data-testid="search-result-item"
        to={`details/${result.id}`}
        className="list__link"
        onClick={onClick}
      >
        <div className="list__id">{`id: ${result.id}`}</div>
        <div className="list__name">{`name: ${result.name}`}</div>
      </Link>
    </li>
  );
};
