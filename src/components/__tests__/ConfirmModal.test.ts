import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmModal from '../ConfirmModal.vue'
import { Modal } from 'bootstrap'

describe('ConfirmModal.vue', () => {

  it('Doit afficher les bonnes informations dans la boite de dialogue.', () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        cancelButton: 'mon bouton annuler',
        confirmButton: 'mon bouton confirmer'
      }
    })

    expect(wrapper.text()).toContain('mon titre')
    expect(wrapper.text()).toContain('mon contenu')
    expect(wrapper.find('button[name="annuler"]').exists()).toBe(true)
    expect(wrapper.find('button[name="confirmer"]').exists()).toBe(true)
  })

  it('Sur modification du prop trigger, doit afficher la boite de dialogue.', async () => {
    // Ce test ne fonctionne pas, mais il devrait et je ne trouve pas la solution :P
    const spyBootstrap = vi.spyOn(Modal.prototype, 'show')
    const wrapper = mount(ConfirmModal)

    await wrapper.setProps({ trigger: 1 })

    expect(spyBootstrap).toHaveBeenCalled()
  })

  it('Sur confirmation, doit émettre un événement.', async () => {
    const wrapper = mount(ConfirmModal, {
      props: {
        confirmButton: 'mon bouton confirmer'
      }
    })

    await wrapper.find('button[name="confirmer"]').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('onModalConfirmed')
  })

  it('Le style:display des boutons doivent être la valeur de leurs props', async () => {
    const confirmButtonStyle = 'block' // Définissez la valeur du prop confirmButtonStyle à tester
  
    const wrapper = mount(ConfirmModal, {
      props: {
        title: 'mon titre',
        body: 'mon contenu',
        cancelButton: 'mon bouton annuler',
        confirmButton: 'mon bouton confirmer',
        cancelButtonStyle: 'block',
        confirmButtonStyle: 'block'
      }
    })
  
    const confirmButton = wrapper.find('[name="confirmer"]')
    const cancelmButton = wrapper.find('[name="annuler"]')

  
    expect(confirmButton.attributes('style')).toContain('display: block');
    expect(cancelmButton.attributes('style')).toContain('display: block');

    await wrapper.setProps({ cancelButtonStyle: 'none', confirmButtonStyle: 'none' });

    expect(confirmButton.attributes('style')).toContain('display: none');
    expect(cancelmButton.attributes('style')).toContain('display: none');

  })

})