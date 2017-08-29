/*首页service*/
import { Injectable } from '@angular/core';
import { InvalidInformationcs,InvalidInformationc  } from './messages';


@Injectable()
export class IndexService {
    invalidInformationcs :InvalidInformationc [] = InvalidInformationcs;

}
