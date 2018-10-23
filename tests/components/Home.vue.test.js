import { shallow } from '@vue/test-utils';
import Home from '@components/Home.vue';

describe('Home.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallow(Home);
    expect(wrapper).toMatchSnapshot();
  });
});
