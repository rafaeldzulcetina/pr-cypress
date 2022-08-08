import VueTestUtils, { mount } from '@vue/test-utils';
import AddUserToContractModal from '../../src/ui/components/ContractCapture/AddUserToContractModal/index.vue';
import i18n from '../../src/ui/components/ContractCapture/AddUserToContractModal/addUserToContractModal.lang';

VueTestUtils.config.mocks.$t = () => {};
VueTestUtils.config.mocks.$t = (key) => key;

describe('Unit AddUserToContractModal', () => {
  it('Close Modal', () => {
    const wrapper = mount(AddUserToContractModal, {
      mocks: {
        $t: () => i18n,
      },
    });
    wrapper.vm.close();
    expect(wrapper.vm.isOpen).toBeFalsy();
    expect(wrapper.vm.isChecked).toHaveLength(0);
  });
  it('Open Modal', () => {
    const wrapper = mount(AddUserToContractModal, {
      mocks: {
        $t: () => i18n,
      },
    });
    wrapper.vm.open();
    expect(wrapper.vm.isOpen).toBeTruthy();
  });
  it('Add user manual to contract', () => {
    const wrapper = mount(AddUserToContractModal);
    expect(wrapper.vm.addUserManual()).toBeTruthy();
  });
  it('Add user to contract', () => {
    const wrapper = mount(AddUserToContractModal, {
      data() {
        return {
          isChecked: [1, 2, 3],
        };
      },
      propsData: { type: 'owner' },
    });
    expect(wrapper.vm.addUser()).toEqual({ idUsers: [1, 2, 3], type: 'owner' });
  });
  it('Emmit add user to contract', () => {
    const wrapper = mount(AddUserToContractModal, {
      data() {
        return {
          isChecked: [1, 2, 3],
        };
      },
      propsData: { type: 'owner' },
    });
    wrapper.vm.addUser();
    expect(wrapper.emitted().addUser[0][0]).toEqual({ idUsers: [1, 2, 3], type: 'owner' });
  });
  it('Add nothing to contract', () => {
    const wrapper = mount(AddUserToContractModal, {
      data() {
        return {
          isChecked: [],
        };
      },
      propsData: { type: 'owner' },
    });
    expect(wrapper.vm.addUser()).toBeNull();
  });
  it('Emit manual register', () => {
    const wrapper = mount(AddUserToContractModal, {
      data() {
        return {
          isChecked: [],
        };
      },
      propsData: { type: 'owner' },
    });
    wrapper.vm.addUserManual();
    expect(wrapper.emitted().addUserManual).toBeTruthy();
  });
});
