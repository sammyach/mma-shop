import { Platform } from '@angular/cdk/platform';
import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop';

  constructor(public auth: AuthService, public platform: Platform){
    console.log('browser', window.navigator.userAgent);
    console.log('Firefox??: ', platform.FIREFOX);
    console.log('Edge??: ', platform.EDGE);
    console.log('Chrome | New Edge??: ', platform.BLINK);
    console.log('Opera??: ', platform.WEBKIT);
    console.log('IE??: ', platform.TRIDENT);
    console.log('Safari??: ', platform.SAFARI);

  }
}
