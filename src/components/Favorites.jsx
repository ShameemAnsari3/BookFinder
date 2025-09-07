const Favorites = ({ favorites, toggleFavorite }) => (
  <section className="mt-12">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Favorites ❤️
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {favorites.map((book) => (
        <div
          key={book.key}
          className="bg-white rounded-lg shadow-md overflow-hidden relative"
        >
          <button
            onClick={() => toggleFavorite(book)}
            className="absolute top-2 right-2 text-xl text-red-500"
            aria-label="Remove from Favorites"
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="text-gray-500 flex flex-col items-center">
                <i className="fas fa-book-open text-3xl mb-1"></i>
                <p className="text-xs">No cover</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">
              {book.title}
            </h3>
            <p className="text-gray-600 mb-2">
              {book.author_name?.join(", ") || "Unknown Author"}
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Favorites;
