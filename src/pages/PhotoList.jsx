// src/pages/PhotoList.jsx
import React from 'react';
import { Outlet, Link } from 'react-router-dom'; // THEM Outlet
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import PhotoCard from '../components/PhotoCard';
import Loader from '../components/Loader';

// Components con cho Header va Footer
const Header = () => (
    <header className="app-header">
        {/* Đã thay thế Logo và Menu bằng tiêu đề cố định */}
        <div className="flex items-center justify-center w-full">
            <h1 className="text-xl font-extrabold" style={{ color: 'var(--color-text-primary)' }}>
                Lorem Picsum Photo Gallery
            </h1>
        </div>
    </header>
);

const Footer = () => (
    <footer className="app-footer">
        <p>TinPhan247</p>
    </footer>
);


const PhotoList = () => {
    // Lay du lieu va ref tu Custom Hook
    const { photos, loading, hasMore, observerTarget } = useInfiniteScroll();

    return (
        <React.Fragment>
            <Header />

            {/* SỬA: Bỏ "container" để tránh xung đột, chỉ dùng mx-auto và max-w-screen-xl để căn giữa và giới hạn độ rộng */}
            <main className="mx-auto max-w-screen-xl p-4 min-h-[80vh]">
                
                {/* Grid hien thi anh, su dung class CSS thuan: gallery-container */}
                <div className="gallery-container">
                    {photos.map((photo, index) => (
                        <PhotoCard key={`${photo.id}-${index}`} photo={photo} />
                    ))}
                </div>

                {/* Phan tu duoc theo doi boi Intersection Observer */}
                {/* THAY ĐỔI: Thêm mx-auto và text-center để đảm bảo căn giữa chính xác */}
                <div ref={observerTarget} className="w-full mx-auto text-center"> 
                    {loading && <Loader />}
                </div>
                
                {/* Thong bao het anh */}
                {!hasMore && photos.length > 0 && (
                    <div className="text-center py-8 text-gray-500 font-medium text-xl">
                        --- Đã hết ảnh để tải (End of List) ---
                    </div>
                )}

                {/* Truong hop khong co anh nao duoc tai (vi du: loi mang) */}
                {!loading && photos.length === 0 && (
                    <div className="text-center py-20 text-red-400 text-xl">
                        Không thể tải dữ liệu ảnh. Vui lòng kiểm tra kết nối mạng.
                    </div>
                )}
                
            </main>

            <Footer />
            
            {/* RENDER MODAL TAI DAY KHI URL KHOP */}
            <Outlet /> 

        </React.Fragment>
    );
};

export default PhotoList;