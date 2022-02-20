import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <root-refresh-count></root-refresh-count>
    <section class="todoapp">
      <header class="header">
        <h1>Todo APP</h1>
        <ul>
          <li><a [routerLinkActiveOptions]="{exact: true}" routerLink="/home" routerLinkActive="active">Home</a></li>
          <li><a routerLink="/crud" routerLinkActive="activeCrud">Crud</a></li>
          <li><a routerLink="/crud/list" routerLinkActive="active">List</a></li>
          <li><a routerLink="/crud/create" routerLinkActive="active">Create</a></li>
        </ul>
      </header>

      <router-outlet></router-outlet>

    </section>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
