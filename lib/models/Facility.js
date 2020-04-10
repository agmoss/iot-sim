/**
 * Facility
 *
 * Models the composition of IoT objects into a single IoT "Facility"
 *
 * @constructor
 * @param {string} name  - name of the facility.
 * @param {array} devices  - IoT devices in the facility.
 * @param {array} geolocation  - lat and lon of the facility.
 * @param {number} frequency - milliseconds between messages.
 */

class Facility {
    constructor({ name, devices, geolocation, frequency }) {
        this.name = name;
        this.devices = devices;
        this.geolocation = geolocation;
        this.frequency = frequency;
    }

    getDevices() {
        return this.devices;
    }

    getGeolocation() {
        return this.geolocation;
    }

    getFrequency() {
        return this.frequency;
    }

    setupFacility() {
        this.devices.forEach(device => {
            device.setGeolocation(this.getGeolocation());
            device.setFacility(this.name);
        });
    }

    putOnline() {
        setInterval(() => {
            this.devices.forEach(device => {
                device.createDeviceTelemetry();
                device.createReading();
                device.sendMessage();
            });
        }, this.getFrequency());
    }
}

export default Facility;
