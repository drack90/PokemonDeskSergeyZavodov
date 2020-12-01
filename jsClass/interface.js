import countBtn from "../jsModule/buttonCounter.js";
import collectLog from "../jsModule/log.js";
import battleCount from "../jsModule/battleCounter.js";

class Interface {
  removeAllButtons =() => {
    const allButtons = document.querySelectorAll('.control .button')
    allButtons.forEach($item => $item.remove());
  }

  addStartButton = async () => {

    const $controlClass = document.querySelector('.control');//выбираем селектор .

    const $btnStart = document.createElement('button');
    $btnStart.classList.add('button');
    $btnStart.innerText = 'Start Game';
    const $roundsDiv = document.getElementById('rounds');//выбираем поле с количеством раундов
    $roundsDiv.innerText = " "; //  очищаем количество раундов

    $btnStart.addEventListener('click', async () =>{
      $roundsDiv.innerText = 'Rounds 3/3';
      this.removeAllButtons();//очищаем поле удалив все кнопки.
      await this.getPokemons();//добавляем покемонов

      await this.getControlButtons();//добавляем кнопки атаки.

    });
    $controlClass.appendChild($btnStart);
  };
  getControlButtons = async () => {
    console.log(this)
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
    $btnRestart.innerText = 'Restart Game';

    /**при нажатии удаляем кнопку рестарт. Ставим по дефолту текст раунда.
     *убираем текст о проигрыше
     *добавялем покемонов
     *добавялем кнопки контроля*/
    $btnRestart.addEventListener('click', async () =>{
      $roundsDiv.innerText = 'Rounds 3/3';
      $btnRestart.remove();
      gameOverText.remove();
      await this.getPokemons();
      await this.getControlButtons();
      this.removeHotCriticalClass(this.player1);
      this.removeHotCriticalClass(this.player2);
    })
    $controlClass.appendChild(gameOverText);
    $controlClass.appendChild($btnRestart);
  }


  removeHotCriticalClass = (elBar) => {
    const $elBar = elBar.elProgressBar;
    $elBar.classList.remove('low');
    $elBar.classList.remove('critical');
    //убираем классы что бы сделать полоску опять зеленой

  }
}

export default Interface;