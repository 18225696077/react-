const path =require("path");
const  htmlWebpackPlugin =require("html-webpack-plugin")
const webpack=require("webpack")
module.exports={
    //配置入口文件
    entry:{
        app:path.resolve(__dirname,"./src/main.js")
    },
    //配置出口文件
    output:{
        path:path.resolve(__dirname,"./dist/js"),
        filename:"bundle.js"
    },
    //设置别名
    resolve:{
        extensions: ['.jsx','.js', '.json'],
        alias:{
            '@':path.resolve(__dirname,"src")
        }
    },
   //配置loader
   module:{
    rules:[
        {
            test:/\.(css|scss)$/,
            use:["style-loader","css-loader","sass-loader"]
        },
        {
            test:/\.(jsx|js)/,
            use:{
                loader:"babel-loader",
                options:{
                    presets:["@babel/env","@babel/react"]
                }
            }
        }
    ]
   },

    // 配置插件
    plugins:[
        new htmlWebpackPlugin({
            title:'React', //设置title
            filename:"index.html", //设置生成html文件名file生成目录主要根据 出口文件的path走
            template:'index.html'
        }),
        new webpack.ProvidePlugin({
            $:"jquery",
            jquery:"jquery"
        })
    ],
    //配置代理
    devServer:{
        //配置主机
        host:"0.0.0.0",
        port:"8899",
        proxy:{
            '/apis':{
                //url里面要拼接进去
                target:"https://cnodejs.org",//需要代理的接口域名主机
                //secure:false,   //https接口需要配置这个参数
                changeOrigin:true, //是否跨域
                pathRewrite: {
                    '^/apis': '' //需要rewrite的,
                  }
            }
        }
    }
   


}