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
    //let MonsterX = monsterOffset
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

// 重来

document.querySelector('#reload').onclick = function() {
    window.location.reload();
};