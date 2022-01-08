# mathemann

Math library [![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org) [![NPM version](https://img.shields.io/npm/v/@frank-mayer/mathemann.svg)](https://www.npmjs.com/package/@frank-mayer/mathemann)

[Generated Documentation](https://github.com/Frank-Mayer/mathemann/wiki)

``` sh
yarn add @frank-mayer/mathemann
```

``` typescript
import { findLookAtRotation, Vector3 } from "@frank-mayer/mathemann";

const a = new Vector3(-500, 5, -10);
const b = new Vector3(10, 10.75, 20);

console.log(findLookAtRotation(a, b).toString());
```

![Mathemann](https://github.com/Frank-Mayer/mathemann/blob/main/mathemann.png)
