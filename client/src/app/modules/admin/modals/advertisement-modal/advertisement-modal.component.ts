import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AdvertisementService} from "../../../../services/advertisement.service";

@Component({
  selector: 'app-advertisement-modal',
  templateUrl: './advertisement-modal.component.html',
  styleUrls: ['./advertisement-modal.component.scss']
})
export class AdvertisementModalComponent implements OnInit {

  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  fileToUpload: File = null;
  onload: boolean = false;
  errors: string[];

  form: FormGroup = new FormGroup({
    importFile: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    size: new FormControl(null, Validators.required)
  });

  constructor(
    public activeModal: NgbActiveModal,
    private adsService: AdvertisementService
  ) {
  }

  ngOnInit() {
  }

  onFileChange(files: FileList): void {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  addADS(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.onload) {
      return;
    }

    this.onload = !this.onload;

    let formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('name', this.form.value.name);
    formData.append('size', this.form.value.size);

    this.adsService.addAdvertisement(formData).subscribe(data => {
      this.activeModal.close(data);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => {
      this.onload = !this.onload;
    })
  }

}
