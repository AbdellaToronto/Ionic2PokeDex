import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, Page, NavParams, ViewController} from 'ionic-framework/ionic';
import {EvolutionTree} from "../evolution-tree/evolution-tree";

@Page({
    selector: 'pokemon-info',
    directives: [IONIC_DIRECTIVES, EvolutionTree],
    styles: [
        `
        :host ion-card-header {
            display: flex;
            justify-content: space-between;
        }

        :host .close-icon {
            font-size: 25px;
        }

        :host .stat-list ion-item {
            padding-right: 25%;
            min-height: 1.5em;
        }

        :host img {
            width: auto;
            margin: 0 auto;
        }

        :host .stat-list * {
            margin: 0;
        }
        `
    ],
    template:
        `
        <ion-card>

        <img src="http://pokeapi.co/media/img/{{pokemon.order}}.png" (click)="close()"/>

          <ion-card-content>
            <h2 class="card-title">{{pokemon.name}}</h2>

            <evo-tree [chain]="pokemon.chain"></evo-tree>

            <ion-list no-lines class="stat-list">
              <h2>Base Stats</h2>
              <ion-item *ngFor="#statObj of pokemon.stats">
                  <span>{{statObj.stat.name}}:</span>
                  <span item-right>{{statObj.base_stat}}</span>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>
        `
})
export class PokemonInfo {
    @Input() pokemon: Object;
    constructor(private navParams: NavParams, private viewCtrl: ViewController){
        this.pokemon = navParams.get('pokemon');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}