import {Page} from 'ionic-framework/ionic';


@Page({
    template:
        `
        <ion-navbar *navbar>
          <button menuToggle>
            <ion-icon name="menu"></ion-icon>
          </button>
          <ion-title>Ionic2 Pokemon Helper</ion-title>
        </ion-navbar>


        <ion-content padding>

          <h3>Hello World</h3>

        </ion-content>
        `
})
export class PokemonHome {
    constructor() {

    }
}
