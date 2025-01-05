import { Component, HostListener, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'app-image-list',
  imports: [CommonModule],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.sass'
})
export class ImageListComponent {
  
  @Input()
  items: any[] = []; // is an array that will store the loaded items (images).
  

  @Input()
  searchQuery:string="";

  constructor() {}
  ngOnInit(): void {
    // this.loadItems();
  }

  

  
  
}
