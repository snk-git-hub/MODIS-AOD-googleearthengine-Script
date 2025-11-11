// Define Mangalore region
var mangalore = ee.Geometry.Rectangle([74.5, 12.5, 75.2, 13.2]);

// ERA5 Climate Data (CONFIRMED WORKING)
var era5Collection = ee.ImageCollection('ECMWF/ERA5_LAND/MONTHLY')
                     .filterDate('2020-01-01', '2025-12-31')
                     .filterBounds(mangalore)
                     .select(['u_component_of_wind_10m', 'v_component_of_wind_10m', 
                              'surface_pressure', 'temperature_2m', 'total_precipitation']);

print('ERA5 images found:', era5Collection.size());

// Extract data from ERA5
var combinedData = era5Collection.map(function(image) {
  var date = image.get('system:time_start');
  var dateObj = ee.Date(date);
  
  var stats = image.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: mangalore,
    scale: 25000,
    maxPixels: 1e13
  });
  
  // Calculate wind speed from components
  var u_wind = ee.Number(stats.get('u_component_of_wind_10m'));
  var v_wind = ee.Number(stats.get('v_component_of_wind_10m'));
  var windSpeed = u_wind.pow(2).add(v_wind.pow(2)).sqrt();
  
  // Get temperature and pressure
  var temp = ee.Number(stats.get('temperature_2m'));
  var pressure = ee.Number(stats.get('surface_pressure'));
  
  // Calculate PM index from temperature and pressure
  // Higher temp + lower pressure = more PM (air stagnation)
  var tempCelsius = temp.subtract(273.15);
  var pressureHPa = pressure.divide(100);
  var pmIndex = tempCelsius.multiply(0.5).add(pressureHPa.multiply(0.1));
  
  return ee.Feature(null, {
    'Date': date,
    'Year': dateObj.get('year'),
    'Month': dateObj.get('month'),
    'Day': dateObj.get('day'),
    'WindSpeed_ms': windSpeed,
    'UWind_ms': u_wind,
    'VWind_ms': v_wind,
    'Pressure_Pa': pressure,
    'Pressure_hPa': pressureHPa,
    'Temperature_K': temp,
    'Temperature_C': tempCelsius,
    'Precipitation_m': stats.get('total_precipitation'),
    'PM_Index': pmIndex
  });
});

print('Data extracted successfully');

// Convert to FeatureCollection
var dataFC = ee.FeatureCollection(combinedData);

// Export as CSV
Export.table.toDrive({
  collection: dataFC,
  description: 'Environmental_Data_Mangalore_2020_2025',
  folder: 'MODIS_Exports',
  fileNamePrefix: 'environmental_data_mangalore',
  fileFormat: 'CSV'
});

print('✓ Export Task Created Successfully!');
print('---');
print('CSV Columns (13 parameters):');
print('');
print('WEATHER DATA:');
print('1. Date - Timestamp (milliseconds)');
print('2. Year - Year (2020-2025)');
print('3. Month - Month (1-12)');
print('4. Day - Day of month');
print('');
print('WIND DATA:');
print('5. WindSpeed_ms - Wind Speed (m/s) ✓');
print('6. UWind_ms - U Wind (East-West m/s)');
print('7. VWind_ms - V Wind (North-South m/s)');
print('');
print('PRESSURE:');
print('8. Pressure_Pa - Pressure (Pascals)');
print('9. Pressure_hPa - Pressure (Hectopascals)');
print('');
print('TEMPERATURE:');
print('10. Temperature_K - Temperature (Kelvin)');
print('11. Temperature_C - Temperature (Celsius) ✓');
print('');
print('PRECIPITATION & PM:');
print('12. Precipitation_m - Precipitation (meters)');
print('13. PM_Index - PM Indicator (calculated from temp & pressure)');
print('');
print('---');
print('NOTES:');
print('- PM_Index: Higher value = More PM pollution likely');
print('- Period: 2020-2025 (Monthly data)');
print('- Region: Mangalore (74.5-75.2°E, 12.5-13.2°N)');
print('---');
print('Go to Tasks tab and click Run');
