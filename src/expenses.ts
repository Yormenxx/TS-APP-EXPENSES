
type Currency = 'COL' | 'USD'

interface Price{
    number:number,
    currency:Currency
}

interface ExpenseItem{
    id?:number,
    title:string,
    cost:Price
}

interface IExpenses{
    expenses:ArrayList<ExpenseItem>,
    finalCurrency:Currency,
    add(item:ExpenseItem):boolean,
    get(index:number):ExpenseItem | null,
    getTotal():string,
    remove(id:number):boolean
}

class ArrayList<T>{
    private items:T[]=[]

    constructor(){
        this.items;
    }

    add(item:T){
        this.items.push(item)
    }

    get(index:number):T|null{
        const item:T[] = this.items.filter((x:T,i)=>{
            return i === index
        })

        if(item.length == null){
            return null
        }else {
            return item[0]
        }


    }

    createFrom(value:T[]){
        this.items = [...value]
    }


    getAll():T[]{
        return this.items
    }
}

class Expenses implements IExpenses {
    expenses: ArrayList<ExpenseItem> = new ArrayList<ExpenseItem>
    finalCurrency: Currency
    private count = 0

    constructor(currency:Currency){
        this.finalCurrency = currency;
        this.expenses;
    }
    add(item: ExpenseItem): boolean {
        item.id = this.count
        this.count++;
        this.expenses.add(item)
        return true
    }
    get(index:number): ExpenseItem | null {
        return this.expenses.get(index)
    }
    getItems():ExpenseItem[]{
        return this.expenses.getAll()
    }
    getTotal():string {
       const total = this.getItems().reduce((ac,el) =>{
            return ac+=this.convertCurrency(el,this.finalCurrency)
       },0)
       return `${this.finalCurrency} $${total.toFixed(2).toString()}`
    }
    remove(id: number): boolean {
        const items:ExpenseItem[] = this.getItems().filter(item =>{
            return item.id != id
        });

        this.expenses.createFrom(items);
        return true;
    }

    private convertCurrency(item:ExpenseItem, currency:Currency):number{
        switch(item.cost.currency){
            case "USD":
                switch(currency){
                    case "COL":
                        return item.cost.number * 4000
                    break;

                    default:
                        return item.cost.number
                }
            break;

             case "COL":
                switch(currency){
                    case "USD":
                        return item.cost.number / 4000
                    break;

                    default:
                        return item.cost.number
                }
            break;


            default:
                return 0
        }
    }

}  