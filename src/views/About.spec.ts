import { mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect } from "vitest";
import AboutView from "./About.view.vue";

describe("About View", ()=>{

    let wrapper: VueWrapper = mount(AboutView)
    test("Component is mounted", ()=>{
        expect(wrapper).toBeTruthy();
    });

    test("render blog h1", ()=>{
        let aboutH1 = '[data-testid="about-h1"]';
        expect(wrapper.find(aboutH1).exists()).toBe(true);
    });
});
