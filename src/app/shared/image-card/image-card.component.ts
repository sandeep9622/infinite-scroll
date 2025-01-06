import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-image-card',
  imports: [CommonModule,LoaderComponent],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss'
})
export class ImageCardComponent {
  @Input()
  items:any = [];

  isLandscape: boolean = true;

  constructor() {
    this.checkOrientation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.checkOrientation();
  }

  checkOrientation() {
    this.isLandscape = window.innerWidth > window.innerHeight;
  }

  isInfoVisible: boolean[] = [];
  isLoading:boolean=false;
  ngOnInit(){
    this.isInfoVisible = this.items.map(() => false);
  }

  toggleInfo(index: number): void {
    this.isInfoVisible[index] = !this.isInfoVisible[index];

    if(this.items.length > 0){
      console.log("image info : ",this.items[0]);
    }
  }

  downloadImage(imageUrl: string) {
    this.isLoading = true;
    fetch(imageUrl, {mode: 'cors'}) // Important for cross-origin images
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const filename = this.getFileNameFromUrl(imageUrl) || 'downloaded_image.jpg'; // Extract filename or provide default
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        this.isLoading = false;
      })
      .catch(error => {
        console.error('Error downloading image:', error);
        // Handle error, e.g., display a message to the user
      });
  }

  getFileNameFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const filename = pathname.substring(pathname.lastIndexOf('/') + 1);
      return filename;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  }
}
