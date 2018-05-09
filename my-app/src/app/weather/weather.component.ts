import { Component, OnInit } from '@angular/core';
import { Weather } from '../weather';
import { Http, Response } from '@angular/http';


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
    location: 'London',
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

  constructor(private http: Http) { 
    console.log('Doing Construction');
    this.getContacts();
  }

  // get woeid of new location
  getLocation() {
    var locationUrlNow = this.locationUrl + this.weather.location;
    return this.http.get(locationUrlNow)
      .subscribe(data => {
      console.log(data);
      this.data = data;
      var jdata = JSON.parse(data._body);  // dont believe the error, _body does exist!
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
      var jdata = JSON.parse(data._body);  // dont believe the error, _body does exist!
      console.log(jdata.sun_set);
      var forecast = jdata.consolidated_weather;
      this.weather.temperature = forecast[0].the_temp;
      var time = +(new Date(jdata.sun_set).getTime()) - Date.now();
      console.log(time);
    })
  }

  getContacts() {
    this.getLocation();
    this.getWeather()
  }

  onUpdate(event: Event) {
  	this.getContacts()
  }

  ngOnInit() {
  }
}
