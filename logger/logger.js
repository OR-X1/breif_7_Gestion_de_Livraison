const {createLogger,transports,format} = require('winston');

module.exports = createLogger({
    transports : [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.simple()) ,
        }),
        new transports.File({
            filename: 'logger/info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
});