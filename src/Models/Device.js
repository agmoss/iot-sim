const d3 = require("d3-random");
const Chance = require("chance");
const uuidv4 = require("uuid/v4");

const { Mqtt } = require("azure-iot-device-mqtt");
const DeviceClient = require("azure-iot-device").Client;
const { Message } = require("azure-iot-device");

/**
 * Device Superclass.
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection paramater for Azure IoT hub.
 * @param {String} profile  - device signature.
 * @param {Boolean} print  - True=print to console/False=send to Azure IoT hub! 
 */

class Device {
    constructor({ dsn, type, connectionString, profile, print }) {
        this.dsn = dsn;
        this.type = type;
        this.connectionString = connectionString;
        this.facility = null;
        this.geolocation = null;
        this.profile = profile;
        this.print = print;
    }

    getDsn() {
        return this.dsn;
    }

    getGeolocation() {
        return this.geolocation;
    }

    setGeolocation(geolocation) {
        this.geolocation = geolocation;
    }

    getFacility() {
        return this.facility;
    }

    setFacility(facility) {
        this.facility = facility;
    }

    getType() {
        return this.type;
    }

    getConnectionString() {
        return this.connectionString;
    }

    setClient(client) {
        this.client = client;
    }

    getClient() {
        return this.client;
    }

    setReading(reading) {
        this.reading = reading;
    }

    getReading() {
        return this.reading;
    }

    setTelemetry(telemetry) {
        this.telemetry = telemetry;
    }

    getTelemetry() {
        return this.telemetry;
    }

    getProfile() {
        return this.profile;
    }

    setProfile(profile) {
        this.profile = profile;
    }

    // Device IoT Message methods

    static createDeviceTelemetry() {
        throw new Error("No Telemetry method!");
    }

    createClient() {
        try {
            const client = DeviceClient.fromConnectionString(
                this.getConnectionString(),
                Mqtt
            );
            this.setClient(client);
        } catch (error) {
            console.log(`Error creating the client! ${error}`);
        }
    }

    createReading() {
        const reading = {};
        const id = uuidv4();
        reading.data = this.getTelemetry();
        reading.timestamp = reading.data.timestamp.getTime();
        delete reading.data.timestamp;
        reading.id = id;
        // eslint-disable-next-line no-underscore-dangle
        reading._id = id;
        reading.dsn = this.getDsn();
        reading.geolocation = this.getGeolocation();
        reading.facility = this.getFacility();
        reading.type = this.getType();
        this.setReading(reading);
    }

    sendMessage() {
        let message = "";
        if (!this.print) {
            const client = this.getClient();
            message = new Message(JSON.stringify(this.getReading()));
            console.log(
                `Sending ${this.getDsn()} message: ${message.getData()}`
            );

            client.sendEvent(message, error => {
                if (error) {
                    console.error(`send error: ${error.toString()}`);
                } else {
                    console.log(` ${this.getDsn()} message sent`);
                }
            });
        } else {
            message = new Message(JSON.stringify(this.getReading()));
            console.log(
                `Sending ${this.getDsn()} message: ${message.getData()}`
            );
        }
    }

    // Device Telemetry Data

    static discreteReading(weighting) {
        const chance = new Chance();
        return chance.weighted(weighting[0].values, weighting[0].weights);
    }

    static continuousReading(timeStamp, breakDown) {
        return d3.randomNormal(
            breakDown[timeStamp.getHours()].mean,
            breakDown[timeStamp.getHours()].sd
        );
    }
}

module.exports = Device;
