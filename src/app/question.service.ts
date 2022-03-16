import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) { }
  getQuestionJson(){
    return this.http.get<any>("assets/db.json")
  }




  getQuestion(){
    return this.http.get<any>("http://localhost:3000/question")
  }



  getBoard(){
    return this.http.get<any>("http://localhost:3000/leaderBoard")
  }
}
