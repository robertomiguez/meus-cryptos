import { shallowMount } from '@vue/test-utils'
import HowTo from '@/views/HowTo'

describe('HowTo', () => {
  const build = () => {
    const wrapper = shallowMount(HowTo)

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
