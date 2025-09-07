const Header = () => (
  <header className="bg-white shadow-md">
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4 md:mb-0">
        <i className="fas fa-book mr-2"></i>BookFinder
      </h1>
      <p className="text-gray-600">
        Hello Alex! Find and save your favorite books...
      </p>
    </div>
  </header>
);

export default Header;
