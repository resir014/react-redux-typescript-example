import * as React from 'react'
import { shallow } from 'enzyme'

const creatButton = (clickHandler: any) => <input type="button" value="a button" onClick={clickHandler} />

it('test name', () => {
  const b = shallow(creatButton(() => {}))
  expect(b.find('input').get(0).props.value).toBe('a button')
})

it('test click', () => {
  const mockFn = jest.fn()
  const tree = shallow(creatButton(mockFn))
  tree.simulate('click')
  expect(mockFn).toHaveBeenCalled()
})
