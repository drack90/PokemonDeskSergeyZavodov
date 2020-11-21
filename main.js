function $getElById(id){
  return document.getElementById(id);
}

const $btn = $getElById('btn-kick')

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  kick: '',
  elHp: $getElById('health-character'),
  elProgressBar: $getElById('progressbar-character'),
  renderHP: renderHP,
  renderHpLife: renderHpLife,
  renderProgressbarHP:renderProgressbarHP,
  changeHP:changeHP,
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  kick: '',
  elHp: $getElById('health-enemy'),
  elProgressBar: $getElById('progressbar-enemy'),
  renderHP: renderHP,
  renderHpLife: renderHpLife,
  renderProgressbarHP:renderProgressbarHP,
  changeHP:changeHP,
}

$btn.addEventListener('click', function () {
  console.log('Kick!');
  character.changeHP(random(20));
  enemy.changeHP(random(20));
  character.renderHP();
  enemy.renderHP();
    
});


function init() {
  console.log('Start Game!');
  character.renderHP();
  enemy.renderHP();
}

function renderHP() {
  this.renderHpLife();
  this.renderProgressbarHP();

}

function renderHpLife() {
  this.elHp.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
  this.elProgressBar.style.width = this.damageHP + '%'
}

function changeHP(count) {
  this.damageHP -= count;
  this.kick = count;
  
  const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy)

  /*выводим лог боя в div#logs в отдельном теге p */
  const $p = document.createElement('p');
  $p.innerText = log;
  const $logs = document.querySelector('#logs');
  $logs.insertBefore($p, $logs.children[0]).log;
  

  if(this.damageHP <= 0){
    this.damageHP =0;
    alert('Бедный ' + this.name + ' проиграл бой!');
    $btn.disabled = true;
  }
  
  this.renderHP
  return this.kick;
}

function random(num) {
  return Math.ceil(Math.random() * num)
}

function generateLog(firstPerson, secondPerson) {
  const logs = [
    `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.  - ${firstPerson.kick}}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
    `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`
  ];

  return logs[random(logs.length) -1];
}





init();   