// src/app/services/pagination.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private pageSize = new BehaviorSubject<number>(10);
  private currentPage = new BehaviorSubject<number>(1);
  private totalItems = new BehaviorSubject<number>(0);
  
  constructor() { }
  
  // Getters
  get pageSize$(): Observable<number> {
    return this.pageSize.asObservable();
  }
  
  get currentPage$(): Observable<number> {
    return this.currentPage.asObservable();
  }
  
  get totalItems$(): Observable<number> {
    return this.totalItems.asObservable();
  }
  
  get totalPages$(): Observable<number> {
    return new Observable<number>(observer => {
      this.pageSize$.subscribe(pageSize => {
        this.totalItems$.subscribe(totalItems => {
          const totalPages = Math.ceil(totalItems / pageSize);
          observer.next(totalPages);
        });
      });
    });
  }
  
  // Setters
  setPageSize(size: number): void {
    this.pageSize.next(size);
  }
  
  setCurrentPage(page: number): void {
    this.currentPage.next(page);
  }
  
  setTotalItems(total: number): void {
    this.totalItems.next(total);
  }
  
  // Navigation methods
  nextPage(): void {
    const currentPage = this.currentPage.getValue();
    const totalPages = Math.ceil(this.totalItems.getValue() / this.pageSize.getValue());
    
    if (currentPage < totalPages) {
      this.currentPage.next(currentPage + 1);
    }
  }
  
  prevPage(): void {
    const currentPage = this.currentPage.getValue();
    
    if (currentPage > 1) {
      this.currentPage.next(currentPage - 1);
    }
  }
  
  goToPage(page: number): void {
    const totalPages = Math.ceil(this.totalItems.getValue() / this.pageSize.getValue());
    
    if (page >= 1 && page <= totalPages) {
      this.currentPage.next(page);
    }
  }
}