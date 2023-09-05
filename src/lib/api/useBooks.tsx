import { useInfiniteQuery } from "@tanstack/react-query";
import { Book } from "../types";
import { MAX_RESULTS_COUNT } from "../const";
import { useMemo } from "react";

interface PaginationQuery {
  page: number;
  maxResults: number;
}

interface PaginatedResponse<T> {
  kind: string;
  totalItems: number;
  items: T[] | undefined;
  currentPage: number;
}

async function fetchBooksByQueryAndPage(
  searchQuery: string,
  { page, maxResults }: PaginationQuery
): Promise<PaginatedResponse<Book>> {
  const results = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&page=${page}&maxResults=${maxResults}`
  );
  const books = await results.json();
  return { ...books, currentPage: page };
}

export function useBooks(searchQuery: string) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: async ({ pageParam = 0 }) =>
      fetchBooksByQueryAndPage(searchQuery, {
        page: pageParam,
        maxResults: MAX_RESULTS_COUNT,
      }),
    getNextPageParam: (lastPage) => {
      const maxPage = Math.ceil(lastPage.totalItems / MAX_RESULTS_COUNT);
      return maxPage < lastPage.currentPage
        ? lastPage.currentPage + 1
        : undefined;
    },
    enabled: !!searchQuery.trim().length,
  });

  return {
    ...infiniteQuery,
    searchResult: useMemo(() => {
      return infiniteQuery.data?.pages.map((page) => page.items).flat();
    }, [infiniteQuery.data]),
  };
}
