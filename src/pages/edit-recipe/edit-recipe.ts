import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,
      ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

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
  recipe: Recipe;
  index: number;


  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private recipesService: RecipesService,
              private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,) {
  }

  ngOnInit() {
  	this.mode = this.navParams.get('mode');

  	this.initializeForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredients = [];

    if(value.ingredients.length > 0) {
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }

    if(this.mode == 'Edit') {

    } else {
      this.recipesService.addRecipe(value.title, 
        value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const length = fArray.length;
            if(length > 0) {
              for(let i = length - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All Ingredients were deleted!',
                duration: 1500,
                position: 'bottom'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Add',
          handler: data => {
           if(data.name.trim() == '' || data.name == null) {
             return;
           }
           (<FormArray>this.recipeForm.get('ingredients'))
             .push(new FormControl(data.name, Validators.required));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
  }

  private initializeForm() {
  	let title = null;
  	let description = null;
  	let difficulty = 'Medium';
    let ingredients = [];

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }
}
