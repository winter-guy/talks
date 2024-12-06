import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogConsentService {
  matDialog = inject(MatDialog);
  private _dialogRef: MatDialogRef<unknown> | null = null;
  private static _instance: DialogConsentService | null = null;
  private _statusSubject: BehaviorSubject<MatDialogRef<unknown> | null> =
      new BehaviorSubject<MatDialogRef<unknown> | null>(null); // Initialize with an empty string
  public readonly status$: Observable<MatDialogRef<unknown> | null> = this._statusSubject.asObservable();

  constructor() {
    DialogConsentService._instance = this;
  }
  public static getInstance(): DialogConsentService | null {
      return DialogConsentService._instance;
  }

  openDialog<K, T>(data: K, component: ComponentType<T>): Observable<boolean> {
      this._dialogRef = this.matDialog.open(component, {
          data: data,
          disableClose: true,
          panelClass: 'rounded',
      });

      this._statusSubject.next(this._dialogRef);
      return this._dialogRef.afterClosed() as Observable<boolean>;
  }
}
