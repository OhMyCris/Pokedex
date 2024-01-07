const pokedex$$ = document.querySelector('#pokedex');
const url$$ = 'https://pokeapi.co/api/v2/pokemon/';
const input$$ = document.querySelector('#buscador');
const boton$$ = document.querySelector('#boton');



listapokemonsdesdeApi= [];
var ul = document.getElementById("list");

//Esta variable recoge los datos de los pokemon de la api y los devuelve
const getPokemon = async () => {
    
    for (let i = 1; i <= 300; i++){
        const response = await fetch(url$$ + i)
        const result = await response.json()
        //
        listapokemonsdesdeApi.push(result);
        
    }
}


//Esta variable filtra solo los datos que quiero de cada pokemon para no tener que cargar todos
const mapearPokes = (pokesSinMapear) => {
    const pokesMapeados = pokesSinMapear.map((poke) => {
        const tipo1 = poke.types[0]?.type.name;
        const tipo2 = poke.types[1]?.type.name;

        return {
            nombre: poke.name,
            img: poke.sprites.other.home.front_default,
            tipo1: tipo1 || '',
            tipo2: tipo2 || '',
            id: poke.id
        }
    })
    
    return pokesMapeados
}

function buscarPoke(pokenombre,click){
    const pokesMapeados = mapearPokes(listapokemonsdesdeApi)
    pintarPokes(pokesMapeados,pokenombre,click)
}

const pintarPokes = (pokes, pnom,click) => {
    //La const buscadorValue está hecha con la intencion de que me aparezcan varios pokemon cuando haga una busqueda por tipo
    var pokemonFiltrados=[]
    if(click){
        pokemonFiltrados= pokes.filter((poke) => {
            return (
                poke.nombre.toLowerCase()=== pnom  
            )
        })
    }else{
     pokemonFiltrados= pokes.filter((poke) => {
        return (
            poke.nombre.toLowerCase().startsWith(pnom)  ||
             poke.id.toString().startsWith(pnom)  ||
            poke.tipo1.toLowerCase().startsWith(pnom)||
            poke.tipo2.toLowerCase().startsWith(pnom)
        )
    })}
    ul.innerHTML = '';
    pokedex$$.innerHTML="";
    if (pokemonFiltrados.length == 1){
        llenarPokesOl(pokemonFiltrados[0])
    } else if (pokemonFiltrados.length > 1){
        llenarPokesLista(pokemonFiltrados)
    } 
  
}
//Esto es para que salgan varios si pones una letra por ejemplo
function llenarPokesLista(listaPokes) {
    listaPokes.forEach((poke) => {
        let h2$$ = document.createElement('h2');
        let h4$$ = document.createElement('h4');
        let p$$ = document.createElement('p');
        p$$.classList.add('tipo1');  // Nueva clase para el tipo1
        let p2$$ = document.createElement('p');
        p2$$.classList.add('tipo2');  // Nueva clase para el tipo2
        let img$$ = document.createElement('img');
        img$$.setAttribute('id', 'pokeimg');

        var li = document.createElement("li");
        h2$$.textContent = poke.nombre;
        h4$$.textContent = 'Nº ' + poke.id;
        p$$.textContent = poke.tipo1;
        p2$$.textContent = poke.tipo2;
        img$$.setAttribute('src', poke.img);
        img$$.setAttribute('alt', poke.nombre);

        li.appendChild(h4$$);
        li.appendChild(h2$$);
        li.appendChild(p$$);
        li.appendChild(p2$$);
        li.appendChild(img$$);

        // Para cambios de color de la p según el tipo del Pokémon.
        const colores = {
            fire: 'fire',
            grass: 'grass',
            water: 'water',
            bug: 'bug',
            electric: 'electric',
            dark: 'dark',
            dragon: 'dragon',
            fairy: 'fairy',
            fighting: 'fighting',
            flying: 'flying',
            ghost: 'ghost',
            ground: 'ground',
            ice: 'ice',
            normal: 'normal',
            poison: 'poison',
            psychic: 'psychic',
            rock: 'rock',
            steel: 'steel'
        }

        ul.appendChild(li);  // Agregar el elemento <li> a la lista antes de buscar los elementos <p>

        // Obtener elementos <p> por clase dentro del <li>
        const tipo1Element = li.querySelector('.tipo1');
        const tipo2Element = li.querySelector('.tipo2');

        // Aplicar cambios de color
        if (poke.tipo1.toLowerCase() in colores) {
            tipo1Element.classList.add(colores[poke.tipo1.toLowerCase()]);
        }

        if (poke.tipo2.toLowerCase() in colores) {
            tipo2Element.classList.add(colores[poke.tipo2.toLowerCase()]);
        }
    });
}


//esto es para que salga un solo pokemon
function llenarPokesOl(poke){
    pokedex$$.innerHTML="";
    let h2$$ = document.createElement('h2');
let h4$$ = document.createElement('h4');
let p$$ = document.createElement('p');
p$$.setAttribute('id', 'uno');
let p2$$ = document.createElement('p');
p2$$.setAttribute('id', 'dos');
let img$$ = document.createElement('img');
img$$.setAttribute('id', 'pokeimg');
    ul.innerHTML = '';
        h2$$.textContent = poke.nombre
        h4$$.textContent = 'Nº ' + poke.id
        p$$.textContent = poke.tipo1
        p2$$.textContent = poke.tipo2
        img$$.setAttribute('src', poke.img)
        img$$.setAttribute('alt', poke.nombre)
        let pokeli$$ = document.createElement('li')
        pokeli$$.appendChild(h4$$)
        pokeli$$.appendChild(h2$$)
        pokeli$$.appendChild(p$$)
        pokeli$$.appendChild(p2$$)
        pokeli$$.appendChild(img$$)
        pokedex$$.appendChild(pokeli$$)

        //Para cambios de color de la p segun el tipo del pokemon.
        const texto1 = document.querySelector('#uno').textContent.toLowerCase();
        const texto2 = document.querySelector('#dos').textContent.toLowerCase();

        const colores = {
            fire: 'fire',
            grass: 'grass',
            water: 'water',
            bug: 'bug',
            electric: 'electric',
            dark: 'dark',
            dragon: 'dragon',
            fairy: 'fairy',
            fighting: 'fighting',
            flying: 'flying',
            ghost: 'ghost',
            ground: 'ground',
            ice: 'ice',
            normal: 'normal',
            poison: 'poison',
            psychic: 'psychic',
            rock: 'rock',
            steel: 'steel'
        }

        for (const color in colores){
            if (texto1.includes(color)) {
                p$$.classList.remove(...Object.values(colores));
                p$$.classList.add(colores[color]);
            }

            if (texto2.trim() !== "") {
                for (const color in colores) {
                    if (texto2.includes(color)) {
                        p2$$.classList.remove(...Object.values(colores));
                        p2$$.classList.add(colores[color]);
                    }
                }
            } else {
                p2$$.className = "";
            }
            
        }
}
//
async function sacarLista(){
    await getPokemon()
    const pokesMapeados = mapearPokes(listapokemonsdesdeApi);
    llenarPokesLista(pokesMapeados)
}

function meCagoEnLosPokes(){

//Esta variable plasma los datos en el html


//Esta variable es la variable maestra por la que pasan todos los datos de las demas
const init = async () => {
    const buscadorValue = document.getElementById('buscador').value
    if(buscadorValue==""){
        ul.innerHTML="";
        llenarPokesLista(mapearPokes(listapokemonsdesdeApi))
    }else{
        pokedex$$.innerHTML="";
   buscarPoke(buscadorValue,false);}
}

init()
}