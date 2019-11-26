# Visualizer-Framework-UKPostcodeAreas

Description:
This Framework uses Node.Js backend and EJS frontend. 
It can be used to visualize any kind of data on the UK map, scattered as post code area adresses up to 3 level accuracy.
E.g NW1, E11 ... 


# User Manual: 

You can clone the repository, and run application using command npm start. However you must get your Google MAPS API key in order to load Map (https://console.cloud.google.com/google/maps-apis) and insert it on line 633, mapsdemo.ejs file. 


Start from index.js file and configure connection to your database. 

All the functions have comments that explain what they do, where is it necessary to add your configurations, which one of them can be removed or extended.

mapdemo.ejs includes the Google Maps and function that loads polygons onto it. 
There are infinitely many different ways how you can make use of this library. In order to minimize complexity, only necessary functions are included and every additional procedure is left to be defined by the developers. 

The UK postcode polygons, GeoJson files were imported from the following Github repository: https://github.com/missinglink/uk-postcode-polygons

