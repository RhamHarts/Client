import React from "react";

const SearchBarProfile = () => {
  return (
    <div className="w-[700px] flex items-center">
      <img
        className="relative left-12 w-8 h-8 z-50"
        alt="Search icon"
        src="/search.png"
      />
      <input
        className="w-full bg-gray-200 text-gray-500 font-semibold text-center text-lg px-4 py-3 h-14 box-border rounded-3xl"
        placeholder="Search for a tag, artist, category"
        type="text"
      />
    </div>
  );
};

export default SearchBarProfile;
