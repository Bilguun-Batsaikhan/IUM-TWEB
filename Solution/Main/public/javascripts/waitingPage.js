
// Esempio di utilizzo: Chiamare showLoadingSpinner() prima di iniziare il caricamento e hideLoadingSpinner() quando il caricamento è completo
function init(){
    var spinnerContainer = document.getElementById('loading-spinner');
    setTimeout(function() {
        spinnerContainer.style.display = 'flex';
    }, 1000);
    //cambiaPagina();
    setTimeout(function (){
        spinnerContainer.style.display = 'none';
        }, 2500);
}

function cambiaPagina() {
    window.location.href = '/pagina2';
}