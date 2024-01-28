module.exports={
    testEnvironment : 'jsdom',
    moduleNameMapper : {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    transform:{
        '^.+\\.js$': 'babel-jest',
    },
    moduleFileExtensions : ['js', 'jsx', 'json', 'node'],
}