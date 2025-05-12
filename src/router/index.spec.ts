import { describe, test, expect } from "vitest";
import router  from "./index";

describe("Router", ()=>{

    test("Check Routes", ()=>{
        expect(router.options.routes[0].path).toEqual("/");
        expect(router.options.routes[0].name).toEqual("Home");
    });

});