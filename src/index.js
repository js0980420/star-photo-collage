// 引入 Firebase SDK 模組
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import React, { useState, useEffect, useRef } from 'react'; // 引入 useState, useEffect, useRef
import './styles.css';
import { getAnalytics } from "firebase/analytics";

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
const auth = getAuth(app); // 獲取 Auth 服務實例
const analytics = getAnalytics(app);

const ActorPlatformPreview = () => {
  // currentPage 狀態現在會根據 Firebase 認證狀態自動設定
  const [currentPage, setCurrentPage] = useState('loading'); // 新增 'loading' 狀態
  const [user, setUser] = useState(null); // 儲存登入的使用者物件
  const [authError, setAuthError] = useState(null); // 儲存認證錯誤訊息

  // Registration component states
  const [showPassword, setShowPassword] = useState(false);
  const [newsletter, setNewsletter] = useState(true);

  // Refs instead of state for form inputs to prevent re-renders during typing
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Portfolio component states
  const [activeTab, setActiveTab] = useState('upload');

  // Sample image URLs - all with same portrait dimensions for consistency
  const placeholderCloseup = "https://via.placeholder.com/400x550";
  const placeholderFullbody = "https://via.placeholder.com/400x550";
  const placeholderHalfbody = "https://via.placeholder.com/400x550";

  // Sample personal info state
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    location: ""
  });

  // 使用 useEffect 監聽 Firebase 認證狀態變化
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        // 使用者已登入
        console.log("使用者已登入:", firebaseUser);
        setCurrentPage('portfolio'); // 導向作品集頁面
        setAuthError(null); // 清除錯誤訊息
        // TODO: 在這裡可以讀取使用者在資料庫中儲存的個人資料和作品集資訊
      } else {
        // 使用者未登入
        console.log("使用者未登入");
        setCurrentPage('registration'); // 導向註冊/登入頁面
        setAuthError(null); // 清除錯誤訊息
        // TODO: 在這裡可以清空使用者相關的 state (如 personalInfo, 作品集圖片等)
      }
      // 移除 loading 狀態，頁面已決定顯示註冊或作品集
      if (currentPage === 'loading') {
          setCurrentPage(firebaseUser ? 'portfolio' : 'registration');
      }
    });

    // 在元件卸載時取消監聽
    return () => unsubscribe();
  }, [auth, currentPage]); // 添加 auth 和 currentPage 到依賴陣列

  // 處理 Email/密碼 登入或註冊
  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    setAuthError(null); // 每次嘗試認證前清除錯誤訊息

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setAuthError("請輸入 Email 和密碼");
      return;
    }

    try {
      // 嘗試使用 Email/密碼 登入
      await signInWithEmailAndPassword(auth, email, password);
      // 如果登入成功，onAuthStateChanged 會觸發並更新狀態

    } catch (loginError) {
      // 登入失敗，檢查是否是使用者不存在的錯誤
      if (loginError.code === 'auth/user-not-found') {
        console.log("使用者不存在，嘗試註冊...");
        try {
          // 如果使用者不存在，則嘗試使用 Email/密碼 註冊
          await createUserWithEmailAndPassword(auth, email, password);
          // 如果註冊成功，onAuthStateChanged 會觸發並更新狀態
          console.log("註冊成功！");

          // TODO: 可以在這裡向使用者發送 Email 驗證信
          // await sendEmailVerification(auth.currentUser);

        } catch (signupError) {
          // 註冊失敗
          console.error("註冊失敗:", signupError);
          setAuthError(`註冊失敗: ${signupError.message}`);
        }
      } else {
        // 其他登入錯誤 (如密碼錯誤)
        console.error("登入失敗:", loginError);
        setAuthError(`登入失敗: ${loginError.message}`);
      }
    }
  };

  // 處理 Google 登入
  const handleGoogleSignin = async () => {
      setAuthError(null); // 每次嘗試認證前清除錯誤訊息
      try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          // 如果登入成功，onAuthStateChanged 會觸發並更新狀態

      } catch (error) {
          console.error("Google 登入失敗:", error);
          setAuthError(`Google 登入失敗: ${error.message}`);
      }
  };

  // 處理登出
  const handleSignOut = async () => {
      try {
          await signOut(auth);
          // 登出成功後，onAuthStateChanged 會觸發並將 user 設為 null，頁面會切換到註冊/登入頁面
          console.log("使用者已登出");
      } catch (error) {
          console.error("登出失敗:", error);
          setAuthError(`登出失敗: ${error.message}`);
      }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 根據 currentPage 狀態決定渲染哪個組件
  if (currentPage === 'loading') {
      return (
          <div className="flex flex-col min-h-screen bg-slate-100 items-center justify-center">
              <p>載入中...</p> {/* 顯示載入狀態 */}
          </div>
      );
  }


  // Registration Component
  const RegistrationComponent = () => (
    <div className="container mx-auto p-4 flex-grow flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">開始使用</h2>

        {/* 顯示認證錯誤訊息 */}
        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {authError}
          </div>
        )}

        {/* Social login buttons */}
        <div className="space-y-4 mb-6">
              
          {/* Google Sign up */}
          <button
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
            onClick={handleGoogleSignin} // 綁定 Firebase Google 登入函式
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            使用 Google 註冊 / 登入
          </button>
          {/* TODO: 添加 Facebook 登入按鈕和處理函式 */}
          {/* <button>使用 Facebook 註冊 / 登入</button> */}
          {/* TODO: 添加 Apple 登入按鈕和處理函式 */}
          {/* <button>使用 Apple 註冊 / 登入</button> */}

        </div>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">或</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="space-y-4 mb-4">
          <p className="text-center text-gray-600">使用 Email 登入時，如您尚未註冊，系統將會自動為您建立帳號</p>
        </div>

        {/* 將 onSubmit 綁定到 handleEmailPasswordAuth */}
        <form onSubmit={handleEmailPasswordAuth}> 
          <div className="space-y-4">
            {/* Email Field (as Username) */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">常用信箱</label>
              <input
                type="email"
                id="email"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
                ref={emailRef}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">密碼</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=""
                ref={passwordRef}
                autoComplete="current-password"
                required
              />
              <div className="flex justify-between mt-1">
                <div className="flex items-center">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                  <label htmlFor="show-password" className="ml-2 text-sm text-gray-600">
                    顯示密碼
                  </label>
                </div>
                <div>
                  {/* TODO: 添加未收到驗證信和忘記密碼的實際處理函式 */}
                  <a href="#" className="text-sm text-blue-500 hover:underline">未收到驗證信</a>
                  <span className="text-gray-500 text-sm mx-1">或</span>
                  <a href="#" className="text-sm text-blue-500 hover:underline">忘記密碼</a>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">目前為網頁版測試階段，註冊後您將優先獲得未來App版本的最新消息</p>
            </div>

            {/* Newsletter Opt-in */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  type="checkbox"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                />
              </div>
              <label htmlFor="newsletter" className="ml-2 text-sm text-gray-600">
                我願意接收最新的產品更新電子報，瞭解平台從網頁版測試到未來App版的最新動態與優化
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md transition-colors font-medium"
            >
              註冊 / 登入
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Portfolio Component
  const PortfolioComponent = () => (
    <main className="container mx-auto p-4 flex-grow">
      {/* Tab navigation */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`py-3 px-6 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('upload')}
        >
          照片上傳
        </button>
        <button
          className={`py-3 px-6 ${activeTab === 'info' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('info')}
        >
          個人資料
        </button>
        <button
          className={`py-3 px-6 ${activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
          onClick={() => setActiveTab('preview')}
        >
          預覽成果
        </button>
          {/* 登出按鈕 */}
         <button
            className="ml-auto py-3 px-6 text-gray-600 hover:text-red-600 transition-colors"
            onClick={handleSignOut} // 綁定登出函式
         >
            登出 ({user ? user.email : 'N/A'}) {/* 顯示登入者 Email */}
         </button>
      </div>

      {/* Content sections */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Photo upload section */}
        {activeTab === 'upload' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-slate-700">照片上傳</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Close-up photo */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-blue-500 mb-2">特寫照片</h3>
                <p className="text-gray-600 mb-4">上傳清晰的臉部特寫，展現您的表情和特點</p>
                <div className="mb-4">
                  {/* TODO: 實際的照片上傳 input 和處理邏輯 */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                    選擇照片
                  </button>
                </div>
                <div className="aspect-w-4 aspect-h-3">
                  <img src={placeholderCloseup} alt="特寫照片預覽" className="object-cover rounded-md w-full h-48" />
                </div>
              </div>

              {/* Full body photo */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-blue-500 mb-2">全身照片</h3>
                <p className="text-gray-600 mb-4">上傳全身照，展示您的體型和姿態</p>
                <div className="mb-4">
                   {/* TODO: 實際的照片上傳 input 和處理邏輯 */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                    選擇照片
                  </button>
                </div>
                <div className="aspect-w-3 aspect-h-4">
                  <img src={placeholderFullbody} alt="全身照片預覽" className="object-cover rounded-md w-full h-48" />
                </div>
              </div>

              {/* Half body photo */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                <h3 className="text-xl font-bold text-blue-500 mb-2">半身照片</h3>
                <p className="text-gray-600 mb-4">上傳半身照，展示您的表情和上半身</p>
                <div className="mb-4">
                   {/* TODO: 實際的照片上傳 input 和處理邏輯 */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                    選擇照片
                  </button>
                </div>
                <div className="aspect-w-4 aspect-h-3">
                  <img src={placeholderHalfbody} alt="半身照片預覽" className="object-cover rounded-md w-full h-48" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Personal info section */}
        {activeTab === 'info' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-slate-700">個人資料</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">姓名：</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">年齡：</label>
                <input
                  type="number"
                  name="age"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.age}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">身高 (cm)：</label>
                <input
                  type="number"
                  name="height"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.height}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">體重 (kg)：</label>
                <input
                  type="number"
                  name="weight"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.weight}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">電話：</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label className="block text-gray-700 font-medium mb-2">居住地區：</label>
                <input
                  type="text"
                  name="location"
                  className="w-full p-3 border border-gray-300 rounded-md"
                  value={personalInfo.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* TODO: 添加儲存個人資料的按鈕和處理邏輯 */}
            <button
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 px-4 rounded-md mt-8 font-medium text-lg"
              onClick={() => setActiveTab('preview')}
            >
              生成演員組圖
            </button>
          </div>
        )}

        {/* Preview section */}
        {activeTab === 'preview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-gray-200 text-slate-700">預覽成果</h2>

            <div className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-8">
              <div className="flex justify-end p-4">
                {/* TODO: 添加下載組圖的實際處理函式 */}
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
                  下載組圖
                </button>
              </div>

              <div className="grid grid-cols-2 grid-rows-2">
                <div className="aspect-w-4 aspect-h-5.5 w-full">
                   {/* TODO: 替換 placeholder 圖片為使用者上傳的實際圖片 */}
                  <img src={placeholderCloseup} alt="特寫照片" className="object-cover w-full h-full" />
                </div>
                <div className="aspect-w-4 aspect-h-5.5 w-full">
                   {/* TODO: 替換 placeholder 圖片為使用者上傳的實際圖片 */}
                  <img src={placeholderFullbody} alt="全身照片" className="object-cover w-full h-full" />
                </div>
                <div className="aspect-w-4 aspect-h-5.5 w-full">
                   {/* TODO: 替換 placeholder 圖片為使用者上傳的實際圖片 */}
                  <img src={placeholderHalfbody} alt="半身照片" className="object-cover w-full h-full" />
                </div>

                <div className="bg-gray-500 text-white p-6">
                  <ul className="space-y-4">
                    <li>• 姓名：{personalInfo.name || "未填寫"}</li>
                    <li>• 年齡：{personalInfo.age || "未填寫"}</li>
                    <li>• 身高：{personalInfo.height || "未填寫"} cm</li>
                    <li>• 體重：{personalInfo.weight || "未填寫"} kg</li>
                    <li>• 電話：{personalInfo.phone || "未填寫"}</li>
                    <li>• 居住地：{personalInfo.location || "未填寫"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );

  // Main component rendering
  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center"> {/* 添加 flex justify-between items-center */}
          <h1 className="text-2xl font-bold text-slate-800">演員組圖製作平台</h1>
          {/* 如果使用者已登入，顯示登出按鈕 */}
          {user && (
              <button
                 className="text-sm text-gray-600 hover:text-red-600 transition-colors"
                 onClick={handleSignOut}
              >
                 登出 ({user.email || user.uid}) {/* 顯示登入者 Email 或 UID */}
              </button>
          )}
        </div>
      </header>

      {/* 根據 currentPage 狀態渲染組件 */}
      {currentPage === 'registration' ? <RegistrationComponent /> : <PortfolioComponent user={user} />} {/* 將 user 傳遞給 PortfolioComponent */}


      <footer className="bg-slate-800 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="mb-4 text-center text-sm">
            歡迎加入艾克斯王數位工作室的官方LINE，接收未來App版上線通知！<br />
            我們目前正在招募 <span className="text-yellow-300 font-bold">12位內部測試人員</span>，無需工程背景，只要有意願測試App，都歡迎在 <a href="mailto:js0980420@email.com" className="underline text-blue-200 hover:text-blue-400">email</a> 或 <a href="https://line.me/R/ti/p/@438efvtl" target="_blank" rel="noopener noreferrer" className="underline text-green-200 hover:text-green-400">官方LINE</a> 留下報名意願。<br />
            有任何問題也歡迎透過官方LINE詢問！
          </div>
          <p className="text-center">© 2025 艾克斯王數位工作室 - 版權所有</p>
        </div>
      </footer>
    </div>
  );
};

// 渲染應用程序到 DOM
// 確保在 DOM 元素存在後再渲染
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(<ActorPlatformPreview />, rootElement);
} else {
  console.error("無法找到 ID 為 'root' 的 DOM 元素來渲染 React 應用程式。");
}