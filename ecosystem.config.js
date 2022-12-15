module.exports = {
    apps: [{
        // 应用名
        name: 'sakura-web',
        // 执行脚本入口文件
        script: './src/main.js',
        // 开启实例
        instances: 2,
        // 默认为true, 发生异常的情况下自动重启
        autorestart: true,
        // 设置追加日志而不是新建日志
        "merge_logs": true,
        // 是否监听文件更改
        watch: false, //监听模式，不能单纯的设置为true，易导致无限重启，因为日志文件在变化，需要排除对其的监听
        // 内存大于1G自动释放
        max_memory_restart: '1G',
        // 启动模式 fork/cluster
        exec_mode: 'cluster',
        env: {
            PM2_SERVE_PATH: "./src/static", //静态服务路径
            PM2_SERVE_PORT: 8080, //静态服务器访问端口
            NODE_ENV: 'development' //启动默认模式
        },
        env_production: {
            NODE_ENV: 'production'
        },
        error_file: "./logs/err.log", //错误输出日志
        out_file: "./logs/out.log", //日志
        log_date_format: "YYYY-MM-DD HH:mm Z" //日期格式
    }]
};