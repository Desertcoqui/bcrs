// Title: Bobs Computer Repair Shop
// Author: Professor Krasso
// Date: February 11 2023
// Modified By: Kailee Stephens
// Attributions: In-Class tutorials

class BaseResponse {
    constructor(httpCode, message, data) {
        this.httpCode = httpCode;
        this.message = message;
        this.data = data;
    }

    toObject() {
        return {
            'httpCode': this.httpCode,
            'message': this.message,
            'data': this.data,
            'timestamp': new Date().toLocaleDateString()
        }
    }
}

module.exports = BaseResponse;