module.exports = {
    entry: "./src/client/client.jsx",
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
                    presets: ["react", "es2015", "stage-2", "stage-3"]
                }
            }
        ]
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    }
}