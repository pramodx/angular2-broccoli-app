import {Component} from "@angular/core";
import {FormGroup, REACTIVE_FORM_DIRECTIVES, Validators, FormBuilder} from "@angular/forms";
import {ControlGroup} from "@angular/common";

@Component({
	selector: 'request-form',
	templateUrl: 'request-form.component.html',
	styleUrls: ['request-form.component.scss'],
	directives: [REACTIVE_FORM_DIRECTIVES]
})
export class RequestFormComponent{
	isFormInvalid:boolean = false;
	requestInviteForm: FormGroup;
	
	constructor(private _formBuilder: FormBuilder){
		// this.requestInviteForm = new FormGroup({
		// 	'fullName': new FormControl('', Validators.required),
		// 	'emailGroup': new FormGroup({
		// 		'email': new FormControl('', [
		// 			Validators.required,
		// 			Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
		// 		]),
		// 		'confirmEmail': new FormControl('', Validators.required)
		// 	})
		// })
		
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
		})
		
		
	}
	
	onSubmit() {
		if(this.requestInviteForm.invalid){
			this.isFormInvalid = true
		} else {
			console.log('Submitting', this.requestInviteForm)
		}
	}
	
	minThreeChars(control: ControlGroup):{[s:string]:boolean}{
		
		if (control.value.length > 2){
			return null
		} else {
			return {'lessThanThree': true}
		}
		
	}
	
	emailValidator(control: ControlGroup):{[s:string]:boolean}{
		if (!control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
			
			return { 'invalidEmailAddress': true };
		}
		
		return null;
	}
	
	emailMatchValidator(group: FormGroup):{[s:string]:boolean}{
		let fields = {};
		for (name in group.controls) {
			var val = group.controls[name].value;
			//console.log(val)
			fields[name] = group.controls[name].value;
		}
		
		if (!(fields['email'] == fields['confirmEmail'])){
			return { 'emailMismatch': true}
		}
		return null;
	}
	
}
