import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookCard from '../components/BookCard';
import { searchBooks } from '../services/api';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query) => {
    setLoading(true);
    setHasSearched(true);
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
            Gemini Book Review
          </h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Enter any book title and let Gemini AI craft a unique storytelling review, 
            complete with character breakdowns and narration.
          </p>
        </header>
        
        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-pulse text-indigo-600 font-medium">Browsing the shelves...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {hasSearched && books.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-12">No books found. Try a different title!</p>
        )}
      </div>
    </div>
  );
};

export default Home;