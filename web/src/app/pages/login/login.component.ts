import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthAPIs from 'src/app/interfaces/apis/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formError = "";
  loading = false;

  constructor(private authService: AuthService, private routerService: Router) { }

  ngOnInit(): void {
  }

  onSubmit = async (e: Event, email: string, password: string) => {
    e.preventDefault();
    this.formError = "";

    this.loading = true;
    const loginRes = await this.authService.login(email, password);
    this.loading = false;

    if(loginRes.success) {
      this.routerService.navigate(["/", "products"]);
    } else {
      this.formError = loginRes.error;
    }
  }

}
