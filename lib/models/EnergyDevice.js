import Device from "./Device";
import profile from "../profiles/energy";

/**
 * EnergyDevice Class
 *
 * A general IoT device that measures power
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

export default EnergyDevice;
