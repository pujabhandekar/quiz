import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  form: any;
  detail: any;
  constructor(private user:UserService,private route:Router ) { }

  ngOnInit(): void {
    this.user.getUsers().subscribe((res)=>{
      console.log(res);
      this.detail =res;
      
    })
  }

  onSubmit(data){
    let flag = false
    this.detail.forEach((res)=> {
     if(res.Email == data.value.Email && res.password == data.value.password) {
       alert("User Logged In Successfully")
       localStorage.setItem("users",JSON.stringify(res))
       flag = true;
       data.reset()
       this.route.navigate(['welcome']) 
     } 
   })
   if(!flag) {
     alert("Please signup");
     this.route.navigate(['/sign-up'])
   }
  }
  }

