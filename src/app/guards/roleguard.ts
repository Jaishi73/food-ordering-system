import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../service/authservice';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Get required roles from route data
    const requiredRoles = route.data['roles'] as string[];
    
    // Get current user's role
    const userRole = this.authService.getUserRole();

    // Check  user has required role
    if (userRole && requiredRoles.includes(userRole)) {
      return true; // Allow access
    } else {
      // Redirect to home or login
      this.router.navigate(['/']);
      return false; // Deny access
    }
  }
}
