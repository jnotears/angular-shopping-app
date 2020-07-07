import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb(){
    const products = [
      {id: 'IP-4S',prodName: 'Iphone 4S',price: 500},
      {id: 'IP-5',prodName: 'Iphone 5',price: 500},
      {id: 'IP-7',prodName: 'Iphone 7',price: 500},
      {id: 'IP-X',prodName: 'Iphone X',price: 500},
      {id: 'IP-11',prodName: 'Iphone 11',price: 500},
      {id: 'MAC-A-2015',prodName: 'Macbook Air 2015',price: 1000},
      {id: 'MAC-P-2017',prodName: 'Macbook Pro 2017',price: 1000},
      {id: 'MAC-P-2018',prodName: 'Macbook Pro 2018',price: 1000},
      {id: 'MAC-P-2019',prodName: 'Macbook Pro 2019',price: 1000},
      {id: 'MAC-A-2018',prodName: 'Macbook Air 2018',price: 1000},
    ];
    return {products};
  }

}
