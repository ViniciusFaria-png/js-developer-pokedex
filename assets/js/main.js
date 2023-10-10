
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="pokemonButton" id="buttonDetalhes"></div>
            <ul class="status">
            </ul>
            <ul class="statusPrincipal">
                <li>Peso: ${pokemon.weight}kg</li>
                <li>Altura: ${pokemon.height/10}m</li>
                <li>Ataque Principal: ${pokemon.move}</li>
                <li>Nature: ${pokemon.ability}</li>
            </ul>

            <ul class="statusPokemon">
                <li class="statusLi">HP: ${pokemon.hp}</li>
                <li class="barra"><div class="bar-hp bar" style="width: ${pokemon.hp}%;">&nbsp;</div></li>
                <li class="statusLi">Attack: ${pokemon.atk}</li>
                <li class="barra"><div class="bar-atk bar" style="width: ${pokemon.atk}%;">&nbsp;</div></li>
                <li class="statusLi">Defense: ${pokemon.def}</li>
                <li class="barra"><div class="bar-def bar" style="width: ${pokemon.def}%;">&nbsp;</div></li>
                <li class="statusLi">Sp. Atk: ${pokemon.spcatk}</li>
                <li class="barra"><div class="bar-spcatk bar" style="width: ${pokemon.spcatk}%;">&nbsp;</div></li>
                <li class="statusLi">Sp. Def: ${pokemon.spcdef}</li>
                <li class="barra"><div class="bar-spcdef bar" style="width: ${pokemon.spcdef}%;">&nbsp;</div></li>
                <li class="statusLi">Speed: ${pokemon.speed}</li>
                <li class="barra"><div class="bar-speed bar" style="width: ${pokemon.speed}%;">&nbsp;</div></li>
            </ul>

        </li>
    `
}

let detalhes = document.querySelector('#detalhesId')
let closeModalButton = document.querySelector('#closeButton')

document.addEventListener('click', function(details){
    if(details.target.innerText == "Detalhes"){
        detalhes.computedStyleMap.display = "flex"
        let pokeActual = details.target.parentElement
        var pokeLi = document.querySelector('#moodalpoke')
        pokeLi.innerHTML = pokeActual.innerHTML
        let pokeClass = pokeActual.classList[1]
        pokeLi.classList = pokeClass
        pokeLi.classList.add("mostrar")
    }
    if(details.target.id == "closeButton"){
        detalhes.computedStyleMap.display = "none"
    }
    if(details.target.innerHTML == "Atributos"){
        let mainStatus = document.querySelector(".detalhes .main_stats")
        let statusPoke = document.querySelector(".detalhes .status_poke")
        mainStatus.style.display = "none"
        statusPoke.style.display = "grid"
    }
})


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})