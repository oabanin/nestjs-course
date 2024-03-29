import {Injectable} from '@nestjs/common';
import {InjectModel} from "nestjs-typegoose";
import {ProductModel} from "./product.model";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {CreateProductDto} from "./dto/create-product-dto";
import {findProductDto} from "./dto/find-product.dto";
import {ReviewModel} from "../review/review.model";

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {
    }

    async create(dto: CreateProductDto) {
        return this.productModel.create(dto)
    }

    async findById(id: string) {
        return this.productModel.findById(id).exec();
    }

    async deleteById(id: string) {
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto) {
        return this.productModel.findByIdAndUpdate(id, dto, {new: true}).exec(); //{new:true} returns updated product collection
    }

    async findWithReviews(dto: findProductDto) {
        return this.productModel.aggregate<ProductModel &
            {
                reviewsField: ReviewModel[],
                reviewCount: number,
                reviewAvg: number
            }>(
            [
                {$match: {categories: dto.category}},
                {$sort: {"_id": 1}},
                {$limit: dto.limit},
                {$lookup: {from: 'Review', localField: "_id", foreignField: "productId", as: "reviewsField"}},
                {
                    $addFields: {
                        reviewCount: {
                            $size: '$reviewsField',
                        },
                        reviewAvg: {
                            $avg: '$reviewsField.rating'
                        },
                        reviewsField:{
                            $function:{
                                body:`function (reviewsField){
                                    reviewsField.sort((a, b)=> new Date(b.createdAt) - new Date(a.createdAt));
                                    return reviewsField;
                                }`,
                                args:['$reviewsField'],
                                lang:'js'
                            }
                        }
                    }
                }
                ]
        ).exec();
    }
}
