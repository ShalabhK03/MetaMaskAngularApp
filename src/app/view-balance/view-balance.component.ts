import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';

import { PaymentServiceService } from '../payment-service.service';

@Component({
  selector: 'app-view-balance',
  templateUrl: './view-balance.component.html',
  styleUrls: ['./view-balance.component.scss']
})
export class ViewBalanceComponent implements OnInit {
  balanceForm: FormGroup;
  Address: string = '';
  balance:string = '';
  showLoader: boolean = false;

  constructor(private fb: FormBuilder, private paymentService: PaymentServiceService) {
    this.balanceForm = fb.group({
      'Address' : [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm)  
  {  
    this.showLoader = true;
    this.paymentService.getBalance(form["Address"]).subscribe(res => {
      console.log(res);
      this.balance = res;
      this.showLoader = false;
    }, (err) => {
      console.log(err);
    });
  }  
}