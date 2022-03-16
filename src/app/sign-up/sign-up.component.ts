import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private sign:UserService,private route:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form){

  
    this.sign.register(form.value).subscribe((res: any) =>{
      console.log(res);
     form.reset();
     this.route.navigate(['/login'])
    
    }
    )}

    
    
    }

