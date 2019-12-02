const express = require('express');
const app = express();
const xml2js = require('xml2js').parseString;
let res1;
var request = require('request');
request('https://www.resourcinggroup.us/jobs-feed/wkxml', function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    xml2js(body, (err, res) => {
        res1 = res;
    });
    function sort(title, jobtype, location, salary, res1) {
        const result = [];
        for(let i = 0; i<=res1.jobs.job.length-1; i++){
            res1.jobs.job[i].level = [];
            if(res1.jobs.job[i].title == title){
                res1.jobs.job[i].level.push(true)
            }

            if(res1.jobs.job[i].jobtype == jobtype){
                res1.jobs.job[i].level.push(true)
            }
            if(res1.jobs.job[i].location == location){
                res1.jobs.job[i].level.push(true)
            }
            if(res1.jobs.job[i].salary == salary){
                res1.jobs.job[i].level.push(true)
            }
        }
            for (let i = 0; i < res1.jobs.job.length; i++) {
                if (res1.jobs.job[i].level.length == 4) {
                    if(result.length<10){
                    result.push(res1.jobs.job[i]);
                    }
                }
            }
            if(result.length<10){
            for (let i = 0; i < res1.jobs.job.length; i++) {

                if (res1.jobs.job[i].level.length == 3) {
                    if(result.length<10) {
                        result.push(res1.jobs.job[i]);
                    }

                }

            }}
            if(result.length<10) {

                for (let i = 0; i < res1.jobs.job.length; i++) {
                    if (res1.jobs.job[i].level.length == 2) {
                        if(result.length<10) {

                            result.push(res1.jobs.job[i]);
                        }

                    }

                }
            }
            if(result.length<10) {
                for (let i = 0; i < res1.jobs.job.length; i++) {
                    if (res1.jobs.job[i].level.length == 1) {
                        if(result.length<10) {
                            result.push(res1.jobs.job[i]);
                        }

                    }

                }
            }
            console.info(result)
            console.info(`Size of result Array: ${result.length}`)

    }

    sort("Health and Safety Facilities Assistant","Permanent","Newark, New Jersey", ">90,000", res1)
});

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.listen(4000, function () {
    console.log('Server on');
});