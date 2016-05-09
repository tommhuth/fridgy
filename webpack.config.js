module.exports = {
    entry: "./src/app/App.jsx",
    output: {
        filename: "public/js/bundle.js"
    },
    module: {
        loaders:[
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel",
                query: {
                    presets: ['react', 'es2015', 'stage-2']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};