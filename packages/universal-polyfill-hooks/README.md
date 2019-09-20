# `universal-polyfill-hooks`

> Hooks polyfill for React/Rax

## Usage

```js
import Engine from 'universal-polyfill-engine';
import { useState, useEffect } from 'universal-polyfill-hooks';

import React from 'react';
Engine.set(React);

import * as Rax from 'rax';
Engine.set(Rax);
```

## Others

See:

* [react-polyfill-hooks](https://www.npmjs.com/package/react-polyfill-hooks)
* [rax-polyfill-hooks](https://www.npmjs.com/package/rax-polyfill-hooks)
