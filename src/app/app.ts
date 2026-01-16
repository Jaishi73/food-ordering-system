import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Signup } from './components/auth/signup/signup';
import { Landing } from './components/auth/landing/landing';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
