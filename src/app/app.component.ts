import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageListComponent } from './components/image-list/image-list.component';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { ImageService } from './services/image.service';
import { LoaderComponent } from './shared/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [ImageListComponent,CommonModule,SearchBarComponent,LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'infinite-scroll';
  searchQuery:string="";
  items: any[] = [];

  page = 1;// represents the current page number for pagination.
    perPage = 15; // represents the number of items to load per page.
    isLoading:boolean=false; // is a boolean flag to track whether new items are being loaded.

constructor(private imageService: ImageService){}

@HostListener('window:scroll',['$event'])
onWindowScroll(event:any){
  
  if(window.innerHeight+window.scrollY>=document.body.offsetHeight&&!this.isLoading){
    console.log(event);
    this.loadItems()
  }
}

  handleSearch(query: string): void {
    console.log('Searching for:', query);
    if(query != this.searchQuery){
      this.items = [];
    }
    this.searchQuery = query;
    this.loadItems()
    // Add your search functionality here!
  }

  loadItems() {
    this.isLoading=true;
    this.imageService.getItems(this.page, this.perPage,this.searchQuery).subscribe((items) => {
      this.items.push(...items.photos)
      console.log(items);
      this.page++
      this.isLoading=false
    });
  }
  
}
