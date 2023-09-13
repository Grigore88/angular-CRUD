import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {}
  username: string ;
  password: string ;

  login() {
    
    //this.authService.login(this.username, this.password)//.subscribe(
     //response => {
        // Handle successful login, e.g., store tokens, navigate, etc.
     // },
    //  error => {
        // Handle login error, show error message
     // }
    //);
    sessionStorage.setItem('username',this.username)
    sessionStorage.setItem('password', this.password)
    console.log(this.username + this.password + 'in login')
  }
}
