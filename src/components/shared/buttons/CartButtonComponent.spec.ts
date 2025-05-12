import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  CartButtonComponent  from "./CartButtonComponent.vue"

describe("PrimaryButton", () => {
    
    let wrapper: VueWrapper;
    let cartButton = '[data-testid="cart-button"]';

    beforeAll(async () =>{
        wrapper = mount(CartButtonComponent, {props:{text:"Test"}})
    })

    test("render cart button", ()=>{
        
        expect(wrapper.find(cartButton).exists()).toBe(true);
    });

    test("click cart button", async () => {

        expect(wrapper.find(cartButton).trigger("click"));
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted("button-confirm")).toBeTruthy();
    });
});
