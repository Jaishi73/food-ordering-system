import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, LoginRequest, SignupRequest, AuthResponse } from '../models/usermodel';

// auth services 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject - allows components to subscribe to user changes
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  // Mock users for testing (like demo accounts)
  private mockUsers: User[] = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@foodapp.com',
      password: 'admin123',
      role: 'admin',
      token: 'admin-token-123',
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'John User',
      email: 'user@foodapp.com',
      password: 'user123',
      role: 'user',
      token: 'user-token-456',
      createdAt: new Date()
    },
    {
      id: '3',
      name: 'Chef Gordon',
      email: 'chef@foodapp.com',
      password: 'chef123',
      role: 'chef',
      token: 'chef-token-789',
      createdAt: new Date()
    }
  ];

  constructor() {
    // Try to get user from localStorage (if they already logged in)
    const savedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject(
      savedUser ? JSON.parse(savedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

// login methods
  login(request: LoginRequest): Observable<AuthResponse> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        // Find user with matching email and password
        const user = this.mockUsers.find(
          u => u.email === request.email && 
               u.password === request.password &&
               u.role === request.role
        );

        if (user) {
          // Login successful!
          const userWithoutPassword: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: user.token,
            createdAt: user.createdAt
          };
          
          // Save to localStorage
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          localStorage.setItem('authToken', user.token);
          
          // Update BehaviorSubject
          this.currentUserSubject.next(userWithoutPassword);
          
          // Return success response
          observer.next({
            success: true,
            message: 'Login successful!',
            user: userWithoutPassword,
            token: user.token
          });
        } else {
          // Login failed
          observer.next({
            success: false,
            message: 'Invalid email, password, or role',
        
          
          });
        }
        observer.complete();
      }, 800);
    });
  }

  // signup method
  signup(request: SignupRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      setTimeout(() => {
        // Check if email already exists
        const emailExists = this.mockUsers.some(u => u.email === request.email);
        
        if (emailExists) {
          observer.next({
            success: false,
            message: 'Email already exists!'
          });
          observer.complete();
          return;
        }

        // Check if passwords match
        if (request.password !== request.confirmPassword) {
          observer.next({
            success: false,
            message: 'Passwords do not match!'
          });
          observer.complete();
          return;
        }

        // Create new user
        const newUser: User = {
          id: String(this.mockUsers.length + 1),
          name: request.name,
          email: request.email,
          password: request.password,
          role: request.role,
          token: `${request.role}-token-${Date.now()}`,
          createdAt: new Date()
        };

        // Add to mock users
        this.mockUsers.push(newUser);

        // Return success
        observer.next({
          success: true,
          message: 'Account created successfully! Please login.'
        });
        observer.complete();
      }, 800);
    });
  }

  /* LOGOUT METHOD*/
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
  }

// get current use
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /*
   IS LOGGED IN
    Returns true if user is logged in
   */
  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

 
  getUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
  }

  
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  
}
