var webpack = require('webpack');

var PATHS  = {
    "production" : "",
    "images" : "",
    "imagesPublic" : "",
    "filesPublic" : "",
    "scripts" : ""
};
module.exports = {
    entry: __dirname + "/app/app.jsx",
    output: {
        path: __dirname + "/dist",
        filename: "scripts/[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
               loader:[
                    {
                        loader:"url-loader",
                        options : {
                            limit: 25000,
                            outputPath : PATHS.images,
                            publicPath : PATHS.imagesPublic
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                        progressive: true,
                        optimizationLevel: 7,
                        interlaced: false,
                        pngquant: {
                            quality: '65-90',
                            speed: 4
                            }
                        },
                    },
                ]
            },
            /*
            consider putting this in later but only when we have more files.  dont want to include too many things.
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "script-loader"
            }*/
            {
                test : /\.less$/,
                use :[
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                        options : {
                            modules: true,
                        }
                    },
                    {
                        loader : 'less-loader'
                    }
                ]
            },
            {
                test : /\.css$/,
                use : ["style-loader", "css-loader"]},
                {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    }

                ]
            },
            {
               test: /\.jsx?$/,
               exclude: /node_modules/,
               use : [
                    {
                        loader: 'babel-loader',
                        options: {
                                presets: [ 
                                    ["env", {
                                            "targets" : {
                                                "browsers" : ["last 3 versions", ">1%"]
                                            },
                                            useBuiltIns : true,
                                            }
                                    ],
                                    ["es2017"],
                                    ["es2016"],
                                    ["es2015"],
                                    ["react"],
                                ],
                                plugins : [
                                    'syntax-dynamic-import',
                                    'transform-async-to-generator',
                                    'transform-regenerator',
                                    'transform-runtime']
                        }
                    }
               ],
           }
        ]
    },
    plugins:[
       /* new webpack.optimize.CommonsChunkPlugin({
            //chunk name
            name: "common",
            //filename
            filename: PATHS.scripts + "common.js",
            //if the module is used in 3 entry points we put it in the common.
            minChunks: 3,
        }),*/
        new webpack.DefinePlugin({
        "process.env": { 
            NODE_ENV: JSON.stringify("production") 
        }
        }) 
    ],
    watch: true,
}