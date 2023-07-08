import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  public user={
    userName:'',
    password:'',
    email:'',
    securityQuestion:'',
    answer:'',
  }

  constructor(private snack:MatSnackBar, private userService:UserService,private router:Router)
  {}


  formSubmit()
  {
    console.log(this.user);
    if(this.user.userName==''|| this.user.userName==null)
    {
     // alert('user is reqd')
     this.snack.open('UserName is required!! ', '' , {
       duration:3000,
  
     });
      return;
    }
 //validate


    //addUser:userservice
    this.userService.addUser(this.user).subscribe(

      (data:any)=>{
        //success
       // console.log(data);
       console.log("User Registered Successfully")
        //alert('success');
        Swal.fire('User Registered Successfully !!','user Id is '+ data.id, 'success');
        this.router.navigate(['/login']);
      },
      (error)=>{
        //error
        console.log(error)
        //alert('Something went wrong')
        this.snack.open('Username or Email Id alraedy exists Try with different one' ,'',{
          duration:3000
        })
      }
      );
  }


}
