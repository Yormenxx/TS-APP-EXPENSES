"use strict";
class ArrayList {
    constructor() {
        this.items = [];
        this.items;
    }
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, i) => {
            return i === index;
        });
        if (item.length == null) {
            return null;
        }
        else {
            return item[0];
        }
    }
    createFrom(value) {
        this.items = [...value];
    }
    getAll() {
        return this.items;
    }
}
class Expenses {
    constructor(currency) {
        this.expenses = new ArrayList;
        this.count = 0;
        this.finalCurrency = currency;
        this.expenses;
    }
    add(item) {
        item.id = this.count;
        this.count++;
        this.expenses.add(item);
        return true;
    }
    get(index) {
        return this.expenses.get(index);
    }
    getItems() {
        return this.expenses.getAll();
    }
    getTotal() {
        const total = this.getItems().reduce((ac, el) => {
            return ac += this.convertCurrency(el, this.finalCurrency);
        }, 0);
        return `${this.finalCurrency} $${total.toFixed(2).toString()}`;
    }
    remove(id) {
        const items = this.getItems().filter(item => {
            return item.id != id;
        });
        this.expenses.createFrom(items);
        return true;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "COL":
                        return item.cost.number * 4000;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case "COL":
                switch (currency) {
                    case "USD":
                        return item.cost.number / 4000;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
}
