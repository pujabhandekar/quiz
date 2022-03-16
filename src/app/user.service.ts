import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  register(sign){
    return this.http.post<any>("http://localhost:3000/users",sign)
  }
  getUsers(){
    return this.http.get<any>("http://localhost:3000/users")
  }


  getBoard(){
    return this.http.get<any>("http://localhost:3000/leaderBoard")
  }
}
