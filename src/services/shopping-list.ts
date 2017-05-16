import { Ingredient } from '../models/ingredient';

export class ShoppingListService {
	private ingredients: Ingredient[] = [];

	getItems() {
		return this.ingredients.slice();
	}

	addItem(name: string, amount: number) {
		this.ingredients.push(new Ingredient(name, amount));
	}
}