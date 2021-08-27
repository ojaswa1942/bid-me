import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  attributes = {
    isLoggedIn: false
  }

  constructor(public auth: AngularFireAuth) { }

  login = async () => {
    // Call to function to get token
    // use token
    // print id token
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYzMDA3Mzc0NSwiZXhwIjoxNjMwMDc3MzQ1LCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1jdnVnaUBiaWQtbWUtZm4uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1jdnVnaUBiaWQtbWUtZm4uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiItTWk1eDFnZUlVd09IOWlfekswOCIsImNsYWltcyI6eyJlbWFpbCI6Im9qYXN3YTE5NDJAZ21haWwuY29tIn19.SjtxXr8gf2qjE7LNlX7rzYKlC1wyXdkwG1bjp7QBJbHIr1i3WPxnHZoKTqx0QMzK3RP-tMHrPU-F6NITQupiVvZqT16QfLXo9hrH3ezsTS-jFueThKfDfFEzw61Dn6xbF3d5viMEAPfJ8bWMXyDiYihxssjdvsj-qihlhlTCKHQ-ctlvJbiP5UnhoawUV2I2aotdASaS2GVpXqByyKVNKFXgpQB1GNp6rhXXztKg4v-4A7wgAbmcOOuzzD2GNfB_wick11mLiQ9XgRomi2_yWg-RqugB4GdMO4MhcPehpAzXmIjTIKzQmlrRtjjdEWEfHZQ9gDqNMNuXu8OHIkKT-w";
    const userCreds = await this.auth.signInWithCustomToken(token);
    const idToken = await userCreds.user?.getIdToken();
    console.log("idToken", idToken);
    // const userCredentials = firebase.auth
  }
}
