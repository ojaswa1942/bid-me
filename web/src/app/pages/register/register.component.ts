import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'bm-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formError = "";
  passError = false;
  loading = false;

  constructor(private authService: AuthService, private routerService: Router) { }

    ngOnInit(): void {
    if(this.authService.attributes.isLoggedIn) {
      this.routerService.navigate(["/", "products"]);
    }
  }

  onSubmit = async (e: Event, name: string, email: string, password: string) => {
    e.preventDefault();
    if(this.passError) {
      // console.log("yes pass error")
      // this.formError = "Confirm password does not match";
      return;
    }

    this.formError = "";
    this.loading = true;
    const loginRes = { success: true, error: "" };
    // const loginRes = await this.authService.login(email, password);
    this.loading = false;

    if(loginRes.success) {
      this.routerService.navigate(["/", "products"]);
    } else {
      this.formError = loginRes.error;
    }
  }

  handlePasswordChange = (password: string, cPassword: string) => {
    if(password != cPassword) {
      this.formError = "Confirm password does not match";
      this.passError = true;
    } else {
      this.passError = false;
      this.formError = "";
    }
  }


}
