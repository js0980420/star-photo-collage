// 使用 React 創建演員組圖製作平台
const ActorPlatformPreview = () => {
  const [currentPage, setCurrentPage] = React.useState('registration'); // 'registration' or 'portfolio'
  
  // Registration component states
  const [showPassword, setShowPassword] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);
  
  // Refs instead of state for form inputs to prevent re-renders during typing
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  
  // Portfolio component states
  const [activeTab, setActiveTab] = React.useState('upload');
  
  // Sample image URLs - all with same portrait dimensions for consistency
  const placeholderCloseup = "https://via.placeholder.com/400x550";
  const placeholderFullbody = "https://via.placeholder.com/400x550";
  const placeholderHalfbody = "https://via.placeholder.com/400x550";
  
  // Sample personal info state
  const [personalInfo, setPersonalInfo] = React.useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    location: ""
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the registration
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      newsletter
    };
    console.log(formData);
    setCurrentPage('portfolio'); // Redirect to portfolio page after registration
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Registration Component
  const RegistrationComponent = () => (
    <div className="container mx-auto p-4 flex-grow flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-slate-700">開始使用</h2>
        
        {/* Social login buttons */}
        <div className="space-y-4 mb-6">
          {/* Facebook Sign up */}
          <button 
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            onClick={() => setCurrentPage('portfolio')}
          >
            <svg className="h-5 w-5 mr-2 fill-current" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
            </svg>
            使用 Facebook 註冊 / 登入
          </button>
          
          {/* Google Sign up */}
          <button 
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white hover:bg-gray-50 transition-colors"
            onClick={() => setCurrentPage('portfolio')}
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            使用 Google 註冊 / 登入
          </button>
        </div>
        
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">或</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        
        <div className="space-y-4 mb-4">
          <p className="text-center text-gray-600">使用 Email 登入時，如您尚未註冊，系統將會自動為您建立帳號</p>
        </div>
        
        <form onSubmit={handleSubmit}>
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
                <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md">
                  下載組圖
                </button>
              </div>
              
              <div className="grid grid-cols-2 grid-rows-2">
                <div className="aspect-w-4 aspect-h-5.5 w-full">
                  <img src={placeholderCloseup} alt="特寫照片" className="object-cover w-full h-full" />
                </div>
                <div className="aspect-w-4 aspect-h-5.5 w-full">
                  <img src={placeholderFullbody} alt="全身照片" className="object-cover w-full h-full" />
                </div>
                <div className="aspect-w-4 aspect-h-5.5 w-full">
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
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-slate-800 text-white py-6">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl font-bold mb-2">演員組圖製作平台</h1>
          <p className="text-gray-300">快速製作演員組圖，提升試鏡機會</p>
        </div>
      </header>
      
      {/* Main content */}
      {currentPage === 'registration' ? (
        <RegistrationComponent />
      ) : (
        <PortfolioComponent />
      )}
      
      {/* Footer */}
      <footer className="bg-slate-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p>演員組圖製作平台 © 2025 版權所有 by Alex Wang</p>
        </div>
      </footer>
    </div>
  );
};

// 渲染應用程序到 DOM
ReactDOM.render(<ActorPlatformPreview />, document.getElementById('root'));