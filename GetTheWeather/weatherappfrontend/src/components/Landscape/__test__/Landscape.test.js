import React from 'react'
import ReactDOM from 'react-dom'
import Landscape from '../Landscape'
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer"

afterEach(cleanup)
it("Landscape component rendered without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Landscape/>, div)
})

it("Matches Landscape component Snapshot", () => {
    const landscape = renderer.create(<Landscape/>).toJSON()
    expect(landscape).toMatchSnapshot();
})