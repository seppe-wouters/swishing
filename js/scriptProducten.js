import { producten } from "./producten.js";

const divEl = document.querySelector("#divEl")
const winkelkarEl = document.querySelector("#winkelkar")

producten.forEach(p => {
    divEl.innerHTML += `
        <div class="card" style="width: 18rem;">
                <img src="${p.afbeelding}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${p.naam}</h5>
                    <p class="card-text">${p.prijs} ptn</p>
                    <a href="#" class="btn btn-primary btnCard" data-id="${p.id}">Voeg Toe aan winkelkar</a>
                </div>
            </div>
    `
})

const btns = document.querySelectorAll(".btnCard")
let winkelKar = JSON.parse(localStorage.getItem("Winkelkar")) || []

btns.forEach(btn => {
    btn.addEventListener("click", () => {
        let id = btn.dataset.id
        let selectie = null
        producten.forEach(p => {
            if (p.id == id) {
                selectie = p
            }
        })

        let existingItem = winkelKar.find(item => item.id == id)
        if (existingItem) {
            existingItem.aantal += 1
        } else {
            winkelKar.push({ ...selectie, aantal: 1 })
        }

        localStorage.setItem("Winkelkar", JSON.stringify(winkelKar))
        console.log(winkelKar)
    })
})