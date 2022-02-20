import {Injectable, OnDestroy} from '@angular/core';
import {Plog} from '@gpeel/plog';

@Injectable()
export class MyStateService implements OnDestroy {
  ngOnDestroy(): void {
    Plog.orange('MyStateService.OnDestroy');
  }

  execute() {
    Plog.orange('MyStateService.execute');
  }
}
