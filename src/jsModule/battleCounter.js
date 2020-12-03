function battleCount(count = 3){
  let $displayRound = document.getElementById('rounds'); //выбираем элемент поля rounds

  return function(){
    count--;
    $displayRound.innerText = `Rounds ${count}/3`
    if(count <= 0){
      removeAllButtons();
    }
    return count;
  }
}

export default battleCount;