
/**
 * Facility class.
 * 
 * Models the composition of IoT objects into a single IoT "Facility"
 *
 * @constructor
 * @param {String} name  - name of the facility.
 * @param {Array} sensors  - IoT sensors in the facility.
 */

class Facility {
    constructor(name,devices,geolocation) {
      this.name = name;
      this.devices = devices;
      this.geolocation = geolocation;
    }

    getDevices(){
        return this.devices;
    }

    getGeolocation(){
        return this.geolocation;
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

        }, 60000);
    }
  }


  module.exports = Facility;