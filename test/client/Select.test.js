import React from "react"
import { shallow } from "enzyme"
import Select from "../../src/client/shared/Select"

test("Select changes the text after click", () => { 
    let select = shallow(
        <Select selectedText="Second" selectedValue={2}>
            <option value={1}>First</option>
            <option value={2}>Second</option>
        </Select>
    )

    expect(select.find(".select__inner").text()).toEqual("Second")
    expect(select.hasClass("select--focus")).toEqual(false)

    select.find("select").simulate("focus")
    
    expect(select.hasClass("select--focus")).toEqual(true)
})