module.exports = {
    entry: [
        './src/index.jsx'
    ],
    module: {
        rules: [
            
            
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              },
              {
                test: /\.(woff2?|ttf|svg|eot)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
            }
              
            // {  test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, 
            //    loader: "url?limit=10000&mimetype=application/font-woff" 
            // },
            //   {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            //   {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            //   {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
          

        ]
    },
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js'
    }
};