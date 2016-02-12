import {Injectable} from "angular2/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';


@Injectable()
export class LocalStorageService {
    constructor(){

    }

    getLocalStore(key){
        return Observable.of(localStorage.getItem(key) || '[]')
            .map(ls => JSON.parse(ls))
    }

    setLocalStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        return Observable.of(value);
    }
}