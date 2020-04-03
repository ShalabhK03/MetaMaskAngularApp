import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl} from '@angular/forms';
import { PaymentServiceService } from '../payment-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

export interface Account {
  name: string;
  mobileNumber: string;
  address: string;
  isActive: boolean;
  balance: string;
  sendEther: string;
}

@Component({
  selector: 'app-send-ether',
  templateUrl: './send-ether.component.html',
  styleUrls: ['./send-ether.component.scss']
})

export class SendEtherComponent implements OnInit {

  sub;
  toAddress: string;
  transferEtherForm: FormGroup;
  FromAddress: string = '';
  ToAddress: string = '';
  Amount:string = '';
  dataSource: Account[];
  showLoader: boolean = false;

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router,
    private fb: FormBuilder,
    private paymentService: PaymentServiceService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar) {
      this.transferEtherForm = fb.group({
        'ToAddress' : [null, Validators.required],
        'Amount' : [null, Validators.required]
      });
  }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.FromAddress = params.get('fromAddress');
      this.paymentService.accountList().subscribe(res => {
        this.dataSource = res;
        var attr = this.removeByattr(this.dataSource, 'address', this.FromAddress);
      }, (err) => {
        console.log(err);
      })
   });
  }

  // Executed When Form Is Submitted  
  onFormSubmit(form: NgForm)  
  {  
    this.spinner.show();
    
    this.paymentService.sendEther(form["ToAddress"], this.FromAddress, form['Amount']).subscribe(res => {
      this.snackBar.open("Sent" + this.Amount + " successfully.", 'Undo', {
        duration: 3000
      });
      this.spinner.hide();
    }, (err) => {
      console.log(err);
      this.snackBar.open("Cannot send Ethers", 'Undo', {
        duration: 3000
      });
      this.spinner.hide();
    });
  }

  removeByattr(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}
}
