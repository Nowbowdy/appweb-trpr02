import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import GameActions from '../GameActions.vue'

describe('GameActions.vue', () => {

    it(`Quand le bouton "Attaquer !" est cliqué le bon emit est renvoyé.`, async () => {
        const wrapper = mount(GameActions);
        const btn = wrapper.findAll('[class="btn btn-outline-danger"]')[0];
        await btn.trigger('click');
        const emittedEvent = wrapper.emitted('continueCombat');
        expect(emittedEvent && emittedEvent[0]).toStrictEqual([]);
    })

    it(`Quand le bouton "Terminer la mission..." est cliqué le bon emit est renvoyé.`, async () => {
        const wrapper = mount(GameActions);
        const btn = wrapper.findAll('[class="btn btn-outline-warning"]')[0];
        await btn.trigger('click');
        const emittedEvent = wrapper.emitted('quitCombat');
        expect(emittedEvent && emittedEvent[0]).toStrictEqual([]);
    })

    it(`Quand le bouton "Terminer la mission et réparer le vaisseau !" est cliqué le bon emit est renvoyé.`, async () => {
        const wrapper = mount(GameActions);
        const btn = wrapper.findAll('[class="btn btn-outline-success"]')[0];
        await btn.trigger('click');
        const emittedEvent = wrapper.emitted('quitCombatAndHeal');
        expect(emittedEvent && emittedEvent[0]).toStrictEqual([]);
    })

})
