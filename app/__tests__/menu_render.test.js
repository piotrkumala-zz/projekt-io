import React from 'react';
import MenuButton from '../components/screen_components/common/MenuButton';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<MenuButton />).toJSON();
  expect(tree).toMatchSnapshot();
});