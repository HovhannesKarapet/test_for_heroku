import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CategoriesService} from "../../../../services/categories.service";
import {CategoryItemsService} from "../../../../services/category-items.service";

@Component({
  selector: 'app-category-item-modal',
  templateUrl: './category-item-modal.component.html',
  styleUrls: ['./category-item-modal.component.scss']
})
export class CategoryItemModalComponent implements OnInit {

  @Input() _data;

  @ViewChild('labelImport', {static: false})
  labelImport: ElementRef;

  fileToUpload: File = null;
  onload      : boolean = false;
  errors      : string[];

  form: FormGroup = new FormGroup({
    category_id : new FormControl(null, Validators.required),
    importFile  : new FormControl(null, Validators.required),
    name        : new FormGroup({
      am   : new FormControl(null, Validators.required),
      en   : new FormControl(null, Validators.required),
      ru   : new FormControl(null, Validators.required),
    }),
    price       : new FormControl(null, [Validators.required, Validators.min(0)]),
    description : new FormGroup({
      am   : new FormControl(null, Validators.required),
      en   : new FormControl(null, Validators.required),
      ru   : new FormControl(null, Validators.required),
    }),
    best_seller : new FormControl(false)
  });

  constructor(
    public activeModal            : NgbActiveModal,
    private categoryItemsService  : CategoryItemsService
  ) { }

  ngOnInit() {
    if(this._data.category_item) this.setFormData();
  }

  setFormData(): void {
    this.form.get('category_id').setValue(this._data.category_item.category_id);
    this.form.get('name').setValue(this._data.category_item.name);
    this.form.get('price').setValue(this._data.category_item.price);
    this.form.get('description').setValue(this._data.category_item.description);
    this.form.get('best_seller').setValue(this._data.category_item.best_seller);
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
    formData.append('price', this.form.value.price);
    formData.append('category_id', this.form.value.category_id);
    formData.append('description', JSON.stringify(this.form.value.description));
    formData.append('best_seller', this.form.value.best_seller);

    this.categoryItemsService.createCategoryItem( this.form.value.category_id, formData).subscribe(data => {
      this.activeModal.close(data);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => { this.onload = !this.onload; })
  }

  update():void {
    if(this.form.get('category_id').invalid ||
      this.form.get('name').invalid ||
      this.form.get('price').invalid ||
      this.form.get('description').invalid
    ) {
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
    formData.append('price', this.form.value.price);
    formData.append('description', JSON.stringify(this.form.value.description));
    formData.append('best_seller', this.form.value.best_seller);

    this.categoryItemsService.updateCategoryItem(this._data.category_item._id, formData).subscribe(data => {
      this.activeModal.close(data);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => { this.onload = !this.onload; })
  }
}
