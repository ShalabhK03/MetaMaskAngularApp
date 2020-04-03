import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentServiceService } from '../payment-service.service';
import { FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  createAccountForm: FormGroup;
  result = "";
  constructor(private fb: FormBuilder, public paymentService: PaymentServiceService, private snackBar: MatSnackBar) { 
    this.createAccountForm = fb.group({
      'name' : [null, Validators.required],
      'mobileNumber' : [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  createWallet(form: NgForm){
    this.paymentService.createWallet(form["name"].toString(), form["mobileNumber"]).subscribe(res => {
        this.result = res.address;
        this.snackBar.open("Account created successfully.", 'Undo', {
          duration: 3000
        });
      }, (err) => {
        this.snackBar.open("Error while creating account.", 'Undo', {
          duration: 3000
        });
      }
    );
  }
}
