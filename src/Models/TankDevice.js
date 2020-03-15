const Device = require("./Device");
const profile = require("../Profiles/tank");

/**
 * TankDevice class.
 *
 * An IoT tank device that measuers liters of fluid and fluid pH
 */

class TankDevice extends Device {
    createDeviceTelemetry() {
        const timeStamp = new Date();

        // Setup profiles
        const { litersProfile } = profile;
        const { phProfile } = profile;

        // Create messages
        const liters = Device.continuousReading(timeStamp, litersProfile)();
        const pH = Device.continuousReading(timeStamp, phProfile)();

        return this.setTelemetry({
            liters: liters.toFixed(3),
            pH: pH.toFixed(3),
            timestamp: timeStamp,
        });
    }
}

module.exports = TankDevice;
