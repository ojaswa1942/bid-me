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
    const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTYzMDE0MDkzMSwiZXhwIjoxNjMwMTQ0NTMxLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1jdnVnaUBiaWQtbWUtZm4uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJzdWIiOiJmaXJlYmFzZS1hZG1pbnNkay1jdnVnaUBiaWQtbWUtZm4uaWFtLmdzZXJ2aWNlYWNjb3VudC5jb20iLCJ1aWQiOiItTWk3dDNzWnhNS3NyMjNWdWE2TyIsImNsYWltcyI6eyJlbWFpbCI6Im9qYXN3YTE5NDJAZ21haWwuY29tIn19.RSbzGhvmQdl0D4jK4ai6x7fZTBAQkM7S6QqeiZA7gWf8nQXUou4je5w-bZCr9hPCdCQ1-UEIVn7FJ1Ry-Z5rZ1JnkQstgKiooL9bW2DXlKGZtjxuH6-XQLMktHmUL1aFDjxvDqLiLyEVE9tt2EyYATK4zKC4RRjHSumIN3NtoPrax5KfeGkF6fQyVNHF0tXw7bdjHEbA7lIz8cqWAddywvfwVD1BCrHvaiZCNenVbqJ70EEsgiKd3LDXWLm5VeYMA33gifKYNCJHSsFK_XWZSmruLqVyDUeBD6vJI8PkximFrETCUG6RDm2jcdwC3_IH6DK3xSb8_49Sefg3ONRPOA";
    const userCreds = await this.auth.signInWithCustomToken(token);
    const idToken = await userCreds.user?.getIdToken();
    console.log("idToken", idToken);
    // const userCredentials = firebase.auth
  }
}
