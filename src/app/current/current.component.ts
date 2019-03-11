import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Forecast } from '../forecast';

@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {

  myWeather: CurrentWeather;
  filteredPlaces: Observable<string[]>;
  myControl = new FormControl();
  myWeathers: CurrentWeather[] = [];

  constructor(private ws: WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: { myWeather: CurrentWeather }) => {
        this.myWeathers.push(data.myWeather);
      }
    );

    this.filteredPlaces = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.places.filter(place => place.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (!this.checkCityExist(this.myControl.value)) {
      let forecasts: Forecast[] = [];
      this.ws.fiveDayForeCast(this.myControl.value).subscribe(
        data => {
          for (let index = 7; index < data["list"].length-8; index += 8) {
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
      return this.ws.anotherCityWeather(this.myControl.value).subscribe(
        data => {
          const newWeather = new CurrentWeather(data["name"],
            data["main"].temp,
            data["weather"][0].icon,
            data["weather"][0].main,
            data["main"].temp_max,
            data["main"].temp_min,
            forecasts);
          this.myWeathers.push(newWeather);
        }
      );
    }
  }

  checkCityExist(newWeatherName: string) {
    let found = false;
    this.myWeathers.forEach(weather => {
      if (weather.cityName.toLocaleLowerCase().trim() == newWeatherName.toLocaleLowerCase().trim()) {
        found = true;
      }
    });
    return found;
  }

  places: string[] = ['Adana',
    'Adiyaman',
    'Afyonkarahisar',
    'Agri',
    'Amasya',
    'Ankara',
    'Antalya',
    'Artvin',
    'Aydın',
    'Balikesir',
    'Bilecik',
    'Bingöl',
    'Bitlis',
    'Bolu',
    'Burdur',
    'Bursa',
    'Çanakkale',
    'Çankırı',
    'Çorum',
    'Denizli',
    'Diyarbakır',
    'Edirne',
    'Elazığ',
    'Erzincan',
    'Erzurum',
    'Eskişehir',
    'Gaziantep',
    'Giresun',
    'Gümüşhane',
    'Hakkari',
    'Hatay',
    'Isparta',
    'Mersin',
    'Istanbul',
    'Izmir',
    'Kars',
    'Kastamonu',
    'Kayseri',
    'Kırklareli',
    'Kırşehir',
    'Kocaeli',
    'Konya',
    'Kütahya',
    'Malatya',
    'Manisa',
    'Maras',
    'Mardin',
    'Muğla',
    'Muş',
    'Nevşehir',
    'Niğde',
    'Ordu',
    'Rize',
    'Sakarya',
    'Samsun',
    'Siirt',
    'Sinop',
    'Sivas',
    'Tekirdağ',
    'Tokat',
    'Trabzon',
    'Tunceli',
    'Şanlıurfa',
    'Uşak',
    'Van',
    'Yozgat',
    'Zonguldak',
    'Aksaray',
    'Bayburt',
    'Karaman',
    'Kırıkkale',
    'Batman',
    'Şırnak',
    'Bartın',
    'Ardahan',
    'Iğdır',
    'Yalova',
    'Karabük',
    'Kilis',
    'Osmaniye',
    'Düzce'];
}







