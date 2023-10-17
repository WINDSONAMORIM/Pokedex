const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const detail = document.getElementById('detail')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <section class="pokemon ${pokemon.type}" onclick="loadPokemonDetail('${pokemon.name}')">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </section>
    `
}

function loadPokemonDetail(pokemonName) {
    return pokeApi.getPokemonDetails(pokemonName)
        .then((card) => {
            console.log(card);
            detail.innerHTML = 
             `<span class= "pokemon ${card.type}" >
                <h2 class="name">${card.name}</h2>
                <span class="number">#${card.number}</span>
                <span class="name">${card.name}</span>
        
                <div class="detail">
                    <ol class="types">
                        ${card.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${card.photo}" alt="${card.name}">
                </div>
               </span> 
            `;
        })
        .catch((error) => {
            console.error("Erro ao carregar detalhes do Pokémon:", error);
            return "";
        });
    }

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