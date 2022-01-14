# mathemann

Math library [![Strict TypeScript Checked](https://badgen.net/badge/TS/Strict "Strict TypeScript Checked")](https://www.typescriptlang.org) [![NPM version](https://img.shields.io/npm/v/mathemann.svg)](https://www.npmjs.com/package/mathemann)

[view generated documentation](https://github.com/Frank-Mayer/mathemann/wiki)

``` sh
yarn add mathemann
```

``` typescript
import { findLookAtRotation, Vector3 } from "@frank-mayer/mathemann";

const a = new Vector3(-500, 5, -10);
const b = new Vector3(10, 10.75, 20);

console.log(findLookAtRotation(a, b).toString());
```

## TypeScript to Lua
[tstl (TypeScript to Lua)](https://github.com/TypeScriptToLua/TypeScriptToLua) compatible.
tstl is currently not able to use npm modules. You have to clone the repository into yours and import from the source (index.ts in root directory) directly.

![Mathemann](https://github.com/Frank-Mayer/mathemann/raw/main/mathemann.png)
