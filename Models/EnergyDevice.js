const Device = require('./Device');


class EnergyDevice extends Device {
    constructor(dsn,geolocation,type){
        super(dsn,geolocation,type)
    }

    createReading(){
        var timeStamp = new Date();

        var breakDown = [
            {
                "mean":100,
                "sd" : 10
            },
            {
                "mean":400,
                "sd":30    
            },
            {
                "mean":200,
                "sd":15
            },
            {
                "mean":100,
                "sd":10
            }

        ]

        var watts = super.continuousReading(timeStamp,breakDown)();

        return this.createMessage({"watts":watts})
    }

}

module.exports = EnergyDevice;