import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router';

export default function $axios(options) {

    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: config.baseUrl,
            headers: config.headers,
            timeout: config.timeout,
            withCredentials: config.withCredentials
        })

        // request interceptor
        instance.interceptors.request.use(
            config => {
                let token = Cookies.get('token')
                // 1.At the beginning of the request, you can combine vuex to open the full screen loading animation.
                // console.log(store.state.loading)
                // console.log('Ready to send request...')
                // 2. Bring token
                if (token) {
                    config.headers.token = token
                } else {
                    router.push('/login')
                }
                // 3. According to the request method, serialize the parameters passed, and whether to serialize according to the back-end requirements
                if (config.method === 'post') {
                    // if (config.data.__proto__ === FormData.prototype
                    //   || config.url.endsWith('path')
                    //   || config.url.endsWith('mark')
                    //   || config.url.endsWith('patchs')
                    // ) {

                    // } else {
                        // config.data = qs.stringify(config.data)
                    // }
                }

                return config
            },

            error => {
                // When request is wrong
                // console.log('request:', error)
                // 1. Judge request timeout
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    console.log('Request timed out!')
                    // return service.request(originalRequest); //Repeat the request again
                }
                // 2. Need to redirect to error page
                const errorInfo = error.response
                // console.log(errorInfo)
                if (errorInfo) {
                    error = errorInfo.data  // When you catch on the side of the page, you can get detailed error information. See Promise.reject at the bottom.
                    const errorStatus = errorInfo.status; // 404 403 500 ...
                    router.push({
                        path: `/error/${errorStatus}`
                    })
                }
                return Promise.reject(error) // You can get (catch) the error message you want to return on the calling side
            }
        )

        //response interceptor
        instance.interceptors.response.use(
            response => {
                let data;
                // IE9 response.data is undefined, so you need to use response.request.responseText (String after Stringify)
                if (response.data == undefined) {
                    data = JSON.parse(response.request.responseText)
                } else {
                    data = response.data
                }

                //Do different processing based on the returned code value
                switch (data.rc) {
                    case 1:
                        console.log(data.desc)
                        break;
                    case 0:
                        // store.commit('changeState')
                        // console.log('login successful')
                        break;
                    default:
                        break;
                }
                // If the code is not returned correctly and is already logged in, an error is thrown
                // const err = new Error(data.desc)
                // err.data = data
                // err.response = response
                // throw err

                return data
            },
            err => {
                // console.log('err.message: ', err.response)
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = 'Request error'
                            break
                        case 401:
                            err.message = 'Bạn chưa đăng nhập, không thể sử dụng chức năng này!'
                            break
                        case 403:
                            err.message = 'Truy cập bị từ chối!'
                            break
                        case 404:
                            err.message = `Không tìm thấy địa chỉ yêu cầu: ${err.response.config.url}`
                            break
                        case 408:
                            err.message = 'Request timed out!'
                            break
                        case 500:
                            err.message = err.message?err.message:'Đã có lỗi xảy ra, vui lòng thử lại sau'
                            break
                        case 501:
                            err.message = 'Dịch vụ được yêu cầu hiện không sẵn sàng!'
                            break
                        case 502:
                            err.message = 'Gateway error'
                            break
                        case 503:
                            err.message = 'Dịch vụ được yêu cầu hiện không sẵn sàng!'
                            break
                        case 504:
                            err.message = 'Gateway timeout'
                            break
                        case 505:
                            err.message = 'Unsupported HTTP version'
                            break
                        default:
                    }
                }
                return Promise.reject(err) // Returns the error information returned by the interface
            }
        )

        // Request processing
        instance(options)
        .then(res => {
            resolve(res)
            return false
        }).catch(error => {
            if(typeof error.response != "undefined"){
                // In case of invalid authencation data has been sent to server,
                // We need to clear all this invalid data from client
                if(error.response.status == 401 || error.response.status == 403){
                    sessionStorage.removeItem("user")
                    Cookies.remove("token")
                    router.push("/login")
                }
            }
            reject(error)
        })
    })
}
