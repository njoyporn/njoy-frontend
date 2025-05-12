import type { IntroMessage } from "./intro.service";

let home: string = "gilltrick@archlinux";


export const cmds: IntroMessage[] = [
    {
        style:"font-family: Ubuntu-B",
        staticText: `${home}:$ pwd`,
        totalTime: 2740,
        cmd:"none"
    },
    {
        style:"font-family: Ubuntu-Th",
        staticText: `/home/gilltrick/`,
        totalTime: 322,
        cmd:"none"
    },
    {
        style:"font-family: Ubuntu-B;",
        staticText: `${home} ~:$ `,
        totalTime: 2080,
        cmd:"none",
        typedText: "cd gilltrick.DE",
        typeDelay: 1200,
        ksps: 16,
    },
    {
        style:"font-family: Ubuntu-B",
        staticText: `${home}/gilltrick.DE:$ `,
        totalTime: 1560,
        cmd:"none",
        typedText: "ls",
        typeDelay: 800,
        ksps: 20
    },
    {
        style:"font-family: Ubuntu-Th",
        staticText: `cypress.json dist docker-compose.yaml dockerfile env.d.ts index.html node_modules package-lock.json package.json postcss.config.js public serve.js src test tailwind.config.js tsconfig.app.json tsconfig.json tsconfig.node.json tsconfig.vitest.json vite.config.ts vitest.config.ts`,
        totalTime: 128,
        cmd:"none"
    },
    {
        style:"font-family: Ubuntu-B",
        staticText: `${home}/gilltrick.DE:$ `,
        totalTime: 3560,
        cmd:"none",
        typedText: "docker compose up -d",
        typeDelay: 1600,
        ksps: 20
    },
    {
        style:"font-family: Ubuntu-Th",
        staticText: `gilltrickDE`,
        totalTime: 512,
        cmd:"none"
    },
    {
        style:"font-family: Ubuntu-B",
        staticText: `${home}/gilltrick.DE:$ `,
        totalTime: 1240,
        cmd:"none",
        typedText: "claer",
        typeDelay: 320,
        ksps: 22
    },
    {
        style:"font-family: Ubuntu-Th",
        staticText: `bash: claer: command not found`,
        totalTime: 512,
        cmd:"none"
    },
    {
        style:"font-family: Ubuntu-B",
        staticText: `${home}/gilltrick.DE:$ `,
        totalTime: 5312,
        typedText: "clear",
        typeDelay: 3080,
        ksps: 12,
        cmd:"cls"
    },
    // {
    //     style:"font-family: Ubuntu-B",
    //     staticText: `${home}/gilltrick.DE:$ `,
    //     totalTime: 1512,
    //     cmd:"none"
    // },
]