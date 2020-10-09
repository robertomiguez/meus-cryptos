import { shallowMount } from '@vue/test-utils'
import SupportedCryptos from '@/views/SupportedCryptos'

describe('SupportedCryptos', () => {
  const build = () => {
    const wrapper = shallowMount(SupportedCryptos)

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