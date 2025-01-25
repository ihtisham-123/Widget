const path=require("path")

module.exports ={

    entry: '/src/main.jsx',
    mode:'production',
    output :{

        path:path.resolve('dist'),
        filename:'main.jsx',
        liabraryTarget:'commonjs'
    }
}