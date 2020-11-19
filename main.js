
const $btn = document.getElementById('btn-kick')
const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHp: document.getElementById('health-character'),
  elProgressBar: document.getElementById('progressbar-character')
}

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHp: document.getElementById('health-enemy'),
  elProgressBar: document.getElementById('progressbar-enemy')
}

$btn.addEventListener('click', function () {
  console.log('Kick!');
  changeHP(random(20), character);
  changeHP(random(20), enemy);
});


function init() {
  console.log('Start Game!');
  renderHP(character);
  renderHP(enemy);
}

function renderHP(person) {
  renderHpLife(person);
  renderProgressbarHP(person);
}

function renderHpLife(person) {
  person.elHp.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
  person.elProgressBar.style.width = person.damageHP + '%'
}

function changeHP(count, person) {
  if (person.damageHP < count){
    person.damageHP =0;
    alert('Бедный ' + person.name + ' проиграл бой!');
    $btn.disabled = true;
  }else{
    person.damageHP -= count;
  }


  renderHP(person);
}

function random(num) {
  return Math.ceil(Math.random() * num)
}
init();

let k = document.getElementById('searchBoxPrice');
k.innerText = 'Криополиз';
let f = document.getElementById('searchBlock');
f.style.display = 'block';