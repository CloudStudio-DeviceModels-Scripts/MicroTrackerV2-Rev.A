function parseUplink(device, payload)
{
    var parsed = payload.asParsedObject();
    env.log(parsed);    

    // Store Location
    var e = device.endpoints.byType(endpointType.locationTracker);
    if (e != null)
        e.updateLocationTrackerStatus(parsed.latitude,parsed.longitude);
    // Store SOS
    var e = device.endpoints.byType(endpointType.iasSensor, iasEndpointSubType.alarmInput);
    if (e != null)
	if(parsed.status.sos)
	        e.updateIASSensorStatus(2);
	else
	        e.updateIASSensorStatus(1);
    // Store Temperature
    var e = device.endpoints.byType(endpointType.temperatureSensor);
    if (e != null)
        e.updateTemperatureSensorStatus(parsed.temperature);
    // Store Battery
    var e = device.endpoints.byType(endpointType.genericSensor);
    if (e != null)
        e.updateGenericSensorStatus(parsed.batteryPersentage);
    // Store GPS Fix
    var e = device.endpoints.byType(endpointType.genericSensor);
    if (e != null)
        e.updateGenericSensorStatus(parsed.position_type);
}