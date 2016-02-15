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

        <div padding>
          <ion-segment [(ngModel)]="tab">
            <ion-segment-button value="Stats">
              Stats
            </ion-segment-button>
            <ion-segment-button value="Location">
              Location
            </ion-segment-button>
            <ion-segment-button value="Evolution">
              Evolution
            </ion-segment-button>
          </ion-segment>
        </div>

        <div [ngSwitch]="tab">
          <ion-card-content *ngSwitchWhen="'Stats'">
            <h2 class="card-title">{{pokemon.name}}</h2>

            <ion-list no-lines class="stat-list">
              <h2>Base Stats</h2>
              <ion-item *ngFor="#statObj of pokemon.stats">
                  <span>{{statObj.stat.name}}:</span>
                  <span item-right>{{statObj.base_stat}}</span>
              </ion-item>
            </ion-list>
          </ion-card-content>

          <ion-card-content *ngSwitchWhen="'Location'">
          </ion-card-content>

          <ion-card-content *ngSwitchWhen="'Evolution'">
              <evo-tree [chain]="pokemon.chain"></evo-tree>
          </ion-card-content>

        </div>

        </ion-card>
        `
})
export class PokemonInfo {
    @Input() pokemon: Object;

    tab: String = 'Stats';

    constructor(private navParams: NavParams, private viewCtrl: ViewController){
        this.pokemon = navParams.get('pokemon');
    }

    close() {
        this.viewCtrl.dismiss();
    }
}
