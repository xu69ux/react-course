import axios from "axios";

export function getAllPhilosophers(page: number, pageSize: number) {
  const queryPage = page - 1;
  return axios
    .get(
      `https://belka.romakhin.ru/api/v1/filosofem?page=${queryPage}&page_size=${pageSize}`,
    )
    .then((response) => {
      return response.data;
    });
}

export function getPhilosopherByName(
  searchTerm: string,
  page: number,
  pageSize: number,
) {
  const queryPage = page - 1;
  const trimSearchTerm = searchTerm.trim();
  return axios
    .get(
      `https://belka.romakhin.ru/api/v1/filosofem?page=${queryPage}&page_size=${pageSize}&search.name=${trimSearchTerm}`,
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Not found");
      }
      throw error;
    });
}

export function getPhilosopherById(id: number) {
  return axios
    .get(`https://belka.romakhin.ru/api/v1/filosofem/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Not found");
      }
      throw error;
    });
}
