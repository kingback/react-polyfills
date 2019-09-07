import React from 'react';
import Engine from 'universal-polyfill-engine';
import { createRef, forwardRef } from 'universal-polyfill-ref';

Engine.set(React);

export { createRef, forwardRef };