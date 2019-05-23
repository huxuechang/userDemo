import axios from 'axios';//引入axios依赖

import { Message } from 'element-ui';

import Cookies from 'js-cookie'; //引入cookie操作依赖

import router from '../../router'//引入路由对象

axios.defaults.timeout = 5000;

axios.defaults.baseURL ='';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
   return config;
   },
   function (error) {
  // 对请求错误做些什么
     return Promise.reject(error);
   });

//http request 封装请求头拦截器
// axios.interceptors.request.use(
//
//   config => {
//
//     var token = ''
//
//     if(typeof Cookies.get('user') === 'undefined'){
//
//       //此时为空
//
//     }else {
//
//       token = JSON.parse(Cookies.get('user')).token
//
//     }//注意使用的时候需要引入cookie方法，推荐js-cookie
//
//     config.data = JSON.stringify(config.data);
//
//     config.headers = {
//
//       'Content-Type':'application/json'
//
//     }
//
//     if(token != ''){
//
//       config.headers.token = token;
//
//     }
//
//     return config;
//
//   },
//
//   error => {
//
//     return Promise.reject(err);
//
//   }
//
// );

//http response 封装后台返回拦截器

axios.interceptors.response.use(

  response => {

    //当返回信息为未登录或者登录失效的时候重定向为登录页面

    if(response.data.code == 'W_100004' || response.data.message == '用户未登录或登录超时，请登录！'){

      router.push({

        path:"/",

        querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转

      })

    }

    return response;

  },

  error => {

    return Promise.reject(error)

  }

)

/**

 * 封装get方法

 * @param url

 * @param data

 * @returns {Promise}

 */

export function fetch(url,params={}){

  return new Promise((resolve,reject) => {

    axios.get(url,{

      params:params

    })

      .then(response => {

        resolve(response.data);

      })

      .catch(err => {

        reject(err)

      })

  })

}

/**

 * 封装post请求

 * @param url

 * @param data

 * @returns {Promise}

 */

export function post(url,data = {}){

  return new Promise((resolve,reject) => {

    axios.post(url,data)

      .then(response => {

        resolve(response.data);

      },err => {

        reject(err)

      })

  })

}

/**

 * 封装导出Excal文件请求

 * @param url

 * @param data

 * @returns {Promise}

 */

export function exportExcel(url,data = {}){

  return new Promise((resolve,reject) => {

    axios({

      method: 'post',

      url: url, // 请求地址

      data: data, // 参数

      responseType: 'blob' // 表明返回服务器返回的数据类型

    })

      .then(response => {

        resolve(response.data);

        let blob = new Blob([response.data], {type: "application/vnd.ms-excel"});

        let fileName = "订单列表_"+Date.parse(new Date())+".xls" ;

        if (window.navigator.msSaveOrOpenBlob) {

          navigator.msSaveBlob(blob, fileName);

        } else {

          var link = document.createElement('a');

          link.href = window.URL.createObjectURL(blob);

          link.download = fileName;

          link.click();

          window.URL.revokeObjectURL(link.href);

        }

      },err => {

        reject(err)

      })

  })

}

/**

 * 封装patch请求

 * @param url

 * @param data

 * @returns {Promise}

 */

export function patch(url,data = {}){

  return new Promise((resolve,reject) => {

    axios.patch(url,data)

      .then(response => {

        resolve(response.data);

      },err => {

        reject(err)

      })

  })

}

/**

 * 封装put请求

 * @param url

 * @param data

 * @returns {Promise}

 */

export function put(url,data = {}){

  return new Promise((resolve,reject) => {

    axios.put(url,data)

      .then(response => {

        resolve(response.data);

      },err => {

        reject(err)

      })

  })

}
