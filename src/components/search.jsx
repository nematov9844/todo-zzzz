import React from "react";
import { useTodoContext } from "../context/todoContext";

const Search = () => {
  const { dispatch } = useTodoContext();

  const handleSearch = (e) => {
    dispatch({ type: "SEARCH_TODO", payload: e.target.value });
  };

  return (
<>
<input
      type="text"
      placeholder="Search todos..."
      className="border rounded-md p-2 w-full mb-2 placeholder:text-blue-500 font-bold text-black outline-none"
      onChange={handleSearch}
    />
</>
  );
};

export default Search;
