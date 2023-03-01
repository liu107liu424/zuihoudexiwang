let btn = document.getElementById("button");
let btnfn = function (cd, time, num, show_t) { //cd, 1000, 5, false
    let timer = null;
    let numsum = num;   //5
    let show = show_t;  //false
    console.log(show)
    console.log(num)
    // console.log(cd)
    // if(0){console.log(1)}else{console.log(2)}
    return function () {
        if (num) {
            if (show)
                return console.log(`还在冷却cd中啊,还剩:${numsum}秒`);
            show = true;
            timer = setInterval(() => {
                numsum -= 1;
                if (numsum === 0) {
                    clearInterval(timer);
                    show = false;
                    numsum = num;
                    cd();
                }
            }, time);
        }
        else {
            if (show)
                return console.log(`还在冷却cd中啊111`);
            show = true;
            timer = setTimeout(() => {
                show = false;
                cd();
            }, time);
        }
    };
};
function cd() {
    // 业务逻辑代码
    console.log("我cd已经冷却好了");
}
btn.addEventListener("click", btnfn(cd, 1000, 5, false), true);
