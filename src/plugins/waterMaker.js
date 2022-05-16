/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate = false) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}
const markconfig = {
    parentDomName: 'body', // 父节点dom选择器名字
    show: true, // 水印开关
    color: 'rgba(0, 0, 0, 0.06)', // 水印色值
    title: '我是无敌水印', // 显示的水印文本
    width: 200, // 水印宽高
    height: 200,
    fontNum: 15, // 水印字体大小
    rotate: -25, // 旋转角度
    zIndex: 9999,
}
class WaterMark {
    config = markconfig;
    container;
    moServer;
    styleStr;

    constructor() {

    }

    init(args) {
        this.config = { ...this.config, ...args }
        this._init();
    }

    clear() {
        this.config.show = false
        let __wm = null
        if (this.container) {
            __wm = document.querySelector('.__pwm')
        } else {
            __wm = document.querySelector('.__wm')
        }
        if (__wm) {
            this.container.removeChild(__wm)
        }
        if (this.moServer) {
            this.moServer.disconnect()
            this.moServer = null
        }
    }

    show() {
        this.config.show = true
        this._init()
    }

    _init() {
        if (!this.config.show) {
            return;
        } else {
            this._paint();
            if (!this.moServer) {
                this._mutation()
            }
        }
    }

    _paint() {
        this.container = this.config.parentDomName ? document.querySelector(this.config.parentDomName) : document.body
        // 创建画布
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', `${this.config.width}px`)
        canvas.setAttribute('height', `${this.config.height}px`)

        // 得到画笔，开始绘制图形
        const ctx = canvas.getContext('2d')
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${this.config.fontNum}px microsoft yahei`;
        ctx.fillStyle = this.config.color;
        ctx.rotate(Math.PI / 180 * this.config.rotate)
        ctx.fillText(this.config.title, parseFloat(`${this.config.width}px`) / 2, parseFloat(`${this.config.height}px`) / 2)

        // 得到画的图形的信息
        const base64Url = canvas.toDataURL()

        let __wm = null
        if (this.container) {
            __wm = document.querySelector('.__pwm')
        } else {
            __wm = document.querySelector('.__wm')
        }

        // 创建包裹水印的div
        const watermarkDiv = __wm || document.createElement('div')

        this.styleStr =
            `position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        z-index:${this.config.zIndex};
        pointer-events:none;
        background-repeat:repeat;
        background-image:url('${base64Url}')`

        watermarkDiv.setAttribute('style', this.styleStr)

        if (this.container) {
            watermarkDiv.classList.add('__pwm');
        } else {
            watermarkDiv.classList.add('__wm');
        }
        if (!__wm) {
            this.container.style.position = 'relative'
            this.container.appendChild(watermarkDiv)
            // container.appendChild(watermarkDiv, container.firstChild)
            // this.container.insertBefore(watermarkDiv, this.container.firstChild)
        }

    }

    _mutation() {
        // 监听dom变化
        const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
        if (MutationObserver && !this.moServer) {
            this.moServer = new MutationObserver(debounce(() => {
                this._listen()
            }, 300)
            )
            this.moServer.observe(this.container, {
                attributes: true,
                subtree: true,
                childList: true
            })
        }
    }

    _listen() {
        let __wm = null
        if (this.container) {
            __wm = document.querySelector('.__pwm')
        } else {
            __wm = document.querySelector('.__wm')
        }
        // 只在__wm元素变动才重新调用 init, 并且当前页支持有水印
        if (((__wm && __wm.getAttribute('style') !== this.styleStr) || !__wm) && this.config.show) {
            // 避免一直触发
            this._init()
        }
    }

}

export default new WaterMark()