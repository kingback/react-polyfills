import React from 'react';
import Engine from 'universal-polyfill-engine';
import { createContext } from 'universal-polyfill-context';

Engine.set(React);

export { createContext };