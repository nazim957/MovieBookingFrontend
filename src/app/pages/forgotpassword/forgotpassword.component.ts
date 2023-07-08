import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  email:any
  confirmPassword:any
  forgotData={
    securityQuestion:'',
    securityQuestionAns:'',
    password:''
  }
    constructor(private user:UserService, private router:Router)
    {}
  
    passwordChange() {
      if(this.email=="nazim@gmail.com"){
        Swal.fire('Error', 'Admin not allowed for updating password', 'error');
        return
      }
      this.user.forgotPassword(this.forgotData, this.email).subscribe(
        (response: any) => {
          console.log("Success");
          console.log(response);
          Swal.fire('Success', 'Password Updated Successfully !!', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log("Error");
          console.log(error);
          Swal.fire('Error', 'Error in Updating Password', 'error');
        }
      );
    }
    
    
  

}
