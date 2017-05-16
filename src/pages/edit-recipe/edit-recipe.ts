import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
	mode = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard'];


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
   
  }

  ngOnInit() {
  	this.mode = this.navParams.get('mode');

  	this.initializeForm();
  }

  private initializeForm() {
  	let title = null;
  	let description = null;
  	let difficulty = 'Medium';
  }

}
