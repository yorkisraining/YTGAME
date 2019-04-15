let bulletOffset = new Map(); //暴露的变量，子弹的坐标
(function() {
    'use strict';
    /* 子弹 */
    const CONTAINER = document.querySelector('#container'),
        PLANE = document.querySelector('#plane');

    let planeTop = PLANE.offsetTop;
    let createBullet = (x) => {
        let bullet = document.createElement('div');
        bullet.setAttribute('class', 'bullet');
        bullet.setAttribute('data-id', Math.floor(Math.random() * 10000000));
        bullet.style.top = planeTop + 'px';
        CONTAINER.appendChild(bullet);
        return {
            ele: bullet,
            x: x
        };
    }

    let moveBullet = (ele, x) => {
        const THISID = ele.getAttribute('data-id'),
            THISX = x;

        let thisY = planeTop;

        /* 存入子弹的坐标 */
        ele.style.left = THISX + 'px';
        bulletOffset.set(THISID, {
            x: THISX,
            y: thisY
        })

        /* 超出屏幕清除掉那个子弹 */
        let INTERTIMER = setInterval(() => {
            if (thisY > 0) {
                thisY -= 10;
                ele.style.top = thisY + 'px';
                bulletOffset.get(THISID).y = thisY;
                let flag = ifBulletImpactMonster(THISX, thisY);
                if (flag) {
                    clearInterval(INTERTIMER);
                    CONTAINER.removeChild(ele);
                    CONTAINER.removeChild(document.querySelector('.monster[data-id="' + flag + '"]'));
                    bulletOffset.delete(THISID);
                }
            } else {
                clearInterval(INTERTIMER);
                CONTAINER.removeChild(ele);
                bulletOffset.delete(THISID);
            }
        }, 50);
    }

    let planeWidth = 30,
        bulletWidth = 10;
    let bulletTimer = setInterval(() => {
        let bullet = createBullet(planeOffset.x + planeWidth / 2 - bulletWidth / 2),
            ele = bullet.ele,
            x = bullet.x;
        moveBullet(ele, x);
    }, 250);
})()