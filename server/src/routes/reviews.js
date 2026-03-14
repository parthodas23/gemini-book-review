const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebase');
const { generateBookReview } = require('../services/geminiService');

router.post('/generate', async (req, res) => {
  const { bookId, title, description } = req.body;

  if (!bookId || !title) {
    return res.status(400).json({ error: 'Book ID and Title are required' });
  }

  try {
    // 1. Check if the review already exists in Firestore
    const docRef = db.collection('reviews').doc(bookId);
    const doc = await docRef.get();

    if (doc.exists) {
      console.log("Serving review from Cache (Firestore)");
      return res.json(doc.data());
    }

    // 2. If not, generate it with Gemini
    console.log("Generating new review with Gemini...");
    const reviewData = await generateBookReview(title, description);
    
    // 3. Save it to Firestore for next time
    const dataToSave = {
      ...reviewData,
      bookId,
      title,
      createdAt: new Date().toISOString()
    };
    
    await docRef.set(dataToSave);

    res.json(dataToSave);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;