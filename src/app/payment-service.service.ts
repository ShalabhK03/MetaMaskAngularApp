import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';

const endpoint = 'http://localhost:3000/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class PaymentServiceService {
  constructor(private http: HttpClient) { }

  createWallet(name: string, mobileNumber: string): Observable<any> {
    return this.http.post(endpoint + 'createWallet', {'name': name, 'mobileNumber': mobileNumber}).pipe(
      map(this.extractData));
  }

  getBalance(address: string): Observable<any> {
    return this.http.post(endpoint + 'getWalletBalance', {'address': address}, httpOptions).pipe(
      map(this.extractData));
  }

  accountList(): Observable<any> {
    return this.http.get(endpoint + 'accountList').pipe(
      map(this.extractData));
  }

  sendEther(toAddress: string, fromAddress: string, amount: string): Observable<any> {
    return this.http.post(endpoint + 'sendEther', {'toAddress': toAddress, 'fromAddress': fromAddress, 'amount': amount}).pipe(
      map(this.extractData));
  }

  private extractData(res: Response) {
    console.log(res);
    let body = res;
    return body || { };
  }
}
