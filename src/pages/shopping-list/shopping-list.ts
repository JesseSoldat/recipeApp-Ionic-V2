import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../models/ingredient';
import { ShoppingListService } from "../../services/shopping-list";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
	listItems: Ingredient[];

  constructor(private slService: ShoppingListService) {
  }

  ionViewWillEnter() {
  	this.loadItems();
  }

  onAddItem(form: NgForm) {
  	this.slService.addItem(form.value.ingredientName, form.value.amount);
  	form.reset();
  	this.loadItems();
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