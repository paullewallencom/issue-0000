# ts-node-esm-mocha-issue

Minimal reproduction repo showing a Node.js + ts-node/esm + Mocha cycle error when trying to run `.ts` ESM entrypoints directly.

## Problem Description

When launching a TypeScript ESM entry file directly via:

```bash
node --loader ts-node/esm run-mocha.ts
```

Node.js throws a `ERR_REQUIRE_CYCLE_MODULE` error because static imports (like Mocha) are processed before ts-node fully hooks into the runtime.

Even with `"module": "NodeNext"` and `"moduleResolution": "NodeNext"` set in `tsconfig.json`, the crash persists.

The current workaround is to use a `.mjs` bootstrap file and dynamically `import()` the TypeScript file.

---

## How to Reproduce

1. Clone this repository.

2. Install dependencies:

```bash
npm install
```

3. Run the test script:

```bash
npm run test
```

4. Observe the error:

```plaintext
Error [ERR_REQUIRE_CYCLE_MODULE]: Cannot require() ES Module run-mocha.ts in a cycle
```

---

## Project Structure

```plaintext
ts-node-esm-mocha-issue/
├── package.json
├── tsconfig.json
├── run-mocha-bootstrap.mjs
├── run-mocha.ts
└── src/
    └── test/
        └── example.test.ts
```

---

## Why This Matters

Without a clean way to launch `.ts` entrypoints directly in ESM mode, many TypeScript users face fragile project setups requiring additional bootstrap scripts or dynamic imports.

Improving `ts-node/esm` support for `.ts` ESM entrypoints would significantly simplify modern Node.js + TypeScript developer workflows.

---

## License

This project is licensed under the MIT License.
