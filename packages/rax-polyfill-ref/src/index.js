import Rax from 'rax';
import Engine from 'universal-polyfill-engine';
import { createRef, forwardRef } from 'universal-polyfill-ref';

Engine.set(Rax);

export { createRef, forwardRef };