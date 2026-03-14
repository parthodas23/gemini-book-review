import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleViewReview = () => {
    navigate(`/review/${book.id}`, { state: { book } });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="h-64 bg-gray-100 flex items-center justify-center overflow-hidden">
        {book.thumbnail ? (
          <img src={book.thumbnail} alt={book.title} className="h-full w-full object-contain p-4" />
        ) : (
          <div className="text-gray-400">No Cover</div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-bold text-lg line-clamp-2 text-gray-800 mb-1">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-4 italic">{book.authors?.join(', ')}</p>
        
        <button
          onClick={handleViewReview}
          className="mt-auto w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Generate AI Review
        </button>
      </div>
    </div>
  );
};

export default BookCard;