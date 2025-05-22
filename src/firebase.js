// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// 您的 Firebase 專案配置 (請替換成您自己的配置)
const firebaseConfig = {
  apiKey: "AIzaSyDyUIu1reBIGE0BuHXb5aZdtNH0MEOWrgo",
  authDomain: "star-photo-collage.firebaseapp.com",
  projectId: "star-photo-collage",
  storageBucket: "star-photo-collage.firebasestorage.app",
  messagingSenderId: "735736806238",
  appId: "1:735736806238:web:f26bc5ec34b969d2956dcf",
  measurementId: "G-4DXFHZ914S"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 獲取 Auth 和 Storage 服務實例
const auth = getAuth(app);
const storage = getStorage(app);

// 將 auth 和 storage 導出，以便在其他文件中使用
export { auth, storage };