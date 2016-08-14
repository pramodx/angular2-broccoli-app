import {Injectable} from "@angular/core";
import {Http, Response, RequestOptions, Headers} from "@angular/http";
import {BASE_URL} from "../shared/index";
import 'rxjs/Rx';

@Injectable()
export class RequestAuthService {
	
	constructor(private _http:Http){}
	
	//Trigger Service
	authenticateInvite(query){
		let body = JSON.stringify(query);
		let headers = new Headers({'Content-Type':'application/json'});
		let options = new RequestOptions({headers: headers})
		return this._http.post(BASE_URL, body, options)
			.map((res) => res.json)
			
	}
	
}