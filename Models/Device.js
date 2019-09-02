var d3 = require("d3-random");
var Chance = require('chance');
const uuidv4 = require('uuid/v4');

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var Message = require('azure-iot-device').Message;

/**
 * Device Superclass.
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} geolocation  - location of the IoT device.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 */

class Device{

    constructor(dsn,type,connectionString){
        this.dsn = dsn;
        this.type = type;
        this.connectionString = connectionString;
        this.facility = null;
        this.geolocation = null;
    }

    //Getters/Setters

    getDsn(){
        return this.dsn;
    }

    getGeolocation(){
        return this.geolocation;
    }

    setGeolocation(geolocation){
        this.geolocation = geolocation;
    }

    getFacility(){
        return this.facility
    }

    setFacility(facility){
        this.facility = facility;
    }

    getType(){
        return this.type;
    }

    getConnectionString(){
        return this.connectionString;
    }

    setClient(client){
        this.client = client;
    }

    getClient(){
        return this.client;
    }

    setReading(reading){
        this.reading = reading;
    }

    getReading(){
        return this.reading;
    }

    setTelemetry(telemetry){
        this.telemetry = telemetry;
    }
    
    getTelemetry(){
        return this.telemetry
    }

    // Device IoT Message methods

    createDeviceTelemetry(){
        throw new Error("No Telemetry method!");
    }

    createClient(){

        try{
            var client = DeviceClient.fromConnectionString(this.getConnectionString(), Mqtt);
            this.setClient(client);

        } catch(error){
            console.log(`Error creating the client! ${error}`)
        }
    }

    createReading(){

        var reading = {};
        var id = uuidv4();
        reading["data"] = this.getTelemetry();
        reading["timestamp"] = reading["data"]["timestamp"].getTime();
        delete reading.data.timestamp;
        reading["id"] = id;
        reading["_id"] = id;
        reading["dsn"]=this.getDsn();
        reading["geolocation"] = this.getGeolocation();
        reading["facility"] = this.getFacility();
        reading["type"] = this.getType();
        this.setReading(reading);
    }
    
    sendMessage(){
 
        var client = this.getClient();
        var message = new Message(JSON.stringify(this.getReading()));
        console.log(`Sending ${this.getDsn()} message: ${message.getData()}`);

        client.sendEvent(message,(error)=>{
            if (error) {
                console.error(`send error: ${error.toString()}`);
            } else {
            console.log(` ${this.getDsn()} message sent`);
            }
        });
    }


    // Device Telemetry Data

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
                reading = d3.randomNormal(breakDown[1]["mean"],breakDown[1]["sd"]);
                break;
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