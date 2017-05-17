import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

import { AuthService } from './auth';

@Injectable()
export class ShoppingListService {
	constructor(private http: Http,
						private authService: AuthService) {}

	private ingredients: Ingredient[] = [];

	getItems() {
		return this.ingredients.slice();
	}

	addItem(name: string, amount: number) {
		this.ingredients.push(new Ingredient(name, amount));
	}

	addItems(items: Ingredient[]) {
		this.ingredients.push(...items);
	}

	removeItem(index: number) {
		this.ingredients.splice(index, 1);
	}

	storeList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		return this.http
			.put('https://playground-3f11f.firebaseio.com/recipebook/'+userId+
				'/shopping-list.json?auth='+token, this.ingredients)
			.map((res: Response) => {
				return res.json();
			});
	}

	loadList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://playground-3f11f.firebaseio.com/recipebook/'+userId+
				'/shopping-list.json?auth='+token)
			.map((res: Response) => {
				return res.json();
			})
			.do((ingredients: Ingredient[]) => {
				if(ingredients) {
					this.ingredients = ingredients;
				} else {
					this.ingredients = [];
				}
			});
	}
}