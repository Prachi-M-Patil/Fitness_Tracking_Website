import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() isSidebarOpen: boolean = false;
  userId: number | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
  }
}
