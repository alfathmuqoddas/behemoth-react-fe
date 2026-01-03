import { privateApi, publicApi } from "./intance";

export type TReview = {
  id: string;
  userId: string;
  movieId: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
};

export type TReviewResponse = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  reviews: TReview[];
};

export const reviewService = {
  getByMovieId: async (
    movieId: string,
    page: number,
    size: number
  ): Promise<TReviewResponse> => {
    const { data } = await publicApi.get(`api/reviews/getByMovie/${movieId}`, {
      params: {
        page,
        size,
      },
    });
    return data;
  },
  create: async (
    movieId: string,
    rating: number,
    review: string,
    userId: string,
    userName: string
  ) => {
    const { data } = await privateApi.post(`api/reviews/add`, {
      userId,
      userName,
      movieId,
      rating,
      review,
    });
    return data;
  },
  delete: async (id: string) => {
    const { data } = await privateApi.delete(`api/reviews/delete/${id}`);
    return data;
  },
};
