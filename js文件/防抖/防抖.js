/**
 * @全局timer  简单防抖  但是占用变量名
 */
let input = document.getElementById("input");
let timer; //定义全局 time
input.addEventListener("input", (msg) => {
    // 进来之前先判断有没有 计时器  如果有就删除
    // 因为在连续调用的时候 计时器两秒后执行 ， 但是上次的还没执行 这边就有执行了一次事件
    // 所以我们判断有没有time  有time说明上次执行了 如果再次调用的话就删除上次的time  这样他就会执行一次
    if (timer != null) {
        clearTimeout(timer);
    }
    // 重新赋值 并执行                                             
    timer = setTimeout(() => {
        console.log("两秒后执行");
        console.log(this);
        console.log(msg.target.value);
    }, 2000);
}, true);
/**
 * @防抖体系   局部timer  真正的防抖
 */
let input2 = document.getElementById("input2");
let AntiShake = function (fn, time) {
    let timenum = null;
    return function () {
        // 存储一下this  在计时器里面改变this指向 如果使用 箭头函数 就不需要改变this 
        // 箭头函数的this 永远指向的当前实例|函数 也就是 return 函数体的this
        let that = this;
        // 计时器正在执行清除掉
        if (timenum !== null) {
            clearTimeout(timenum);
        }
        timenum = setTimeout(() => {
            // fn.call(that) //如果使用的function 得改变this指向   如果使用了箭头函数  就不需要转变this了
            fn(); //如果使用的function 得改变this指向   如果使用了箭头函数  就不需要转变this了
        }, time);
    };
};
input2.addEventListener("input", AntiShake(function () {
    console.log(this);
    console.log(this.value);
}, 500), true);
let scrollhua = document.getElementById("scroll");
let scrollAntiShake = function (fn, number) {
    let timer = null;
    return function () {
        let that = this;
        // 判断如果timer 说明没到时间还在调用  把当前的timer给清除掉
        if (timer)
            clearTimeout(timer); //这时候的timer 是numer 掉了多少次的数量
        let dowo = !timer; //会得到一个布尔值  !null == true  timer不变成null  永远不会执行我们的逻辑代码  取反一个数字就是false
        // 执行多少秒之后 将timer设成null
        timer = setTimeout(() => {
            timer = null;
        }, number);
        // 执行我们的语句代码  当dowo等于true时
        if (dowo) {
            // this指向转变  并会执行这里面的代码
            fn.call(this);
            // fn()
        }
    };
};
function aaa() { console.log("我被执行了"); }
// scrollhua.addEventListener("scroll", scrollAntiShake(aaa, 3000), true)
/**
 * @处理每多少秒之后执行一次
 */
// 利用闭包原理
let every_other = function (fn, number) {
    let timer = null;
    let show = true;
    return function () {
        // if (timer) clearInterval(timer) //注释打开就是停止多少秒之后执行 这个打开    show = false要注释关闭
        if (show) {
            timer = setInterval(v => {
                fn();
            }, number);
        }
        show = false; //关闭再次调用定时器 让这一个定时器 一直执行
    };
};
scrollhua.addEventListener("scroll", every_other(aaa, 1000), true);
