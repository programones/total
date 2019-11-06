import axios from 'axios'
export const http = axios.create({
    // baseURL: 'http://127.168.2.199/' //本机ip
    baseURL: 'https://bi.psvideo.cn/',
    headers: { 'Content-Type': "application/json;charset=utf-8" },  
    // headers:{'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}
  });
//   export let httpNum = axios.create({
//     baseURL: 'https://bi.psvideo.cn/timeshare/wx_share',
//     headers: { 'Content-Type': "application/json;charset=utf-8" }  ,  

//   });
  //人名查询请求

  let search = 'timeshare/getAnchor'
http.findName = ({
    timeshare_id,ask,ask_word,ask_content
}) => {
    return http.get(search,{params: {
        timeshare_id,ask,ask_word,ask_content
      }})
  }

//按条件查询省
http.findprocince=({
    timeshare_id,ask,ask_word,ask_content
})=>{
    return http.get(search,{params:   
       {timeshare_id,ask,ask_word,ask_content}      
    })
}

//按条件查找市
http.findcitys=({
    timeshare_id,ask,ask_word,ask_content
})=>{
    return http.get(search,{
        params:{
      timeshare_id,ask,ask_word,ask_content
        }
    })
}
//按条件查找区
http.findareas=({
    timeshare_id,ask,ask_word,ask_content,province
})=>{
   return http.get(search,{
     params:{
        timeshare_id,ask,ask_word,ask_content,province 
     }  
   })
}
//按条件查找学校
http.findSchool=({
    timeshare_id,ask,ask_word,ask_content,city,province
})=>{ 
    return http.get(search,{
        params:{  timeshare_id,ask,ask_word,ask_content,city,province
        }
    })
}
//按条件查找班级返回
http.findClass=({
    timeshare_id,ask,ask_word,ask_content,district,city,province
})=>{
    return http.get(search,{
        params:{
            timeshare_id,ask,ask_word,ask_content,district,city,province
        }
    })
}
//条件查找人名返回
http.findPerson=({
    timeshare_id,ask,ask_word,ask_content,district,city,province,school
})=>{
    return http.get(search,{
        params:{
            timeshare_id,ask,ask_word,ask_content,district,city,province,school
        }
    })
}
//点击人名返回个人的详细信息
  http.pesonalInfo=({
    timeshare_id,ask,ask_word,ask_content,district,city,province,school,ts_class
  })=>{
     return http.get(search,{
        params:{
            timeshare_id,ask,ask_word,ask_content,district,city,province,school,ts_class        
        } 
     })
 }
 //获取项目相关信息
 http.getProIfo=({id})=>{
     return http.get('timeshare/getPrj',{
       params:{
        id
       }  
     })
 }
 //发送手机验证码接口
 http.getCPhoneode=(mobile)=>{
    return http.post("/api/send_code",{
        mobile
    })  
  }
  //发送验证码后登陆信息接口
  http.loginIfo=({iuid,timeshare_id,mobile,mobile_code,openid})=>{
      return http.post('/timeshare/login',{
        iuid,timeshare_id,mobile,mobile_code,openid    
      })
  }

    //获取微信授权的请求
    http.getwxIfo=(url)=>{
     return http.get('/api/wx_url',{
         params:{url}
     })         
    }
   //获取用户信息的回调函数    
   http.getwxUserIfo=(code)=>{
    return http.get('/api/oauth_callback',{
       params:{code}
    })
   }
   //微信分享设置
   http.weixinshare=()=>{
       return http.post('timeshare/wx_share')
   }
   //时间选择处数据的获取
   http.getTimeArr=(ts_id)=>{
       return http.get('/timeshare/getGoods',{
           params:{
            ts_id
           }
       })
   }
   //先后端发送订单数据返回订单信息
   http.getGoodsOrder=({goods_id,anchor_id,mobile,openid,amount,pay_way,money})=>{
       return http.post('/timeshare/makeOrder',{
      goods_id,anchor_id,mobile,openid,amount,pay_way,money     
       })
   }
// request拦截器
// http.interceptors.request.use(
//     config => {
      
//       config.headers['Content-Type'] = 'application/x-www-form-urlencoded' 
//       if (config.method === 'post') { 
//         config.data = qs.stringify({
//           ...config.data
//         })
//       }
  
 
//       return config
//     },
//     error => {
//       // Do something with request error
//       console.log(error) // for debug
//       Promise.reject(error)
//     }
//   )

// axios.interceptors.request.use((config) => {
//     config.headers['X-Requested-With'] = 'XMLHttpRequest';
//     let regex = /.*csrftoken=([^;.]*).*$/; // 用于从cookie中匹配 csrftoken值
//     config.headers['X-CSRFToken'] = document.cookie.match(regex) === null ? null : document.cookie.match(regex)[1];
//     return config
//   });
