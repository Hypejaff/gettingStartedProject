import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';

@Injectable({
  providedIn: 'root'
})
export class MyGlobalService {

  execute() {
    Plog.orange('MyGlobalService.execute');
  }
}
