import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './product';
import { catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsUrl = 'api/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messService: MessageService) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl).pipe(
      tap(_ => this.log('fetched products')),
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  getProduct(id: string): Observable<Product>{
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fitched product id=${id}`)),
      catchError(this.handleError<Product>(`get product id=${id}`))
    );
  }

  addProduct(product: Product): Observable<Product>{
    return this.http.post<Product>(this.productsUrl, product, this.httpOptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct(product: Product): Observable<Product>{
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.delete<Product>(url, this.httpOptions).pipe(
      tap(_ => this.log(`delete product id=${product.id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  updateProduct(product: Product): Observable<any>{
    return this.http.put(this.productsUrl, product, this.httpOptions).pipe(
      tap(_ => this.log(`update product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) { return of([]); }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}  `).pipe(
      tap(x => x.length ?
        this.log(`found products matching "${term}"`)
        : this.log(`no products matching "${term}"`),
      catchError(this.handleError<Product[]>('searchProducts', []))
    ));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messService.add(`ProductService: ${message}`);
  }
}
