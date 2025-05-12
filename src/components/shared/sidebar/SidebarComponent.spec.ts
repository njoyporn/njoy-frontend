import { mount, VueWrapper } from '@vue/test-utils';
import { describe, test, expect, beforeAll } from "vitest";
import SidebarComponent from "./SidebarComponent.vue";
import type { SidebarItem } from "./sidebar.type";
import { SidebarService } from './sidebar.service';

const sidebarService: SidebarService = new SidebarService();

const icons: SidebarItem[] = sidebarService.createDefaultItems();

describe("About View", ()=>{

    let wrapper: VueWrapper;
    beforeAll(async () => {
        wrapper = mount(    SidebarComponent, {
            props:{
                icons:icons
            }
        });
    });

    test("SidebarComponent is mounted", () => {
        expect(wrapper).toBeTruthy();
    });

    test("render icons", () => {
        for(let i = 0; i < icons.length; i++){
            let icon = `[data-testid="sidebar-icon-${i}"]`;
            expect(wrapper.find(icon).exists()).toBe(true);
        }
    });

    // test("click icons", async () => {
    //     for(let i = 0; i < icons.length; i++){
    //         let icon = `[data-testid="sidebar-icon-${i}"]`;
    //         let trigger = wrapper.find(icon);
    //         await trigger.trigger("click")
    //     }
    // });
});
