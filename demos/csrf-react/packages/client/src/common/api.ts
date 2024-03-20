/* eslint-disable @typescript-eslint/no-explicit-any */

export type Review = {
  id?: number;
  text: string;
  userName?: string;
};

export const clearReviews = async (): Promise<Review[]> => {
  return fetch("/api/reviews/clear", {
    method: "post",
    credentials: "include",
    headers: {
      "x-csrf": 1,
    } as any,
  }).then((res) => res.json());

  // return fetch("/api/reviews", {
  //   method: "delete",
  //   credentials: "include",
  // }).then((res) => res.json());
};

export const postReviews = async (review: Review): Promise<Review[]> => {
  return fetch("/api/reviews", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-csrf": 1,
    } as any,
    credentials: "include",
    body: JSON.stringify(review),
  }).then((res) => res.json());
};

export const getReviews = async (): Promise<Review[]> => {
  return fetch("/api/reviews", {
    credentials: "include",
    headers: {
      "x-csrf": 1,
    } as any,
  }).then((res) => res.json());
};

export const logout = () => {
  return fetch("./api/auth/logout", {
    method: "post",
    credentials: "include",
    headers: {
      "x-csrf": 1,
    } as any,
  }).then((res) => res.json());
};

export const getSession = () => {
  return fetch("./api/auth/session", {
    credentials: "include",
    headers: {
      "x-csrf": 1,
    } as any,
  }).then((res) => res.json());
};
