export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[] | undefined;
    publishedDate: string;
    imageLinks:
      | {
          smallThumbnail: string;
          thumbnail: string;
        }
      | undefined;
  };
}

export interface PaginatedResponse<T> {
  kind: string;
  totalItems: number;
  items: T[] | undefined;
  currentStartIndex: number;
}
