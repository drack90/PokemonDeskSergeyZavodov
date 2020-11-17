
const choiseTask = prompt('Выберите вариант задачи: где ' +
  '1 - задача с подсчётом букв в предложении, ' +
  'а ' +
  '2- задача с форматированием номера телефона', '1');

    if (choiseTask == 1){
      getVariable()
    }else if (choiseTask == 2){
      getPhone()
    }else{
      alert('Неверно выбран вариант')
    }


function getVariable() {
  const firstRow = prompt('Введите первое предложение', 'мама мыла раму');
  const secondRow = prompt('Введите второе предложение', 'собака друг человека');
  const countingSymbol = prompt('Введите символ для сравнения предложений', 'а');
  getRow(firstRow, secondRow, countingSymbol);
}

function getPhone() {
  const phone = prompt('Введите номер телефона для форматирования', '+71234567890');
  formattedPhone(phone)
}

function getRow(firstRow, secondRow, countingSymbol) {
  let counterFirstRow = 0;
  let counterSecondRow = 0;

  for (let i=0; i<firstRow.length; i++){
     if (firstRow.charAt(i) == countingSymbol){
     counterFirstRow++;
    }
  }

  for (let i=0; i<secondRow.length; i++){
    if (secondRow.charAt(i) === countingSymbol){
      counterSecondRow++;
    }
  }

  console.log(counterFirstRow + ' ' + counterSecondRow)
  if (counterFirstRow > counterSecondRow){
    return alert(firstRow);
  }else{
   return alert(secondRow);
  }
}


function formattedPhone(phone) {
  let editPhone ='';
  let newPhone = '';

  if (phone.length === 11 ) {
    if (phone.length === 11 && phone.charAt(0) == '8' || phone.charAt(0) == '7') {
      newPhone = '+7';
      //в цикле добавляем в переменную цифры начиная с 1 (а не 0) т.к. в переменной уже содержится "+7"
      for (i=1; i<phone.length; i++){
        newPhone += phone.charAt(i)
      }
      //назначаем переменной phone измененное значение
      phone = newPhone
    }
  }else if(phone.length === 10) {
    newPhone += '+7';
    for (let i=0; i<phone.length; i++){
      newPhone += phone.charAt(i)
    }
    phone = newPhone
  }else if (phone.length === 12 && phone.charAt(0) === '+' && phone.charAt(1) === '7'){
    newPhone = phone;
  }else{
    return alert('Не верный формат телефона')
  }
  //проходимся по номеру, производя форматирование.
  for(let i=0; i<phone.length; i++){

    if (i == 1){
      editPhone +=  phone.charAt(i) + ' ';
    }else if (i == 2){
      editPhone += '('+ phone.charAt(i);
    }else if (i == 4){
      editPhone += phone.charAt(i) + ') ';
    }else if  (i==7 || i == 9) {
      editPhone += phone.charAt(i) + '-';
    }else{
      editPhone += phone.charAt(i)
    }
  }
  return alert(editPhone);
}

