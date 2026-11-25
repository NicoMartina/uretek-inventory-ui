import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ItemService, Item } from '../../core/item';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatChipsModule],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items implements OnInit {
  items: Item[] = [];
  displayedColumns = ['name', 'category', 'unit', 'currentStock', 'minimumStock'];

  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe({
      next: (response) => {
        console.log('response received:', response);
        this.items = response.content;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load items', err);
      },
    });
  }

  isLowStock(item: Item): boolean {
    return item.currentStock < item.minimumStock;
  }
}
