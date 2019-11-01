import ReactDOM from 'react-dom';
import App from '../App';
import React from 'react';
jest.mock('react-dom');

describe('index', () => {

  it('initialises the react App', () => {
    document.getElementById = jest.fn();
    (document.getElementById as jest.Mock).mockReturnValue('test getElementById');

    require('../index');

    expect(ReactDOM.render).toHaveBeenCalledWith(<App/>, 'test getElementById');
    expect(document.getElementById).toHaveBeenCalledWith('root');
  });
});
