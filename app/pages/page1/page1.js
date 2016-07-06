import {Page, Tabs} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {
  calcConversionFactor(ethanolRatio) {
    let gasRatio = 1 - ethanolRatio;
    let mixBTUPerGallon = ethanolRatio * this.ethanolBTUPerGallon + gasRatio * this.gasolineBTUPerGallon;

    return mixBTUPerGallon / this.gasolineBTUPerGallon;
  }

  round3(num) {
    return Math.round(num * 1000) / 1000;
  }

  static get parameters() {
    return [[Tabs]];
  }

  constructor(tabs) {
    this.tabs = tabs;
    
    //From http://www.afdc.energy.gov/uploads/publication/afpr_apr_12.pdf
    this.ethanolBTUPerGallon = 75670;
    this.gasolineBTUPerGallon = 115400;
  }

  calculate() {
    let price = this.price;
    this.price = price!=Math.round(price) ? price : price>=1000 ? price/1000 : price>=100 ? price/100 : price;

    this.e85 = this.round3(this.price * this.calcConversionFactor(.85));
    this.e15 = this.round3(this.price * this.calcConversionFactor(.15));
    this.e10 = this.round3(this.price * this.calcConversionFactor(.10));
  }

  selectAboutTab() {
    this.tabs.select(1);
  }
}
