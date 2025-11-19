import axios from 'axios';

const PICSUM_URL = 'https://picsum.photos';
const LIMIT = 20; // So luong anh moi lan tai

/**
 * Lay danh sach anh voi phan trang
 * @param {number} page - So trang can tai
 * @returns {Promise<Array>} Danh sach anh
 */
export const fetchPhotos = async (page) => {
  try {
    const response = await axios.get(`${PICSUM_URL}/v2/list`, {
      params: {
        page: page,
        limit: LIMIT,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Loi khi tai anh:", error);
    return []; 
  }
};