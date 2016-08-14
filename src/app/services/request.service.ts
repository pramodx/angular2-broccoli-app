import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {BASE_URL} from "../shared/index";

@Injectable()
export class RequestAuthService {
	
	
	constructor(private _http:Http){
		
	}
	
	authenticateInvite(query){
		return this._http.get(`${BASE_URL}`)
			.map((res:Response) => res.json())
			.map(json => json.items);
	}
	
}