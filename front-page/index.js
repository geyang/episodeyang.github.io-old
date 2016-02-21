/** Created by ge on 2/13/16. */

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    app();
});

function app() {
    var body = document.querySelector('body');
    var fixedHero = document.querySelector('.fixed-hero');
    var navbarContent = document.querySelector('.fixed-navbar>.page-width-container');
    var contentContainer = document.querySelector('#projects');
    var arrow = document.querySelector('.fixed-hero-shadow');
    var pageHeight;

    function onScroll(scrollTarget) {
        var scrollRefractoryPeriod = null;

        function scrollHandler() {
            pageHeight = getWindowHeight();
            var scrollProgress = scrollTarget.scrollTop / pageHeight;
            var opacity = 1 - Math.min(scrollProgress * 1.15, 1);
            var shiftUp = (1 - opacity) * pageHeight * 0.3;

            fixedHero.setAttribute('style', "opacity: " + opacity.toString().slice(0, 4) + "; top: " + ( -shiftUp) + "px;");
            contentContainer.setAttribute('style', "opacity: " + scrollProgress + ";");
            var navbarTop = Math.max(
                -100,
                -400 * (1 - Math.max(
                    0,
                    (Math.min(1, scrollProgress + 0.2)))
                )
            );
            navbarContent.setAttribute('style', "top: " + navbarTop.toString().slice(0, 6) + "px;");


            var arrowOpacity = 1 - Math.min(scrollTarget.scrollTop / 40, 1);
            arrow.setAttribute('style', 'opacity: ' + arrowOpacity.toString().slice(0, 4) + ';');
            // remove the fade-in-arrow class.
            arrow.className = "fixed-hero-shadow";
        }

        return scrollHandler;
    }

    onScroll(body)();
    
    document.addEventListener('scroll', onScroll(body));

    if (isMobileSafari()) {
        fixHeight();
        window.onorientationchange = fixHeight;
    }
}


function isMobileSafari() {
    return !!(window.navigator.userAgent.match(/iPhone|iPad|iPod/i));
}
function isLandscape() {
    if (typeof window.orientation == 'undefined') return null;
    else return (Math.abs(window.orientation) === 90)
}

function getWindowHeight() {
    if (screen.height < window.innerHeight) {
        if (isLandscape()) return screen.height;
        else return screen.height - 108;
    } else {
        return window.innerHeight;
    }
}
function fixHeight() {
    var height = getWindowHeight();
    //console.log(height);
    //document.querySelector('h1').innerText = screen.height;
    injectCss(".fixed-hero, .fixed-hero-shadow { height: " + height + "px; }");
}

/**
 * returns the sheet object that we injected, so that it can be removed.
 * @param css
 * @param styleElement
 * @returns {Element}
 */
function injectCss(css, styleElement) {
    if (!styleElement) styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.body.appendChild(styleElement);
    return styleElement;
}

