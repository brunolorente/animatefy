/*
 * Anymatefy JS
 * Description: Animatefy is a CSS/JS plugin that makes easy get beautiful animations for your website
 * Version: 0.1
 * Author: Bruno Lorente Cantarero
 * Author URI: http://brunolorente.com
 */
var s, Animatefy = {

    settings: {
        hoverAnimations: false,
        scrollAnimations: true,
        stickyNav: false
    },

    init: function () {
        // kick things off
        s = this.settings;
        this.bindUIActions();
    },

    bindUIActions: function () {
        'use strict';
        if (s.scrollAnimations === true) {
            window.addEventListener('scroll', function () {
                Animatefy.slideLeft(document.body.scrollTop);
                Animatefy.slideRight(document.body.scrollTop);
                scrollHop(document.body.scrollTop);
                Animatefy.scrollRotate(document.body.scrollTop);
            });
        }
    },

    // Helper methods
    sleep: function (ms) {
        'use strict';
        return new Promise(function (resolve) {
            setTimeout(resolve, ms);
        });
    },

    elementInViewport: function (n) {
        // https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
        'use strict';
        var top = n.offsetTop,
            left = n.offsetLeft,
            width = n.offsetWidth,
            height = n.offsetHeight;

        while (n.offsetParent) {
            n = n.offsetParent;
            top += n.offsetTop;
            left += n.offsetLeft;
        }

        return (
            top >= window.pageYOffset &&
            left >= window.pageXOffset &&
            (top + height) <= (window.pageYOffset + window.innerHeight) &&
            (left + width) <= (window.pageXOffset + window.innerWidth)
        );
    },

    // UI Effects methods
    //Slide to left
    slideLeft: function (s) {
        'use strict';
        var n = document.getElementsByClassName('animatefy-slide-left');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-fade-left');
                }
            }
        }
    },

    //Slide to right
    slideRight: function (s) {
        'use strict';
        var n = document.getElementsByClassName('animatefy-slide-right');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-fade-right');
                }
            }
        }
    },

    //Sticky top nav starts
    stickyTop: function (s) {
        'use strict';
        var e = document.getElementsByClassName('animatefy-sticky-nav'),
            minScroll = e.offsetHeight * 4;

        if (s > minScroll) {
            e.classList.add('go-sticky-nav');
            e.classList.add('animatefy-fade');
        } else if (s === 0) {
            e.classList.remove('go-sticky-nav');
            e.classList.remove('animatefy-fade');
        }

    },

    //Scroll rotate
    scrollRotate: function (s) {
        var n = document.getElementsByClassName('animatefy-scroll-rotate');
        if (n.length > 0) {
            for (var i = 0; i < n.length; i++) {
                if (this.elementInViewport(n[i])) {
                    n[i].classList.add('animatefy-rotate');
                }
            }
        }
    }
};

//Scroll hop
async function scrollHop(s) {
    var n = document.getElementsByClassName('animatefy-scroll-jump');
    if (n.length > 0) {
        for (var i = 0; i < n.length; i++) {
            if (Animatefy.elementInViewport(n[i])) {
                if (n[i].hasAttribute('animatefy-delay')) {
                    await Animatefy.sleep(n[i].getAttribute('animatefy-delay'));
                    n[i].classList.add('animatefy-scroll-hop');
                } else {
                    n[i].classList.add('animatefy-scroll-hop');
                }
            }
        }
    }
}