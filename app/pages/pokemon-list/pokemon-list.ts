import {Page, Modal, NavController} from 'ionic-framework/ionic';
import {PokemonService} from "../../services/pokemon-service";
import {PokemonInfo} from "../../components/pokemon-info/pokemon-info";
import {NgFor} from 'angular2/common';
import {BehaviorSubject} from "rxjs/Rx";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Page({
    directives: [NgFor],
    template:
        `
        <ion-navbar *navbar>
          <button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </button>
          <ion-title>Ionic2 Pokemon Helper</ion-title>
        </ion-navbar>


        <ion-content>
        <ion-searchbar (input)="filterPokemon($event)"></ion-searchbar>
            <ion-list>
                <ion-item *ngFor="#pokemon of pokemonList" (click)="openDetails(pokemon)">{{pokemon.name}}</ion-item>
            </ion-list>
        </ion-content>
        `
})
export class PokemonList {

    pokemonList: Array<Object>;
    $filterText: BehaviorSubject = new BehaviorSubject('');

    constructor(private pokeService: PokemonService, private nav: NavController) {
        pokeService.$pokemonList
            .flatMap(pokeList => {
                return this.$filterText
                .map(filterText => pokeList.filter(pokemon => pokemon.name.includes(filterText)));
            })
        .subscribe(pokeList => this.pokemonList = pokeList);
    }

    filterPokemon(event) {
        this.$filterText.next(event.value);
    }

    openDetails(pokemon) {
        this.pokeService.getPokemonByUrl(pokemon.url)
            .map(pokemon => {
                console.log(pokemon);
                return pokemon;
            })
            .map(pokemon => Modal.create(PokemonInfo, { pokemon } )) //{ pokemon } === {pokemon: pokemon}
            .subscribe(pokeModal => this.nav.present(pokeModal));
    }
}
