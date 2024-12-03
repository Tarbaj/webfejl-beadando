//Csúszka szám
document.getElementById("csuszka").addEventListener("input", ertekvalt)
    function ertekvalt(){
        const ar = parseInt(document.getElementById("csuszka").value)
        document.getElementById("ertek").innerHTML=ar
    }

document.getElementById("res").addEventListener("click", sr)
function sr(){
    document.getElementById("ertek").innerHTML=10000
}

//Szűrő
const polo = document.getElementById("polo");
const naci = document.getElementById("naci");
const pulcsi = document.getElementById("pulcsi");

const L = document.getElementById("L");
const M = document.getElementById("M");
const S = document.getElementById("S");

let x = 0;
let jomeret = [];

document.getElementById("szures").addEventListener("click", szuro)

    function szuro(){
        x = 0;
        if(L.checked){meretszuro("L")}
        else if(M.checked){meretszuro("M")}
        else if(S.checked){meretszuro("S")}
        else{tipusszuro(document.querySelectorAll(`.termek`))}
    }

    function meretszuro(meret){
        jomeret = [];
        for(let i = 1; i < 15; i++){
            const termek = document.querySelector(`.termek[data-id="${i}"]`);
            const price = parseInt(document.getElementById("ertek").innerHTML);
            if(termek.dataset.meret == meret){
                jomeret.push(termek);
            }
            else{
                x++;
                document.getElementById(`prod${i}`).style.display = "none";
            }
        }
        tipusszuro(jomeret);
    }

    function tipusszuro(termekek){
        termekek.forEach(termek => {
            const price = parseInt(document.getElementById("ertek").innerHTML);
            if(parseInt(termek.dataset.ar) <= price){
                if(termek.classList.contains("polo")){
                    if(!polo.checked){
                        x++;
                        termek.style.display = "none";
                    }
                    else{
                        termek.style.display = "flex";
                    }
                }
                else if(termek.classList.contains("naci")){
                    if(!naci.checked){
                        x++;
                        termek.style.display = "none";
                    }
                    else{
                        termek.style.display = "flex";
                    }
                }
                else if(termek.classList.contains("pulcsi")){
                    if(!pulcsi.checked){
                        x++;
                        termek.style.display = "none";
                    }
                    else{
                        termek.style.display = "flex";
                    }
                }
            }
            else{
                x++;
                termek.style.display = "none";
            }
        })
        if(x == 14){
            document.getElementById("kosarba").style.display = "none";
            document.getElementById("nincs").style.display = "block";
        }
        else{
            document.getElementById("kosarba").style.display = "inline-block";
            document.getElementById("nincs").style.display = "none";
        }
    }

//Kosár
document.getElementById(`kosarba`).addEventListener(`click`, kosarbavele)

function kosarbavele(){
    let idk = [];
    for(let i = 1; i < 15; i++){
        let curr = document.getElementById(`${i}`);
        if(curr.checked){
            idk.push(i);
        }
    }
    let kos = [];
    const kosartartalom = document.getElementById(`kosar`);
    const vegsoar = document.getElementById(`vegso`);
    kosartartalom.innerHTML = ``;
    vegsoar.innerHTML = 0;

    for(let i = 0; i < idk.length; i++){
        const temp = document.getElementById(`prod${idk[i]}`)
        const termekinf = {
            id: temp.dataset.id,
            nev: temp.dataset.nev,
            meret: temp.dataset.meret,
            ar: temp.dataset.ar
        }
        kos.push(termekinf);
        
        kosartartalom.innerHTML = ``;
        
        let ossz = 0;
        kos.forEach(prod => {
            ossz += parseInt(prod.ar);
            const kiir = document.createElement("li");
            kiir.textContent = `| ${prod.nev} - ${prod.meret} - ${prod.ar} Ft |`;
            kosartartalom.appendChild(kiir);
        })
        vegsoar.innerHTML = ossz;
    }
    if(parseInt(vegsoar.innerHTML) == 0){
        document.getElementById("vasarform").style.display = "none";
    }
    else{
        document.getElementById("vasarform").style.display = "inline-block";
    }
    const kosarJSON = JSON.stringify(kos);
    document.getElementById(`kosartartalma`).value = kosarJSON;
}