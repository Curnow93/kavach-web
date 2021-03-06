import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { act } from '@testing-library/react';
import { shallow, mount } from 'enzyme';

import '../../matchMedia.mock';
import OrganisationCreate from './index';
import { addOrganisation } from '../../actions/organisations';

jest.mock('../../actions/organisations', () => ({
  addOrganisation: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: jest.fn(),
}));

describe('Organisations index component', () => {
  const mockedDispatch = jest.fn();
  mockedDispatch.mockReturnValue(Promise.resolve());
  useDispatch.mockReturnValue(mockedDispatch);

  const push = jest.fn();
  useHistory.mockReturnValue({ push });
  describe('snapshot testing', () => {
    it('should render the component', () => {
      let component;
      act(() => {
        component = shallow(<OrganisationCreate />);
      });
      expect(component).toMatchSnapshot();
    });
  });
  describe('component testing', () => {
    let wrapper;
    beforeEach(() => {
      act(() => {
        wrapper = mount(<OrganisationCreate />);
      });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should submit form with data', (done) => {
      act(() => {
        wrapper
          .find('FormItem')
          .at(0)
          .find('Input')
          .simulate('change', { target: { value: 'title' } });
        wrapper
          .find('FormItem')
          .at(1)
          .find('TextArea')
          .at(0)
          .simulate('change', { target: { value: 'description' } });

        const submitButtom = wrapper.find('Button').at(0);
        submitButtom.simulate('submit');
      });
      wrapper.update();

      setTimeout(() => {
        expect(addOrganisation).toHaveBeenCalledTimes(1);
        expect(addOrganisation).toHaveBeenCalledWith({
          title: 'title',
          description: 'description',
        });
        expect(push).toHaveBeenCalledWith('/settings');
        done();
      });
    });
  });
});
