// window 失去焦点 游戏暂停
window.onblur = function() {};

// window 获得焦点 
window.onfocus = function() {}

// 分数

let score = 0,
    scoreEle = document.querySelector('#score');
const updateScore = () => {
    score += 10;
    scoreEle.innerText = score;
}

// 查找某颗子弹是否碰到小怪兽,先计算x值，再计算y值
const ifBulletImpactMonster = (x, y) => {
    const BULLETWIDTH = 10,
        MONSTERWIDTH = 15,
        MONSTERHEIGHT = 30;

    let deletMonsterId = '';
    for (let [key, data] of monsterOffset) {
        //子弹最右边大于等于小怪兽最左边，并且子弹最左边小于等于小怪兽最右边，那么这俩个在x轴会相遇
        if (x + BULLETWIDTH >= data.x && x <= data.x + MONSTERWIDTH) {
            //在上面条件成立的情况下，子弹的最上边小于等于小怪兽的最下边，则相遇
            if (y <= data.y + MONSTERHEIGHT) {
                //在map里删掉这个小怪兽，返回小怪兽的id
                monsterOffset.delete(key);
                updateScore()
                return key;
            }
        }
    }
    return false;
}

// 查找某小怪兽是否碰到飞机
const ifMonsterImpacePlane = (x, y) => {
    const MONSTERWIDTH = 15,
        MONSTERHEIGHT = 30,
        PLANEWIDTH = 30;
    // 小怪兽最下面大于飞机最上面，则可能相遇
    if (y + MONSTERHEIGHT > planeOffset.y) {
        //小怪兽最右边大于等于飞机最左边，并且小怪兽最左边小于等于飞机最右边，那么这俩个在x轴会相遇
        if (x + MONSTERWIDTH >= planeOffset.x && x <= planeOffset.x + PLANEWIDTH) {
            gameOver();
        }
    }
}

// 重来
for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.reload')[i].onclick = function() {
        window.location.reload();
    };
}

// 暂停、开始
let pause = false;
const TOGGLE = {
    showShade: () => {
        document.querySelector('#shade').classList.add('on');
    },
    hideShade: () => {
        document.querySelector('#shade').classList.remove('on');
    },
    showLayer: () => {
        document.querySelector('#pause_layer').classList.add('on');
    },
    hideLayer: () => {
        document.querySelector('#pause_layer').classList.remove('on');
    },
    showGameover: () => {
        document.querySelector('#gameover').classList.add('on');
    },
    hideGameover: () => {
        document.querySelector('#gameover').classList.remove('on');
    },
}

document.querySelector('#pause').onclick = function() {
    pause = true;
    TOGGLE.showShade();
    TOGGLE.showLayer();
}

document.querySelector('#continue').onclick = function() {
    pause = false;
    TOGGLE.hideShade();
    TOGGLE.hideLayer();
    TOGGLE.hideGameover();
}

// GAME OVER
const gameOver = () => {
    pause = true;
    TOGGLE.showShade();
    TOGGLE.showGameover();
    document.querySelector('#game_result').innerText = score;
}