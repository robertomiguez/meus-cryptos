import { shallowMount } from '@vue/test-utils'
import Header from '@/views/Header'

describe('Header', () => {
  const build = () => {
    const wrapper = shallowMount(Header, {
      stubs: ['router-link', 'router-view']
    })

    return {
      wrapper
    }
  }

  it('renders the component', () => {
    // arrange
    const { wrapper } = build()
    // assert
    expect(wrapper.html()).toMatchSnapshot()
  })
})
