function init(){
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "none";
    const firstButton = document.getElementById("firstButton");
    firstButton.addEventListener('click', changeFirst);
    const secondButton = document.getElementById("secondButton");
    secondButton.addEventListener('click', changeSecond)
    event.preventDefault();
}

function changeFirst(event) {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";

    const activeSegment = document.querySelector('.segment.second');

    for (const element of activeSegment.querySelectorAll('.circle, .label, .line')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor = '#007bff'; // Cambia il colore del cerchio in blu
        else if ( element.classList.contains('line')) {
            element.style.color = '#007bff';
            element.style.backgroundColor = '#007bff';// Cambia il colore della label e della line in blu
        }
        else
            element.style.color = '#007bff';
    }

    event.preventDefault();
}
function changeSecond(){
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "block";

    const activeSegment = document.querySelector('.segment.third');
    for (const element of activeSegment.querySelectorAll('.circle, .label')) {
        if (element.classList.contains('circle'))
            element.style.backgroundColor = '#007bff'; // Cambia il colore del cerchio in blu
        else
            element.style.color = '#007bff';
    }

    event.preventDefault();
}