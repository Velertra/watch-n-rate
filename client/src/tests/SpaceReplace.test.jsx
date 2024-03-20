import SpaceReplace from "../utilities/SpaceReplace";
import { expect, it } from "vitest" ;

it('check multiple words', () => {
    const title = 'fight club';
    const expected = 'fight%20club';
    const result = SpaceReplace(title);
    expect(result).toEqual(expected);
})

it('check more multiple words', () => {
    const title = 'lion witch and wardrobe';
    const expected = 'lion%20witch%20and%20wardrobe';
    const result = SpaceReplace(title);
    expect(result).toEqual(expected);
})

it('check single word', () => {
    const title = 'Fight';
    const expected = 'Fight';
    const result = SpaceReplace(title);
    expect(result).toEqual(expected);
})

/* it('check space in front', () => {
    const title = ' fight';
    const expected = 'fight';
    const result = SpaceReplace(title);
    expect(result).toEqual(expected);
})

it('check space after', () => {
    const title = 'fight club ';
    const expected = 'fight%20club';
    const result = SpaceReplace(title);
    expect(result).toEqual(expected);
}) */