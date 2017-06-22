import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'my-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')]
})
export class AppComponent { 
  loading = false;
  friends: Array<any> = [];

  constructor(private http: Http) { }

  getFriends(src: string) {
    this.loading = true;
    this.http.get('/api/getfriends' + src).map(res => res.json())
      .subscribe(data =>  { this.friends = data; this.loading = false; });
  }
}