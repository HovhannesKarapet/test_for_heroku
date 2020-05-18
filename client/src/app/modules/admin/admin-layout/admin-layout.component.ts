import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../../models/user.model";
import {UsersService} from "../../../services/users.service";
import {RolesService} from "../../../services/roles.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  users: UserModel[];
  show_sidebar: boolean = false;
  sidebar_items = [
    {
      name: 'users',
      path_name: 'users'
    },
    {
      name: 'categories',
      path_name: 'categories'
    },
    {
      name: 'category items',
      path_name: 'category_items'
    },
    {
      name: 'advertisement',
      path_name: 'advertisement'
    }
  ];

  constructor(
    private authService: AuthService
  ) { }


  @ViewChild('sidebar', {static: true}) insideElement;
  @ViewChild('sidebarCollapse', {static: true}) insideButton;
  @HostListener('document:click', ['$event.target'])

  public onClick(targetElement) {
    const clickedInside = this.insideElement.nativeElement.contains(targetElement);
    const clickedOnButton = this.insideButton.nativeElement.contains(targetElement);
    if (!clickedInside && !clickedOnButton) {
      this.show_sidebar = false;
    }
  }

  logout(): void {
    let user = JSON.parse(localStorage.getItem('user'));
    this.authService.logout(user.login).subscribe()
  }
}
