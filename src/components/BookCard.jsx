const BookCard = ({ book, isFavorite, toggleFavorite }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
    {/* Favorite Button */}
    <button
      onClick={() => toggleFavorite(book)}
      className="absolute top-2 right-2 text-xl"
      aria-label="Toggle Favorite"
    >
      <i
        className={`fas fa-heart ${
          isFavorite ? "text-red-500" : "text-gray-300 hover:text-red-400"
        }`}
      ></i>
    </button>

    {/* Book Cover */}
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

    {/* Info */}
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-1 line-clamp-1">
        {book.title}
      </h3>
      <p className="text-gray-600 mb-2">
        {book.author_name?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-sm text-gray-500">
        Published: {book.first_publish_year || "Unknown"}
      </p>
    </div>
  </div>
);

export default BookCard;
