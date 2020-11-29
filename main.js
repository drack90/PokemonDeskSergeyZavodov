import Pokemon from "./jsClass/pokemon.js";
import {pokemons} from "./jsModule/pokemons.js";
import random from "./jsModule/util.js";
import collectLog from "./jsModule/log.js";
import countBtn from "./jsModule/buttonCounter.js";



// const playerOne = pokemons[random(pokemons.length) -1];
//
// let player1 = new Pokemon({
//   selectors: 'player1',
//   ...playerOne,
//
// });
//
// let pokeImg = player1.img;
//
// let playerTwo = pokemons[random(pokemons.length) -1];
//
// let player2 = new Pokemon({
//   selectors: 'player2',
//   ...playerTwo
// });
//
//
//
// const $control = document.querySelector('.control')
// player1.attacks.forEach(item =>{
//   const $btn = document.createElement('button');
//   $btn.classList.add('button');
//   $btn.innerText = item.name;
//   const btnCount = countBtn(item.maxCount, $btn);
//     $btn.addEventListener('click', () =>{
//       btnCount();
//       player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
//         collectLog(player2, player1, count);
//       });
//     })
//
//   $control.appendChild($btn);
//
// })
//
//

let player1;
let player2;

startGame();
function startGame() {
  addStartButton();
  }

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
const battleCounter = battleCount();//создаем счётчик боя

//созздаём покемонов
function getPokemons() {
  const playerOne = pokemons[random(pokemons.length) -1];

  player1 = new Pokemon({
    selectors: 'player1',
    ...playerOne,

  });

  let playerTwo = pokemons[random(pokemons.length) -1];

   player2 = new Pokemon({
    selectors: 'player2',
    ...playerTwo
  });
}

//создаём аттакующие кнопки
function getControlButtons() {

  const $control = document.querySelector('.control')
  //отрисовываем кнопки из массива pokemin.attack
  player1.attacks.forEach(item =>{
    const $btn = document.createElement('button');
    $btn.classList.add('button');//добавляем кнопки
    $btn.innerText = item.name; //назначаем имя кнопки
    const btnCount = countBtn(item.maxCount, $btn); //создаём счётчик нажатий
    //действия по клику кнопки.
    $btn.addEventListener('click', () =>{
      btnCount();
      player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
      });

      //ответный удар компьютера
      player1.changeHP(random(player1.attacks[0].maxDamage, player1.attacks[0].minDamage));
      renderNewPokemon(player2);//рендерим нового покемона если старый помер
      gameOver(player1);//действия если игрок потеряет все жизни
    })
    //добавялем кнопку в последний дочерний узел дива с классом .control
    $control.appendChild($btn);
  })
}
//удаляем все кнопки
function removeAllButtons() {
  const allButtons = document.querySelectorAll('.control .button')
  allButtons.forEach($item => $item.remove());
}
//добавляем кнопку "начать игру"
function addStartButton() {
  const $controlClass = document.querySelector('.control');//выбираем селектор .

   const $btnStart = document.createElement('button');
    $btnStart.classList.add('button');
    $btnStart.innerText = 'Start Game';
    const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
    $roundsDiv.innerText = " "; // очищаем количество раундов

    $btnStart.addEventListener('click', () =>{
      $roundsDiv.innerText = 'Rounds 3/3';
      removeAllButtons();//очищаем поле удалив все кнопки.
      getPokemons();//добавляем покемонов
      getControlButtons();//добавляем кнопки атаки.

      });
    $controlClass.appendChild($btnStart);
}

//удаляем классы для прогрессбара
function removeHotCriticalClass(persona) {
    const $elProgressBar = persona;
   $elProgressBar.classList.remove('low');
   $elProgressBar.classList.remove('critical');
  //убираем классы что бы сделать полоску опять зеленой

}

//рендер кнопки старт
function addRestartButton(){
  const $controlClass = document.querySelector('.control');//выбираем селектор .
  const gameOverText = document.createElement('div');
        gameOverText.classList.add('game-over');
        gameOverText.innerText = 'Game Over'; // добавляем текст о проигрыше
  const $btnRestart = document.createElement('button'); //создаём кнопку рестарта
  const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
        $roundsDiv.innerText = " "; // очищаем количество раундов

  $btnRestart.classList.add('button'); //добавляем кнопку рестарт
  $btnRestart.innerText = 'Restart Game';

      /**при нажатии удаляем кнопку рестарт. Ставим по дефолту текст раунда.
      *убираем текст о проигрыше
      *добавялем покемонов
      *добавялем кнопки контроля*/
      $btnRestart.addEventListener('click', () =>{
          $roundsDiv.innerText = 'Rounds 3/3';
          $btnRestart.remove();
          gameOverText.remove();
          getPokemons();
          getControlButtons();
          removeHotCriticalClass(player1.elProgressBar); //убираем теги оформления с баров
          removeHotCriticalClass(player2.elProgressBar);
      })
  $controlClass.appendChild(gameOverText);
  $controlClass.appendChild($btnRestart);
}

///действия при проигрыше
function gameOver(person1) {
  if (person1.damageHP <= 0){
    person1.damageHP = 0;
    removeAllButtons();
    addRestartButton();
  }
}


//отрисовка второго игрока после поражения
function renderNewPokemon(person2) {

  if(person2.damageHP <= 0) { //есди у персоны2 меньше или равно 0 ХП - рендерим нового покемона
      person2.damageHP = 0;
      ;

    let playerTwo = pokemons[random(pokemons.length) - 1];
    player2 = new Pokemon({ //создаём нового покемона.
      selectors: 'player2',
      ...playerTwo
    });
    battleCounter();
    removeHotCriticalClass(player2.elProgressBar);
  }

}