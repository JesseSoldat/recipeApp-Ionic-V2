import { Component } from '@angular/core';
import { IonicPage, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { ShoppingListService } from "../../services/shopping-list";
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
	listItems: Ingredient[];

  constructor(private slService: ShoppingListService,
              private popoverCtrl: PopoverController,
              private authService: AuthService,
              private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
  	this.loadItems();
  }

  onAddItem(form: NgForm) {
  	this.slService.addItem(form.value.ingredientName, form.value.amount);
  	form.reset();
  	this.loadItems();
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
            this.slService.loadList(token)
              .subscribe((list: Ingredient[]) => {
                loading.dismiss();
                if(list) {
                  this.listItems = list;
                } else {
                  this.listItems = [];
                }
              },
                err => {
                  loading.dismiss();
                  this.handleError(err.json().error);
                });
          })

      } else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getToken()
          .then((token) => {
            this.slService.storeList(token)
              .subscribe(() => loading.dismiss(),
                err => {
                  loading.dismiss();
                  this.handleError(err.json().error);
                });
          })
      }
    })
  }

  handleError(errMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occured!',
      message: errMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

  onRemoveItem(index: number) {
		this.slService.removeItem(index);
		this.loadItems();
	}

  private loadItems() {
  	this.listItems = this.slService.getItems();
  }

}


// .subscribe(
//   ...
//   ,
//   error => {
//     loading.dismiss();
//     this.handleError(error.json().error);
//   }
// );