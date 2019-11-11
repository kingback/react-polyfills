import * as Rax from 'rax';
import Engine from 'universal-polyfill-engine';
import { createContext, useFallbackContext } from 'universal-polyfill-context';

!Rax.useState && useFallbackContext();
Engine.set(Rax);

export { createContext };