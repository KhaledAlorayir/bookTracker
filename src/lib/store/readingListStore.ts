import { Book } from "../types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ReadingListStore {
  books: Record<string, Book>;
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
}

export const useReadingList = create(
  persist<ReadingListStore>(
    (set) => ({
      books: {},
      addBook: (book) => {
        set((store) => ({ books: { ...store.books, [book.id]: book } }));
      },
      removeBook: (bookId) => {
        set((store) => ({
          books: Object.fromEntries(
            Object.entries(store.books).filter(([id]) => id !== bookId)
          ),
        }));
      },
    }),
    { name: "reading-list", skipHydration: true }
  )
);
