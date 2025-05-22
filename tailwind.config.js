/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 確保這行存在，它會掃描 src 資料夾下的所有 js, jsx, ts, tsx 檔案
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
