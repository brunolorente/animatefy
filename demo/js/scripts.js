window.addEventListener('load', function () {
//    Github Stargazers request
    var stars;
    var starsContainer = document.getElementById("stargazers");

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.responseType = "json";

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if (xmlhttp.status == 200) {
                stars = Object.keys(xmlhttp.response).length;
                starsContainer.innerHTML = stars;
            }
            console.log('Stars request status:' + xmlhttp.status);
        }
    };

    xmlhttp.open("GET", "https://api.github.com/repos/brunolorente/animatefy/stargazers", true);
    xmlhttp.send();
    
//    Refresh buttons 
    var refreshers = document.querySelectorAll('button');

    for (var i = 0; i < refreshers.length; i++) {
        refreshers[i].addEventListener('click', function () {

            var buttonId = this.getAttribute('id');
            var el = document.querySelectorAll('.' + buttonId);

            for (var j = 0; j < el.length; j++) {
                el[j].classList.remove(buttonId);
                var e = el[j];

                setTimeout(function (e) {
                    console.log(j);
                    e.classList.add(buttonId);
                }, 15, e, j)
            }
        });
    }
});