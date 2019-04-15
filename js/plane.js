let planeOffset = {}; //暴露的变量，飞机的坐标
(function() {
    'use strict';

    const CONTAINER = document.querySelector('#container'),
        PLANE = document.querySelector('#plane');
    /* 飞机 */
    let containX = 0; //鼠标在container里的x坐标
    planeOffset.y = PLANE.offsetTop;
    planeOffset.x = PLANE.offsetLeft;

    let movePlane = (x) => {
        PLANE.style.left = x + 'px';
    }

    CONTAINER.addEventListener('mousemove', (e) => {
        let mouseX = e.clientX,
            containW = CONTAINER.clientWidth - PLANE.offsetWidth;
        containX = mouseX - CONTAINER.offsetLeft;
        if (containX < 0) {
            containX = 0;
        } else if (containX > containW) {
            containX = containW;
        }
        planeOffset.x = containX;
        movePlane(containX);
    })

    CONTAINER.addEventListener('touchmove', (e) => {
        e = e.targetTouches[0];
        let mouseX = e.clientX,
            containW = CONTAINER.clientWidth - PLANE.offsetWidth;
        containX = mouseX - CONTAINER.offsetLeft - PLANE.offsetWidth / 2;
        console.log(CONTAINER.offsetLeft)
        if (containX < 0) {
            containX = 0;
        } else if (containX > containW) {
            containX = containW;
        }
        planeOffset.x = containX;
        movePlane(containX);
    })

})()