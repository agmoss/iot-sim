
/**
 * Facility class.
 * 
 * Models the composition of IoT objects into a single IoT "Facility"
 *
 * @constructor
 * @param {String} name  - name of the facility.
 * @param {Array} devices  - IoT devices in the facility.
 * @param {Array} geolocation  - lat and lon of the facility.
 * @param {Number} frequency - milliseconds between messages.
 */

class Facility {
    constructor(name,devices,geolocation,frequency) {
      this.name = name;
      this.devices = devices;
      this.geolocation = geolocation;
      this.frequency = frequency;
    }

    getDevices(){
        return this.devices;
    }

    getGeolocation(){
        return this.geolocation;
    }

    getFrequency(){
        return this.frequency;
    }

    setupFacility(){
        devices.forEach(device => {
            device.setGeolocation(this.getGeolocation());
            device.setFacility(this.name);
        }); 
    }

    putOnline(){

        setInterval(()=>{ 

            var devices = this.getDevices();

            devices.forEach(device => {
                device.createClient();
                device.createDeviceTelemetry();
                device.createReading();
                device.sendMessage();
            });  

        }, this.getFrequency());
    }
  }


  module.exports = Facility;