var s;
var Animatefy = {
    settings: {
        hoverAnimations: true,
        scrollAnimations: true,
        parallax: true
    },

    init: function (settings) {
        s = this.settings;
        this.bindUIActions()
    },

    bindUIActions: function () {
        'use strict';
        if (s.hoverAnimations === true) {
            Animatefy.hovered();
        }
        if (s.scrollAnimations === true) {
            window.addEventListener('scroll', function () {
                Animatefy.slideLeft(document.body.scrollTop);
                Animatefy.slideRight(document.body.scrollTop);
                Animatefy.scrollRotate(document.body.scrollTop);
                Animatefy.drawings(document.body.scrollTop);
                scrollHop(document.body.scrollTop);
            })
        }
        if (s.parallax === true) {
            window.addEventListener('scroll', function () {
                Animatefy.parallax(document.body.scrollTop)
            })
        }
    },

    sleep: function (ms) {
        'use strict';
        return new Promise(function (resolve) {
            setTimeout(resolve, ms)
        })
    },

    elementInViewport: function (n) {
        'use strict';
        var bounding = n.getBoundingClientRect();
        return (
            bounding.top >= 0 &&
            bounding.left >= 0 &&
            bounding.bottom <= (window.innerHeight ||
                document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth ||
                document.documentElement.clientWidth)
        )
    },

    parallaxInViewport: function (el) {
        var bounding = el.getBoundingClientRect();
        return (
            bounding.top >= 0 && bounding.left >= 0 &&
            bounding.bottom >= (window.innerHeight ||
                document.documentElement.clientHeight) ||
            bounding.bottom <= (window.innerHeight ||
                document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    },

    hovered: function () {
        var hoverizable = document.querySelectorAll('[class*="afy-hover-"]');
        var styleElem = document.head.appendChild(document.createElement("style"));
        var fc, sc, newClass;
        var css = '';
        for (var i = 0; i < hoverizable.length; i++) {
            if (hoverizable[i].hasAttribute('gradient-first-color') && hoverizable[i].hasAttribute('gradient-second-color')) {
                fc = hoverizable[i].getAttribute('gradient-first-color');
                sc = hoverizable[i].getAttribute('gradient-second-color');
                newClass = 'gradient-' + i;
                css += '.' + newClass + '{background: linear-gradient(90deg,' + fc + ',' + sc + ')}'
                css += '.' + newClass + ':before {background: linear-gradient(90deg,' + sc + ',' + fc + ')}';
                hoverizable[i].classList.add(newClass);
                styleElem.innerHTML = css;
            }
            hoverizable[i].addEventListener('mouseenter', function () {
                this.classList.toggle('hovered');
                this.style['transition-duration'] = '.3s';
            });
            hoverizable[i].addEventListener('mouseleave', function () {
                this.classList.remove('hovered');
            });
        }
    },

    slideLeft: function (s) {
        'use strict';
        var n = document.getElementsByClassName('animatefy-slide-left');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-fade-left')
                }
            }
        }
    },

    slideRight: function (s) {
        'use strict';
        var n = document.getElementsByClassName('animatefy-slide-right');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-fade-right')
                }
            }
        }
    },

    stickyTop: function (s) {
        'use strict';
        var e = document.getElementsByClassName('animatefy-sticky-nav'),
            minScroll = e.offsetHeight * 4;
        if (s > minScroll) {
            e.classList.add('go-sticky-nav');
            e.classList.add('animatefy-fade')
        } else if (s === 0) {
            e.classList.remove('go-sticky-nav');
            e.classList.remove('animatefy-fade')
        }
    },

    scrollRotate: function (s) {
        var n = document.getElementsByClassName('animatefy-scroll-rotate');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-rotate')
                }
            }
        }
    },

    parallax: function () {
        var n = document.getElementsByClassName('animatefy-parallax');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.parallaxInViewport(n[i])) {
                    var scrolltop = n[i].getBoundingClientRect().y;
                    var imageRate = -scrolltop * .4;
                    var captionRate = scrolltop * .3;
                    n[i].style.backgroundPositionY = imageRate + 'px';
                    for (var j = 0; i < n[i].childNodes.length; j++) {
                        if (n[i].childNodes[j].className === "caption") {
                            var caption = n[i].childNodes[j];
                            break
                        }
                    }

                    if (captionRate < caption.parentElement.offsetHeight - 30) {
                        caption.style.top = captionRate + 'px'
                    } else {
                        caption.style.top = caption.parentElement.offsetHeight - 30 + 'px'
                    }
                }
            }
        }
    },
	
    // FIXME: Need to add some CSS class to trigger the effects just one time.
    drawings: function () {
        var n = document.getElementsByClassName('animatefy-drawings');
        var msg = "";
        var comment = document.createComment(" ");
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (Animatefy.elementInViewport(n[i])) {
                    msg = n[i].getAttribute('text');
                    n[i].innerHTML = '<svg viewBox="0 0 1418 116" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="drawing-svg' + i + '"></svg>';
                    document.getElementById('drawing-svg' + i).innerHTML = '<g stroke="none" fill="none" fill-rule="evenodd" fill-opacity="0" id="drawing-g' + i + '"></g>';

                    document.getElementById('drawing-g' + i).innerHTML = '<text id="drawing-text' + i + '" stroke="dodgerblue" fill="#645F5A" font-weight="normal" font-size="120" font-family="Pacifico"></text>';
                    document.getElementById('drawing-text' + i).innerHTML = '<tspan id="drawing-tspan' + i + '" x="50" y="109"></tspan>';
                    var textHTML = '';
                    for (var j = 0; j < msg.length; j++) {

                        textHTML += '<tspan>' + msg[j] + '</tspan>';
                    }
                    document.getElementById('drawing-tspan' + i).innerHTML = textHTML;
                }
            }
        }
    },
};


// ALL CODE BELOW IS NOT STABLE

async function scrollHop(s) {
    var n = document.getElementsByClassName('animatefy-scroll-jump');
    if (n.length > 0) {
        for (var i = 0; i < n.length; i++) {
            if (Animatefy.elementInViewport(n[i])) {
                if (n[i].hasAttribute('animatefy-delay')) {
                    await Animatefy.sleep(n[i].getAttribute('animatefy-delay'));
                    n[i].classList.add('animatefy-scroll-hop')
                } else {
                    n[i].classList.add('animatefy-scroll-hop')
                }
            }
        }
    }
}

var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1)
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1)
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 200 - Math.random() * 100;
    if (this.isDeleting) {
        delta /= 2
    }
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500
    }
    setTimeout(function () {
        that.tick()
    }, delta)
};

window.onload = function () {
    var elements = document.getElementsByClassName('animatefy-typer');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period)
        }
    }
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css)
}

//TODO:
function doScroll(y) {
    console.log(y);
		setInterval(myTimer, 1000);
    window.scrollTo(0, y);
}


function timeMachine(destination){
	var ratio = 10
	
	setInterval(myTimer, );
}


function getDistance(a,b) {
	// get the bounding rectangles
	var div1rect = a.getBoundingClientRect();
	var div2rect = b.getBoundingClientRect();

	// get div1's center point
	var div1x = div1rect.left + div1rect.width/2;
	var div1y = div1rect.top + div1rect.height/2;

	// get div2's center point
	var div2x = div2rect.left + div2rect.width/2;
	var div2y = div2rect.top + div2rect.height/2;

	// calculate the distance using the Pythagorean Theorem (a^2 + b^2 = c^2)
	var distanceSquared = Math.pow(div1x - div2x, 2) + Math.pow(div1y - div2y, 2);
	var distance = Math.sqrt(distanceSquared);
}

//function timer(point) {
//    console.log(point);
//    for (var i = window.pageYOffset; i >= point; i--) {
//        myFunction(i);
//        
//    }
//}

//function other(){
//    el = document.getElementById('hover-examples');
//    coord = el.getBoundingClientRect();
//    elY = coord.top;
//
//    scroll = window.pageYOffset;
//
//    point = scroll + elY;
//        
//    
//    console.log(coord);
//    console.log('elY: ' + elY);
//    console.log('scroll: ' + scroll);
//    console.log('point: ' + point);
//    
//    timer(point);
//}
//
//
//other();