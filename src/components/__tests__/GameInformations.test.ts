import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import GameInformations from '../GameInformations.vue'

describe('GameInformations.vue', () => {

    it("Devrait afficher les informations du composant lors du montage", async () => {
        
        const wrapper = mount(GameInformations, {
          props: {
            enemyCount: 1
          }
        })
        
        const title = wrapper.find('.card-title')
        const h5 = wrapper.find('h5')
        const p = wrapper.find('.card-text')

        expect(title.text()).toBe('Mission en cours...')
        expect(h5.text()).toBe('Objectif: Vaincre 5 vaisseaux ennemis')
        expect(p.text()).toBe('1/5')
    })

    it("Devrait afficher la manche en cours dynamiquement lorsque 'enemyCount' est changé", async () => {
        
        const wrapper = mount(GameInformations, {
          props: {
            enemyCount: 1
          }
        })
        
        const p = wrapper.find('.card-text')
        expect(p.text()).toBe('1/5')

        await wrapper.setProps({ enemyCount: 2 });

        expect(p.text()).toBe('2/5')

    })

})
