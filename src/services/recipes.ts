import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {
	private recipes: Recipe[] = [];

	constructor(private authService: AuthService,
							private http: Http) {}

	getRecipes() { 
		return this.recipes.slice();
	}

	addRecipe(title: string, description: string,
					difficulty: string, ingredients: Ingredient[]) {
		this.recipes.push(new Recipe(title, description, difficulty, ingredients));
	}

	updateRecipe(index: number, title: string,
							description: string, difficulty: string,
							ingredients: Ingredient[]) {
		this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
	}

	removeRecipe(index: number) {
		this.recipes.splice(index, 1);
	}

	storeList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		return this.http.put('https://playground-3f11f.firebaseio.com/recipebook/'+userId+
				'/recipes.json?auth='+token, this.recipes)
			.map((res: Response) => res.json());
	}

	loadList(token: string) {
		const userId = this.authService.getActiveUser().uid;
		return this.http.get('https://playground-3f11f.firebaseio.com/recipebook/'+userId+
				'/recipes.json?auth='+token)
			.map((res: Response) => {
				const recipes: Recipe[] = res.json() ? res.json() : [];
				for(let item of recipes) {
					if(!item.hasOwnProperty('ingredients')) {
						item.ingredients = [];
					}
				}
				return recipes;
			})
			.do((recipes: Recipe[]) => {
				if(recipes) {
					this.recipes = recipes;
				} else {
					this.recipes = [];
				}
			});
	}
}