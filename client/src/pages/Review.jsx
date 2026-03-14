import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { generateReview } from '../services/api';
import CharacterVisualizer from '../components/CharacterVisualizer';
import NarrationPlayer from '../components/NarrationPlayer';

const Review = () => {
  const { id } = useParams();
  const location = useLocation();
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  const book = location.state?.book;

  useEffect(() => {
    const getReview = async () => {
      if (!book) return;
      try {
        const data = await generateReview({
          bookId: id,
          title: book.title,
          description: book.description
        });
        setReviewData(data);
      } catch (err) {
        console.error("Failed to fetch review", err);
      } finally {
        setLoading(false);
      }
    };

    getReview();
  }, [id, book]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
      <p className="text-gray-600 font-medium">Gemini is reading the book and writing a review...</p>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">{reviewData?.title}</h1>
      
      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-2xl">★</span>
          <span className="font-bold text-xl">{reviewData?.rating}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2 text-indigo-700">Summary</h2>
        <p className="text-gray-700 leading-relaxed mb-6">{reviewData?.summary}</p>
        
        <h2 className="text-xl font-semibold mb-2 text-indigo-700">Analysis</h2>
        <p className="text-gray-700 leading-relaxed italic">"{reviewData?.analysis}"</p>
      </div>

      <CharacterVisualizer characters={reviewData?.characters} />
      <NarrationPlayer script={reviewData?.narrationScript} />
      
      <div className="mt-12 text-center">
        <button 
          onClick={() => window.history.back()}
          className="text-indigo-600 hover:text-indigo-800 font-medium"
        >
          ← Back to Search
        </button>
      </div>
    </div>
  );
};

export default Review;