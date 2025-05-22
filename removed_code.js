要移除的代碼主要包括與個人資料輸入和多個介面相關的部分。以下是具體需要移除的代碼片段：
1. 移除個人資料相關的狀態和函數
// Sample personal info state
const [personalInfo, setPersonalInfo] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
    phone: "",
    location: ""
  });
  
  // 處理個人資料輸入的函數
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  2. 移除個人資料顯示的組件
在 PortfolioComponent 中，移除個人資料的部分：
{activeTab === 'info' && (
    <div className="personal-info">
      <h2 className="text-2xl font-bold mb-4">個人資料</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 各個輸入框 */}
      </div>
    </div>
  )}
  3. 移除多個介面的狀態和邏輯
將 activeTab 和相關的按鈕移除，因為現在只需要一個上傳和預覽的介面。
const [activeTab, setActiveTab] = useState('upload');

// Tab navigation buttons
<div className="tab-navigation">
  <button onClick={() => setActiveTab('upload')}>照片上傳</button>
  <button onClick={() => setActiveTab('info')}>個人資料</button>
  <button onClick={() => setActiveTab('preview')}>預覽成果</button>
</div>
4. 移除不必要的 UI 元素
移除與個人資料相關的 UI 元素和按鈕，確保界面簡潔。