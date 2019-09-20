import * as Rax from 'rax';
import Engine from 'universal-polyfill-engine';
import { createContext } from 'universal-polyfill-context';

Engine.set(Rax);

export { createContext };