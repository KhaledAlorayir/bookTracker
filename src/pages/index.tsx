import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { useBooks } from "@/lib/api/useBooks";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const books = useBooks(searchQuery);

  function searchSubmitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (searchInputValue.trim().length) {
      setSearchQuery(searchInputValue.trim());
    }
  }

  return (
    <main>
      <form
        className="flex max-w-lg items-center space-x-2 mx-auto"
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
    </main>
  );
}
