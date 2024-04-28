import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerForm from '../PlayerForm.vue'

describe('PlayerForm.vue', () => {

    it("À l'arrivée sur la page, le titre est le bon", async () => {
        const wrapper = mount(PlayerForm);
        const title = wrapper.find('h4');
        expect(title.text()).toBe('Votre objectif: Survivre à 5 missions en obtenant le plus de crédits galactiques.')
    })

    it("À l'arrivée sur la page, le nom du joueur est vide", async () => {
        const wrapper = mount(PlayerForm);
        const player_name = wrapper.find('[id="playerInput"]');
        expect(player_name.text().length).toBe(0)
    })

    test("À l'arrivée sur la page, le vaiseau du joueur est le Millennium Falcon", async () => {
        const wrapper = mount(PlayerForm)
        const select = wrapper.find('[id="player-ship-select"]');
        expect(select.text()).toBe('Millennium Falcon');
    })

})
