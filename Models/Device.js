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

    constructor(dsn,type,connectionString,profile,print){
        this.dsn = dsn;
        this.type = type;
        this.connectionString = connectionString;
        this.facility = null;
        this.geolocation = null;
        this.profile = profile;
        this.print = print;
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

    getProfile(){
        return this.profile;
    }

    setProfile(profile){
        this.profile = profile;
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

        if (!this.print){
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
        } else {
            var message = new Message(JSON.stringify(this.getReading()));
            console.log(`Sending ${this.getDsn()} message: ${message.getData()}`);
        }

    }


    // Device Telemetry Data

    discreteReading(weighting){

        var chance = new Chance();

        return chance.weighted(weighting[0]['values'],weighting[0]['weights']);

    }

    continuousReading(timeStamp,breakDown){

        return d3.randomNormal(breakDown[timeStamp.getHours()]["mean"],breakDown[timeStamp.getHours()]["sd"]);

    }
}

module.exports = Device;