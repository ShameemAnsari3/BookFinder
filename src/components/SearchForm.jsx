const SearchForm = ({
  searchType,
  setSearchType,
  query,
  setQuery,
  loading,
  searchBooks,
  clearSearch,
  hasSearched,
}) => (
  <section className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <form onSubmit={searchBooks} className="mb-6">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Type */}
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by
          </label>
          <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
            {["title", "author", "subject"].map((type) => (
              <button
                key={type}
                type="button"
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium ${
                  searchType === type
                    ? "bg-white text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setSearchType(type)}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="w-full md:w-2/4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {searchType === "title"
              ? "Book Title"
              : searchType === "author"
              ? "Author Name"
              : "Subject or Genre"}
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${searchType}...`}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button */}
        <div className="w-full md:w-1/4 flex items-end">
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Find Books"}
          </button>
        </div>
      </div>
      {hasSearched && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={clearSearch}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-times mr-1"></i> Clear search
          </button>
        </div>
      )}
    </form>
  </section>
);

export default SearchForm;
