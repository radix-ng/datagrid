const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

const { shadcnUIPlugin } = require('@radix-ng/shadcn/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
        ...createGlobPatternsForDependencies(__dirname),
        './node_modules/@radix-ng/shadcn/**/*.{mjs,js}',
        './node_modules/@radix-ng/shadcn/**/(button|label|checkbox)/*.{mjs,js}'
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {}
    },
    plugins: [shadcnUIPlugin()]
};
