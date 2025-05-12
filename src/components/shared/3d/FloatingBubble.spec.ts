import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  FloatingBubble  from "./FloatingBubble.vue"

describe("Floating Text Component", () => {
    
    let wrapper: VueWrapper;

    beforeAll(() =>{
        wrapper = mount(FloatingBubble, {
            props: {
                position:{x:0,y:0},
                backgroundRGBA: "rgba(32,32,32,.8)",
                content: "Test"
            }
        });
    })

    test("mount floating text component", ()=>{
        expect(wrapper.exists()).toBe(true);
    });

    test("mount floating text component", ()=>{
        expect(wrapper.text()).toEqual("Test");
    });
});
