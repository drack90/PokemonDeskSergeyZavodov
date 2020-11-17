<script>
let phone = '';

function formattedPhone(phone){
let formatedPhone = '';
  let countryCode ='';
  let cityCode = '';
  let routeCode ='';
  let numberCode
for(let i=0; i<phone.length; i++){
  
//    let formatedPhone = phone.substr(0, 2) + ' (' 
//                      + phone.substr(2, 3) + ') ' 
//                      + phone.substr(5, 3) + '-'
//                      + phone.substr(8, 2) + '-'
//                      + phone.substr(10, 2);
    
  if(phone.charAt(i) == '7'){
   countryCode = phone.charAt(0) + 
   phone.charAt(1) + ' ';
  } 
  if(phone.charAt(i) == '1'){
    cityCode = '(' + phone.charAt(2)+phone.charAt(3) + phone.charAt(4)+ ') ';
  }
  if(phone.charAt(i) == '6'){
    routeCode = phone.charAt(5) +
                phone.charAt(5) +
                phone.charAt(6) + '-'
  }
  if(phone.charAt(i) == '8'){
  	numberCode = phone.charAt(7)+
    					   phone.charAt(8)+ '-'+
                           phone.charAt(9)+
                           phone.charAt(10)
  }
  


}
formatedPhone = countryCode + cityCode  + routeCode+ numberCode;
return formatedPhone;
}

console.log(formattedPhone('+71234567890'));
</script>
