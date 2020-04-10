import * as d3 from "d3-random";
import Chance from "chance";
import uuidv4 from "uuid/v4";
import chalk from "chalk";

/**
 * Device Superclass
 *
 * @constructor
 * @param {String} dsn - device serial number.
 * @param {String} type  - type of device.
 * @param {String} connectionString  - connection parameter for Azure IoT hub.
 * @param {String} profile  - device signature.
 * @param {boolean} log  - True=print fancy output console/False=no output
 * @param {function} handler - User defined function to handle the telemetry data
 */

class Device {
    constructor({ dsn, type, profile, log, handler }) {
        this.dsn = dsn;
        this.type = type;
        this.facility = null;
        this.geolocation = null;
        this.profile = profile;
        this.log = log;
        this.handler = handler;
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
        const message = this.getReading();
        if (this.log === true) {
            console.log(
                `${chalk.black.bgBlueBright(this.getDsn())} ${chalk.black.bgRed(
                    "data"
                )}: ${chalk.greenBright(JSON.stringify(message, null, 2))}`
            );
        }
        if (this.handler) {
            this.handler(message);
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

export default Device;
