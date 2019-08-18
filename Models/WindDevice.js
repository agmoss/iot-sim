const Device = require('./Device');

class WindDevice extends Device{
    constructor(dsn,geolocation,type){
        super(dsn,geolocation,type)
    }

    createReading(){
        
        var timeStamp = new Date();

        var weighting = [
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            },
            {
                "values":['N','S','E','W'],
                "weights" : [1,2,1,1]
            }
        ]

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

        var direction = super.discreteReading(timeStamp,weighting);
        var mph = super.continuousReading(timeStamp,breakDown)();

        return {"mph":mph,"direction":direction}
    }
}

module.exports = WindDevice;