export const categories: string[] = [
    "Category-A",
    "Category-B",
    "Category-C",
    "Category-D",
    "Category-E",
]

export const tags: string[] = [
    "Tag-A",
    "Tag-B",
    "Tag-C",
    "Tag-D",
    "Tag-E",
]

export const modA:SelectionEntity = {
    type: "Category",
    label: "Category",
    items: [
        {
            name: "Category-A",
            selected: false
        },
        {
            name: "Category-B",
            selected: false
        },
        {
            name: "Category-C",
            selected: false
        }
    ]
};

export type SelectionEntity = {
    type: string;
    label: string;
    items: SelectionItem[];
}

export type SelectionItem = {
    name: string;
    selected: boolean;
}