import { Component, OnInit } from '@angular/core';
import {CategoryModalComponent} from "../../modals/category-modal/category-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AdvertisementModalComponent} from "../../modals/advertisement-modal/advertisement-modal.component";
import {AdvertisementModel} from "../../../../models/advertisement.model";
import {AdvertisementService} from "../../../../services/advertisement.service";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-advertisment',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  advertisements: AdvertisementModel[];

  constructor(
    private modalService: NgbModal,
    private advertisementService: AdvertisementService
  ) { }

  ngOnInit() {
    this.getADS();
  }

  addADS(): void {
    const modalRef = this.modalService.open(AdvertisementModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.result.then(res => {
      this.advertisements.push(res);
    }, () => {})
  }

  getADS(): void {
    this.advertisementService.getAllAdvertisements().subscribe(res => {
      this.advertisements = res;
    })
  }

  removeAD(index: number): void {
    this.modalService.open(ConfirmModalComponent, {windowClass: 'modal-holder', centered: true})
      .result.then(() => {
      this.advertisementService.removeAdvertisement(this.advertisements[index]._id).subscribe(() => {
        this.advertisements.splice(index, 1);
      })
    }, () => {})
  }
}
