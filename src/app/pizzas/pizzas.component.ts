import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PizzaService } from '../services/pizza.service';


@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss']
})
export class PizzasComponent implements OnInit {
  
  public apiPizzaList: any;
  

  constructor(public pizzaService: PizzaService) { 
    
  }

  ngOnInit(): void {
    this.getPizza()
  }

  addToCart(pica: any) {
    this.pizzaService.pizzasInCart.push(pica);
  }

  getPizza() {
    this.pizzaService.getPizza().subscribe((response: any) =>  {
      console.log(response);
      this.apiPizzaList = response.results;
    })
  }

}
