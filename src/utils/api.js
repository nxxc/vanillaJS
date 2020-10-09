const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

// 랜덤고양이 api api/cats/random50
const getRandomCats = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats/random50`);
    if (res.ok) {
      const { data } = await res.json();
      return data;
    } else {
      console.log(res);
      console.log('검색 오류 다시 시도해주세요 랜덤');
    }
  } catch (error) {
    console.log(error);
  }
};

// 고양이 검색 api /api/cats/search?q=${keyword}
const getCats = async (keyword) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    if (res.ok) {
      const { data } = await res.json();
      return data;
    } else {
      console.log(res);
      console.log('검색 오류 다시 시도해주세요 키워드');
    }
  } catch (error) {
    console.log(error);
  }
};
// 고양이 검색 by id /api/cats/${id}

const getCatInfoById = async (id) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      return data;
    } else {
      console.log(res);
      console.log('검색 오류 다시 시도해주세요 아이디');
    }
  } catch (error) {
    console.log(error);
  }
};

const api = {
  getRandomCats,
  getCats,
  getCatInfoById,
};

export default api;
