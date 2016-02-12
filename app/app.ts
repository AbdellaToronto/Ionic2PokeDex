import {App, IonicApp, Platform} from 'ionic-framework/ionic';
import {Type} from 'angular2/core';
import {PokemonHome} from './pages/pokemon-home/pokemon-home';
import {PokemonList} from './pages/pokemon-list/pokemon-list';
import {PokemonService} from "./services/pokemon-service";
import {LocalStorageService} from "./services/local-store-service";

@App({
  templateUrl: 'build/app.html',
  providers: [PokemonService, LocalStorageService], //anything injected here is just instantiated once
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
class MyApp {
  rootPage: Type = PokemonHome;
  pages: Array<{title: string, component: Type}>;

  constructor(private app: IonicApp, private platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: PokemonHome },
      { title: 'Pokemon List', component: PokemonList }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
