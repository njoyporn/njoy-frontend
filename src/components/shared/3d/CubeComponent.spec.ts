import { mount, VueWrapper } from '@vue/test-utils';
import {describe, beforeAll, test, expect} from "vitest";
import  CubeComponent  from "./CubeComponent.vue"

describe("Cube Component", () => {
    
    let wrapper: VueWrapper;

    beforeAll(async () =>{
        wrapper = mount(CubeComponent);
    })


    test.skip("mount cube component", ()=>{
        expect(wrapper.exists()).toBe(true);
    });

    test.skip("render cube mesh", ()=>{
        let cubeComponent = '[data-testid="tresh-mesh"]';
        expect(wrapper.find(cubeComponent).exists()).toBe(true);
    });

    test.skip("click cube", async () => {
        let cubeComponent = '[data-testid="tresh-mesh"]';
        expect(wrapper.find(cubeComponent).trigger("click"));
    });
});
