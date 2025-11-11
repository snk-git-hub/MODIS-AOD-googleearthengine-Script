MCD19A2.061: Terra & Aqua MAIAC Land Aerosol Optical Depth Daily 1km

Dataset Availability
2000-02-24T00:00:00Z–2025-11-06T23:55:00Z
Dataset Provider
NASA LP DAAC at the USGS EROS Center
Earth Engine Snippet
ee.ImageCollection("MODIS/061/MCD19A2_GRANULES") open_in_new

The MCD19A2 V6.1 data product is a MODIS Terra and Aqua combined Multi-angle Implementation of Atmospheric Correction (MAIAC) Land Aerosol Optical Depth (AOD) gridded Level 2 product produced daily at 1 km resolution. For more information see the MAIAC user guide.

NOTE: This product has been released with the caveat that the reprocessing for the full mission is expected to continue through summer 2023.


var collection = ee.ImageCollection('MODIS/061/MCD19A2_GRANULES')
                     .select('Optical_Depth_047')
                     .filterDate('2023-01-01', '2023-01-15');

var band_viz = {
  min: 0,
  max: 1100,
  palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
};

Map.addLayer(collection.mean(), band_viz, 'Optical Depth 047');
Map.setCenter(76, 13, 6);

<img width="1920" height="1043" alt="image" src="https://github.com/user-attachments/assets/8d765a86-bf6b-4807-98a5-bb80b608271f" />
