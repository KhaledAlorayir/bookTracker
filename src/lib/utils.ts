import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ISBN from "isbn3";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseSearchQuery(searchQuery: string) {
  const ISBNParse = ISBN.parse(searchQuery);
  return ISBNParse && ISBNParse.isValid
    ? `+isbn:${ISBNParse.isbn13}`
    : searchQuery;
}
