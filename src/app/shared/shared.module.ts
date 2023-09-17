import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TokenService } from './services/token.service';



@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [ReactiveFormsModule],
  providers:[TokenService]
})
export class SharedModule {}
