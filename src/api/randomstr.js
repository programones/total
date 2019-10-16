export function getsixstring(){
    var str = ""
    for(i=0;i<6;i++) {
      var strall=["0",'1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
     numberstr = Math.floor(Math.random()*36)
     var random= strall[numberstr]
     str+=random   
    }
 return str;
}