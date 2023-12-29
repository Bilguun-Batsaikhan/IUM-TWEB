function init(){
   document.getElementById("first").style.display = "block";
   document.getElementById("second").style.display = "none";
   document.getElementById('first').appendChild(document.createElement('div')).textContent = '1';
   document.getElementById('second').appendChild(document.createElement('div')).textContent = '2';
    if (document.getElementById('first').style.display == 'block') {
        document.querySelector('.circle:nth-child(1)').classList.add('active');
    } else {
        document.querySelector('.circle:nth-child(2)').classList.add('active');
    }
}

function change(){
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";
    if (document.getElementById('first').style.display == 'block') {
        document.querySelector('.circle:nth-child(1)').classList.add('active');
    } else {
        document.querySelector('.circle:nth-child(2)').classList.add('active');
    }
    event.preventDefault();
}