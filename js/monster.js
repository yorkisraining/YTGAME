let monsterOffset = new Map(); //暴露的变量，小怪兽的坐标
(function() {
    'use strict';

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

        /* 超出屏幕清除掉那个小怪兽 */
        const INTERTIMERFN = () => {
            let INTERTIMER = setTimeout(() => {
                if (!pause) {
                    if (monsterOffset.get(THISID)) {
                        if (thisY < CONTAINERHEIGHT - MONSTERHEIGHT + 5) {
                            thisY += 5;
                            ele.style.top = thisY + 'px';
                            monsterOffset.get(THISID).y = thisY;
                            ifMonsterImpacePlane(THISX, thisY);
                            INTERTIMERFN();
                        } else {
                            clearTimeout(INTERTIMER);
                            CONTAINER.removeChild(ele);
                            bulletOffset.delete(THISID);
                        }
                    } else {
                        clearTimeout(INTERTIMER);
                    }
                } else {
                    INTERTIMERFN();
                }
            }, 50)
        }
        INTERTIMERFN();
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
    setInterval(() => {
        if (!pause) {
            let ele = createMonster();
            moveMonsterFn(ele);
        }
    }, 800);
})()