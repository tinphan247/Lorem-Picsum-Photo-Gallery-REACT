import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchPhotos } from '../api/picsum';

const useInfiniteScroll = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Ref cho phan tu duoc theo doi (thuong la Loader component)
  const observerTarget = useRef(null);
  
  const LIMIT = 20;

  const loadPhotos = useCallback(async (pageNum) => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newPhotos = await fetchPhotos(pageNum);

    if (newPhotos.length === 0 || newPhotos.length < LIMIT) {
      setHasMore(false);
    } 

    if (newPhotos.length > 0) {
        setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
        setPage((prevPage) => prevPage + 1);
    }
    
    setLoading(false);
  }, [loading, hasMore]);


  // Effect cho Intersection Observer
  useEffect(() => {
    // Tai trang dau tien khi component mount
    if (page === 1) {
        loadPhotos(1);
        return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Neu phan tu quan sat (observerTarget) hien thi tren man hinh
        if (entries[0].isIntersecting && !loading && hasMore && page > 1) {
          loadPhotos(page); 
        }
      },
      {
        root: null, 
        rootMargin: '20px', // Bat dau load truoc 20px
        threshold: 1.0,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [loadPhotos, loading, hasMore, page]);

  return { photos, loading, hasMore, observerTarget };
};

export default useInfiniteScroll;