import {Component, ViewEncapsulation} from '@angular/core';
import {RequestFormComponent} from "./components/RequestForm/request-form.component";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['app.component.scss'],
	directives: [RequestFormComponent]
})
export class AppComponent {
	modal: boolean = false;
	
	renderModal(){
		this.modal = true;
	}
}
