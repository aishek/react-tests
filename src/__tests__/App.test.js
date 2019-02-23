import React from 'react';
import App from '../App';
import { mount } from "enzyme";
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('switch tabs correctly', () => {
  const tree = mount(<App />);

  tree
    .find('Tab').last()
    .simulate('click');
  expect(tree).toMatchSnapshot();
  tree.unmount();
});
