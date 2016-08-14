import {Component, EventEmitter, Output} from "@angular/core";
@Component({
	selector: 'confirmation',
	templateUrl: 'confirmation.component.html',
	styleUrls: ['confirmation.component.scss']
})
export class ConfirmationComponent {
	
	@Output() confirmation: EventEmitter<any> = new EventEmitter();
	
	closeModal(){
		this.confirmation.emit(false);
	}
}