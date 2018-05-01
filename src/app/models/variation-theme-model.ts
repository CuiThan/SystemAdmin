import { ProductAttributeModel } from "./product-attr-model";



export class VariationThemeModel{
    variationThemeId:number;
    variationThemeName:string;
    attributeId:number;
    status:number;
    attributeName:string;
    isUsed:boolean;
}

export class VariationThemeChooseModel{
    name:string;
    id:number;
    attributes:ProductAttributeModel[];
}

export class Category_VariationTheme_AddRequest{
    variationThemeId:number[];
    categoryId:string 
}

export class Category_VariationThemeMapping{
    variationThemeId:number;
    categoryId : string;
    variationThemeName:string
}
export class AttributeModel{
    attributeId:number;
    attributeName:string;    
}