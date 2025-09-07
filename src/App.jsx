import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import BookCard from "./components/BookCard";
import Favorites from "./components/Favorites";
import Footer from "./components/Footer";

const App = () => {
  const [searchType, setSearchType] = useState("title");
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [networkStatus, setNetworkStatus] = useState(navigator.onLine);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Network status listener
  useEffect(() => {
    const handleOnline = () => setNetworkStatus(true);
    const handleOffline = () => setNetworkStatus(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch books from OpenLibrary API
  const fetchBooks = async (reset = false) => {
    if (!query.trim()) return;
    if (!networkStatus) {
      setError("You are offline. Please check your internet connection.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let apiUrl = `https://openlibrary.org/search.json?${searchType}=${encodeURIComponent(
        query
      )}&page=${page}`;
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const data = await response.json();
      if (!data.docs || data.docs.length === 0) {
        if (reset) setBooks([]);
        setError(`No books found for "${query}".`);
      } else {
        setBooks((prev) =>
          reset ? data.docs.slice(0, 20) : [...prev, ...data.docs.slice(0, 20)]
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const searchBooks = (e) => {
    e.preventDefault();
    setHasSearched(true);
    setPage(1);
    fetchBooks(true);
  };

  const loadMore = () => setPage((prev) => prev + 1);

  useEffect(() => {
    if (page > 1) fetchBooks();
  }, [page]);

  const clearSearch = () => {
    setQuery("");
    setBooks([]);
    setHasSearched(false);
    setError(null);
    setPage(1);
  };

  // Favorites handler
  const toggleFavorite = (book) => {
    if (favorites.some((fav) => fav.key === book.key)) {
      setFavorites(favorites.filter((fav) => fav.key !== book.key));
    } else {
      setFavorites([...favorites, book]);
    }
  };

  const isFavorite = (book) => favorites.some((fav) => fav.key === book.key);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />

      <main className="container mx-auto px-4 py-8 flex-grow">
        {!networkStatus && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
            <i className="fas fa-wifi-slash mr-2"></i>You are offline.
          </div>
        )}

        {/* Search Form */}
        <SearchForm
          searchType={searchType}
          setSearchType={setSearchType}
          query={query}
          setQuery={setQuery}
          loading={loading}
          searchBooks={searchBooks}
          clearSearch={clearSearch}
          hasSearched={hasSearched}
        />

        {/* Results */}
        {error && <div className="bg-red-50 p-4 rounded-lg mb-6">{error}</div>}

        {books.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Search Results
              </h2>
              <p className="text-gray-600">{books.length} books found</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.key}
                  book={book}
                  isFavorite={isFavorite(book)}
                  toggleFavorite={toggleFavorite}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          </>
        )}

        {/* Favorites */}
        {favorites.length > 0 && (
          <Favorites favorites={favorites} toggleFavorite={toggleFavorite} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
