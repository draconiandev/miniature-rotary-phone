plugins.push(new webpack.DefinePlugin({ "global.GENTLY": false }));
node: {
  __dirname: true,
},