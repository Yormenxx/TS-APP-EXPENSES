"use strict";
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
const $bAdd = document.querySelector("#bAdd");
const $cost = document.querySelector("#cost");
const $title = document.querySelector("#title");
const $currency = document.querySelector("#currency");
const $items = document.querySelector(".items"); // Nuevo
const $display = document.querySelector(".display"); // Nuevo
const expenses = new Expenses("USD");
if ($bAdd && $cost && $title && $currency) {
    $bAdd.addEventListener("click", (e) => {
        if ($title.value !== "" && $cost.value !== "" && !isNaN(parseFloat($cost.value))) {
            const title = $title.value;
            const cost = $cost.value;
            const currency = $currency.value;
            expenses.add({ title: title, cost: { number: parseFloat(cost), currency: currency } });
            render();
        }
        else {
            alert("completa todos los campos");
        }
    });
}
else {
    console.error("Alguno de los elementos de entrada no se encontró.");
}
function render() {
    let html = "";
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
        }
        else {
            console.error("El elemento #display no se encontró.");
        }
        $items.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('bEliminar')) {
                const id = target.dataset.id;
                if (id) {
                    expenses.remove(parseInt(id, 10));
                    render();
                }
            }
        });
    }
    else {
        console.error("El elemento #items no se encontró.");
    }
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
