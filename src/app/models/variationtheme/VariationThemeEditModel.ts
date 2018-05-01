

export class VariationThemeEditModel{
    variationThemeId:number;
    variationThemeName:string;
    attributeName:string;
    attributeId:number;
    attributeType: string;
    baseUnitId: number;    
}

export class VariationThemeEditRequest {
    attributeId: number;
    variationThemeId: number;
    variationThemeName:string;
    attributeName:string;
    attributeType: string;  
    baseUnitId: number; 
    constructor(model: VariationThemeEditModel) {
        this.attributeId = model.attributeId;
        this.variationThemeId = model.variationThemeId;        
        this.attributeType = model.attributeType;
    }
}