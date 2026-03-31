let winkelKar = JSON.parse(localStorage.getItem("Winkelkar")) || []

const winkelkarDiv = document.querySelector("#winkelkar")

function toonWinkelkar() {
    winkelkarDiv.innerHTML = ""
    if (winkelKar.length === 0) {
        winkelkarDiv.innerHTML = "<p>Uw winkelkar is leeg.</p>"
        return
    }
    let totaal = 0
    winkelKar.forEach(item => {
        totaal += item.prijs * (item.aantal || 1)
        winkelkarDiv.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="${item.afbeelding}" class="card-img-top" alt="..." height="300px">
                <div class="card-body">
                    <h5 class="card-title">${item.naam}</h5>
                    <p class="card-text">Prijs: ${item.prijs} ptn</p>
                    <p class="card-text">Aantal: ${item.aantal || 1}</p>
                    <p class="card-text">Subtotaal: ${item.prijs * (item.aantal || 1)} ptn</p>
                    <button class="btn btn-secondary btnMinder" data-id="${item.id}">-</button>
                    <button class="btn btn-secondary btnMeer" data-id="${item.id}">+</button>
                    <button class="btn btn-danger btnVerwijder" data-id="${item.id}">Verwijder</button>
                </div>
            </div>
        `
    })
    winkelkarDiv.innerHTML += `<div class="mt-3"><h4>Totaal: ${totaal} ptn</h4></div>`

    document.querySelectorAll(".btnMinder").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.dataset.id
            winkelKar.forEach(item => {
                if (item.id == id && item.aantal > 1) {
                    item.aantal -= 1
                }
            })
            localStorage.setItem("Winkelkar", JSON.stringify(winkelKar))
            toonWinkelkar()
        })
    })

    document.querySelectorAll(".btnMeer").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.dataset.id
            winkelKar.forEach(item => {
                if (item.id == id) {
                    item.aantal += 1
                }
            })
            localStorage.setItem("Winkelkar", JSON.stringify(winkelKar))
            toonWinkelkar()
        })
    })

    document.querySelectorAll(".btnVerwijder").forEach(btn => {
        btn.addEventListener("click", () => {
            let id = btn.dataset.id
            winkelKar = winkelKar.filter(item => item.id != id)
            localStorage.setItem("Winkelkar", JSON.stringify(winkelKar))
            toonWinkelkar()
        })
    })
}

toonWinkelkar()