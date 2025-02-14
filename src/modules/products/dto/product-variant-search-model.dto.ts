export class ProductVariantSearchModel {
  id: number;
  productId?: number | null;
  productName?: string | null;
  productVariantName: string | null;
  productVariantDescription: string | null;
  brandId: number | undefined;
  brand: string | null | undefined;
  series: string | null;
  model: string | null;
  barcode: string | null;
  internalBarcode: string | null;
  dimensions: string[];
  productTags: string | null;
  categoryCode: string | null;
  category: string | null;
  categoryTag: string;
  imageUrl: (string | null)[];
  feature: string[];
  material: string | null;
}
