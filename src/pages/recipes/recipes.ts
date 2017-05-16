import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from "../edit-recipe/edit-recipe";

import { RecipesService } from '../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
	recipes: Recipe[];

  constructor(public navCtrl: NavController, 
  	private recipesService: RecipesService) {
  }

  ionViewWillEnter() {
  	this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
  	this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
 

}
