export interface ISearchResponse {
  results: ISearchResult[];
  total: number;
}

export interface ISearchResult {
  name: string;
  id: number;
}
