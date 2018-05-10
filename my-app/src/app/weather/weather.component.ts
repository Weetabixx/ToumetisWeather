import { Component, OnInit } from '@angular/core';
import { Weather } from '../weather';
import { Http, Response } from '@angular/http';
import { Chart } from 'angular-highcharts';
import { MapChart } from 'angular-highcharts';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  

  private locationUrl = 'http://interview.toumetisanalytics.com/location/';
  private weatherUrl = 'http://interview.toumetisanalytics.com/weather/';
  woeid = '44418';
  data: any = {};

  // set initial values to display
  weather: Weather = {
    location: '-',
    temperature: 0,
    weather: '-',
	sundownhours: 0,

	day0: '-',
	day0max: 0,
	day0avg: 0,
	day0min: 0,

	day1: '-',
	day1max: 0,
	day1avg: 0,
	day1min: 0,

	day2: '-',
	day2max: 0,
	day2avg: 0,
	day2min: 0,

	day3: '-',
	day3max: 0,
	day3avg: 0,
	day3min: 0,

	day4: '-',
	day4max: 0,
	day4avg: 0,
	day4min: 0,

	day5: '-',
	day5max: 0,
	day5avg: 0,
	day5min: 0,

	latt_long: '-',
  }

  chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Six Day Forecast'
      },
      xAxis: {
        categories: [this.weather.day0, this.weather.day1, this.weather.day2, this.weather.day3, this.weather.day4, this.weather.day5]
      },
      yAxis: {
        title: {
            text: 'Temperature'
        },
        description: 'Temperature'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Max temp',
        data: [this.weather.day0max, this.weather.day1max, this.weather.day2max, this.weather.day3max, this.weather.day4max, this.weather.day5max]
      }, {
        name: 'Avg temp',
        data: [this.weather.day0avg, this.weather.day1avg, this.weather.day2avg, this.weather.day3avg, this.weather.day4avg, this.weather.day5avg]
      }, {
        name: 'Min temp',
        data: [this.weather.day0min, this.weather.day1min, this.weather.day2min, this.weather.day3min, this.weather.day4min, this.weather.day5min]
      },
      ]
    });

  mapChart = new MapChart({
	  chart: {
	    map: 'countries/gb/gb-all'
	  },

	  title: {
	    text: 'Highmaps basic lat/lon demo'
	  },

	  mapNavigation: {
	    enabled: true
	  },

	  tooltip: {
	    headerFormat: '',
	    pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: {point.lon}'
	  },

	  series: [{
	    // Use the gb-all map with no data as a basemap
	    name: 'Basemap',
	    borderColor: '#A0A0A0',
	    nullColor: 'rgba(200, 200, 200, 0.3)',
	    showInLegend: false
	  }, {
	    name: 'Separators',
	    type: 'mapline',
	    nullColor: '#707070',
	    showInLegend: false,
	    enableMouseTracking: false
	  }, {
	    // Specify points using lat/lon
	    type: 'mappoint',
	    name: 'Cities',
	    color: '#FFFFFF',
	    data: [{
	      name: 'London',
	      lat: 51.507222,
	      lon: -0.1275
	    }, {
	      name: 'Birmingham',
	      lat: 52.483056,
	      lon: -1.893611
	    }, {
	      name: 'Leeds',
	      lat: 53.799722,
	      lon: -1.549167
	    }, {
	      name: 'Glasgow',
	      lat: 55.858,
	      lon: -4.259
	    }, {
	      name: 'Sheffield',
	      lat: 53.383611,
	      lon: -1.466944
	    }, {
	      name: 'Liverpool',
	      lat: 53.4,
	      lon: -3
	    }, {
	      name: 'Bristol',
	      lat: 51.45,
	      lon: -2.583333
	    }, {
	      name: 'Belfast',
	      lat: 54.597,
	      lon: -5.93
	    }, {
	      name: 'Lerwick',
	      lat: 60.155,
	      lon: -1.145,
	      dataLabels: {
	        align: 'left',
	        x: 5,
	        verticalAlign: 'middle'
	      }
	    }]
	  }]
	});

  constructor(private http: Http) { 
    console.log('Doing Construction');
    //this.getContacts();

  }

  updateChart() {
  	this.chart = new Chart({
      chart: {
        type: 'column'
      },
      title: {
        text: 'Six Day Forecast'
      },
      xAxis: {
        categories: [this.weather.day0, this.weather.day1, this.weather.day2, this.weather.day3, this.weather.day4, this.weather.day5]
      },
      yAxis: {
        title: {
            text: 'Temperature'
        },
        description: 'Temperature'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Max temp',
        data: [this.weather.day0max, this.weather.day1max, this.weather.day2max, this.weather.day3max, this.weather.day4max, this.weather.day5max]
      }, {
        name: 'Avg temp',
        data: [this.weather.day0avg, this.weather.day1avg, this.weather.day2avg, this.weather.day3avg, this.weather.day4avg, this.weather.day5avg]
      }, {
        name: 'Min temp',
        data: [this.weather.day0min, this.weather.day1min, this.weather.day2min, this.weather.day3min, this.weather.day4min, this.weather.day5min]
      },
      ]
    });
  }

  // get woeid of new location
  getLocation() {
    var locationUrlNow = this.locationUrl + this.weather.location;
    return this.http.get(locationUrlNow)
      .subscribe(data => {
      console.log(data);
      this.data = data;
      var jdata = JSON.parse((<any>data)._body);  // dont believe the error, _body does exist!
      this.woeid = jdata[0].woeid
      console.log(this.woeid)
    })
  }

  // get weather details of woeid
  getWeather() {
  	var weatherUrlNow = this.weatherUrl + this.woeid;
    return this.http.get(weatherUrlNow)
      .subscribe(data => {
      console.log(data);
      this.data = data
      var jdata = JSON.parse((<any>data)._body);  // dont believe the error, _body does exist!

      // set all of the weather variables
      var forecast = jdata.consolidated_weather;
      this.weather.temperature = forecast[0].the_temp;
      var time = +(new Date(jdata.sun_set).getTime()) - Date.now();  // calculate miliseconds untill sunset
      this.weather.sundownhours = Math.floor(time / (1000 * 60 * 60) % 60);  // convert miliseconds to hours
      this.weather.weather = forecast[0].weather_state_name;

      this.weather.day0 = forecast[0].applicable_date;
      this.weather.day0max = forecast[0].max_temp;
      this.weather.day0min = forecast[0].min_temp;
      this.weather.day0avg = forecast[0].the_temp;

      this.weather.day1 = forecast[1].applicable_date;
      this.weather.day1max = forecast[1].max_temp;
      this.weather.day1min = forecast[1].min_temp;
      this.weather.day1avg = forecast[1].the_temp;

      this.weather.day2 = forecast[2].applicable_date;
      this.weather.day2max = forecast[2].max_temp;
      this.weather.day2min = forecast[2].min_temp;
      this.weather.day2avg = forecast[2].the_temp;

      this.weather.day3 = forecast[3].applicable_date;
      this.weather.day3max = forecast[3].max_temp;
      this.weather.day3min = forecast[3].min_temp;
      this.weather.day3avg = forecast[3].the_temp;

      this.weather.day4 = forecast[4].applicable_date;
      this.weather.day4max = forecast[4].max_temp;
      this.weather.day4min = forecast[4].min_temp;
      this.weather.day4avg = forecast[4].the_temp;

      this.weather.day5 = forecast[5].applicable_date;
      this.weather.day5max = forecast[5].max_temp;
      this.weather.day5min = forecast[5].min_temp;
      this.weather.day5avg = forecast[5].the_temp;
      console.log(this.weather);
      this.updateChart();
    })
  }

  getContacts() {
  try{
      this.getLocation();
      this.getWeather();
    }
    finally{

    }
  }

  focusOutFunction() {
  	this.getContacts();
  }

  ngOnInit() {
  }
}
