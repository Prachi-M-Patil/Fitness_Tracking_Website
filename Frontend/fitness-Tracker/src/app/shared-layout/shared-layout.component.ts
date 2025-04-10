import { Component } from '@angular/core';

@Component({
  selector: 'app-shared-layout',
  standalone: false,
  templateUrl: './shared-layout.component.html',
  styleUrl: './shared-layout.component.css'
})
export class SharedLayoutComponent {
  isSidebarOpen: boolean = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

}
