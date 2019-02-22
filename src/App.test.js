import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import App from './App';
import Test from './Test';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders <Test/> two times', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Test)).to.have.lengthOf(2);
})
