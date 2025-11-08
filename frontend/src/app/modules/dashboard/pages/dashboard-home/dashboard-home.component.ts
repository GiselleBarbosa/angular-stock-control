import { Component, OnInit } from '@angular/core';
import { Severity } from 'src/app/enum/severity.enum';
import { Products } from 'src/app/interfaces/products-interface';
import { ProductsService } from 'src/app/services/products/products.service';
import { ToastMessagesService } from 'src/app/services/toast-messages/toast-messages.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
  standalone: false
})
export class DashboardHomeComponent implements OnInit {
  productsList: Products.ProductsResponse[] = [];

  constructor(private productsService: ProductsService, private toastMessageService: ToastMessagesService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService
      .getAllProducts()
      .subscribe({
        next: response => {
          if (response.length > 0) {
            this.productsList = response;
            console.log("Products: ", response);
          }
        },
        error: (error) => {
          setTimeout(() => {
            this.toastMessageService.show(
              Severity.ERROR,
              "Erro inesperado",
              "Não foi possível exibir os produtos.",
              3500);
          }, 2000);

          console.error("Erro inesperado: ", error);
        }
      });
  }

}
