import Pokemon from "./jsClass/pokemon.js";
import { $btn, $btnShock, $AllBtn} from "./jsModule/buttons.js"
import random from "./jsModule/util.js";
import collectLog from "./jsModule/log.js";
import countBtn from "./jsModule/buttonCounter.js";


const player1 = new Pokemon({
  name: 'Pickachu',
  type: 'electrik',
  hp:300,
  selectors: 'character'
});

const player2 = new Pokemon({
  name: 'Charmander',
  type: 'fire',
  hp: 300,
  selectors: 'enemy'
});

//add count and first init func
const btnCountJolt = countBtn(6, $btn);
//action on click
$btn.addEventListener('click', function () {
  btnCountJolt();
  player1.changeHP(random(30, 5),  function (count) {
    collectLog(player1, player2, count);
  });
  player2.changeHP(random(250, 200), function (count) {
  collectLog(player2, player1, count);
  });
})


const btnCountShok = countBtn(5, $btnShock);
$btnShock.addEventListener('click',function () {
  btnCountShok();
  player2.changeHP(random(50, 10), function (count) {
   collectLog(player2, player1, count);
  });
})





