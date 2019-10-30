import axios from 'axios'
export const http = axios.create({
    // baseURL: 'http://127.168.2.199/' //本机ip
    baseURL: 'https://bi.psvideo.cn/ts/',
    headers: {
        'Content-Type': "application/json;charset=utf-8"
      }    
    // headers:{'Content-Type':'application/x-www-form-urlencoded'}
  })
  //人名查询请求

  let search = 'getAnchor'
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
     return http.get('getPrj',{
       params:{
        id
       }  
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