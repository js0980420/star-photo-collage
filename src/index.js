import React from 'react';
import { createRoot } from 'react-dom/client';

// 引入主要的應用程式元件
import ActorPlatformPreview from './ActorPlatformPreview';

// 引入全域樣式
import './styles.css';

// 引入 Firebase SDK 模組
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously } from 'firebase/auth'; // 確保引入 signInWithCustomToken 和 signInAnonymously
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// 引入工具欄 (保留您現有的 StagewiseToolbar 導入)
// import { StagewiseToolbar } from '@stagewise/toolbar-react'; // 可以註解掉這行

// 獲取 Firebase 配置 (優先使用 Canvas 環境變數，如果沒有則使用您提供的硬編碼配置)
const firebaseConfig = typeof __firebase_config !== 'undefined' && Object.keys(JSON.parse(__firebase_config)).length > 0
  ? JSON.parse(__firebase_config)
  : {
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
// 獲取 Auth 服務實例
export const auth = getAuth(app);
// 獲取 Storage 服務實例
export const storage = getStorage(app);
// 獲取 Analytics 服務實例 (如果需要使用 Analytics)
export const analytics = getAnalytics(app);
// 獲取 Firestore 服務實例
export const db = getFirestore(app);

// 應用程式 ID (來自 Canvas 環境變數，如果沒有則使用預設值)
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// 匿名登入或使用自訂 token 登入 (整合之前提供的認證邏輯)
async function authenticateFirebase() {
  try {
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log('Firebase 認證成功 (使用自訂 token)');
      } else {
      await signInAnonymously(auth);
      console.log('Firebase 匿名認證成功');
    }
      } catch (error) {
    console.error('Firebase 認證失敗:', error);
  }
}

const stagewiseConfig = {
  plugins: []
};

// 渲染應用程式到 DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  // 在應用程式渲染前進行認證
  authenticateFirebase().then(() => {
    root.render(
      <React.StrictMode>
        {/* {process.env.NODE_ENV === 'development' && <StagewiseToolbar config={stagewiseConfig} />} */} {/* 註解掉或移除這行 */}
        <ActorPlatformPreview /> {/* 這裡仍然引入 ActorPlatformPreview */}
      </React.StrictMode>
    );
  });
} else {
  console.error("無法找到 ID 為 'root' 的 DOM 元素來渲染 React 應用程式。");
}

// 注意：您之前引入的 reportWebVitals.js 和 index.css 在您新提供的 index.js 中沒有出現。
// 如果您需要它們，請確保它們存在並在此處引入。
// 例如：
// import './index.css';
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();

function updateBorderLocation() {
  const targetElement = someVariableHoldingADomElement;

  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    // ... 使用 rect 的程式碼 ...
  } else {
    console.warn("Target element for updateBorderLocation is null.");
  }
}
