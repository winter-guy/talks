import { Component } from '@angular/core';
import { LayoutComponent } from "./components/layout/layout.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'root',
  standalone: true,
  imports: [
    LayoutComponent,
    RouterOutlet
],
  template: `<layout class="dark:bg-black"><router-outlet></router-outlet></layout>`,
  styles: [],
})
export class AppComponent {
  title = 'talks';
}
