import { useInfiniteQuery } from "@tanstack/react-query";
import { Book, PaginatedResponse } from "../types";
import { BOOKS_ENDPOINT, INITIAL_QUERY, MAX_RESULTS_COUNT } from "../const";
import { useMemo } from "react";
import { parseSearchQuery } from "../utils";
interface PaginationQuery {
  startIndex: number;
  maxResults: number;
}

export async function fetchBooksByQuery(
  searchQuery: string,
  { startIndex, maxResults }: PaginationQuery
): Promise<PaginatedResponse<Book>> {
  const results = await fetch(
    `${BOOKS_ENDPOINT}?q=${parseSearchQuery(
      searchQuery
    )}&startIndex=${startIndex}&maxResults=${maxResults}`
  );
  const books = await results.json();
  return { ...books, currentStartIndex: startIndex };
}

export function useBooks(
  searchQuery: string,
  initialData: PaginatedResponse<Book>
) {
  const infiniteQuery = useInfiniteQuery({
    queryKey: ["books", searchQuery],
    queryFn: async ({ pageParam = 0 }) =>
      fetchBooksByQuery(searchQuery, {
        startIndex: pageParam,
        maxResults: MAX_RESULTS_COUNT,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.totalItems > lastPage.currentStartIndex
        ? lastPage.currentStartIndex + MAX_RESULTS_COUNT
        : undefined;
    },
    initialData: () =>
      searchQuery === INITIAL_QUERY
        ? { pageParams: [0], pages: [initialData] }
        : undefined,
  });

  return {
    ...infiniteQuery,
    searchResult: useMemo(() => {
      // parsing results + removing duplicates (API returns duplicates for some reason)
      return infiniteQuery.data?.pages
        .map((page) => page.items)
        .flat()
        .filter(
          (book, index, self): book is Book =>
            !!book && index === self.findIndex((b) => book?.id === b?.id)
        );
    }, [infiniteQuery.data]),
  };
}
