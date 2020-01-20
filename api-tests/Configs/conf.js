module.exports = {
    
    browserType : process.env.npm_config_browser,
    environment : process.env.npm_config_environment,
    maxSafeTimeout : 300000000,
    timeoutFindElements : 30000,
    timeoutJest : Math.pow(2, 31) - 1,
    width : 1920,
    height : 1080
}