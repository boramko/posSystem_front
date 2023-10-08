import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKSERVER}/api`,
  timeout: 1000,
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: any) => {
    config.headers = config.headers || {};
    
    if (!config.headers['Authorization']) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = 'Bearer ' + token;
      }
    }
    return config as AxiosRequestConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // 2xx 외의 상태 코드를 반환하는 응답을 처리
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error('400 Bad Request: 잘못된 요청입니다.');
          break;
        case 500:
          console.error('500 Internal Server Error: 서버 내부 오류입니다.');
          break;
        default:
          console.error(`Unexpected Error: ${status}`);
      }
    } else if (error.request) {
      console.error('No response received from the server.');
    } else {
      console.error('Error in request setup:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
