import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

  showSpinner: boolean = false;
  userId = "1230";
}
