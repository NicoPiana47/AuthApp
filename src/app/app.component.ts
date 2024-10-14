import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  private authService = inject(AuthService);
  private router = inject(Router)

  public finishedAuthCheck = computed<boolean>( () => {

    if(this.authService.authStatus() === 'checking') return false;

    return true;

  });

  public authStatusChangedEffect = effect( () => {

    switch(this.authService.authStatus()){
      case 'authenticated':
        this.router.navigateByUrl(localStorage.getItem('url') || '/dashboard');
        return;
      case 'notAuthenticated':
        this.router.navigateByUrl('/auth/login');
        return;
    }

  });

}
