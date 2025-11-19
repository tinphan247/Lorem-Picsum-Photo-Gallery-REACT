import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cần thay thế 'Lorem-Picsum-Photo-Gallery-REACT' bằng tên repository của bạn (Nếu bạn đã đổi tên)
const REPO_NAME = 'Lorem-Picsum-Photo-Gallery-REACT'; 

export default defineConfig({
  plugins: [react()],
  // Thiết lập đường dẫn gốc (base path) để tải đúng tài nguyên trên GitHub Pages
  // Nếu bạn triển khai trên một miền tùy chỉnh hoặc trên main domain, bạn có thể bỏ 'base'
  base: `/${REPO_NAME}/`, 
})