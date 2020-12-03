import countBtn from "../jsModule/buttonCounter.js";
import collectLog from "../jsModule/log.js";
import battleCount from "../jsModule/battleCounter.js";

class Interface {

  addSelectionBox = async()=> {
    
    const $selectionClass = document.querySelector('.selection_box');
    const $plyground=document.querySelector('.playground')
    const $log =document.querySelector('.logs');
    const $roundsDiv = document.getElementById('rounds');
    $plyground.setAttribute('style', 'display:none');//прячем поле playgroun
    $log.setAttribute('style', 'display:none');//прячем поле лог
    $roundsDiv.setAttribute('style','display:none');
    this.allPokemons = await this.getAllPokemons();
    this.allPokemons.forEach(item => {     
      const $div = document.createElement('div');
      $div.setAttribute('id', `${item.id}`);
      $div.innerHTML = `<img class="selection_icon" src="${item.img}">`;
      $selectionClass.appendChild($div)
            $div.addEventListener('click', async ()=> {
                this.player1ID = await this.getPokemonFromId(`${item.id}`)
                console.log(this.player1ID.id);
                await this.addStartButton();
            })

    });
  };

  removeAllButtons =() => {
    const allButtons = document.querySelectorAll('.control .button')
    allButtons.forEach($item => $item.remove());
  }


  addStartButton = async () => {
    const $selection = document.querySelector('.selection');
    $selection.remove();
    const $playground = document.querySelector('.playground')
    const $controlClass = document.querySelector('.control');//выбираем селектор .
    const $log = document.getElementById('logs');
    const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
    $playground.setAttribute('style','display:true');
    $controlClass.setAttribute('style','display:true');
    $log.setAttribute('style','display:true');
    $roundsDiv.setAttribute('style','display:true');
    $roundsDiv.innerText = " "; //  очищаем количество раундов

    
      $roundsDiv.innerText = 'Rounds 3/3';
      this.removeAllButtons();//очищаем поле удалив все кнопки.
      await this.getPokemons();//добавляем покемонов

      await this.getControlButtons();//добавляем кнопки атаки.

  };

  getControlButtons = async () => {
    const $control = document.querySelector('.control')
    //отрисовываем кнопки из массива pokemin.attack
    this.player1.attacks.forEach(item =>{
      const $btn = document.createElement('button');
      $btn.classList.add('button');//добавляем кнопки
      $btn.innerText = item.name; //назначаем имя кнопки
      $btn.setAttribute('id', item.id)
      const btnCount = countBtn(item.maxCount, $btn); //создаём счётчик нажатий
      this.battleCounter = battleCount();// счетчик боя
      //действия по клику кнопки.
      $btn.addEventListener('click', async () =>{
        btnCount();
        let kickAll;//переменная которая будет получать массив с ударами с сервера
        this.btnId = $btn.id; //получаем id созданной кнопки
        //получаем данные сервера и отправляем в переменную kickAll
        await this.getPokemonAttack(this.btnId).then(data=>kickAll=data);
        this.player2.changeHP(kickAll.kick.player2, function (count) {
        });

        //ответный удар компьютера

        this.player1.changeHP(kickAll.kick.player1);
        collectLog(this.player2, this.player1, kickAll.kick.player2);
        await this.renderNewPokemon();//рендерим нового покемона если старый помер
        await this.gameOver();//действия если игрок потеряет все жизни
      })
      //добавялем кнопку в последний дочерний узел дива с классом .control
      $control.appendChild($btn);
    })
  }


  addRestartButton = async () =>{
    const $controlClass = document.querySelector('.control');//выбираем селектор .
    const gameOverText = document.createElement('div');
    gameOverText.classList.add('game-over');
    gameOverText.innerText = 'Game Over'; // добавляем текст о проигрыше
    const $btnRestart = document.createElement('button'); //создаём кнопку рестарта
    const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
    $roundsDiv.innerText = " "; // очищаем количество раундов
    
    $btnRestart.classList.add('button'); //добавляем кнопку рестарт
    $btnRestart.setAttribute('id', 'restart');
    $btnRestart.innerText = 'Retry again';

    /**при нажатии удаляем кнопку рестарт. Ставим по дефолту текст раунда.
     *убираем текст о проигрыше
     *добавялем покемонов
     *добавялем кнопки контроля*/
    $btnRestart.addEventListener('click', async () =>{
      const $btnChoise = document.getElementById('pokemoChoise')
    console.log($btnChoise);
      $roundsDiv.innerText = 'Rounds 3/3';
      $btnRestart.remove();
      $btnChoise.remove();
      gameOverText.remove();
      await this.getPokemons();
      await this.getControlButtons();
      this.removeHotCriticalClass(this.player1);
      this.removeHotCriticalClass(this.player2);
    })
    $controlClass.appendChild(gameOverText);
    $controlClass.appendChild($btnRestart);
  }

  addReChoiseButton = async () =>{
    const $controlClass = document.querySelector('.control');//выбираем селектор .
    const $btnReChoise = document.createElement('button'); //создаём кнопку рестарта
    const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
    $btnReChoise.classList.add('button'); //добавляем кнопку рестарт
    $btnReChoise.setAttribute('id','pokemoChoise')
    $btnReChoise.innerText = 'Choise new Pokemon';

    /**при нажатии удаляем кнопку рестарт. Ставим по дефолту текст раунда.
     *убираем текст о проигрыше
     *добавялем покемонов
     *добавялем кнопки контроля*/
    $btnReChoise.addEventListener('click', async () =>{
      const $body = document.querySelector('.body');
      const gameOverText = document.querySelector('.game-over');
      const $btnRestart = document.getElementById('restart');
      const $selection = document.createElement('div');
      const $choiseText = document.createElement('div');
      const $selectionBox = document.createElement('div');
      $choiseText.classList.add('choise_text');
      $choiseText.innerHTML = '<span>Choose your fighter</span>'
      $selectionBox.classList.add('selection_box');
      $selection.classList.add('selection')
      console.log($selection);
      await $body.appendChild($selection);
      const $selectionSelector = document.querySelector('.selection');
      $selectionSelector.appendChild($choiseText);
      $selectionSelector.appendChild($selectionBox);
      $roundsDiv.innerText = 'Rounds 3/3';
      $btnRestart.remove();
      gameOverText.remove();
      $btnReChoise.remove();
      this.removeHotCriticalClass(this.player1);
      this.removeHotCriticalClass(this.player2);
      this.addSelectionBox();
    })
    $controlClass.appendChild($btnReChoise);
  }


  removeHotCriticalClass = (elBar) => {
    const $elBar = elBar.elProgressBar;
    $elBar.classList.remove('low');
    $elBar.classList.remove('critical');
    //убираем классы что бы сделать полоску опять зеленой

  }
}

export default Interface;