import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../redux/taskSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.tasks.theme);

  return (
    <label>
      Light Mode
      <input
        type="checkbox"
        checked={theme === 'light'}
        onChange={() => dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))}
      />
    </label>
  );
};

export default ThemeToggle;
