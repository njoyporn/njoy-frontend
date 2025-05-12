import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  SecondaryButton  from "./SecondaryButton.vue"

describe("SecondaryButton", () => {
    
    let wrapper: VueWrapper;
    let secondaryButton = '[data-testid="secondary-button"]';

    beforeAll(async () =>{
        wrapper = mount(SecondaryButton, {props:{text:"Test"}})
    })

    test("render secondary button", ()=>{
        
        expect(wrapper.find(secondaryButton).exists()).toBe(true);
    });

    test("secondary button display text", () => {

        expect(wrapper.find(secondaryButton).text()).toEqual("Test");
    });

    test("click secondary button", async () => {

        expect(wrapper.find(secondaryButton).trigger("click"));
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted("button-confirm")).toBeTruthy();
    });
});
