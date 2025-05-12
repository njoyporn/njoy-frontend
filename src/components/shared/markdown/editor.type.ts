import type { esbuildVersion } from "vite";

export interface CMDMD {
    id: string;
    enum: number;
    name: string;
    cmd: string;
    indent?: number;
}

export interface Table {
    head:Row;
    body: Body
    classes?: string;
    style?: string;
}

export interface Body {
    rows: Row[];
    classes?: string;
    style?: string;
}

export interface Row {
    cells: Cell[]
    classes?: string;
    style?: string;
}

export interface Cell {
    content: string;
    classes?: string;
    style?: string;
}

export interface Info {
    severity: ISeverity;
    content: string;
    classes?: string;
    style?: string;
}

const eSeverityList: string[] = [
    "Info",
    "Warning",
    "Danger"
]

export type ISeverity = typeof eSeverityList[number];