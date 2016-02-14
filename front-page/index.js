/** Created by ge on 2/13/16. */

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    app();
});

function app() {
    var body = document.querySelector('body');
    var contentPane = document.querySelector('.photo-pane');
    var textPane = document.querySelector('.text-pane');
    var secondImage = document.querySelector('.photo-pane>.full-pane:nth-child(2)');
    var pageHeight = secondImage.clientHeight;

    var scrollThreshold = 0.2;
    function onScroll(scrollTarget) {
        return function () {
            //console.log(contentPane.scrollTop);
            console.log([event.target]);
            if (scrollTarget.scrollTop < scrollThreshold * pageHeight) {
                textPane.setAttribute('scroll', 'designer');
                console.log('designer');
            } else if (scrollTarget.scrollTop < (1 + scrollThreshold) * pageHeight) {
                textPane.setAttribute('scroll', 'developer');
                console.log('developer');
            } else if (scrollTarget.scrollTop < (2 + scrollThreshold) * pageHeight) {
                textPane.setAttribute('scroll', 'projects');
                console.log('projects');
            //} else if (scrollTarget.scrollTop > 2.95 * pageHeight) {
            //    console.log('projects');
            }
        }
    }

    contentPane.addEventListener('scroll', onScroll(contentPane));
    document.addEventListener('scroll', onScroll(body));
}