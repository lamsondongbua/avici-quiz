
import axios from "axios";
//sử dụng để hiển thị nút loading bar
import NProgress from "nprogress";
import {store} from '../redux/store';


NProgress.configure({
showSpinner: false,
trickleSpeed: 100

})


const instance = axios.create({
    baseURL: 'https://backend-avici-quiz.onrender.com',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    //lấy mã truy cập đối với mỗi người dùng
    const access_token = store?.getState()?.user?.account?.access_token;
    //gắn mã vào header của HTTP request => gửi yêu cầu lên server và kèm theo token để xác nhận người dùng (bước bảo mật)
    config.headers['Authorization'] = `Bearer ${access_token}`;
    NProgress.start();
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  //Interceptor: giống như một bộ lọc trung gian để thao tác dữ liệu hoặc cấu hình.

// Add a response interceptor
instance.interceptors.response.use(function (response) {

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    NProgress.done()
    return response && response.data ? response.data: response;
  }, function (error) {
    NProgress.done();
    
    
    //token expired
    if (error.response.data && error.response.data.EC === -999){
      window.location.href = '/login'
    }


    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
  });

export default instance;

//file này dùng để giản lược hóa bước xử lý data ở phía client
