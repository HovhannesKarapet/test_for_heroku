import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LanguageService} from "../../../../../services/language.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {makeOrder} from "../../best-sellers/best-sellers.component";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() _data;

  popContent;
  form            : FormGroup = new FormGroup({
    instruction : new FormControl(null),
    count       : new FormControl(1, [Validators.required, Validators.min(1)])
  });

  constructor(
    public activeModal: NgbActiveModal,
    public language  : LanguageService,
    private store     : Store
  ) { }

  ngOnInit() {
  }


  dec(): void {
    if (this.form.get('count').value > 1) {
      this.form.get('count').setValue(this.form.get('count').value - 1);
    }
  }

  inc(): void {
    this.form.get('count').setValue(this.form.get('count').value + 1);
  }

  makeOrder(name, price): void {
    makeOrder(this.form, this.store, name, price);
    this.activeModal.close()
  }
}
