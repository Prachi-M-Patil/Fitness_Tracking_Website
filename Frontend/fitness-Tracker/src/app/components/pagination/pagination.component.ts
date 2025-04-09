// src/app/components/pagination/pagination.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Output() pageChanged = new EventEmitter<number>();
  
  currentPage = 1;
  totalPages = 1;
  pages: number[] = [];

  constructor(private paginationService: PaginationService) { }

  ngOnInit(): void {
    this.paginationService.setPageSize(this.pageSize);
    this.paginationService.setTotalItems(this.totalItems);
    
    this.paginationService.currentPage$.subscribe(page => {
      this.currentPage = page;
      this.pageChanged.emit(page);
    });
    
    this.paginationService.totalPages$.subscribe(total => {
      this.totalPages = total;
      this.generatePageNumbers();
    });
  }

  ngOnChanges(): void {
    this.paginationService.setTotalItems(this.totalItems);
    this.paginationService.setPageSize(this.pageSize);
  }

  generatePageNumbers(): void {
    this.pages = [];
    const maxPages = 5; // Show at most 5 page numbers
    
    if (this.totalPages <= maxPages) {
      // Show all pages if total pages is less than maxPages
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      // Show a subset of pages with current page in the middle when possible
      let startPage = Math.max(1, this.currentPage - Math.floor(maxPages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxPages - 1);
      
      // Adjust start page if end page is at max
      if (endPage === this.totalPages) {
        startPage = Math.max(1, endPage - maxPages + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }
    }
  }

  goToPage(page: number): void {
    this.paginationService.goToPage(page);
  }

  nextPage(): void {
    this.paginationService.nextPage();
  }

  prevPage(): void {
    this.paginationService.prevPage();
  }
}