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

}
