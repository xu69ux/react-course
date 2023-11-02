import axios from "axios";

export function getAllCharacters() {
  return axios
    .get("https://rickandmortyapi.com/api/character/?page=1")
    .then((response) => {
      return response.data.results;
    });
}

export function getCharactersByName(searchTerm: string) {
  const trimSearchTerm = searchTerm.trim();
  return axios
    .get(`https://rickandmortyapi.com/api/character/?name=${trimSearchTerm}`)
    .then((response) => {
      return response.data.results;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Not found");
      }
      throw error;
    });
}
