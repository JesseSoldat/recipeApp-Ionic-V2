import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../models/recipe';
import { RecipesService } from '../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
	mode = 'New';
	selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private recipesService: RecipesService) {
  }

  ngOnInit() {
  	this.mode = this.navParams.get('mode');

  	this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;

    if(this.mode == 'Edit') {

    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  private initializeForm() {
  	let title = null;
  	let description = null;
  	let difficulty = 'Medium';

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required)
    });
  }
}
