var d3 = require("d3-random");
var Chance = require('chance');

class Device{

    constructor(dsn,geolocation,type){
        this.dsn = dsn;
        this.geolocation = geolocation;
        this.type = type;
    }

    createReading(){
        throw new Error("No create reading method")
    }

    discreteReading(timeStamp,weighting){
        var chance = new Chance();

        var reading = 0;
        switch(timeStamp.getHours()){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                reading = chance.weighted(weighting[0]['values'],weighting[0]['weights']);
                break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                
                reading = chance.weighted(weighting[1]['values'],weighting[1]['weights']);
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
                    reading = chance.weighted(weighting[2]['values'],weighting[2]['weights']);
                    break;

        }

        return reading;

    }

    continuousReading(timeStamp,breakDown){

        var reading = 0;

        switch(timeStamp.getHours()){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                reading = d3.randomNormal(breakDown[0]["mean"],breakDown[0]["sd"]);
                break;
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                    reading = d3.randomNormavgfzcdvcxcxvvcxcvcvcvdffdfdsfdsfaffadsfadssdfddfdfdfder
            case 17:
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
            case 24:
                    reading = d3.randomNormal(breakDown[2]["mean"],breakDown[2]["sd"]);
                    break;

        }
        
        return reading;
    }
}

module.exports = Device;