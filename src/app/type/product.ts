export interface Product{
  _id:string,
  name:String,
  shortDescription:String,
  description:String,
  Price:Number,
  discount:Number,
  images:String[],
  categoryId:String,
  brandId:string,
  isFeatured:boolean,
  isNewProduct:boolean
}