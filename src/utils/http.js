
import axios from 'axios';
import qs from 'qs';
import {getSession} from './cookie'

// test
// var hostHttp="http://192.168.1.193:86"  //测试地址
// var httpsGuess="http://192.168.1.193:86"  //测试地址
// var httpsPush='http://192.168.1.193:86';
// var httpsTask='http://192.168.1.193:86';
// var httpsWish='http://192.168.1.193:86';

// local
 var hostHttp="http://lottery.shouzhuan518.com";
 var httpsGuess="http://lottery.shouzhuan518.com";
 var httpsPush="http://lottery.shouzhuan518.com";
 var httpsTask="http://lottery.shouzhuan518.com";
 var httpsWish="http://lottery.shouzhuan518.com";

// online
// var hostHttp = "https://web.bzlyplay.com";
// var httpsGuess="https://web.bzlyplay.com";
// var httpsPush="https://web.bzlyplay.com";

// online
// var hostHttp = "https://html.bzlyplay.com";
// var httpsGuess="https://html.bzlyplay.com";
// var httpsPush="https://html.bzlyplay.com";

// online
// var hostHttp = "https://proxy.bzlyplay.com";
// var httpsGuess = "https://proxy.bzlyplay.com";
// var httpsPush = "https://proxy.bzlyplay.com";


//test
// var hostHttp = "http://192.168.1.148:8888";
// var httpsGuess = "http://192.168.1.148:8888";
// var httpsPush = "http://192.168.1.148:8888";

axios.defaults.timeout = 20000;
axios.defaults.baseURL ='';

axios.interceptors.request.use(function (config) {
   return config;
 }, function (error) {
  return Promise.reject(error);
 });


 axios.interceptors.response.use(function (response) {
   return response;
 }, function (error) {
   return Promise.reject(error);
 });


/**
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params={}){
  if(url.indexOf("/guess") != -1){
    url=httpsGuess+url;
  }else if(url.indexOf("/push") != -1){
    url=httpsPush+url;
  }else if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  }else if(url.indexOf("/wish") != -1){
    url=httpsWish+url;
  } else{
    url=hostHttp+url;
  }
  return new Promise((resolve, reject) =>{
    axios.get(url, {
      params: params}).then(res => {
        resolve(res.data);
      }).catch(err =>{
        reject(err.data)
    })
  });
}

/**
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */

export function post(url, data = {}) {

  if(url.indexOf("/guess") != -1){
    url=httpsGuess+url;
  }else if(url.indexOf("/push") != -1){
    url=httpsPush+url;
  }else if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  } else{
    url=hostHttp+url;
  }

    return new Promise((resolve, reject) => {
     axios.post(url, data,{
        emulateJSON: true
     }).then(res => {
      resolve(res.data);
      }).catch(err =>{
      reject(err.data)
    })
  });
}

 /**
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
   if(url.indexOf("/guess") != -1){
     url=httpsGuess+url;
   }else if(url.indexOf("/push") != -1){
     url=httpsPush+url;
   }else if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  } else{
     url=hostHttp+url;
   }

  return new Promise((resolve,reject) => {
      axios.put(url,data,{
        emulateJSON: true
      }).then(response => {
        resolve(response.data);
      },err => {
        reject(err)
      })
  })
}

 /**
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url){

   if(url.indexOf("/guess") != -1){
     url=httpsGuess+url;
   }else if(url.indexOf("/push") != -1){
     url=httpsPush+url;
   }else if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  } else{
     url=hostHttp+url;
   }

  return new Promise((resolve,reject) => {
    axios.delete(url).then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}

/**
 * 封装文件上传请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function uploadFile(url,data){
  if(url.indexOf("/guess") != -1){
    url=httpsGuess+url;
  }else if(url.indexOf("/push") != -1){
    url=httpsPush+url;
  }else if(url.indexOf("/task") != -1){
    url=httpsTask+url;
  } else{
    url=hostHttp+url;
  }
  return new Promise((resolve,reject) => {
          axios.post(url,data).then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

