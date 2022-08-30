const nombrePokemon=document.querySelector('.pokemon__nombre');
const idPokemon=document.querySelector('.pokemon__id');
const imagenPokemon=document.querySelector('.pokemonImagen');
const form=document.querySelector('.buscarpoke');
const input=document.querySelector('.busqueda');
let numeroPokemon=1;
let equipo=[];

function confirmar(){
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Anadido al equipo',
        timer: 1000
      })
}
function masDeSeis(){
Swal.fire('Ya haz llegado al limite de Pokemon en tu equipo');
}

async function buscarPokemon (pokemon){
    const listaPokemon=  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (listaPokemon.status===200){
        const informacion= await listaPokemon.json();
        return informacion;
    }
}
async function mostrarPokemon(pokemon){
    nombrePokemon.innerHTML = 'Cargando...';
    idPokemon.innerHTML='';
    const informacion= await buscarPokemon(pokemon);
    if (informacion)
    {
        nombrePokemon.innerHTML=informacion.name;
        idPokemon.innerHTML=informacion.id +'-';
        imagenPokemon.src=informacion['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];
        input.value='';
        numeroPokemon=informacion.id;
    }
        else {
        nombrePokemon.innerHTML = 'No existe :P';
        idPokemon.innerHTML = ``;
        imagenPokemon.src = 'imagenes/MissingNo.png';
    }
    if (informacion.id>649){
        nombrePokemon.innerHTML=informacion.name + ' aparece despues de kalos';
        imagenPokemon.src = 'imagenes/png-transparent-error-cross-red-cross-error.png';
    }
}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    mostrarPokemon(input.value.toLowerCase());
});
function siguiente (){
    if (numeroPokemon<649){
        numeroPokemon+=1;
        mostrarPokemon(numeroPokemon);
    }
}
function atras(){
    if(numeroPokemon>1){
        numeroPokemon-=1;
        mostrarPokemon(numeroPokemon);
    }
}
function sacarDelequipo(id){
    equipo.splice(id, 1);
    pintarEquipo();
}
mostrarPokemon(1);
 
async function agregarPokemon(){
    let informacion= await buscarPokemon(numeroPokemon);
    if(equipo.length<6){
        equipo.push(informacion);
        confirmar();
    }
    if(equipo.length==6){
        masDeSeis();
    }
    pintarEquipo();
}
 function pintarEquipo(){
    let aux='';
    for (let i=0;i<equipo.length;i++){
        aux += 
        `<div style=" border-top: solid .2rem black;">
        <h6 style="font-size:3rem "> Pokemon: ${equipo[i].name}<h6>
        <p style="font-size:2rem; ">Numero Pokedex: ${equipo[i].id}</p>
        <p style="font-size:2rem; ">Tipo: ${equipo[i]['types']['0']['type']['name']}</p>
        <img src="${equipo[i] ['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default']}" style="height:4rem">
        <p  onclick="sacarDelequipo(${i})" style="color:red;font-size:30px;
        cursor:pointer;
        display:flex;
        flex-wrap:nowrap;
        justify-content:center;
        align-items:center">X</p>
        </div>`
    }
 document.querySelector('.equipoPkmn').innerHTML=aux;
}
