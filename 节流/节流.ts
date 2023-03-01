let btn = document.getElementById("button")
interface buttonts {
    (fn: Function, time: number, num: number, show: boolean): any
}



let btnfn: buttonts = function (cd, time, num, show_t) {
    let timer: null | number = null
    let numsum: number = num
    let show: boolean = show_t
    return function () {
        console.log(num);
        
        if (num) {
            if (show) return console.log(`还在冷却cd中啊,还剩:${numsum}秒`)
            show = true
            timer = setInterval(() => {
                numsum -= 1
                if (numsum === 0) {
                    clearInterval(timer)
                    show = false
                    numsum = num
                    cd()
                }
            }, time)
        } else {
            if (show) return console.log(`还在冷却cd中啊`)
            show = false
            timer = setTimeout(() => {
                show = false
                cd()
            }, time)
        }
    }
}


function cd() {
    // 业务逻辑代码
    console.log("我cd已经冷却好了")
}
btn.addEventListener("click", btnfn(cd, 1000, 5, false), true)