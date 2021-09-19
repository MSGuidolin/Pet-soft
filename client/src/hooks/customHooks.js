import * as react from 'react';

/******************************************
 * Simple input manager.
 * @param {string} name
 * @returns {object}
 *   {string} value
 *   {function} onChange
 *   {name} name
 */
export const useInput = (name) => {
  const [value, setValue] = react.useState('');
  if (name === 'files') {
    const onChange = (e) => setValue(e.target.files[0]);
    return { value, onChange, name };
  }
  const onChange = ({ target: { value } }) => setValue(value);

  return { value, onChange, name };
};
