# Visualizer-Framework-UKPostcodeAreas

Description:
This Framework uses Node.Js as backend and EJS for templating. 
It can be used to visualize any kind of data on the UK map, scattered as post code area adresses up to 3 level accuracy.
E.g NW1, E11 ... 


# User Manual: 

You can clone the repository, and run application using command npm start. However you must get your Google MAPS API key in order to load Map (https://console.cloud.google.com/google/maps-apis) and insert it on line 633, mapsdemo.ejs file. 


Start from index.js file and configure connection to your database. 

All the functions have comments that explain what they do, where is it necessary to add your configurations, which one of them can be removed or extended.

mapdemo.ejs includes the Google Maps and function that loads polygons onto it. 
There are infinitely many different ways how you can make use of this library. In order to minimize complexity, only necessary functions are included and every additional procedure is left to be defined by the developers. 

The UK postcode polygons, GeoJson files were imported from the following Github repository: https://github.com/missinglink/uk-postcode-polygons


If you have any suggestions how to improve this FrameWork, or if you found some vulnerabilities,
please feel free to provide feedback. 


# The MIT License:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

This permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

