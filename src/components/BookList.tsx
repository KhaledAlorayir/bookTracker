/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book } from "@/lib/types";
import { Save, Trash } from "lucide-react";
import React from "react";
import { useReadingList } from "@/lib/store/readingListStore";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  books: Book[];
};

export default function BookList({ books }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-4 place-items-center">
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </div>
  );
}

function Book({ book }: { book: Book }) {
  const { addBook, books, removeBook } = useReadingList();
  const isBookAdded = !!books[book.id];
  const { toast } = useToast();

  return (
    <Card key={book.id} className="w-80 lg:w-96">
      <CardHeader>
        <CardTitle>{book.volumeInfo.title}</CardTitle>
        <CardDescription>
          {book.volumeInfo.authors?.map((author, index) => (
            <span key={author}>
              {author} {index !== book.volumeInfo.authors!.length - 1 && ", "}
            </span>
          ))}
          - {book.volumeInfo.publishedDate}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src={book.volumeInfo.imageLinks?.thumbnail}
          alt={book.volumeInfo.title}
          className="w-36 h-52 mx-auto"
        />
      </CardContent>
      <CardFooter className="flex justify-end pb-2">
        {isBookAdded ? (
          <Button
            variant="destructive"
            className="h-10 rounded-md px-8 md:h-9 md:px-4 md:py-2"
            onClick={() => {
              removeBook(book.id);
              toast({
                title: "book has been removed from the reading list!",
              });
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="h-10 rounded-md px-8 md:h-9 md:px-4 md:py-2"
            onClick={() => {
              addBook(book);
              toast({ title: "book has been added to the reading list!" });
            }}
          >
            <Save className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
