// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PhotoList from './pages/PhotoList';
import PhotoDetails from './pages/PhotoDetails'; // CẦN IMPORT LẠI
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* DINH TUYEN CHO DANH SACH ANH */}
          <Route path="/photos" element={<PhotoList />} />
          
          {/* THÊM LẠI: Route cho Trang chi tiết Ảnh */}
          <Route path="/photos/:id" element={<PhotoDetails />} />
          
          <Route path="/" element={<Navigate to="/photos" replace />} />
          
          <Route 
            path="*" 
            element={
              <div className="text-center p-8 text-2xl font-bold text-red-600">
                404 - Không tìm thấy trang (Page Not Found)
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;