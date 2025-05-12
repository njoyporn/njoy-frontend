import { vi, describe, test, expect, beforeAll } from "vitest";
import { mount, VueWrapper } from '@vue/test-utils';
import type { NavbarItem } from "./navbar.type";
import NavbarComponent  from "./NavbarComponent.vue";

const items: NavbarItem[] = [
    {
        name: "Home",
        url: "/",
        section: "#"
    },
    {
        name: "About",
        url: "/about",
        section: "#about"
    }
]

describe("Test Navbar", ()=>{

    let wrapper: VueWrapper;

    beforeAll(() => {
        wrapper = mount(NavbarComponent, {
            props:{
                items:items
            }
        });

        
    });

    test("Navbar mounted", () => {
        let logo = `[data-testid="navbar-component"]`;
        expect(wrapper.find(logo).exists()).toBe(true);
    });

    test("Navigation Items", () =>{

        for(let i = 0; i < items.length; i++){
            expect(wrapper.find(`[data-testid="navbar-item-${i}"]`).exists()).toBe(true);
        }
    });
});