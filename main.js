import Pokemon from "./jsClass/pokemon.js";
import {pokemons} from "./jsModule/pokemons.js";
import random from "./jsModule/util.js";
import collectLog from "./jsModule/log.js";
import countBtn from "./jsModule/buttonCounter.js";
import {$modal} from "./includes/modal.js"


// let dispPoke = [];
// pokemons.forEach(item =>{dispPoke.push(item.img)});
// console.log(dispPoke)
// let sumPoke = dispPoke.length;
// console.log(sumPoke)
// let getPoke = () => {
//   for(let i=0; i<sumPoke; i++){
//    getPoke = dispPoke[i];
//   }
// }
// let getp;
//
// let modal = $modal({
//   class: 'log',
//   tittle: 'Выберите своего бойца',
//   content: `<img src="${getPoke()}"></img>`,
//   footerButton:[
//     { class: 'btn btn__cancel', text: 'Отмена', handler: 'modalHandlerCancel' },
//     { class: 'btn btn__ok', text: 'ОК', handler: 'modalHandlerOk' }
//   ]
// });
//
//
// modal.show();

console.log(pokemons[0])
const playerOne = pokemons[random(pokemons.length) -1];

const player1 = new Pokemon({
  selectors: 'player1',
  ...playerOne,

});

let pokeImg = player1.img;

// function renderImg (player1){
//   let $elImg = document.getElementById('img-player1');
//   $elImg.src = player1.img;
// }
// renderImg(player1);


console.log(player1)
const $control = document.querySelector('.control')

player1.attacks.forEach(item =>{
  const $btn = document.createElement('button');
  $btn.classList.add('button');
  $btn.innerText = item.name;
  const btnCount = countBtn(item.maxCount, $btn)
  $btn.addEventListener('click', () =>{
    btnCount();
    player2.changeHP(random(item.maxDamage, item.minDamage), function (count) {
      console.log(count)
      collectLog(player2, player1, count);
    });``
  })
  $control.appendChild($btn);

})

const player2 = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 300,
  selectors: 'player2'
});







