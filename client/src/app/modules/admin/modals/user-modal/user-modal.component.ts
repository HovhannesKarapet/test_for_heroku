import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleModel} from "../../../../models/role.model";
import {UserModel} from "../../../../models/user.model";
import {UsersService} from "../../../../services/users.service";

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

  @Input() _data;
  roles   : RoleModel[];
  users   : UserModel[];
  onload  : boolean = false;
  errors  : string[];

  form: FormGroup = new FormGroup({
    login   : new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    role    : new FormControl(null, Validators.required),
  });

  constructor(
    public activeModal  : NgbActiveModal,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    if(this._data.user) this.setFormData();
  }

  setFormData() {
    this.form.get('login').setValue(this._data.user.login);
    this.form.get('role').setValue(this._data.user.role);
  }

  add(): void {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if(this.onload) {
      return;
    }

    this.onload = !this.onload;

    this.usersService.createUser(this.form.value.role, this.form.value).subscribe(res => {
      this.activeModal.close(res);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
    }, () => { this.onload = !this.onload; })
  }

  update(): void {
    if(this.onload) {
      console.log(111);
      return;
    }
    if(this.form.get('password').errors && !!this.form.get('password').errors.minlength) {
      return;
    }

    this.onload = !this.onload;

    let update = {};

    for(let key in this.form.value) {
      if(this.form.value[key] || this.form.value[key] === 0) update[key] = this.form.value[key];
    }

    this.usersService.updateUser(this._data.user._id, update).subscribe(res => {
      console.log(res);
      this.activeModal.close(res);
    }, error => {
      this.errors = error.error.errors;
      this.onload = !this.onload;
      }, () => { this.onload = !this.onload; })
  }
}
