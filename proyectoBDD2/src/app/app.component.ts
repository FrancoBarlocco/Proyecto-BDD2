import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component'; // Asegúrate de ajustar la ruta según tu estructura de archivos
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule,CommonModule,HttpClientModule],
  standalone:true
})
export class AppComponent { }
