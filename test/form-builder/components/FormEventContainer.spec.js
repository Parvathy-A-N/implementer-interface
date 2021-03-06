import React from 'react';
import { shallow } from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import { getStore } from 'test/utils/storeHelper';
import { FormEventContainer } from 'form-builder/components/FormEventContainer.jsx';
import { setChangedProperty } from 'form-builder/actions/control';

chai.use(chaiEnzyme());

describe('FormEventContainer', () => {
  let wrapper;
  let updateSpy;

  beforeEach(() => {
    updateSpy = sinon.spy();

    wrapper = shallow(
      <FormEventContainer
        dispatch={ getStore().dispatch }
        updateFormEvents={updateSpy}
      />);
    wrapper.setProps({ formDetails: { events: {} } });
  });

  it('should render', () => {
    expect(wrapper.find('.form-event-container')).to.have.descendants('label');
    expect(wrapper.find('.form-event-container')).to.have.descendants('button');
  });

  it('should call updateProperty once click the editor button', () => {
    const spy = sinon.spy(wrapper.instance(), 'updateProperty');

    wrapper.find('.form-event-container').find('button').simulate('click');

    sinon.assert.calledOnce(spy);
  });


  it('should call onEventLoad prop when show the editor button in clicked', () => {
    const onEventLoad = sinon.spy();
    wrapper = shallow(
     <FormEventContainer
       dispatch={ getStore().dispatch }
       onEventLoad={onEventLoad}
       updateFormEvents={updateSpy}
     />);
    wrapper.find('.form-event-container').find('button').simulate('click');
    sinon.assert.calledOnce(onEventLoad);
  });


  it('should call onEventLoad prop when show the editor button in clicked', () => {
    const onEventLoad = sinon.stub().throws();
    const store = getStore();
    wrapper = shallow(
      <FormEventContainer
        dispatch={ store.dispatch }
        eventProperty={'prop_key'}
        onEventLoad={onEventLoad}
        updateFormEvents={updateSpy}
      />);
    wrapper.find('.form-event-container').find('button').simulate('click');
    sinon.assert.calledOnce(onEventLoad);
    sinon.assert.calledWith(store.dispatch, setChangedProperty({ prop_key: false }));
  });

  it('should call updateFormEvents once props events changed', () => {
    const events = { onFormInit: 'test' };
    wrapper.setProps({ formDetails: { events } });

    sinon.assert.calledWith(updateSpy, events);
  });

  it('should render FormEventContainer with given label in props', () => {
    const store = getStore();
    wrapper = shallow(
      <FormEventContainer
        dispatch={ store.dispatch }
        eventProperty={'prop_key'}
        label={'SAMPLE_NAME'}
        updateFormEvents={updateSpy}
      />).shallow();
    wrapper.find('.form-event-container').find('button').simulate('click');

    expect(wrapper.find('label').text()).to.be.equal('SAMPLE_NAME');
    sinon.assert.calledWith(store.dispatch, setChangedProperty({ prop_key: true }));
  });
});
