import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { HlmButtonModule } from '@spartan-ng/ui-button-helm';

@Component({
  selector: 'layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, HlmButtonModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}