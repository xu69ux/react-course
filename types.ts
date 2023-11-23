export interface APIResponse {
  results: Philosopher[];
  total: number;
}

export interface Philosopher {
  birth_year: number;
  death_year: number;
  famous_work: string;
  id: number;
  ideas: string;
  name: string;
}