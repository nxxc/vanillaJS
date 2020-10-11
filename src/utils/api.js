const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (res.ok) {
      const { data } = await res.json();
      const dataObj = {
        data,
        isError: false,
      };
      return dataObj;
    } else {
      const error = await res.json();
      const errorObj = {
        data: [],
        message: error.message,
        status: res.status,
        isError: true,
      };
      return errorObj;
    }
  } catch (error) {
    console.log('error is=>');
    console.dir(error.message);
  }
};
// 랜덤고양이 api api/cats/random50
const getRandomCats = () => {
  const url = `${API_ENDPOINT}/api/cats/random50`;
  return fetchData(url);
};

// 고양이 검색 api /api/cats/search?q=${keyword}
const getCats = (keyword) => {
  const url = `${API_ENDPOINT}/api/cats/search?q=${keyword}`;
  return fetchData(url);
};
// 고양이 검색 by id /api/cats/${id}

const getCatInfoById = (id) => {
  const url = `${API_ENDPOINT}/api/cats/${id}`;
  return fetchData(url);
};

// const getCatInfoById = async (id) => {
//   try {
//     const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
//     if (res.ok) {
//       const { data } = await res.json();
//       return data;
//     } else {
//       console.log(res);
//       console.log('검색 오류 다시 시도해주세요 아이디');
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

const fetchAPI = {
  getRandomCats,
  getCats,
  getCatInfoById,
};

export default fetchAPI;
