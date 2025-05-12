import { mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeAll } from "vitest";
import SidebarIcon from "./SidebarIcon.vue";

describe("About View", ()=>{

    let wrapper: VueWrapper;
    beforeAll(async () => {
        wrapper = mount(    SidebarIcon, {
            props:{
                iconName: "youtube_text",
                useAssets: false,
                url: "https://gilltrick.com"
            }
        });
    });

    test("SidebarIcon is mounted", ()=>{
        expect(wrapper).toBeTruthy();
    });

    test("render icon image", ()=>{
        let image = '[data-testid="icon-image"]';
        expect(wrapper.find(image).exists()).toBe(true);
    });

    test("render icon image assets", async ()=>{
        let image = '[data-testid="icon-image-assets"]';
        await wrapper.setProps({useAssets: true});
        expect(wrapper.find(image).exists()).toBe(true);
    });
});
