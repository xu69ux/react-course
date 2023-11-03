import { Pagination } from "../pagination/Pagination";
import { SearchResult } from "./SearchResult";
import { ISearchResult } from "./SearchResult";

interface SearchPageProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
  searchResults: ISearchResult[];
  badRequest: boolean;
  loading: boolean;
}
export const SearchPage: React.FC<SearchPageProps> = (props) => {
  const { page, setPage, searchResults, badRequest, loading } = props;

  return (
    <>
      <Pagination page={page} setPage={setPage} totalPages={4} />
      <SearchResult
        searchResults={searchResults}
        badRequest={badRequest}
        loading={loading}
      />
    </>
  );
};
