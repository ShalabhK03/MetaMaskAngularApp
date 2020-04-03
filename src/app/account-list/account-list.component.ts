import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})

export class AccountListComponent implements OnInit {

  constructor(private paymentService: PaymentServiceService, 
    private spinner: NgxSpinnerService) { }

  displayedColumns: string[] = ['name', 'mobileNumber', 'isActive', 'address', 'balance', 'sendEther'];
  dataSource: any;

  public fetchBalance(address: string){
    this.spinner.show();
    this.paymentService.getBalance(address).subscribe(res => {
      this.getValueByKey('address', this.dataSource, 'balance', res, address);
      this.spinner.hide();
    }, (err) => {
      console.log(err);
      this.spinner.hide();
    });
  }

  public sendEther(address: string){
    this.paymentService.getBalance(address).subscribe(res => {
      console.log(res);
      this.getValueByKey('address', this.dataSource, 'balance', res, address);
    }, (err) => {
      console.log(err);
    });
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  ngOnInit(): void {
    this.spinner.show();
    this.paymentService.accountList().subscribe(res => {
      this.dataSource = res;
      this.dataSource = new MatTableDataSource<Account>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
        this.spinner.hide();
      }, (err) => {
        console.log(err);
        this.spinner.hide();
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getValueByKey(key, data, keyToUpdate, valueToUpdate, forValue) {
    console.log(valueToUpdate);
    var i, len = data.data.length;
    
    for (i = 0; i < len; i++) {
        if (data.data[i] && data.data[i].hasOwnProperty(key) && data.data[i][key] == forValue) {
            data.data[i][keyToUpdate] = (valueToUpdate % 1 < 0 ? (0).toString() : valueToUpdate.toString()) + " ETH";
            break;
        }
    }
  }
}
