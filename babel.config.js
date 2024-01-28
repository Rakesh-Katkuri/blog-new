// module.exports={
//   presets:[
//     "@bael/preset-env",
//     "@babel/preset-react"
//   ]
// }




module.exports = {
    presets: [
      '@babel/preset-react',
      [ 
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
  
      "plugins": ["@babel/plugin-syntax-jsx"]

  };
  require("@babel/core").transformSync("code", {
    plugins: ["@babel/plugin-syntax-jsx"],
  });

  