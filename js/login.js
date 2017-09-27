document.addEventListener("DOMContentLoaded", function(event) {
    console.log("JS LOADED");

    // landing page- local storage login info
   	var users = [];
    if (window.localStorage.users == undefined){
    	users = [];
    	window.localStorage.users = [];
    } else {
        users = window.localStorage.users;
    }

    var user = {};

    document.getElementById('create').addEventListener('click', function(event) {
    	event.preventDefault();
    	newUser();
    });

    document.getElementById('get').addEventListener('click', function(event) {
    	event.preventDefault();
    	grabUser();
    });

    function newUser() {
        var passw = document.getElementById('nPass').value;
        var confirm = document.getElementById('nConfirm').value;
        if (passw === confirm) {

        }
        else {
        	alert('passwords do not match');
        	return;
        }
        user = {
            name: document.getElementById('nUser').value,
            pass: document.getElementById('nPass').value,
            gold: 500,
            wave: 1,
            board: 'new'
        }
        users.push(user);
        window.localStorage.users = users;
        window.location = 'game.html';

    }

    function grabUser(){
    	var name = document.getElementById('eUser').value;
    	var pass = document.getElementById('ePass').value;
    	console.log(window.localStorage.users);
    		
    }

});