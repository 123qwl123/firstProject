import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
//import { InvalidInformationcs} from './messages';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class VersionEffectService {
//  invalidInformationcs = InvalidInformationcs;
    constructor(private http: Http) { }

  
}

