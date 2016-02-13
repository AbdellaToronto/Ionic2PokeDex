import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/Rx";
import {LocalStorageService} from "./local-store-service";


@Injectable()
export class PokemonService {

    endpoint = 'http://pokeapi.co/api/v2/pokemon';
    public $pokemonList = new BehaviorSubject([]);

        constructor(
            private http: Http,
            private ls: LocalStorageService
        ) {

            let pokeStore = ls.getLocalStore('allPokemon').share();
            let pokeApi = this.http.get(this.endpoint)
                .map(res => res.json());

            pokeStore
                .filter(storeData => storeData.length)
                .subscribe(pokeList => this.$pokemonList.next(pokeList));

            pokeStore
                .filter(storeData => !storeData.length)
                .flatMap(()=> pokeApi)
                .flatMap(pokeList => ls.setLocalStore('allPokemon', pokeList))
                .subscribe(pokeList => this.$pokemonList.next(pokeList));



        }

    getPokemonByUrl(pokeUrl){
        let pokeNum = Number(pokeUrl.match(RegExp(/[0-9]+/, 'g')).pop()); //gets the pokemons actual id from the url, used for getting image asset

        return this.http.get(pokeUrl)
            .map(res => res.json())
            .map(({name, moves, abilities, stats, id, location_area_encounters, weight, height, species}) =>
                ({name, moves, abilities, stats, id, location_area_encounters, weight, height, species}))
            .flatMap(pokeData => {

                return this.http.get(pokeData.species.url)
                    .map(res => res.json())
                    .map(({capture_rate, is_baby, has_gender_differences, evolves_from_species, evolution_chain}) =>
                        ({capture_rate, is_baby, has_gender_differences, evolves_from_species, evolution_chain}))
                    .flatMap(speciesData => {

                        return this.http.get(speciesData.evolution_chain.url)
                            .map(res => res.json())
                            .map(evoData => Object.assign(pokeData, speciesData, evoData, {order: pokeNum}));
                    })
            });
    }

}
