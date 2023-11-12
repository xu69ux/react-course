import axios from "axios";
import {
  getAllPhilosophers,
  getPhilosopherByName,
  getPhilosopherById,
} from "../utils/usefulFuncs";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

test("getAllPhilosophers", async () => {
  const page = 1;
  const pageSize = 10;

  mockedAxios.get.mockResolvedValue({ data: "data" });

  const data = await getAllPhilosophers(page, pageSize);

  expect(data).toBe("data");
  expect(mockedAxios.get).toHaveBeenCalledWith(
    `https://belka.romakhin.ru/api/v1/filosofem?page=${
      page - 1
    }&page_size=${pageSize}`,
  );
});

test("getPhilosopherByName", async () => {
  const searchTerm = "test";
  const page = 1;
  const pageSize = 10;

  mockedAxios.get.mockResolvedValue({ data: "data" });

  const data = await getPhilosopherByName(searchTerm, page, pageSize);

  expect(data).toBe("data");
  expect(mockedAxios.get).toHaveBeenCalledWith(
    `https://belka.romakhin.ru/api/v1/filosofem?page=${
      page - 1
    }&page_size=${pageSize}&search.name=${searchTerm.trim()}`,
  );
});

test("getPhilosopherById", async () => {
  const id = 1;

  mockedAxios.get.mockResolvedValue({ data: "data" });

  const data = await getPhilosopherById(id);

  expect(data).toBe("data");
  expect(mockedAxios.get).toHaveBeenCalledWith(
    `https://belka.romakhin.ru/api/v1/filosofem/${id}`,
  );
});
