import {Component} from 'angular2/core';
import {Input} from "angular2/core";
import {NgFor} from "angular2/common";

@Component({
    selector: 'evo-tree',
    directives: [NgFor, EvolutionTree],
    styles: [
        `
        :host {
        padding-left: 5%;
        width: 100%;
        display: block;
        }
        `
    ],
    template:
        `
        <div class="name">
        {{chain.species.name}}
        </div>
         <evo-tree *ngFor="#evo of chain.evolves_to" [chain]="evo"></evo-tree>

        `
})
export class EvolutionTree {
    @Input() chain: any;
    constructor(){}
}
