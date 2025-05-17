import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    {
        ignores: ['websockets-ui/**', 'webpack.config.js', 'dist']
    },
    eslint.configs.recommended,
    tseslint.configs.recommended
);
