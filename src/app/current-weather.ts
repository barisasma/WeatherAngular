import { Forecast } from "./forecast";

export class CurrentWeather {
    constructor(public cityName:string,
                public temp:string,
                public icon:string,
                public weatherKind:string,
                public tempMax:string,
                public tempMin:string,
                public forecasts:Forecast[]){
        this.icon = "https://openweathermap.org/img/w/"+icon+".png"

    }
}
