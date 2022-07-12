"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WinstonMiddleware = void 0;
var common_1 = require("@nestjs/common");
var logger_service_1 = require("./logger.service");
var WinstonMiddleware = /** @class */ (function () {
    function WinstonMiddleware() {
    }
    WinstonMiddleware.prototype.use = function (req, res, next) {
        res.on('finish', function () {
            var loggerService = new logger_service_1.LoggerService(req.url.slice(1).split('/')[0]);
            var tempUrl = req.method + ' ' + req.url.split('?')[0];
            var _url = JSON.stringify(tempUrl ? tempUrl : {});
            // const _headers = JSON.stringify(req.headers ? req.headers : {});
            // const _query = JSON.stringify(req.query ? req.query : {});
            // const _body = JSON.stringify(req.body ? req.body : {});
            var statusCode = res.statusCode, statusMessage = res.statusMessage;
            var logMessage = "".concat(_url, " ").concat(statusCode, " ").concat(statusMessage).replace(/\\/, '');
            if (statusCode >= 500) {
                return loggerService.error(logMessage);
            }
            if (statusCode >= 400) {
                return loggerService.warn(logMessage);
            }
            return loggerService.log(logMessage);
        });
        next();
    };
    WinstonMiddleware = __decorate([
        (0, common_1.Injectable)()
    ], WinstonMiddleware);
    return WinstonMiddleware;
}());
exports.WinstonMiddleware = WinstonMiddleware;
