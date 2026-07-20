import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBq-YUry3saj7DWOeTyUF0UtzTVcXIyDLU",
  authDomain: "momo-review.firebaseapp.com",
  projectId: "momo-review",
  storageBucket: "momo-review.firebasestorage.app",
  messagingSenderId: "4777053381",
  appId: "1:4777053381:web:f49761a2d1567d061934ac",
  measurementId: "G-K541LB2K9D"
};


// Kiểm tra xem cấu hình đã được điền chưa
export const isFirebaseConfigured = firebaseConfig.apiKey !== "YOUR_API_KEY_HERE";

// Khởi tạo Firebase (chỉ khi đã cấu hình để không bị lỗi trắng trang)
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;
export const db = isFirebaseConfigured && app ? getFirestore(app) : null;
