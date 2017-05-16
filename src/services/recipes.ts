import { Recipe } from '../models/recipe';

export class RecipesService {
	private recipes: Recipe[] = [];

	getRecipes() {
		return this.recipes.slice();
	}
}