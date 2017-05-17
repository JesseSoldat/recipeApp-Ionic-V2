import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController,
        LoadingController, AlertController } from 'ionic-angular';
import { Recipe } from '../../models/recipe';
import { EditRecipePage } from "../edit-recipe/edit-recipe";
import {RecipePage } from '../recipe/recipe';
import { RecipesService } from '../../services/recipes';
import { AuthService } from '../../services/auth';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
	recipes: Recipe[];

  constructor(public navCtrl: NavController, 
  	         private recipesService: RecipesService,
             private popoverCtrl: PopoverController,
             private loadingCtrl: LoadingController,
             private alertCtrl: AlertController,
             private authService: AuthService) {
  }

  ionViewWillEnter() {
  	this.recipes = this.recipesService.getRecipes();
  }

  onNewRecipe() {
  	this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index});
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if(!data) {
        return;
      }
      if(data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.recipesService.loadList(token)
              .subscribe((list: Recipe[]) => {
                loading.dismiss();
                if(list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
                }
              }, err => {
                loading.dismiss();
                this.handleError(err.json().error);
              });
          });

      } else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token: string) => {
            this.recipesService.storeList(token)
              .subscribe(() => loading.dismiss(),
                err => {
                  loading.dismiss();
                  this.handleError(err.json().error)
                });
          });
      }
    });

  }

  handleError(errMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errMessage,
      buttons: ['Ok']
    });
    alert.present();
  }
 

}
