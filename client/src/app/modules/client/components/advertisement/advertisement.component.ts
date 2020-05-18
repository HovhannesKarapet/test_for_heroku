import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdvertisementService} from "../../../../services/advertisement.service";
import {AdvertisementModel} from "../../../../models/advertisement.model";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit, OnDestroy {

  @Input() size: string;
  advertisements: AdvertisementModel[];
  advertisement: AdvertisementModel;
  count: number = 0;
  timer = null;

  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    console.log(this.size);
    this.getAdvertisement(this.size);
  }

  ngOnDestroy(): void {
    console.log(this.size, 'destroyed');
    clearInterval(this.timer);
    localStorage.setItem('ADS', JSON.stringify(this.advertisements))
  }

  getAdvertisement(size): void {
    this.advertisementService.getAdvertisement(size).subscribe(res => {
      this.advertisements = res;
      this.ADS();
    })
  }

  ADS(): void {
    let i = 0;
    this.advertisements[i].count+=1;
    this.advertisement = this.advertisements[i++];
    this.timer = setInterval(() => {
      if(i >= this.advertisements.length) i = 0;
      this.advertisements[i].count+=1;
      this.advertisement = this.advertisements[i++];
      this.count++;
      // console.log(this.size, this.count);
    }, 60000)
  }
}
