// Raccolgo tutti gli elementi che mi interessano dal DOM

const totalSlot = document.querySelector('.total-slot');
const giftsList = document.querySelector('.gifts-list');

const form = document.querySelector('#gift-form');
const nameField = document.querySelector('#name-field');
const priceField = document.querySelector('#price-field');
const descriptionField = document.querySelector('#description-field');

// Prepariamo la lista come array vuoto
let gifts = [];

// Intercetto l'evento al click del form
form.addEventListener('submit', function (event){
    // blocchiamo prima il caricamento della pagina
    event.preventDefault();
   
    // 1step - Raccolgo i dati dai campi
    const name = nameField.value.trim();
    const price = priceField.value.trim();
    const description = descriptionField.value.trim();

    //2step - Aggiungere il regalo alla lista
    addGift(name,price,description);

    //3step - resettiamo il form
    form.reset();

    //4step - Riportiamo il focus sul primo campo del form
    nameField.focus();
});

// FUNCTIONS
function addGift(name,price,description){
    const newGift = {
        name,
        price: Number(price),
        description
    };

    gifts.push(newGift);
    console.log(gifts);

    // Calolo il totale attraverso un'altra funzione a se stante
    getTotal();

    //Mostro a schermo il regalo renderizzato tramite funzione apposita
    renderList();

}

function getTotal(){
    let total = 0;

    for(let i = 0; i < gifts.length; i++){

        total += gifts[i].price;
    }

    totalSlot.innerText = formatAmount(total);
}

// Faccio anche una funzione per formattare i prezzi e le spese con la funzione ToFixed()
function formatAmount(amount){
    return amount.toFixed(2) + '€';
}

// Funzione per renderizzare la lista dei regali
function renderList(){
    //Svuoto prima la lista precedente per non avere ripetizioni
    giftsList.innerHTML = '';
    // Giro sull'array
    for(let i = 0; i < gifts.length; i++){
        // creo il codice per ogni singolo elemento
        const giftElement = createListElement(i);

        // Lo aggancio alla lista nella pagina prendendo l'elemento nell'HTML
        giftsList.innerHTML += giftElement;

        //Renderizzo il bottone X con una funzione per eliminare il regalo
        setDeleteButtons();
    }
}

// Funzione per creare un elemento della lista
function createListElement(i){
    // Recupero il singolo regalo ciclato
    const gift = gifts[i];

    // Stampo in pagina il regalo

return `
        <li class="gift-item mb-3">
            <div class="gift-info text-white">
                <h3>${gift.name}</h3>
                <p>${gift.description}</p>
            </div>
            <div class="gift-price">${formatAmount(gift.price)}</div>
            <div class="gift-button" data-index="${i}">❌</div>
            
        </li>`;
};

//Funzione per settare i bottoni
function setDeleteButtons(){
    //Recupero gli elementi
    const deleteButtons = document.querySelectorAll('.gift-button');

    for(let i = 0; i < deleteButtons.length; i++){
        const deleteButton = deleteButtons[i];

        deleteButton.addEventListener('click', function(){
            //Individuo l'index corrispondente
            const index = deleteButton.dataset.index;

            //Rimuovo dalla lista il regalo con quell'index
            removeGift(index);
        })
    }
}

//Funzione per rimuovere il regalo
function removeGift(index){
    //Rimuovo dall'array
    gifts.splice(index,1);

    //Ricalcolo il totale della spesa
    getTotal();

    //Rirenderizzare la lista
    renderList();
}