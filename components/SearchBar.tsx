"use client";
import React, { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";

const SearchBar = () => {
  const [manufacturer, setmanufacturer] = useState("");
  const handleSearch = () => {};
  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="serachbar__item">
        <SearchManufacturer manufacturer={manufacturer} />
      </div>
    </form>
  );
};

export default SearchBar;
