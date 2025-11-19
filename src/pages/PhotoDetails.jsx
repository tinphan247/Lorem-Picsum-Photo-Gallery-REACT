// src/pages/PhotoDetails.jsx
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// Component phụ: Hiển thị 1 dòng thông tin
const DetailsItem = ({ label, value }) => (
  <p className="text-gray-700 text-sm sm:text-base">
    <span className="font-semibold text-gray-800">{label}:</span>
    <span className="ml-2">{value}</span>
  </p>
);

const PhotoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = location.state || {};

  const [photoDetails, setPhotoDetails] = useState({
    author: initialState.author || 'Đang tải...',
    title: initialState.title || `Ảnh #${id}`,
    description:
      initialState.description ||
      `Đây là ảnh mẫu được cung cấp bởi Lorem Picsum. ID ảnh: ${id}.`,
    width: 1200,
    height: 800,
  });

  const [loading, setLoading] = useState(!initialState.author);

  // Giả lập Fetch Data (Chỉ để có dữ liệu mock nếu không có state từ link)
  useEffect(() => {
    if (!initialState.author) {
      setLoading(true);
      // Giả lập API call
      setTimeout(() => {
        setPhotoDetails((prev) => ({
          ...prev,
          author: `Tác giả ẩn danh #${id}`,
        }));
        setLoading(false);
      }, 500);
    }
  }, [id, initialState.author]);

  const fullImageUrl = `https://picsum.photos/id/${id}/${photoDetails.width}/${photoDetails.height}`;

  if (loading) {
    return (
      // Căn giữa Spinner trong viewport
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-lg">Đang tải...</p>
      </div>
    );
  }

  return (
    // Main Container: Đảm bảo padding đủ trên mobile và căn giữa trên desktop
    <div className="bg-gray-50 py-6 px-4 sm:px-6 flex justify-center">
      <div className="bg-white rounded-xl sm:rounded-3xl shadow-xl p-4 md:p-8 lg:p-10 w-full max-w-4xl border border-gray-100">

        {/* Nút quay lại - Responsive padding */}
        <button
          onClick={() => navigate('/photos')}
          className="mb-6 inline-flex items-center px-4 py-2 text-sm sm:px-5 sm:py-2.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Quay lại
        </button>

        {/* TIÊU ĐỀ ẢNH */}
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">{photoDetails.title}</h2>

        {/* ------------------------------------------------------------- */}
        {/* BỐ CỤC 2 CỘT CHO THÔNG TIN: Tách biệt với ảnh */}
        {/* ------------------------------------------------------------- */}
        
        {/* Ảnh - Responsive Max Height */}
        <div className="w-full h-auto max-h-[50vh] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center border border-gray-200 mb-6">
          <img
            src={fullImageUrl}
            alt={`Ảnh ID ${id}`}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Container cho Thông tin & Mô tả: Chia thành 2 cột trên màn hình lớn */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6">
          
          {/* CỘT 1: Thông tin chi tiết */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 border-b pb-2">Thông tin chi tiết</h3>
            
            {/* Phần thông tin */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                <DetailsItem label="Tác giả" value={photoDetails.author} />
                <DetailsItem label="Mã ảnh" value={id} />
                <DetailsItem label="Kích thước gốc" value={`${photoDetails.width} x ${photoDetails.height}px`} />
            </div>
          </div>
          
          {/* CỘT 2: Mô tả */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 border-b pb-2">Mô tả</h3>
            
            {/* Phần mô tả */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-100 h-full">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {photoDetails.description}
                </p>
            </div>
          </div>
        </div>

        {/* Link ảnh gốc (Nằm ở cuối, dưới 2 cột) */}
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <a
            href={`https://picsum.photos/id/${id}/2000/1500`} // Dùng kích thước lớn hơn cho ảnh gốc
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 transition-all font-semibold text-sm sm:text-base"
          >
            Xem ảnh gốc (2000x1500)
          </a>
        </div>

      </div>
    </div>
  );
};

export default PhotoDetails;