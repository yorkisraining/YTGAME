let monsterOffset = new Map(); //暴露的变量，小怪兽的坐标
(function() {
    'use strict';

    const CONTAINER = document.querySelector('#container'),
        CONTAINERHEIGHT = CONTAINER.offsetHeight,
        CONTAINERWIDTH = CONTAINER.offsetWidth,
        MONSTERWIDTH = 15,
        MONSTERHEIGHT = 30 + 5;

    /* 小怪兽移动方法 */
    let moveMonsterFn = (ele) => {
        const THISID = ele.getAttribute('data-id'),
            THISX = (CONTAINERWIDTH - MONSTERWIDTH) * Math.random(); //[0, CONTAINERWIDTH)
        let thisY = 0;

        /* 存入小怪兽的坐标 */
        ele.style.left = THISX + 'px';
        monsterOffset.set(THISID, {
            x: THISX,
            y: thisY
        })

        /* 超出屏幕清楚调那个小怪兽 */
        let INTERTIMER = setInterval(() => {
            if (monsterOffset.get(THISID)) {
                if (thisY < CONTAINERHEIGHT - MONSTERHEIGHT) {
                    thisY += 5;
                    ele.style.top = thisY + 'px';
                    monsterOffset.get(THISID).y = thisY;
                } else {
                    clearInterval(INTERTIMER);
                    CONTAINER.removeChild(ele);
                    bulletOffset.delete(THISID);
                }
            } else {
                clearInterval(INTERTIMER);
            }
        }, 50);
    }

    /* 创建一个小怪兽dom */
    let createMonster = () => {
        let monsterDiv = document.createElement('div');
        monsterDiv.setAttribute('class', 'monster');
        monsterDiv.setAttribute('data-id', Math.floor(Math.random() * 100000));
        CONTAINER.appendChild(monsterDiv);
        return monsterDiv;
    }

    /* 500ms创建一个小怪兽 */
    /* 以后改成随意ms */
    let gameTimer = null;
    setTimeout(() => {
        gameTimer = setInterval(() => {
            let ele = createMonster();
            moveMonsterFn(ele);
        }, 1000);
    }, 500);

})()