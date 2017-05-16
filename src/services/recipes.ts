import { Recipe } from '../models/recipe';
import { Ingredient } from '../models/ingredient';

export class RecipesService {
	private recipes: Recipe[] = [];

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
}