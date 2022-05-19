import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../services/pizza.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public pizza: any;
  public closeDialog: any;
  public content: any;
  public order: any;
  orderForm = new FormGroup({
    adress: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
    apartment: new FormControl('', [Validators.required, Validators.minLength(1)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)])
  })

  constructor(public pizzaService: PizzaService, 
    private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  getOrderFormData(order: any){
    console.warn(order);
  }

  userOrder() {
    console.warn(this.orderForm.value)
  }

  get adress() {
    return this.orderForm.get('adress');
  }

  get apartment() {
    return this.orderForm.get('apartment');
  }

  get phoneNumber() {
    return this.orderForm.get('phoneNumber');
  }

  removeItem(broj: number) {
   for(let i = 0; i < this.pizzaService.pizzasInCart.length; i++) {
     if(this.pizzaService.pizzasInCart[i]._id == broj) {
       this.pizzaService.pizzasInCart.splice(i, 1);
     }
   }
  }

  saveOrder() {
    this.order= {
      adress: this.adress?.value,
      apartment: this.apartment?.value,
      phoneNumber: this.phoneNumber?.value,
      pizzas: this.pizzaService.pizzasInCart
    };
    this.pizzaService.postOrder(this.order).subscribe(result=>{
      console.log(result);
      this.order = null;
      this.orderForm.reset();
      this.modalService.dismissAll();
      this.pizzaService.pizzasInCart = [];
    });
  }

  totalNumber(): any{
    let total : number = 0;
    for(let i = 0; i < this.pizzaService.pizzasInCart.length; i++) {
      total = total + this.pizzaService.pizzasInCart[i].price;
    }
    return total.toFixed(2);
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeDialog = `Closed with: ${result}`;
    }, (reason) => {
      this.closeDialog = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
