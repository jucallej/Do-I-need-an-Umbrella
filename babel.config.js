const presets = [
    [
        '@babel/env',
        {
            targets: {
                browsers: ['last 2 versions', '> 1%']
            },
            useBuiltIns: 'usage',
            corejs: 3
        }
    ],
    '@babel/typescript',
    '@babel/preset-react'
];

const plugins = [
    '@babel/proposal-class-properties',
    '@babel/proposal-object-rest-spread',
    '@babel/plugin-proposal-optional-chaining'
];

module.exports = { presets, plugins };
