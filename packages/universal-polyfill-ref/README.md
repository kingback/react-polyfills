# `universal-polyfill-ref`

> Ref polyfill for React/Rax

## Usage

```js
import Engine from 'universal-polyfill-engine';
import { createRef, forwardRef } from 'universal-polyfill-ref';

import React from 'react';
Engine.set(React);

import * as Rax from 'rax';
Engine.set(Rax);
```

## Others

See:

* [react-polyfill-ref](https://www.npmjs.com/package/react-polyfill-ref)
* [rax-polyfill-ref](https://www.npmjs.com/package/rax-polyfill-ref)
