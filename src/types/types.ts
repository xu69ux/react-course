export interface ISearchResponse {
  results: ISearchResult[];
  total: number;
}

export interface ISearchResult {
  name: string;
  id: number;
}

export interface IPhilosopher {
  id: number;
  name: string;
  birth_year: string;
  death_year: string;
  idea: string;
  famous_work: string;
}

export interface IPhilosophersResponse {
  results: IPhilosopher[];
}
