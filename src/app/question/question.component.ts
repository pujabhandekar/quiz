
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { interval } from 'rxjs';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
public name:string="";
public questionList:any=[];
public Data:any=[];
public currentQuestion:number=0;
public points:number=0;
correctAnswer:number=0;
inCorrectAnswer:number=0;
isQuizCompleted:boolean=false;
counter=60;
  interval$: any;
  progress: string;
  constructor(private questionService:QuestionService,private route:Router) { }

  ngOnInit(): void {
    this.name=localStorage.getItem('name');
    this.getAllQuestions();
    this.startCounter();
    this.data();
  }



getAllQuestions(){
this.questionService.getQuestionJson().subscribe((res)=>
{
  console.log(res);
  
  this.questionList=res.questions;
  
})
}
nextQuestion(){
this.currentQuestion+1;
this.counter=60;
}

previousQuestion(){
  this.currentQuestion--;
this.counter=60;

}
answer(currentQno:number,option:any){
  if(currentQno=== this.questionList.length){
    this.isQuizCompleted=true;
    this.stopCounter();

  }
  if(option.correct){
    this.points+=10    // increasing the points by 10
    setTimeout(() => {
      this.currentQuestion++ // for moving to the next question
    
    this.correctAnswer++;   //if answer is correct
  

   this.getProgressPercent();    //for progress bar
      
    },2000);
    
     
  }else{
    setTimeout(() => {                   //to check the color changes so adding little delay
      this.inCorrectAnswer++;   //if answer is wrong
    this.currentQuestion++; // it should move to next question even when wrong answer.
    this.getProgressPercent();      //for progress bar 
    },2000);
    this.points-=10    // decreasing  the points by 10
    

  }

}
startCounter(){
  this.interval$=interval(1000).subscribe((val)=>{       // this to set interval using rxjx operator  ,1000=60sec
    this.counter--;                                     //to decrese the counter
    if(this.counter===0){                           //if counter becomes to 0 then
      this.currentQuestion++;                     //to move to the next question if not answred within the time
      this.counter=60;                        //for next question to be start from 60 sec again
      this.points-=10;                       //if timeout and not answered then decrease the points by 10
    }

  });
  setTimeout(() => {
    this.interval$.unsubscribe();               // to stop the interval then we have to unsubscribe 
    
  },600000);
}
stopCounter(){
  this.interval$.unsubscribe();       // to stop the counter just unsubscribe 
  this.counter=0;                    //set the counter to 0

}
resetCounter(){
this.stopCounter();     // first we have to stopthe counter
this.counter=60;          //then set it to 60 
this.startCounter();    //again restart it from 60
}

resetQuiz(){
  this.resetCounter();                    //it will call stop and start counters as written in the resetcounter methord above
  this.getAllQuestions();           //this is to get the all the questions again
  this.points=0;                    //this is to set the points to 0
  this.counter=60;              // this is to set the counter to 60 from start
  this.currentQuestion=0;        //this to get the questions back to start from 1 
  this.progress="0"                 //to set the progress to zero and start again

}
getProgressPercent(){
  this.progress=((this.currentQuestion/this.questionList.length)*100).toString();
  return this.progress
}





restart(){
  this.route.navigate(['/restart'])
}



data(){
  this.questionService.getBoard().subscribe((res)=>{
    console.log(res);
    
    this.data=res;
    
    

  })
}
}




