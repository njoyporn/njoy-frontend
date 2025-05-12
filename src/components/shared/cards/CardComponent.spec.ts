import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  CardComponent  from "./CardComponent.vue"
import type { Card } from "./cards.type";

const card: Card = {

    name: "Patrick Start",
    imgSrc: "./src/assets/images/cards/Patrick_Start.png",
    price: 10
}

describe("PrimaryButton", () => {
    
    let wrapper: VueWrapper;
    let cardComponent = '[data-testid="card-component"]'

    beforeAll(async () =>{
        wrapper = mount(CardComponent, {props:{card:card}})
    })

    test("render card", ()=>{
        
        expect(wrapper.find(cardComponent).exists()).toBe(true);
    });
});
