const os = require('os');
/**
 * Get ip(v4) address
 * @return {String} the ipv4 address or 'localhost'
 */
var getIPAddress = function () {
    var iFaces = os.networkInterfaces();
    var ip = '';
    for (var dev in iFaces) {
        iFaces[dev].forEach(function (details) {
            if (ip === '' && details.family === 'IPv4' && !details.internal) {
                ip = details.address;
                return;
            }
        });
    }
    return ip || "127.0.0.1";
};
module.exports = {
    getIPAddress
}