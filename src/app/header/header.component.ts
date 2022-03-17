import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }


  getDetails() {
    let details = JSON.parse(localStorage.getItem('users'));
    if(details) {
      return details
    }
  }

  isLoggedin() {
    let details = this.getDetails()
    if(details) {
      return true
    } else {
      false
    }
  }

 
  

  
  logout(){
    localStorage.removeItem('users');
    this.route.navigate(['/login'])
  }
}
