import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useBooks, fetchBooksByQuery } from "@/lib/api/useBooks";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import BookList from "@/components/BookList";
import { Book, PaginatedResponse } from "@/lib/types";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { INITIAL_QUERY } from "@/lib/const";
import Loading from "@/components/ui/Loading";

export const getStaticProps: GetStaticProps<{
  initialBooks: PaginatedResponse<Book>;
}> = async () => {
  const initialBooks = await fetchBooksByQuery(INITIAL_QUERY, {
    maxResults: 40,
    startIndex: 0,
  });
  return { props: { initialBooks } };
};

export default function Home({
  initialBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchQuery, setSearchQuery] = useState(INITIAL_QUERY);
  const books = useBooks(searchQuery, initialBooks);
  return (
    <main className="flex-1 flex flex-col">
      <SearchInput onSearch={(query) => setSearchQuery(query)} />
      {books.isLoading ? (
        <Loading />
      ) : books.isError ? (
        <section className="flex-1 flex justify-center items-center">
          <p className="text-lg">ops...., something went wrong ;(</p>
        </section>
      ) : !!books.searchResult ? (
        <section className="pt-8">
          <InfiniteScroll
            dataLength={books.searchResult.length}
            next={books.fetchNextPage}
            hasMore={!!books.hasNextPage}
            loader={
              books.isFetchingNextPage && (
                <div className="py-8">
                  <Loading size="SM" />
                </div>
              )
            }
          >
            <BookList books={books.searchResult} />
          </InfiniteScroll>
        </section>
      ) : null}
    </main>
  );
}

function SearchInput({
  onSearch,
}: {
  onSearch: (searchQuery: string) => void;
}) {
  const [searchInputValue, setSearchInputValue] = useState("");

  function searchSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchInputValue.trim().length) {
      onSearch(searchInputValue.trim());
    }
  }
  return (
    <form
      className="flex w-full max-w-lg items-center space-x-2 mx-auto"
      onSubmit={searchSubmitHandler}
    >
      <Input
        type="text"
        placeholder="title, author, or ISBN..."
        required
        maxLength={180}
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />
      <Button variant="outline" size="lg">
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
