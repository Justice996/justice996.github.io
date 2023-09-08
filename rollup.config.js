import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    input: 'packages/index.ts',
    output: {
        file: 'bundle.js',
        format: 'cjs',
    },
    plugins: [
        nodeResolve({
            extensions: ['.mjs', '.js', '.json', '.ts'],
        }),
    ],
}
