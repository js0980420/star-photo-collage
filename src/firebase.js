// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// 您的 Firebase 專案配置 (請替換成您自己的配置)
const firebaseConfig = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  authDomain: "xxxxxxxxxxxxxxxxxxxxxxx.firebaseapp.com",
  projectId: "xxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxxxx"
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);

// 獲取 Auth 和 Storage 服務實例
const auth = getAuth(app);
const storage = getStorage(app);

// 將 auth 和 storage 導出，以便在其他文件中使用
export { auth, storage };
