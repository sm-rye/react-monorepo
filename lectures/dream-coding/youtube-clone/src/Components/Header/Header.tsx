import React, { useState } from "react";

import Logo from "./Logo";
import SearchForm from "./SearchForm";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");

  const resetKeyword = () => setKeyword("");

  const handleChange = (
    e: React.ChangeEvent<EventTarget & HTMLInputElement>
  ) => {
    setKeyword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword) return;

    navigate(`/videos/${keyword}`);
  };

  return (
    <div className="border">
      <Logo resetKeyword={resetKeyword} />
      <SearchForm
        onChange={handleChange}
        onSubmit={handleSubmit}
        keyword={keyword}
      />
    </div>
  );
}
