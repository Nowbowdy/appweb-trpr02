import { describe, expect, it, test } from 'vitest'
import { mount } from '@vue/test-utils'
import EnemyInformations from '../EnemyInformations.vue'

describe('EnemyInformations.vue', () => {

    it("devrait afficher l'experience (en string correspondant au int) et le nom de l'ennemi (reçu en props) en une ligne", async () => {
        const enemy = { 
            id: 1,        
            name: 'Test',
            credit: 0,
            experience: 4,
            ship: { id: 1, name:'Test', vitality: 100}
        }
        
        const wrapper = mount(EnemyInformations, {
          props: {
            enemy: enemy
          }
        })
        
        const experienceElement = wrapper.find('.card-title')

        expect(experienceElement.text()).toBe('Maître Test')
    })

    it("devrait afficher le nom du vaisseau et le score du joueur (reçu en props) sous le format '{NOM_VAISSEAU} - {SCORE} GC'", async () => {
        const enemy = { 
            id: 1,        
            name: 'Test',
            credit: 0,
            experience: 0,
            ship: { id: 1, name:'Test', vitality: 100}
        }
        
        const wrapper = mount(EnemyInformations, {
          props: {
            enemy: enemy
          }
        })
        
        const experienceElement = wrapper.find('.card-text')
        
        expect(experienceElement.text()).toBe('Test - 0 GC')
    })

    it("la largeur de la barre de progression s'ajuste réactivement à la valeur de props.player.ship.vitality", async () => {
        const enemy = { 
            id: 1,        
            name: 'Test',
            credit: 0,
            experience: 0,
            ship: { id: 1, name:'Test', vitality: 50}
        }
        
        const wrapper = mount(EnemyInformations, {
          props: {
            enemy: enemy
          }
        })

        const progressBar = wrapper.find('.progress-bar');
        expect(progressBar.attributes('style')).toContain('width: 50%');

        wrapper.props().enemy.ship.vitality = 50
        await wrapper.vm.$nextTick();


        expect(progressBar.text()).toBe('50%');
    })

    it('la barre de progression contient la valeur de props.player.ship.vitality', async () => {
        const enemy = { 
            id: 1,        
            name: 'Test',
            credit: 0,
            experience: 0,
            ship: { id: 1, name:'Test', vitality: 50}
        }
        
        const wrapper = mount(EnemyInformations, {
          props: {
            enemy: enemy
          }
        })
    
        const progressBar = wrapper.find('.progress-bar');

        expect(progressBar.text()).toContain('50%');

        wrapper.props().enemy.ship.vitality = 100
        await wrapper.vm.$nextTick();

        expect(progressBar.text()).toBe('100%');
    })

})
