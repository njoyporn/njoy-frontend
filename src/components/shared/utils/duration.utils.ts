export function durationToTimeString(duration: number) {
    duration = Math.floor(duration);
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    while(duration > 60) {
        minutes++;
        duration-=60
    }
    while(minutes > 60) {
        hours++;
        minutes-=60;
    }
    seconds = duration;
    const hourString: string = hours >= 10 ? hours.toString() : `0${hours}`;
    const minuteString: string = minutes >= 10 ? minutes.toString() : `0${minutes}`;
    const secondString: string = seconds >= 10 ? seconds.toString() : `0${seconds}`;
    if(hours > 0) return `${hourString}:${minuteString}:${secondString}`;
    return `${minuteString}:${secondString}`
}