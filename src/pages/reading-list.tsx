import BookList from "@/components/BookList";
import { useReadingList } from "@/lib/store/readingListStore";

export default function ReadingList() {
  const books = Object.values(useReadingList((store) => store.books));
  return (
    <main className="flex-1 flex flex-col py-4">
      {!!books.length ? (
        <BookList books={books} />
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <h3 className="text-lg">no books have been added</h3>
        </div>
      )}
    </main>
  );
}
