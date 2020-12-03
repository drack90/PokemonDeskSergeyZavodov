import Pokemon from "./pokemon.js";
import Interface from "./interface.js"
import random from "../jsModule/util.js";




class Game extends Interface{
  constructor() {
    super()
  }

  getAllPokemons = async () =>{
    const res = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons`);
    const body1 = await res.json();
    return body1;
  }

  getPokemonFromId = async (pokemonId) =>{
    const $id  = pokemonId;
    const responce = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?id=${$id}`);
    const body = await responce.json();
    return body;
  }

  getPokemonRandom = async () => {
    const responce = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
    const body = await responce.json();
    return body;
  };
  getPokemonAttack = async (btnId) =>{
    let id1 = this.player1.id;
    let id2 = this.player2.id;
    const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${this.player1.id}&attackId=${btnId}&player2id=${this.player2.id}`);
    const attack = await response.json();
    return attack;
  }

  getPokemons = async () => {
    const pokemonId = this.player1ID.id
    const playerOne = await this.getPokemonFromId(pokemonId);

    this.player1 = new Pokemon({
      selectors: 'player1',
      ...playerOne,
    });


    const playerTwo = await this.getPokemonRandom();

    this.player2 = new Pokemon({
      selectors: 'player2',
      ...playerTwo,
    });
  };

  getPokemonPlayer2 = async ()=>{
    const playerTwo = await this.getPokemonRandom();

    this.player2 = new Pokemon({
      selectors: 'player2',
      ...playerTwo
    });
  }

  startGame = async () => {
    this.addSelectionBox();
  }


  //отрисовка нового покемона после смерти прежнего
  renderNewPokemon = async () => {

    if(this.player2.damageHP <= 0) { //есди у персоны2 меньше или равно 0 ХП - рендерим нового покемона
      this.player2.damageHP = 0;


      let playerTwo = await this.getPokemonRandom() ;
      this.player2 = new Pokemon({ //создаём нового покемона.
        selectors: 'player2',
        ...playerTwo
      });
      this.battleCounter();
      this.removeHotCriticalClass(this.player2);
    }

  }

  gameOver = async () => {
    if (this.player1.damageHP <= 0){
      this.player1.damageHP = 0;
      this.removeAllButtons();
      this.addRestartButton();
      this.addReChoiseButton();
    }
  }
}

export default Game;