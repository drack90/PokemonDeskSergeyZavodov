
class Selectors {
  constructor(name) {
    this.elHP = document.getElementById(`health-${name}`);
    this.elProgressBar = document.getElementById(`progressbar-${name}`);
    this.elImg = document.getElementById(`img-${name}`);
    this.nameText = document.getElementById(`name-${name}`);
  }
}

class Pokemon extends Selectors{

  constructor({name, hp, type, selectors, id, img, attacks =[]},) {
    super(selectors);
    this.name = name;
    this.id = id;
    this.hp = hp;
    this.damageHP = hp;
    this.img = img;
    this.type = type;
    this.attacks = attacks;
    this.renderHP();
    this.renderImg();
    this.renderName();
  }

   changeHP = (count, cb) => {
    this.damageHP -= count;
    let $AllBtn = document.getElementsByClassName('button');
     if(this.damageHP <= 0){
        this.damageHP =0;
        alert('Бедный ' + this.name + ' проиграл бой!');

      }

    this.renderHP();
    cb && cb(count);
  }

   renderHP = () => {
    this.renderHpLife();
    this.renderProgressbarHP();
  }


  renderImg = () => {
    this.elImg.src = this.img;
  };

  renderName = () => {
    this.nameText.innerText = this.name;
  }

   renderHpLife = () => {
    this.elHP.innerText = this.damageHP + ' / ' + this.hp;
  }

   renderProgressbarHP = () => {
    let persentKick = this.damageHP/this.hp*100;

    if (Math.ceil(persentKick) < 60 && Math.ceil(persentKick) > 30 ){
      this.elProgressBar.classList.add('low')
    }else if(Math.ceil(persentKick) <= 30){
      this.elProgressBar.classList.add('critical')
    }

    this.elProgressBar.style.width = Math.ceil(persentKick)  + '%'
  }


}



export default Pokemon;