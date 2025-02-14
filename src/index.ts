// const $bAdd = document.querySelector("#bAdd") as HTMLButtonElement,
//     $cost = <HTMLInputElement>document.querySelector("#cost"),
//     $title = document.querySelector("#title") as HTMLInputElement,
//     $currency = <HTMLInputElement>document.querySelector("#currency")!;
   

// const expenses = new Expenses("USD")

// $bAdd!.addEventListener("click", (e:Event) => {

    
//     if ($title!.value != '' && $cost!.value != '' && !isNaN(parseFloat($cost.value))) {
//         const title = $title!.value,
//             cost = $cost!.value,
//             currency = <Currency>$currency!.value

//         expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
//         render()
//     }else{
//         alert("completa todos los campos")
//     }
// })

// function render(): void {
     
//     let html:string = ''


//     expenses.getItems().forEach(item => {

//         const { id, title, cost } = item;

//         html +=`
//         <div class="item">
//                 <div><span class="currency">${cost.currency}</span> ${cost.number}</div>
//                 <div>${title}</div>
//                 <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
//             </div>
//         `;
//     })


   
    
//     $('#items').innerHTML = html;

//     $('#display').textContent = expenses.getTotal();

//     $$('.bEliminar').forEach(bEliminar => {
//         bEliminar.addEventListener('click', e => {
//             const id: string = (e.target as HTMLButtonElement).getAttribute('data-id') as string;

//             expenses.remove(parseInt(id!));
//             render();

//         });
//     });

// }




// function $(selector: string): HTMLElement {
//     return document.querySelector(selector) as HTMLElement;
// }
// function $$(selector: string): NodeListOf<Element> {
//     return document.querySelectorAll(selector) as NodeListOf<Element>;
// }
const $bAdd = document.querySelector("#bAdd") as HTMLButtonElement | null;
const $cost = document.querySelector("#cost") as HTMLInputElement | null;
const $title = document.querySelector("#title") as HTMLInputElement | null;
const $currency = document.querySelector("#currency") as HTMLInputElement | null;
const $items = document.querySelector(".items") as HTMLDivElement | null; // Nuevo
const $display = document.querySelector(".display") as HTMLSpanElement | null; // Nuevo

const expenses = new Expenses("USD");

if ($bAdd && $cost && $title && $currency) {
    $bAdd.addEventListener("click", (e: Event) => {
        if ($title.value !== "" && $cost.value !== "" && !isNaN(parseFloat($cost.value))) {
            const title = $title.value;
            const cost = $cost.value;
            const currency = $currency.value as Currency;

            expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
            render();
        } else {
            alert("completa todos los campos");
        }
    });
} else {
    console.error("Alguno de los elementos de entrada no se encontró.");
}


function render(): void {
    let html: string = "";

    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;

        html += `
            <div class="item">
                <div><span class="currency">${cost.currency}</span> ${cost.number}</div>
                <div>${title}</div>
                <div><button class="bEliminar" data-id="${id}">Eliminar</button></div>
            </div>
        `;
    });

    if ($items) {
        $items.innerHTML = html;
        if ($display) {
            $display.textContent = expenses.getTotal().toString();
        } else {
            console.error("El elemento #display no se encontró.");
        }

        $items.addEventListener('click', (e: Event) => {
            const target = e.target as Element;
            if (target.classList.contains('bEliminar')) {
                const id = (target as HTMLButtonElement).dataset.id;
                if (id) {
                    expenses.remove(parseInt(id, 10));
                    render();
                }
            }
        });

    } else {
        console.error("El elemento #items no se encontró.");
    }



}

function $(selector: string): HTMLElement | null {  // Retorna null si no lo encuentra
    return document.querySelector(selector) as HTMLElement | null;
}

function $$(selector: string): NodeListOf<Element> | null { // Retorna null si no lo encuentra
    return document.querySelectorAll(selector) as NodeListOf<Element> | null;
}


