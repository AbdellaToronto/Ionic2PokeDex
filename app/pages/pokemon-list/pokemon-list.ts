import {Page, Modal, NavController} from 'ionic-framework/ionic';
import {PokemonService} from "../../services/pokemon-service";
import {PokemonInfo} from "../../components/pokemon-info/pokemon-info";
import {NgFor} from 'angular2/common';

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
            <ion-list>
                <ion-item *ngFor="#pokemon of pokemonList" (click)="openDetails(pokemon)">{{pokemon.name}}</ion-item>
            </ion-list>
        </ion-content>
        `
})
export class PokemonList {

    pokemonList: Array<Object>;

    constructor(private pokeService: PokemonService, private nav: NavController) {
        pokeService.$pokemonList
        .subscribe(pokeList => this.pokemonList = pokeList);
    }

    openDetails(pokemon) {
        this.pokeService.getPokemonByUrl(pokemon.url)
            .map(pokemon => Modal.create(PokemonInfo, { pokemon } )) //{ pokemon } === {pokemon: pokemon}
            .subscribe(pokeModal => this.nav.present(pokeModal));
    }
}
