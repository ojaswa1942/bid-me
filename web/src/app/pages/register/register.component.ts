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
  showAck = "";

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
    const registerRes = await this.authService.register(name, email, password);
    this.loading = false;

    if(registerRes.success) {
      this.showAck = registerRes.data.message;
      window.setTimeout(() => this.routerService.navigate(["/", "login"]), 3000);
    } else {
      this.formError = registerRes.error;
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
