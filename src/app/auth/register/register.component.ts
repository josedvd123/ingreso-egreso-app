import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(data: any) {
    console.log(data);

    this.authService.newUser(data.name, data.email, data.password);
  }

}
