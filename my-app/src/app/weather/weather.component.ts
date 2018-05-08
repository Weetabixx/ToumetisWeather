import { Component, OnInit } from '@angular/core';
import { Weather } from '../weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: Weather = {
    location: 'London',
    temperature: 20.5
  }

  constructor() { 
  }

  ngOnInit() {
  }
}
