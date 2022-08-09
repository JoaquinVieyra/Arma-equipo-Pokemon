const nombrePokemon = document.querySelector('.pokemon__nombre');
const idPokemon = document.querySelector('.pokemon__id');
const imagenPokemon = document.querySelector('.pokemonImagen');
const buscarpoke = document.querySelector('.buscarpoke');
const input = document.querySelector('.busqueda');
const botonatras = document.querySelector('.atras');
const botonadelante = document.querySelector('.adelante');
let  numeroPokemon=1;

const buscarPokemon = async (pokemon) => {
    const pokemonencontrado = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (pokemonencontrado.status === 200) {
        const data = await pokemonencontrado.json();
        return data;
    }
}
const mostrarPokemon = async (pokemon) => {
    nombrePokemon.innerHTML = 'Cargando...'
    idPokemon.innerHTML = ``;
    const data = await buscarPokemon(pokemon);
    if (data) {
        nombrePokemon.innerHTML = data.name;
        idPokemon.innerHTML = `${data.id}-`;
        imagenPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        numeroPokemon=data.id;
    }
    else {
        nombrePokemon.innerHTML = 'No existe';
        idPokemon.innerHTML = ``;
        imagenPokemon.src = 'imagenes/MissingNo.png';
    }

}
buscarpoke.addEventListener('submit', (event) => {
    event.preventDefault();
    mostrarPokemon(input.value.toLowerCase());
});

function siguiente(){
    numeroPokemon += 1;
   mostrarPokemon(numeroPokemon);
}
function atras(){
    if(numeroPokemon>1){
        numeroPokemon-=1;
        mostrarPokemon(numeroPokemon);
    }
}

mostrarPokemon(1)