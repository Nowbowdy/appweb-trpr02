import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerInformations from '../PlayerInformations.vue'

describe('PlayerInformations.vue', () => {

    it("devrait afficher l'experience et le nom du joueur (reçu en props) en une ligne", async () => {
        const player = {         
            name: 'Test',
            experience: 'Maitre',
            score: 0,
            ship: { shipName:'Test', vitality: 100}
        }
        
        const wrapper = mount(PlayerInformations, {
          props: {
            player: player
          }
        });
        
        const experienceElement = wrapper.find('.card-title');

        expect(experienceElement.text()).toBe('Maitre Test');
    })

    it("devrait afficher le nom du vaisseau et le score du joueur (reçu en props) sous le format '{NOM_VAISSEAU} - {SCORE} GC'", async () => {
        const player = {         
            name: 'Test',
            experience: 'Maitre',
            score: 0,
            ship: { shipName:'Test', vitality: 100}
        }
        
        const wrapper = mount(PlayerInformations, {
          props: {
            player: player
          }
        });
        
        const experienceElement = wrapper.find('.card-text');
        
        expect(experienceElement.text()).toBe('Test - 0 GC');
    })

    it("la largeur de la barre de progression s'ajuste réactivement à la valeur de props.player.ship.vitality", async () => {
        const player = {
          name: 'Test',
          experience: 'Maitre',
          score: 0,
          ship: {
            shipName: 'Test',
            vitality: 50
          }
        };

        const wrapper = mount(PlayerInformations, {
          props: {
            player: player
          }
        });

        const progressBar = wrapper.find('.progress-bar');
        expect(progressBar.attributes('style')).toContain('width: 50%');

        wrapper.props().player.ship.vitality = 100
        await wrapper.vm.$nextTick();

        expect(progressBar.text()).toBe('100%');
    })

    it('la barre de progression contient la valeur de props.player.ship.vitality', async () => {
        const player = {
          name: 'Test',
          experience: 'Maitre',
          score: 0,
          ship: {
            shipName: 'Test',
            vitality: 50
          }
          
        };
    
        const wrapper = mount(PlayerInformations, {
          props: {
            player: player
          }
        });
    
        const progressBar = wrapper.find('.progress-bar');

        expect(progressBar.text()).toContain('50%');

        wrapper.props().player.ship.vitality = 100
        await wrapper.vm.$nextTick();

        expect(progressBar.text()).toBe('100%');
    })

})
