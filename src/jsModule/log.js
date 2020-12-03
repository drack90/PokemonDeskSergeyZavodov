import random from "./util.js";

function collectLog(person1, person2, count) {
  return renderLog(generateLog(person1, person2, count));
}

function generateLog(firstPerson, secondPerson, count) {
  const logs = [
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.  - ${count}HP [${firstPerson.damageHP} / ${firstPerson.hp}]`
  ];

  return logs[random(logs.length) -1];
}

function renderLog(generateLog) {
  const log = generateLog;
  const $p = document.createElement('p');
  $p.innerText = log;
  const $logs = document.querySelector('#log');
  $logs.insertBefore($p, $logs.children[0]).log;
}



export default collectLog;