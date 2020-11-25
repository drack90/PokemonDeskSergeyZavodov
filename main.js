function $getElById(id){
  return document.getElementById(id);
}
function $getElQuerySelector(id) {
  return document.querySelector(id)
}

//(не может в английский на таком уровне) Сделал кнопки объектами что бы проще было обращаться с ними.
//И была возможность унифицировать и прочее.
const $btn = {
  name: 'Thunder Jolt',
  id: $getElById('btn-kick'),
  elSelector: $getElQuerySelector('#btn-kick'),
  clickLimitName: 4, //disp in button name
  clickLimit: 4,  //button tap counter
  renderButtonName,
  countClick: countClick(),
  /** #ВОПРОСМЕНТОРУ: если в данном месте ставить без обявления имени то функция перестаёт работать
  *  Я правильно понимаю что это происходит из-за вложеной функции согласно уроку 04.03? */
}

const $btnKickBall = {
  name: 'Kick on the ball',
  id: $getElById('btn-ballKick'),
  elSelector: $getElQuerySelector('#btn-ballKick'),
  clickLimitName: 4,
  clickLimit: 4,
  renderButtonName,
  countClick: countClick(),
}


const character = {
  name: 'Pikachu',
  defaultHP: 130,
  damageHP: 130,
  kick: '',
  elHp: $getElById('health-character'),
  elProgressBar: $getElById('progressbar-character'),
  renderHP,
  renderHpLife,
  renderProgressbarHP,
  changeHP,
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  kick: '',
  elHp: $getElById('health-enemy'),
  elProgressBar: $getElById('progressbar-enemy'),
  renderHP,
  renderHpLife,
  renderProgressbarHP,
  changeHP,
}

//add event from tap in bnt 'kick on the ball' - pikachu hut

$btnKickBall.id.addEventListener('click', function () {
  enemy.changeHP(random(25));
  renderAllHP();
  $btnKickBall.countClick($btnKickBall.clickLimit); //add counter in button click
  renderAllHP();
  $btnKickBall.renderButtonName();
})

$btn.id.addEventListener('click', function () {
  character.changeHP(random(20));
  enemy.changeHP(random(20));
  $btn.countClick($btn.clickLimit);
  renderAllHP();
  $btn.renderButtonName();

});


function init() {
  console.log('Start Game!');
  renderAllHP();
  renderAllButtonName();

}

function renderHP() {
  this.renderHpLife();
  this.renderProgressbarHP();

}

function renderHpLife() {
  this.elHp.innerText = this.damageHP + ' / ' + this.defaultHP;
}
/* add render width progress bar in percent of all HP*/
function renderProgressbarHP() {
  persentKick = this.damageHP/this.defaultHP*100;
  this.elProgressBar.style.width = Math.ceil(persentKick)  + '%'
}

//func render all character hp
function renderAllHP() {
  character.renderHP();
  enemy.renderHP();
}


/**NEW FUNC */
function renderButtonName() {
  btnName = this.name + ' [' + (this.clickLimitName + 1) + ']'
  this.id.innerText = btnName;
}

function renderAllButtonName() {
  $btn.renderButtonName();
  $btnKickBall.renderButtonName();
}

function countClick() {
  let countClick = 0;

    return function (countLimit) {
      ++countClick;
      if (countLimit >= countClick){
        return this.clickLimitName -= 1;
      }else if(this.clickLimitName === 0){
          this.elSelector.setAttribute("disabled", "disabled"); //disable button
          return this.clickLimitName -= 1;
      }
    }
}



//func count hp
function changeHP(count) {
  this.damageHP -= count;
  /*add kick count for display in log*/
  this.kick = count;
  
  const log = this === enemy ? generateLog(this, character) : generateLog(this, enemy)

  /*display battle log in div$logs in 'p' tag*/
  const $p = document.createElement('p');
  $p.innerText = log;
  const $logs = document.querySelector('#log');
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
    `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.  - ${firstPerson.kick}HP [${firstPerson.damageHP} / ${firstPerson.defaultHP}]`,
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