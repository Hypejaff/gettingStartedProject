import {Injectable} from '@angular/core';
import {Plog} from '@gpeel/plog';

@Injectable()
export class MyFeatureService {

  execute() {
    Plog.orange('MyFeatureService.execute');
  }
}
