import { shallowMount } from '@vue/test-utils'
import Footer from '@/views/Footer'

describe('Footer', () => {
  const build = () => {
    const wrapper = shallowMount(Footer, {
      stubs: ['font-awesome-icon']
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
