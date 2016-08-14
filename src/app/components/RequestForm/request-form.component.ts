import {Component, Output, EventEmitter} from "@angular/core";
import {FormGroup, REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from "@angular/forms";
import {ControlGroup} from "@angular/common";
import {RequestAuthService} from "../../services/request.service";

@Component({
	selector: 'request-form',
	templateUrl: 'request-form.component.html',
	styleUrls: ['request-form.component.scss'],
	directives: [REACTIVE_FORM_DIRECTIVES],
	providers: [RequestAuthService]
})
export class RequestFormComponent{
	
	isFormInvalid:boolean = false;
	requestInviteForm: FormGroup;
	@Output() confirmation: EventEmitter<any> = new EventEmitter();
	serverError: boolean = false;
	sending: boolean = false;
	
	constructor(private _formBuilder: FormBuilder, private _requestService: RequestAuthService){
				
		this.requestInviteForm = _formBuilder.group({
			
			'fullName': ['', [
				Validators.required,
				this.minThreeChars
			]],
			
			'emailGroup': _formBuilder.group({
				'email': ['', [
					Validators.required,
					this.emailValidator
				]],
				'confirmEmail': ['', [
					Validators.required
				]]
			}, {validator:this.emailMatchValidator})
		
		});
		
	}
	
	onSubmit() {
		
		if(this.requestInviteForm.invalid){
			
			this.isFormInvalid = true;
			
		} else {
			
			this.sending = true;
			this.serverError = false;
			
			this._requestService.authenticateInvite({
				name: this.requestInviteForm.value.fullName,
				email: this.requestInviteForm.value.emailGroup.email
			}).subscribe(
				(data) => {
					this.confirmation.emit(true);
					this.sending = false;
				},
				(error) => {
					this.serverError = true;
					this.sending = false;
				}
			)
		}
	}
	
	//Validator to check minimum three characters
	minThreeChars(control: ControlGroup):{[s:string]:boolean}{
		
		if (control.value.length > 2){
			return null
		} else {
			return {'lessThanThree': true}
		}
		
	}
	
	//Validate email format
	emailValidator(control: ControlGroup):{[s:string]:boolean}{
		if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			
			return { 'invalidEmailAddress': true };
		}
		return null;
	}
	
	//Validate if email and confirm email match.
	emailMatchValidator(group: FormGroup):{[s:string]:boolean}{
		
		let fields = {};
		for (name in group.controls) {
			var val = group.controls[name].value;
			
			fields[name] = group.controls[name].value;
		}
		
		if (!(fields['email'] == fields['confirmEmail'])){
			return { 'emailMismatch': true}
		}
		
		return null;
	}
	
}
