import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatDialogModule,
  MatMenuModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatSnackBarModule,
  MatSelectModule,
  MatChipsModule,
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatDialogModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule,
    HttpClientModule,
  ],
})
export class MaterialModule { }
