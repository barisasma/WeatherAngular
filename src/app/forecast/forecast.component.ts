import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Forecast } from '../forecast';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  foreCastForm : FormGroup;
  cityForeCast : Forecast[]=[];
  
  constructor(private ws: WeatherService) { }

  ngOnInit() {
    this.foreCastForm = new FormGroup({
      foreCastCity: new FormControl('')
    })
  }

  onSubmit(){
    this.cityForeCast.splice(0,this.cityForeCast.length);
    console.log(this.foreCastForm);
    this.ws.fiveDayForeCast(this.foreCastForm.value.foreCastCity).subscribe(
        data=>{
          console.log(data);      
          for (let index = 0; index < data["list"].length-8; index+=8) {
            const temporary = new Forecast(
              data["list"][index].dt_txt,
              data["list"][index].main.temp,
              data["list"][index].weather[0].icon,
              data["list"][index].weather[0].main,
              data["list"][index].main.temp_max,
              data["list"][index].main.temp_min);
            this.cityForeCast.push(temporary);
          }    
        }
    );
    console.log(this.cityForeCast);
  }

}
