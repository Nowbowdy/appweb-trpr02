import { describe, afterEach, expect, vi, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import routes from '../../router/routes'
import NavigationBar from '../NavigationBar.vue'

const router = createRouter({
  history: createWebHistory(),
  routes : routes
})

describe('NavigationBar.vue', () => {

  it('Doit pouvoir naviguer sur la page "Home".', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const linkPostsEl = wrapper.find('#home')
    await linkPostsEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith('/')
  })

  it('Doit pouvoir naviguer sur la page score.', async () => {
    router.push('/')
    await router.isReady()

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    })

    const routerSpy = vi.spyOn(router, 'push')

    const linkAboutEl = wrapper.find('#score')
    await linkAboutEl.trigger('click')

    expect(routerSpy).toHaveBeenCalledWith({ name: 'Score' })
  })
})
