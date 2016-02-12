import {Component, Input} from 'angular2/core';
import {IONIC_DIRECTIVES, Page, NavParams, ViewController} from 'ionic-framework/ionic';

@Page({
    selector: 'pokemon-info',
    directives: [IONIC_DIRECTIVES],
    template:
        `
        <ion-card>
          <ion-card-header>
            {{pokemon.name}}
            <ion-icon name="close" (click)="close()"></ion-icon>
          </ion-card-header>

          <ion-list>
          <ion-item>{{pokemon.url}}</ion-item>
          </ion-list>
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