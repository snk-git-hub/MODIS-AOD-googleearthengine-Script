
var mangalore = ee.Geometry.Rectangle([74.5, 12.5, 75.2, 13.2]);


var collection = ee.ImageCollection('MODIS/061/MCD19A2_GRANULES')
                     .select('Optical_Depth_047')
                     .filterDate('2024-01-01', '2025-12-31')
                     .filterBounds(mangalore)
                     .map(function(image) {
                       return image.clip(mangalore);
                     });

var years = ee.List.sequence(2020, 2025);
var annualMeans = ee.ImageCollection.fromImages(
  years.map(function(year) {
    return collection
      .filterDate(ee.Date.fromYMD(year, 1, 1), ee.Date.fromYMD(year, 12, 31))
      .mean()
      .set('year', year);
  })
);

var meanImage = annualMeans.mean();

var band_viz = {
  min: 0,
  max: 1100,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(meanImage, band_viz, 'Optical Depth 047 - Mangalore');
Map.setCenter(74.86, 12.87, 8);

var stats = meanImage.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry: mangalore,
  scale: 1000,
  maxPixels: 1e13
});

Export.image.toDrive({
  image: meanImage,
  description: 'MODIS_OpticalDepth_Mangalore_2020_2025',
  folder: 'MODIS_Exports',
  fileNamePrefix: 'optical_depth_mangalore',
  scale: 1000,
  region: mangalore,
  fileFormat: 'GeoTIFF',
  maxPixels: 1e13
});

print('✓ Export task created successfully!');
print('Region: Mangalore');
print('Date range: 2020-2025 (Annual averaging)');
print('Band: Optical_Depth_047');
print('Format: GeoTIFF');
print('Resolution: 1000m');
print('Destination: Google Drive/MODIS_Exports');
print('---');
print('Mean Optical Depth:');
print(stats);
