import renderer from 'react-test-renderer';
import React from 'react';
import SolaceTree from "./SolaceTree";
describe("SolaceTree", () => {
    it("renders", () => {

        const component = renderer.create(SolaceTree())
        console.log(component);
        expect(component).toBeTruthy();
    })
})