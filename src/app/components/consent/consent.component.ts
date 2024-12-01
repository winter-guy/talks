import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConsentDialogData } from 'src/app/interfaces/consent';

@Component({
  selector: 'app-consent',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './consent.component.html',
  styleUrls: ['./consent.component.scss'],
})
export class ConsentComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ConsentDialogData) {}
}
