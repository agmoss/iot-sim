const Device = require("./Device");

const profile = require("../Profiles/energy");

/**
 * EnergyDevice class.
 *
 * A general IoT device that measuers power
 */

class EnergyDevice extends Device {
    createDeviceTelemetry() {
        const timeStamp = new Date();

        let wattageProfile = null;

        // Select profile
        if (super.getProfile() === "profile1") {
            wattageProfile = profile.profile1;
        } else if (super.getProfile() === "profile2") {
            wattageProfile = profile.profile2;
        }

        // Create reading
        const watts = Device.continuousReading(timeStamp, wattageProfile)();

        return this.setTelemetry({
            watts: watts.toFixed(3),
            timestamp: timeStamp,
        });
    }
}

module.exports = EnergyDevice;
