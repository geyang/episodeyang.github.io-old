/** Created by ge on 2/13/16. */

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    app();
});

function app() {
    var body = document.querySelector('body');
    var fixedHero = document.querySelector('.fixed-hero');
    var pageHeight = window.innerHeight;

    function onScroll(scrollTarget) {
        return function () {
            //console.log([event.target]);
            var scrollProgress = scrollTarget.scrollTop / pageHeight;
            var opacity = 1 -  Math.min(scrollProgress * 1, 1);
            var shiftUp = (1 - opacity) * pageHeight * 0.3;
            fixedHero.setAttribute('style', "opacity: " + opacity + "; top: " + (- shiftUp) + "px;" );
            //console.log(opacity);
        }
    }

    document.addEventListener('scroll', onScroll(body));
}