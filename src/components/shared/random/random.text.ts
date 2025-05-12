export class RandomText {
    
    static readonly funnyChatMessages = [
        "Excuese me!",
        "I told you NOT to TOUCH the CUBE!",
        "You make me angry",
        "Leave me alone",
        "I'v got enought just scroll down and leave me alone!... Nerd",
        "Reading isn't one of your stregths..."
    ]

    constructor(){}

    getRandomFunnyChatMessage(): string {
        return RandomText.funnyChatMessages[Math.floor(Math.random() *  RandomText.funnyChatMessages.length)]
    }
}