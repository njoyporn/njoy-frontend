export interface Message {
    uid: string;
    msg: string;
    rusername: string;
    socketId: string;
    username?: string;
    date?:Date;
}

export interface User {
    uid: string;
    rusername: string;
    username?: string;
    joint_ad?: Date
    messages?: Message[]
}

export interface Options {
    primaryButton?: string;
    secondaryButton?: string;
    headWrapper?: string;
    getInTouch?: string;
    footerWrapper?: string;
    memberListHeadSeperator?: string;
    memberListColor?:{
        odd: string;
        even: string;
    }
    memberListSeperator?: string;
    message?:{
        participent:{
            borderColor: string;
            backgroundColorA: RGBA;
            backgroundColorB: RGBA;
        },
        user:{
            borderColor: string;
            backgroundColorA: RGBA;
            backgroundColorB: RGBA;
        }
    }
}

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export const _options: Options = {
    primaryButton: "h-24 w-full",
    secondaryButton: "bg-fuchsia-400 w-1/3 lg:h-1/3 text-xl lg:text-4xl animate-bounce",
    headWrapper: "border-b border-b-fuchsia-500",
    getInTouch: "text-fuchsia-600",
    footerWrapper: "border-t border-t-fuchsia-500",
    memberListHeadSeperator: "border-fuchsia-500",
    memberListColor:{
        odd: "text-sky-500",
        even: "text-violet-600"
    },
    memberListSeperator: "border-r border-r-fuchsia-500",
    message: {
        participent: {
            borderColor: "fuchsia-500",
            backgroundColorA: {r:228,g:168,b:238,a:.9},
            backgroundColorB: {r:222,g:172,b:252,a:.9},
        },
        user: {
            borderColor: "sky-500",
            backgroundColorA: {r:17,g:163,b:238,a:.9},
            backgroundColorB: {r:14,g:172,b:252,a:.9},
        }
    }
}

export const ideOptions: Options = {
    primaryButton: "h-24 w-full",
    secondaryButton: "bg-sky-400 w-1/4 lg:h-1/3 text-xl lg:text-4xl animate-bounce",
    headWrapper: "border-b-gray-500",
    getInTouch: "text-sky-600",
    footerWrapper: "border-t-gray-500",
    memberListHeadSeperator: "border-gray-500",
    memberListColor:{
        odd: "text-sky-500",
        even: "text-violet-600"
    },
    memberListSeperator: "border-r border-r-gray-500",
    message: {
        participent: {
            borderColor: "zinc-800",
            backgroundColorA: {r:75,g:62,b:67,a:.8},
            backgroundColorB: {r:39,g:29,b:34,a:.8},
        },
        user: {
            borderColor: "gray-700",
            backgroundColorA: {r:101,g:114,b:130,a:.8},
            backgroundColorB: {r:24,g:30,b:37,a:.8},
        }
    }
}