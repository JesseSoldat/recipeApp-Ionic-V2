import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService) {
  }

  onSignup(form: NgForm) {
  	this.authService.signup(form.value.email, form.value.password)
  		.then(data => {

  		})
  		.catch(err => {
        console.log(err);
  		});
  }
}


//billy@hotmail.com billy123