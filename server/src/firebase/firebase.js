const admin = require('firebase-admin');

let serviceAccount;

try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        // Parse the string from .env
        serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        
        // FIX: Ensure the private key handles newlines correctly
        // Some platforms escape the backslashes, this ensures they are actual newlines
        if (serviceAccount.private_key) {
            serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
        }
    }
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Fallback to a hardcoded string if the env variable isn't found
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "promptpal-d1bb4.appspot.com"
    });

    console.log(" Firebase Admin initialized successfully");
} catch (error) {
    console.error(" Firebase Initialization Error:", error.message);
}

const db = admin.firestore();
const bucket = admin.storage().bucket();

module.exports = { db, bucket };