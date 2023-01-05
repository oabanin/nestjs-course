import { Injectable } from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {ProductModel} from "./product.model";
import {ModelType} from "@typegoose/typegoose/lib/types";

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private  readonly productModel: ModelType<ProductModel>) {
    }
}
