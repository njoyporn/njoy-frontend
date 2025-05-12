import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  PrimaryButton  from "./PrimaryButton.vue"

describe("PrimaryButton", () => {
    
    let wrapper: VueWrapper;
    let primaryButton = '[data-testid="primary-button"]';

    beforeAll(async () =>{
        wrapper = mount(PrimaryButton, {props:{text:"Test"}})
    })

    test("render primary button", ()=>{
        
        expect(wrapper.find(primaryButton).exists()).toBe(true);
    });

    test("primary button display text", () => {

        expect(wrapper.find(primaryButton).text()).toEqual("Test");
    });

    test("click primary button", async () => {

        expect(wrapper.find(primaryButton).trigger("click"));
        await wrapper.vm.$nextTick()
        expect(wrapper.emitted("button-confirm")).toBeTruthy();
    });
});
