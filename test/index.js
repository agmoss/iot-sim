'use strict'

import {
    assert,
    expect
} from 'chai'
import {
    describe,
    it
} from 'mocha'

import {
    TankDevice,
    WindDevice,
    EnergyDevice,
} from "../index";

describe('TankDevice', function () {
    const tank_iot_01 = new TankDevice({
        dsn: "tank_iot_01",
        type: "tank",
        profile: null,
        log: false,
        handler: console.log
    });
    tank_iot_01.createDeviceTelemetry()
    tank_iot_01.createReading()
    const reading = tank_iot_01.getReading();
    it('should have data', function () {
        assert.notEqual(reading.data, null)
    })
    it('should have valid liters ', function () {
        assert.isNumber(reading.data.liters)
    })
    it('should have a valid pH ', function () {
        assert.isNumber(reading.data.pH)
    })
    it('timestamp is valid', function () {
        assert.isNumber(reading.timestamp)
    })
    it('should be tank type', function () {
        expect(reading.type).to.equal('tank')
    })
})

describe('WindDevice', function () {
    const wind_iot_01 = new WindDevice({
        dsn: "wind_iot_01",
        type: "wind",
        profile: "profile1",
        log: false,
        handler: console.log
    });
    wind_iot_01.createDeviceTelemetry()
    wind_iot_01.createReading()
    const reading = wind_iot_01.getReading();
    it('should have data', function () {
        assert.notEqual(reading.data, null)
    })
    it('should have valid mph', function () {
        assert.isNumber(reading.data.mph)
    })
    it('should have a valid direction', function () {
        expect(["N", "S", "E", "W"]).to.include(reading.data.direction)
    })
    it('timestamp is valid', function () {
        assert.isNumber(reading.timestamp)
    })
    it('should be wind type', function () {
        expect(reading.type).to.equal('wind')
    })
})

describe('EnergyDevice', function () {
    const energy_iot_01 = new EnergyDevice({
        dsn: "energy_iot_01",
        type: "energy",
        profile: "profile1",
        log: false,
        handler: console.log
    });
    energy_iot_01.createDeviceTelemetry()
    energy_iot_01.createReading()
    const reading = energy_iot_01.getReading();
    it('should have data', function () {
        assert.notEqual(reading.data, null)
    })
    it('should have valid watts', function () {
        assert.isNumber(reading.data.watts)
    })
    it('timestamp is valid', function () {
        assert.isNumber(reading.timestamp)
    })
    it('should be energy type', function () {
        expect(reading.type).to.equal('energy')
    })
})