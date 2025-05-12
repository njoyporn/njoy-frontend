import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import NavbarItemComponent from './NavbarItemComponent.vue';
import type { NavbarItem } from './navbar.type';

const item: NavbarItem = {
    name: "Home",
    url: "/",
    section: "#"
}

describe("NavbarItem", () => {
    
    let wrapper: VueWrapper;
    let navbarItem = '[data-testid="navbar-item"]';

    beforeAll(async () =>{
        wrapper = mount(NavbarItemComponent, {props:{item:item}})
    })

    test("Render Navbar Item", ()=>{
        
        expect(wrapper.find(navbarItem).exists()).toBe(true);
    });

    test("Render Navbar Item Text", ()=>{
        
        expect(wrapper.find(navbarItem).text()).toEqual(item.name);
    });

});