import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/Rx";
import {LocalStorageService} from "./local-store-service";
import {Observable} from "rxjs/Observable";


@Injectable()
export class PokemonService {

    endpoint = 'http://pokeapi.co/api/v2/pokemon';
    public $pokemonList = new BehaviorSubject([]);
    private $pokeStore = new BehaviorSubject([]);

        constructor(
            private http: Http,
            private ls: LocalStorageService
        ) {

            ls.getLocalStore('selectPokemon')
            .subscribe(storedPokemon => this.$pokeStore.next(storedPokemon));

            let allPokemonStore = ls.getLocalStore('allPokemon').share();
            let pokeApi = this.http.get(this.endpoint)
                .map(res => res.json());


            allPokemonStore
                .filter(storeData => storeData.length) //If all pokemon are stored locally
                .subscribe(pokeList => this.$pokemonList.next(pokeList));

            allPokemonStore
                .filter(storeData => !storeData.length) //if all pokemon are not stored locally
                .flatMap(()=> pokeApi) //get pokemon from the pokeapi
                .flatMap(pokeList => ls.setLocalStore('allPokemon', pokeList)) //store these locally
                .subscribe(pokeList => this.$pokemonList.next(pokeList));



        }


    getPokemon(pokeUrl){
        let pokeNum = Number(pokeUrl.match(RegExp(/[0-9]+/, 'g')).pop()); //gets the pokemons actual id from the url, used for getting image asset

        return this.$pokeStore
            .flatMap((storedPokemon) => {
                let pokeInStored = storedPokemon.filter(pokemon => pokemon.order === pokeNum);

                if(pokeInStored.length) {
                    return Observable.of(...pokeInStored);
                }else {
                    return this.getPokemonByUrl(pokeUrl, pokeNum)
                        .flatMap(pokemonToSave => this.savePokemonLocally(pokemonToSave, storedPokemon))
                }
            });
    }

    private getPokemonByUrl(pokeUrl, pokeNum){

        return this.getRequest(pokeUrl)
            .map(({name, moves, abilities, stats, id, location_area_encounters, weight, height, species}) =>
                ({name, moves, abilities, stats, id, location_area_encounters, weight, height, species}))
            .flatMap(pokeData => {

                return this.getRequest(pokeData.species.url)
                    .map(({capture_rate, is_baby, has_gender_differences, evolves_from_species, evolution_chain}) =>
                        ({capture_rate, is_baby, has_gender_differences, evolves_from_species, evolution_chain}))
                    .flatMap(speciesData => {

                        return this.getRequest(speciesData.evolution_chain.url)
                            .map(evoData => Object.assign(pokeData, speciesData, evoData, {order: pokeNum}));
                    })
            });
    }


    private savePokemonLocally(pokemonToSave, storedPokemon) {
        let updatedPokeStore = [...storedPokemon, pokemonToSave];
        this.$pokeStore.next(updatedPokeStore);
        return this.ls.setLocalStore('selectPokemon', updatedPokeStore)
            .map(()=> pokemonToSave);
    }

    private getRequest(url) {
        return this.http.get(url)
            .map(res => res.json());
    }

}
