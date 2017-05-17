import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService) {
  }

  onSignin(form: NgForm) {
  	this.authService.signin(form.value.email, form.value.password)
  		.then(data => {

  		})
  		.catch(err => {
  			console.log(err);
  		})
  }

}
