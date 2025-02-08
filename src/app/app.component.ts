import { AfterContentInit, Component, DoCheck, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GlobalService } from './shared/services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{

  globalService = inject(GlobalService);

}
