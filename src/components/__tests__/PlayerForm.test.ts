import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerForm from '../PlayerForm.vue'

describe('PlayerForm.vue', () => {

    it("Le titre est le bon", async () => {
        const wrapper = mount(PlayerForm);
        const title = wrapper.find('h4');
        expect(title.text()).toBe('Votre objectif: Survivre à 5 missions en obtenant le plus de crédits galactiques.')
    })

    it("Le nom du joueur est vide", async () => {
        const wrapper = mount(PlayerForm);
        const player_name = wrapper.find('[id="playerInput"]');
        expect(player_name.text().length).toBe(0)
    })

    it('Devrait avoir Millennium Falcon comme première valeur dans le select', async () => {
        const ships = [
          { id: 1, name: 'Millennium Falcon', vitality: 100 },
          { id: 2, name: 'X-wing', vitality: 100 },
          { id: 3, name: 'TIE Fighter', vitality: 100 }
        ];

        const wrapper = mount(PlayerForm, {
          props: {
            ships: ships
          }
        });

        const firstOption = wrapper.find('select#player-ship-select option:first-child');
        expect(firstOption.text()).toBe('Millennium Falcon');
    });

    it('Si le nom du joueur est présent, le bouton pour se battre apparait.', async () => {
        const ships = [
          { id: 1, name: 'Millennium Falcon', vitality: 100 },
          { id: 2, name: 'X-wing', vitality: 100 },
          { id: 3, name: 'TIE Fighter', vitality: 100 }
        ];

        const wrapper = mount(PlayerForm, {
          props: {
            ships: ships
          }
        });

        await wrapper.find('[id="playerInput"]').setValue("abc");
        expect(wrapper.find('button').isVisible()).toBe(true); 
    });

    it('Si le nom du joueur est absent, le bouton pour se battre reste invisible.', async () => {
        const ships = [
          { id: 1, name: 'Millennium Falcon', vitality: 100 },
          { id: 2, name: 'X-wing', vitality: 100 },
          { id: 3, name: 'TIE Fighter', vitality: 100 }
        ];

        const wrapper = mount(PlayerForm, {
          props: {
            ships: ships
          }
        });

        expect(wrapper.find('button').exists()).toBe(false);
    });



})
