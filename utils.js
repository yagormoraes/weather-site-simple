function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
export function convertMsToTime(milliseconds) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;
    hours = hours % 24;

    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
        seconds,
    )}`;
}

export function complementHours(num1, num2) {
    if(num1 + num2 >= 24){
        let val1 = 24 - Math.max(num1,num2)
        return Math.min(num1,num2) - val1
    }else{
        return num1 + num2
    }
}
