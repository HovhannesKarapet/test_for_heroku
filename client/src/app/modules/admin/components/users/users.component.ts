import { Component, OnInit } from '@angular/core';
import {RolesService} from "../../../../services/roles.service";
import {UsersService} from "../../../../services/users.service";
import {UserModel} from "../../../../models/user.model";
import {RoleModel} from "../../../../models/role.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserModalComponent} from "../../modals/user-modal/user-modal.component";
import {ConfirmModalComponent} from "../../modals/confirm-modal/confirm-modal.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  role_id : string;
  roles   : RoleModel[];
  users   : UserModel[];

  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  getUsers(role_id): void {
    this.usersService.getUsers(role_id).subscribe(data => {
      this.users = data;
      console.log(data);
    })
  }

  addUser(): void {

    const modalRef = this.modalService.open(UserModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag  : false,
      name  : 'Add User',
      roles : this.roles
    };
    modalRef.result.then((res) => {
      if (res.role === this.role_id) {
        this.users.push(res);
      }
    }, () => {})
  }

  updateUser(index: number): void {

    const modalRef = this.modalService.open(UserModalComponent, {windowClass: 'modal-holder', centered: true});
    modalRef.componentInstance._data = {
      flag  : true,
      name  : 'Update User',
      roles : this.roles,
      user  : this.users[index]
    };
    modalRef.result.then((res) => {
      this.users[index] = res;
    }, () => {})
  }

  removeUser(index: number): void {
    this.modalService.open(ConfirmModalComponent, {windowClass: 'modal-holder', centered: true})
      .result.then(() => {
        this.usersService.removeUser(this.users[index]._id).subscribe(() => {
          this.users.splice(index, 1);
        })
    }, () => {})
  }
}
