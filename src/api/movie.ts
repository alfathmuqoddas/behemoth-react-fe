import { publicApi } from "./intance";

export type TMovie = {
  id: string;
  imdbId: string;
  title: string;
  year: number;
  rated: string;
  released: string;
  runtime: number;
  genre: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  poster: string;
  imdbRating: number;
  boxOffice: string;
  createdAt: string;
  updatedAt: string;
};

export type TMovieResponse = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  movies: TMovie[];
};

export const movieService = {
  getAll: async (
    page: number,
    size: number,
    title: string
  ): Promise<TMovieResponse> => {
    const { data } = await publicApi.get("api/movies/get", {
      params: {
        page,
        size,
        title,
      },
    });
    return data;
  },
  getById: async (id: string): Promise<TMovie> => {
    const { data } = await publicApi.get(`api/movies/get/${id}`);
    return data;
  },
};
