import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from "rxjs/Rx";


@Injectable()
export class PokemonService {

    endpoint = 'http://pokeapi.co/api/v2/pokemon';
    public $pokemonList = new BehaviorSubject([]);

        constructor(
            private http: Http
        ) {
            this.http.get(this.endpoint)
                .map(res => res.json())
                .subscribe(pokeList => this.$pokemonList.next(pokeList));
        }

    getPokemonByUrl(pokeUrl){
        return this.http.get(pokeUrl)
            .map(res => res.json())
            .flatMap(({
                name,
                moves,
                abilities,
                stats,
                id,
                location_area_encounters,
                weight,
                height,
                species}) => {

                let baseData = {name, moves, abilities, stats, id, location_area_encounters, weight, height};

                this.http.get(species.url)
                    .map(res => res.json())
                    .flatMap(({capture_rate, is_baby, has_gender_differences, evolution_chain}) => {

                        let specData = {capture_rate, is_baby, has_gender_differences};

                        this.http.get(evolution_chain.url)
                            .map(res => res.json)
                            .map(evoData => Object.assign({}, baseData, evoData, specData));
                    })
            });
    }

}
