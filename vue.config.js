module.exports = {
    devServer: {
        port: 8082,// 端口
        proxy: {
            '/api': {// 小暗号
                target: 'http://39.97.33.178', // 目标服务器
                // ws: true,
                changeOrigin: true, // 是否允许代理
            }
        }

    }
};