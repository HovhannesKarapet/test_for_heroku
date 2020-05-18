import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoriesService} from "../../../../services/categories.service";

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  @Input() _data;

  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  fileToUpload: File = null;
  onload      : boolean = false;
  errors      : string[];

  form: FormGroup = new FormGroup({
    importFile: new FormControl(null, Validators.required),
    name      : new FormGroup({
      am   : new FormControl(null, Validators.required),
      en   : new FormControl(null, Validators.required),
      ru   : new FormControl(null, Validators.required),
    })
  });

  constructor(
    public activeModal        : NgbActiveModal,
    private categoriesService : CategoriesService
  ) {
  }

  ngOnInit() {
    if(this._data.category) this.setFormData();
  }

  setFormData(): void {
    this.form.get('name').setValue(this._data.category.name);
  }

  onFileChange(files: FileList):void {
    this.labelImport.nativeElement.innerText = Array.from(files)
      .map(f => f.name)
      .join(', ');
    this.fileToUpload = files.item(0);
  }

  add():void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if(this.onload) {
      return;
    }

    this.onload = !this.onload;

    let formData = new FormData();

    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('name', JSON.stringify(this.form.value.name));

    this.categoriesService.createCategory(formData).subscribe(data => {
      this.activeModal.close(data);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => { this.onload = !this.onload; })
  }

  update():void {
    if(this.form.get('name').invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if(this.onload) {
      return;
    }

    this.onload = !this.onload;

    let formData = new FormData();

    if(this.fileToUpload) formData.append('file', this.fileToUpload);
    formData.append('name', JSON.stringify(this.form.value.name));

    this.categoriesService.updateCategory(this._data.category._id, formData).subscribe(data => {
      console.log(data);
      this.activeModal.close(data);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => { this.onload = !this.onload; })
  }
}
