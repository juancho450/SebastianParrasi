import { Product } from "src/app/shared/interfaces/product.interface";
import { Response } from "src/app/shared/interfaces/response.interface";

export const productsMock: Product =
{
    "id": "uno",
    "name": "mock test",
    "description": "test mock description",
    "logo": "url.jpg",
    "date_release": "2024-08-10",
    "date_revision": "2025-08-10"
};
export const responseProductsMock: Response<Product[]> = {
  data: [productsMock]
};

export const responseSaveProductsMock: Response<Product> = {
  data: productsMock
};