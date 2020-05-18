import {Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LanguageService} from "../../../services/language.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit, OnDestroy {

  flag: boolean = false;
  time: number = environment.timer_delay;
  timer = null;

  constructor(public language: LanguageService) { }

  @ViewChild('content', {static: true}) content;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement): void {
    const clickedInside = this.content.nativeElement.contains(targetElement);
    if(clickedInside) {
      this.time = environment.timer_delay;
      this.flag = false;
    }
  }

  ngOnInit(): void {
    this.ADSTimer()
  }

  ngOnDestroy(): void {
    console.log('destroy');
    clearInterval(this.timer);
  }

  ADSTimer(): void {
    this.timer = setInterval(() => {
      if(this.time === 0) this.flag = true;
      this.time--;
    }, 1000)
  }

}
