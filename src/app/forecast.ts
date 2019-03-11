export class Forecast {

    constructor(public day:string,
        public temp:string,
        public icon:string,
        public weatherKind:string,
        public max:string,
        public min:string){
            this.icon = "https://openweathermap.org/img/w/"+icon+".png"
        };
}
