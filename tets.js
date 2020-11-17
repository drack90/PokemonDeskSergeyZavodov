
let phone = '';

function formattedPhone(phone){
let formatedPhone = '';
  let countryCode ='';
  let cityCode = '';
  let routeCode ='';
  let numberCode
  let newPhone
for(let i=0; i<phone.length; i++){

  if(phone.charAt(i) == '7' && i < 2){
   newPhone = phone.charAt(0) + 
   phone.charAt(1) + ' ';
  } 
  
  if(phone.charAt(i) == '1'){    
    newPhone+='(' + phone.charAt(2)+phone.charAt(3) + phone.charAt(4)+ ') ';
  }
  
  if(phone.charAt(i) == '6'){
                newPhone+=phone.charAt(5) +phone.charAt(6) + phone.charAt(7) + '-';
  }
  if(phone.charAt(i) == '8'){
                           newPhone+=phone.charAt(8)+
                           phone.charAt(9)+ '-'+
                           phone.charAt(10)+
                           phone.charAt(11);
 }
  


}

return newPhone;
}

console.log(formattedPhone('+71234567890'));

