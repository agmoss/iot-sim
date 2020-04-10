import Device from "./Device";
const profile = require("../profiles/wind");

/**
 * WindDevice Class
 *
 * An IoT device that measures wind speed and direction
 */

class WindDevice extends Device {
    createDeviceTelemetry() {
        const timeStamp = new Date();

        // Set up data profile
        const directionProfile = [
            {
                values: ["N", "S", "E", "W"],
                weights: [1, 2, 1, 1],
            },
        ];

        let mphProfile = null;

        // Select profile
        if (super.getProfile() === "profile1") {
            mphProfile = profile.profile1;
        } else if (super.getProfile() === "profile2") {
            mphProfile = profile.profile2;
        }

        // Create readings
        const direction = Device.discreteReading(directionProfile);
        const mph = Device.continuousReading(timeStamp, mphProfile)();

        return this.setTelemetry({
            mph: Number(mph.toFixed(3)),
            direction,
            timestamp: timeStamp,
        });
    }
}

export default WindDevice;
