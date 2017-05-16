import { Recipe } from '../models/recipe';

export class RecipesService {
	private recipes: Recipe[] = [];

	getRecipes() {
		return this.recipes.slice();
	}

	addRecipe(title: string, description: string,
					difficulty: string) {
		this.recipes.push(new Recipe(title, description, difficulty));
		console.log(this.recipes);
	}
}