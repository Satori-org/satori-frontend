export default function plusReady(fn) {
    if (window['ethereum']) {
        setTimeout(fn, 0)
    } else {
        setTimeout(() => {
            plusReady(fn)
        }, 500);
    }
}
