import {Component, ViewEncapsulation} from '@angular/core';
import {RequestFormComponent} from "./components/RequestForm/request-form.component";
import {ConfirmationComponent} from "./components/Confirmation/confirmation.component";

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	encapsulation: ViewEncapsulation.None,
	styleUrls: ['app.component.scss'],
	directives: [RequestFormComponent, ConfirmationComponent]
})
export class AppComponent {
	
	requestModal: boolean = false;
	confirmation: boolean = false;
	
	//Open Modal window Form
	renderModal(){
		this.requestModal = true;
	}
	
	//Confirmation Popup
	activateConfirmation(state){
		this.requestModal = false;
		this.confirmation = state;
	}
}
