import {$AllBtn} from "../jsModule/buttons.js";

class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressBar = document.getElementById(`progressbar-${name}`);
  }
}

class Pokemon extends Selectors{

  constructor({name, hp, type, selectors},) {
    super(selectors);
    this.name = name;
    this.defaultHP = hp;
    this.damageHP = hp;
    this.type = type;

    this.renderHP();
  }

   changeHP = (count, cb) => {
    this.damageHP -= count;

      if(this.damageHP <= 0){
        this.damageHP =0;
        alert('Бедный ' + this.name + ' проиграл бой!');
        //off all button which contain .button class
        for(let i=0; i<$AllBtn.length; i++){
          $AllBtn[i].disabled =true;
        }
      }

    this.renderHP();
    cb && cb();
  }

   renderHP = () => {
    this.renderHpLife();
    this.renderProgressbarHP();

  }

   renderHpLife = () => {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
  }

   renderProgressbarHP = () => {
    let persentKick = this.damageHP/this.defaultHP*100;

    if (Math.ceil(persentKick) < 60 && Math.ceil(persentKick) > 30 ){
      this.elProgressBar.classList.add('low')
    }else if(Math.ceil(persentKick) <= 30){
      this.elProgressBar.classList.add('critical')
    }

    this.elProgressBar.style.width = Math.ceil(persentKick)  + '%'
  }
}

export default Pokemon;