import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';

@Injectable()
export class MyInitAtStartService {

  execute() {
    Plog.orange('MyInitAtStartService.execute');
  }

  init() {
    Plog.orange('MyInitAtStartService.init'); // PLOG DOES NOT WORK DURING Angular init
    console.log('MyInitAtStartService.init');
  }
}
