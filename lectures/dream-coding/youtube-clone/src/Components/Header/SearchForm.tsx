import React from "react";

import { IoMdSearch } from "react-icons/io";

export default function SearchForm({
  onChange,
  onSubmit,
  keyword,
}: {
  onChange: (e: React.ChangeEvent<EventTarget & HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  keyword?: string;
}) {
  return (
    <form onSubmit={onSubmit}>
      <input onChange={onChange} value={keyword} />
      <button type="submit">
        <span>
          <IoMdSearch />
        </span>
      </button>
    </form>
  );
}
