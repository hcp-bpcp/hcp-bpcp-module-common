"use strict";
exports.__esModule = true;
exports.LoggerService = void 0;
var nest_winston_1 = require("nest-winston");
var winston = require("winston");
var _a = winston.format, errors = _a.errors, combine = _a.combine, json = _a.json, timestamp = _a.timestamp, ms = _a.ms, prettyPrint = _a.prettyPrint;
var LoggerService = /** @class */ (function () {
    function LoggerService(service) {
        var _this = this;
        this.logger = winston.createLogger({
            format: combine(errors({ stack: true }), json(), timestamp({ format: 'isoDateTime' }), ms(), prettyPrint()),
            defaultMeta: { service: service },
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: combine(nest_winston_1.utilities.format.nestLike('Winston'))
                }),
            ]
        });
        console.log = function (message, params) {
            _this.logger.debug(message, params);
        };
    }
    LoggerService.prototype.log = function (message) {
        this.logger.info(message);
    };
    LoggerService.prototype.error = function (message) {
        this.logger.error(message);
    };
    LoggerService.prototype.warn = function (message) {
        this.logger.warn(message);
    };
    LoggerService.prototype.debug = function (message) {
        this.logger.debug(message);
    };
    LoggerService.prototype.verbose = function (message) {
        this.logger.verbose(message);
    };
    return LoggerService;
}());
exports.LoggerService = LoggerService;
