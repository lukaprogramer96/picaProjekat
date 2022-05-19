import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  public vegeterian: boolean = false;
  public discount: boolean = false;
  public pizzasInCart: any [] = [];
  

  constructor(private http: HttpClient
    ) { }

getPizza() {
  return this.http.get("http://localhost:3100/api/pizzas").pipe(map(response => {
    return response;
  }))
}

postOrder(order: any) {
  return this.http.post("http://localhost:3100/api/orders", order)
}

}
