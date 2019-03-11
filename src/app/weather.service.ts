import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { HttpClient } from '@angular/common/http';
import { Forecast } from './forecast';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  current:CurrentWeather;
  location:Coordinates;

  constructor(private http:HttpClient) {  
  }

  localWeather(){
    return new Promise((res,rej)=>{
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.location = pos.coords;
        const lat = this.location.latitude.toString();
        const lon = this.location.longitude.toString();
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e771dbacab7b557fdc3d5d21fe652640&units=metric`)
        .toPromise().then(
          (data) => {
            let forecasts : Forecast[] = [];
            this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=e771dbacab7b557fdc3d5d21fe652640&units=metric`)
            .subscribe(
              data=>{
                console.log(data);
                for (let index = 7; index < data["list"].length-8; index+=8) {
                  const temporary = new Forecast(
                    data["list"][index].dt_txt,
                    data["list"][index].main.temp,
                    data["list"][index].weather[0].icon,
                    data["list"][index].weather[0].main,
                    data["list"][index].main.temp_max,
                    data["list"][index].main.temp_min);
                  forecasts.push(temporary);
                }
              }
            );
            this.current = new CurrentWeather(data["name"],
              data["main"].temp,
              data["weather"][0].icon,
              data["weather"][0].main,
              data["main"].temp_max,
              data["main"].temp_min,
              forecasts);
              console.log(this.current);
              res(this.current);
          });
          
      })
    })
  }

  anotherCityWeather(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e771dbacab7b557fdc3d5d21fe652640&units=metric`);
  }

  fiveDayForeCast(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e771dbacab7b557fdc3d5d21fe652640&units=metric`);
  }

}
