import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class PostService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  makeNewPost(post) {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:5000/posts/new', post, {headers: headers})
      .map(res => res.json());
  }

  getPosts() {
    return this.http.get('http://localhost:5000/posts/all')
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
