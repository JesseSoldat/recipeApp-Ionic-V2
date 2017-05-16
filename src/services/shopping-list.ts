import { Ingredient } from '../models/ingredient';

export class ShoppingListService {
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
}