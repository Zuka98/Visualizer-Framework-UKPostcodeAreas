var express = require('express');
 
var app = express();
var debug = require('debug')('app');
var morgan = require('morgan');
var chalk = require('chalk');
var fs = require('fs');
var str = require('stringify');
var https = require('https');
var path = require('path');
var bodyParser = require('body-parser');
var myRouter = express.Router();


//Specify details to connect to your database 
const mysql = require('mysql');
var config = {
    host: 'example.mysql.database.azure.com',
    user: 'exampleUser@wwwdatabase',
    password: 'password',
    database: 'databaseName',
    port: 0,
    ssl: true
};


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'))
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/fonts', express.static(path.join(__dirname, 'public/fonts')));
app.use(express.static(path.join(__dirname, '/public/')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/', myRouter);

//Functions below are useful if you are visualizing data according to weeks or months. 
function getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getYear(){
    var date = new Date();
    return date.getFullYear();
}

function formatDates(startDate){
    var dd1 = startDate.getDate();
    var mm1 = startDate.getMonth() + 1;
    if(dd1 < 10){
        dd1 = "0" + dd1;
    }
    if (mm1 < 10){
        mm1 = "0" + mm1;
    }
    
    var endDate = new Date(startDate.getFullYear(),startDate.getMonth(),startDate.getDate()+7)
    
    dd2 = endDate.getDate();
    mm2 = endDate.getMonth() + 1;
    if(dd2 < 10){
        dd2 = "0" + dd2;
    }
    if (mm2 < 10){
        mm2 = "0" + mm2;
    }

    var formattedData = dd1 + ":" + mm1 + " - " + dd2 + ":" + mm1;
    return formattedData;
}

function getDateOfISOWeek(w, y) {
    //Add formating so it does DAY-Month
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
        ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
        ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
}

//End of functions dealing with time




function insertToDatabase(param1, param2, param3) {
    const conn = new mysql.createConnection(config);
    var tbname = 'somename';

    //Example query to create new table in your database
    conn.query('CREATE TABLE IF NOT EXISTS ?? (id INT AUTO_INCREMENT PRIMARY KEY , name1 VARCHAR(10), name2 INTEGER, name3 INTEGER , time_stamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP);', [tbname],
    function (err, results, fields) { 
        if (err) throw err; 
        console.log("Created Table");
    })
    
    //Example query to insert data into your database
    conn.query('INSERT INTO ?? (name1, name2, name3) VALUES (?, ?, ?);', [tbname, param1, param2, param3],
        function (err, results, fields) {
            if (err) throw err;
            else {
                console.log('Inserted ' + results.affectedRows + ' row(s).' + "tbname" + tbname);
            }
        })

    conn.end(function (err) {
        if (err) throw err;
        else console.log('Done.')
    });
}


/* *************** POST AND GET REQUESTS *************** */


//Post request example
myRouter.route('/postreqexample')
    .post((req, res) => {
        console.log(req.body);
        var message = req.body;
        insertToDatabase(message.param1, message.param2, message.param2);
        res.end("Finish");
    })

app.get('/', function (req, res) {
    res.render('index', {
        title: 'pageTitle',
        nav: [{ link: '/', title: 'Home' }, { link: '/examplemap', title: 'Example-Map' }]
    });
});


//Display mock up data for demo purposes
myRouter.route('/examplemap').get((req, res) => {
    res.render('map_demo', {
        title: 'pageTitle',
        nav: [{ link: '/', title: 'Home' }, { link: '/examplemap', title: 'Example-Map' }]
    });
})


//Send corresponding GeoJson file when requested
myRouter.route('/Post_Code_Polygons')
    .get((req, res) => {
        var myURL = 'Post_Code_Polygons/' + req.url.split('?')[1] + '.geojson';
        let rawdata = fs.readFileSync(myURL);
        jsondata = JSON.parse(rawdata);
        res.send(jsondata);
        res.end("Finish");
})



/* *************** Run Localhost *************** */
const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log(`listening on ${chalk.green('port 3000')}`);
    console.log("Server running at http://localhost:%d", 3000);
});