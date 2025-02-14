import { Injectable } from '@nestjs/common';
import { productData } from 'src/mock-data/products';
import { ESProductService } from 'src/modules/elastic-search/services/es-product.service';
import { PrismaService } from 'src/modules/shared/prisma/prisma.service';
import { ProductVariantSearchModel } from '../dto/product-variant-search-model.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly esProductService: ESProductService,
    private readonly prismaService: PrismaService,
  ) {}

  async getProductVariantSearchModel() {
    // {
    //   "productVariantNameForDisplay": "Dulux สีน้ำอะคริลิค อีซี่แคร์ พลัส เนียน เบสD_9L",
    //   "productVariantDescription": "ดูลักซ์ อีซี่แคร์ พลัส (ชนิดเนียน) เบส\n<br/>ดูลักซ์ อีซี่แคร์ พลัส เป็นสีน้ำอะครีลิคระดับซูเปอร์พรีเมียม พร้อมนวัตกรรมใหม่ KidProof™ Technology ทำให้คราบของเหลวจับตัวกันเป็นเม็ด ไม่เกาะผนัง ทำให้คราบไม่ฝังลึกและเช็ดล้างทำความสะอาดได้ง่ายกว่าสีทาภายในทั่วไป และเทคโนโลยี Colour Guard ที่ช่วยให้สีคงความสดใส สวยงามเหมือนใหม่อยู่เสมอ ป้องกันแบคทีเรียและเชื้อรา กลิ่นอ่อน และมีปริมาณสารอินทรีย์ระเหยต่ำ (Low-VOCs)\n<br/> ชนิดฟิล์มสี: เนียน\n<br/> ความครอบคลุม: 35-40 ตร.ม./เที่ยว/แกลลอน\n<br/> เวลาสีแห้ง: 30 นาที - 2 ชม.\n<br/> จำนวนรอบการทา: 2\n<br/>คุณสมบัติของผลิตภัณฑ์\n<br/> ป้องกันฝุ่น\n<br/> ใช้งานง่าย\n<br/> ฟิล์มสีทนทาน\n<br/> การปกคลุมได้มาก\n<br/> กลิ่นอ่อน\n<br/> แห้งเร็ว\n<br/> ป้องกันคราบ\n<br/> สามารถเช็ดล้างได้\n<br/> สีสวยยาวนาน\n<br/> ปกป้องสีสวยยาวนาน\n<br/> สูตรน้ำ <br/>  สินค้า : เบส สีน้ำอะคริลิค เนียน ภายใน <br/> ประเภท : สีทาอาคาร <br/> กลุ่มงาน : เบส ภายใน <br/> พื้นที่ใช้งาน : ผนังภายใน <br/> พื้นที่การปกคลุม (ตร.ม/unit/เที่ยว) : 83.21-95.1 ตร.ม./EA/เที่ยว <br/> ฟังก์ชั่น : เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย <br/> ฟังก์ชั่น : เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย <br/> เกรด : Super Premium (15ปี) <br/> Finishing : เนียน <br/> พื้นผิว : ปูน <br/> ตัวทำละลาย/การผสมก่อนใช้งาน : ใช้งานได้ทันที หรือ ผสมน้ำสะอาด <br/>",
    //   "categoryCodes": [301030204],
    //   "dimensions": [
    //     "ดูลักซ์ อีซี่แคร์ พลัส (ชนิดเนียน) เบส",
    //     "9L 9 L 9 ลิตร  9L 9 L 9 ลิตร  9L 9 L 9 ลิตร  ",
    //     "เนียน เบสD ",
    //     "5233092"
    //   ],
    //   "sellingBranches": [
    //     4, 5, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
    //     24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41,
    //     42, 43, 44, 45, 46, 48, 49, 50, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    //     61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78,
    //     80, 86, 100, 101, 102, 103, 106, 107, 115, 118, 120, 122, 123, 124,
    //     126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 137, 138, 139,
    //     140, 143, 144, 844, 967, 968, 969, 970, 971, 972, 973, 974, 975,
    //     976, 1204, 1436, 1437, 1438, 1439, 1486, 1487, 154, 158, 163, 164,
    //     167, 168, 165, 169, 172, 240, 175, 343, 185, 188, 192, 200, 194,
    //     191, 195, 198, 203, 206, 207, 218, 234, 233, 241, 248, 470, 251,
    //     257, 258, 259, 1406, 270, 276, 280, 284, 286, 291, 303, 301, 308,
    //     310, 311, 313, 317, 497, 323, 325, 329, 338, 345, 347, 354, 367,
    //     370, 482, 371, 373, 379, 380, 382, 385, 391, 392, 400, 401, 402,
    //     405, 407, 409, 410, 417, 418, 419, 427, 430, 434, 435, 436, 443,
    //     443, 445, 454, 451, 448, 457, 461, 468, 494, 501, 506, 1440, 505,
    //     508, 511, 515, 522, 532, 540, 544, 546, 549, 552, 553, 556, 568,
    //     580, 583, 587, 585, 592, 594, 598, 606, 611, 612, 620, 623, 625,
    //     626, 632, 640, 641, 645, 648, 646, 651, 901, 656, 673, 685, 690,
    //     692, 694, 695, 697, 707, 714, 717, 1263, 723, 729, 738, 742, 745,
    //     748, 755, 757, 768, 770, 772, 773, 783, 780, 782, 789, 791, 796,
    //     804, 805, 811, 820, 825, 827, 826, 832, 833, 834, 838, 841, 845,
    //     849, 848, 853, 854, 1065, 861, 862, 868, 871, 884, 894, 897, 902,
    //     904, 909, 911, 915, 925, 932, 939, 940, 952, 996, 998, 1002, 1016,
    //     1391, 1029, 1033, 1359, 1034, 1039, 1042, 1043, 1044, 1047, 1053,
    //     1056, 1061, 1067, 1070, 1074, 1076, 1078, 1085, 1340, 1092, 1093,
    //     1099, 1107, 1115, 1116, 1121, 1125, 1130, 1138, 1139, 1145, 1146,
    //     1149, 1156, 1158, 1390, 1161, 1165, 1171, 1170, 1179, 1182, 1185,
    //     1187, 1188, 1199, 1208, 1212, 1213, 1222, 1223, 1243, 1253, 1254,
    //     1256, 1467, 1260, 1261, 1273, 1277, 1279, 1281, 1291, 1319, 1298,
    //     1314, 1313, 1315, 1316, 1322, 1325, 1335, 1339, 1345, 1347, 1349,
    //     1351, 1353, 1354, 1355, 1358, 1360, 1375, 1376, 1387, 1388, 1393,
    //     1397, 1398, 1399, 1400, 1412, 1419, 1420, 1431, 1433, 1445, 1456,
    //     1460, 1471, 1473
    //   ],
    //   "imageUrl": "https://stazseaprd.blob.core.windows.net/product-variant/6114/images/1665997157946-400271171.jpg",
    //   "feature1Id": "สินค้า",
    //   "feature1Value": "เบส สีน้ำอะคริลิค เนียน ภายใน",
    //   "feature1ValueWithSynonym": "เบส สีน้ำ Acrylic อะคริลิค  เนียน ภายใน",
    //   "feature2Id": "ประเภท",
    //   "feature2Value": "สีทาอาคาร",
    //   "feature2ValueWithSynonym": "สีทาอาคาร",
    //   "feature3Id": "กลุ่มงาน",
    //   "feature3Value": "เบส ภายใน",
    //   "feature3ValueWithSynonym": "เบส ภายใน",
    //   "feature4Id": "พื้นที่ใช้งาน",
    //   "feature4Value": "ผนังภายใน",
    //   "feature4ValueWithSynonym": "ผนังภายใน",
    //   "feature5Id": "พื้นที่การปกคลุม (ตร.ม/unit/เที่ยว)",
    //   "feature5Value": "83.21-95.1 ตร.ม./EA/เที่ยว",
    //   "feature5ValueWithSynonym": "83.21-95.1 ตร.ม./EA/เที่ยว",
    //   "feature6Id": "ฟังก์ชั่น",
    //   "feature6Value": "เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย",
    //   "feature6ValueWithSynonym": "เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย",
    //   "feature7Id": "Finishing",
    //   "feature7Value": "เนียน",
    //   "feature7ValueWithSynonym": "เนียน",
    //   "feature8Id": "พื้นผิว",
    //   "feature8Value": "ปูน",
    //   "feature8ValueWithSynonym": "ปูน",
    //   "feature9Id": "ตัวทำละลาย/การผสมก่อนใช้งาน",
    //   "feature9Value": "ใช้งานได้ทันที หรือ ผสมน้ำสะอาด",
    //   "feature9ValueWithSynonym": "ใช้งานได้ทันที หรือ ผสมน้ำสะอาด",
    //   "feature10Id": "size",
    //   "feature10Value": "9L",
    //   "feature10ValueWithSynonym": "9L",
    //   "allFeaturesValue": "เบส สีน้ำอะคริลิค เนียน ภายใน สีทาอาคาร เบส ภายใน ผนังภายใน 83.21-95.1 ตร.ม./EA/เที่ยว เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย เนียน ปูน ใช้งานได้ทันที หรือ ผสมน้ำสะอาด 9L",
    //   "allFeaturesValueWithSynonym": "สี เบส สีน้ำ Acrylic อะคริลิค  เนียน ภายใน สีทาอาคาร เบส ภายใน ผนังภายใน 83.21-95.1 ตร.ม./EA/เที่ยว เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย เนียน ปูน ใช้งานได้ทันที หรือ ผสมน้ำสะอาด 9L",
    //   "feature1IdWithCategoryCode": "0301030204:สินค้า",
    //   "feature1ValueWithCategoryCode": "0301030204:เบส สีน้ำอะคริลิค เนียน ภายใน",
    //   "feature2IdWithCategoryCode": "0301030204:ประเภท",
    //   "feature2ValueWithCategoryCode": "0301030204:สีทาอาคาร",
    //   "feature3IdWithCategoryCode": "0301030204:กลุ่มงาน",
    //   "feature3ValueWithCategoryCode": "0301030204:เบส ภายใน",
    //   "feature4IdWithCategoryCode": "0301030204:พื้นที่ใช้งาน",
    //   "feature4ValueWithCategoryCode": "0301030204:ผนังภายใน",
    //   "feature5IdWithCategoryCode": "0301030204:พื้นที่การปกคลุม (ตร.ม/unit/เที่ยว)",
    //   "feature5ValueWithCategoryCode": "0301030204:83.21-95.1 ตร.ม./EA/เที่ยว",
    //   "feature6IdWithCategoryCode": "0301030204:ฟังก์ชั่น",
    //   "feature6ValueWithCategoryCode": "0301030204:เบสผสมแม่สี ทาทับหน้า ปกป้องการฝังของคราบ เช็ดล้างทำความสะอาดได้ ป้องกันเชื้อราและแบคทีเรีย",
    //   "feature7IdWithCategoryCode": "0301030204:Finishing",
    //   "feature7ValueWithCategoryCode": "0301030204:เนียน",
    //   "feature8IdWithCategoryCode": "0301030204:พื้นผิว",
    //   "feature8ValueWithCategoryCode": "0301030204:ปูน",
    //   "feature9IdWithCategoryCode": "0301030204:ตัวทำละลาย/การผสมก่อนใช้งาน",
    //   "feature9ValueWithCategoryCode": "0301030204:ใช้งานได้ทันที หรือ ผสมน้ำสะอาด",
    //   "feature10IdWithCategoryCode": "0301030204:size",
    //   "feature10ValueWithCategoryCode": "0301030204:9L",
    //   "suggestions": [
    //     "Dulux EasyCare Plus สีน้ำอะคริลิค",
    //     "Dulux สีน้ำอะคริลิค อีซี่แคร์ พลัส เนียน เบสD_9L 9 L 9 ลิตร ",
    //     "เคมีภัณฑ์ก่อสร้าง ตัวช่วยอุดรอยรั่วซึม ประสานรอยต่อเติมซ่อมแซมบ้าน",
    //     "เคมีภัณฑ์ก่อสร้าง",
    //     "PAINT ทับหน้า",
    //     "สีน้ำพลาสติก/สีน้ำอะครีลิค",
    //     "แม่สี/เบส"
    //   ],
    //   "material": "อะคริลิค",
    //   "materialSynonyms": " Acrylic อะคริลิค ",
    //   "color": "สี ",
    //   "colorSynonyms": "สี ",
    //   "clickBoost": 0,
    //   "sellBoost": 0,
    //   "id": 6114,
    //   "productGroupId": 877,
    //   "productGroupName": "Dulux EasyCare Plus สีน้ำอะคริลิค",
    //   "productGroupNameWithSynonyms": "Dulux EasyCare Plus สีน้ำ Acrylic อะคริลิค ",
    //   "productVariantName": "Dulux สีน้ำอะคริลิค อีซี่แคร์ พลัส เนียน เบสD_9L 9 L 9 ลิตร ",
    //   "productVariantNameWithSynonyms": "Dulux สีน้ำ Acrylic อะคริลิค  อีซี่แคร์ พลัส เนียน เบสD_9L",
    //   "productVariantNameWithoutSpecicalCharacter": "Dulux สีน้ำอะคริลิค อีซี่แคร์ พลัส เนียน เบสD9L",
    //   "brand": "Dulux",
    //   "brandSynonyms": " Dulux ดูลักซ์ ",
    //   "brandId": 174,
    //   "series": "ดูลักซ์ อีซี่แคร์ พลัส (ชนิดเนียน) เบส",
    //   "model": "5233092",
    //   "modelWithoutSpecicalCharacter": "5233092",
    //   "barcode": "8850181044438",
    //   "category0": [
    //     "เคมีภัณฑ์ก่อสร้าง ตัวช่วยอุดรอยรั่วซึม ประสานรอยต่อเติมซ่อมแซมบ้าน"
    //   ],
    //   "category0WithSynonyms": [
    //     "เคมีภัณฑ์ก่อสร้าง ตัวช่วยอุดรอยรั่วซึม ประสานรอยต่อเติมซ่อมแซมบ้าน"
    //   ],
    //   "category0Id": [128],
    //   "category1": ["เคมีภัณฑ์ก่อสร้าง"],
    //   "category1WithSynonyms": ["เคมีภัณฑ์ก่อสร้าง"],
    //   "category1Id": [129],
    //   "category2": ["PAINT ทับหน้า"],
    //   "category2WithSynonyms": ["PAINT ทับหน้า"],
    //   "category2Id": [181],
    //   "category3": ["สีน้ำพลาสติก/สีน้ำอะครีลิค"],
    //   "category3WithSynonyms": ["สีน้ำ Plastics พลาสติก /สีน้ำอะครีลิค"],
    //   "category3Id": [183],
    //   "category4": ["แม่สี/เบส"],
    //   "category4WithSynonyms": ["แม่สี/เบส"],
    //   "category4Id": [1695],
    //   "category5Id": [],
    //   "category6Id": [],
    //   "category7Id": [],
    //   "category8Id": [],
    //   "category9Id": [],
    //   "tags": [],
    //   "categoryTags": [],
    //   "productGroupTags": [],
    //   "productVariantTags": [],
    //   "firstCategoryId": [1695]
    // }

    //   {
    //     Id = productVariantId,
    //     ProductGroupId = variant.ProductGroupId,
    //     ProductGroupName = variant.ProductGroupName,
    //     ProductGroupNameWithSynonyms = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.ProductGroupName)),
    //     ProductVariantNameForDisplay = variant.ProductVariantName,
    //     ProductVariantName = UnitConverter.ReplaceUnit(variant.ProductVariantName),
    //     ProductVariantNameWithSynonyms = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.ProductVariantName)),
    //     ProductVariantNameWithoutSpecicalCharacter = variant.ProductVariantName is null ? null : Regex.Replace(variant.ProductVariantName, @"[-_\/]", ""),
    //     ProductVariantDescription = UnitConverter.ReplaceUnit(variant.ProductVariantDescription),
    //     Brand = variant.BrandName,
    //     BrandSynonyms = synonymService.ReplaceBrandInline(variant.BrandName),
    //     BrandId = variant.BrandId,
    //     Series = variant.Series,
    //     Model = variant.Model,
    //     ModelWithoutSpecicalCharacter = variant.Model is null ? null : Regex.Replace(variant.Model, @"[-_\/]", ""),
    //     Barcode = variant.Barcode,
    //     InternalBarcode = variant.InternalBarcode,
    //     Dimensions = variant.Dimensions.Select(c => { return UnitConverter.ReplaceUnit(c); }),
    //     ProductVariantTags = variant.ProductVariantTags,
    //     ProductGroupTags = variant.ProductGroupTags,
    //     CategoryTags = variant.CategoryTags,
    //     ImageUrl = variant.ImageUrl,
    //     SellingBranches = sellingBranches,
    //     IsSelectAllBranch = false, // Not implemented yet
    //     Price = (double)variant.Price,
    //     Category0 = (categoryList?.Count > 0) ? categoryList[0] : null,
    //     Category1 = (categoryList?.Count > 1) ? categoryList[1] : null,
    //     Category2 = (categoryList?.Count > 2) ? categoryList[2] : null,
    //     Category3 = (categoryList?.Count > 3) ? categoryList[3] : null,
    //     Category4 = (categoryList?.Count > 4) ? categoryList[4] : null,
    //     Category5 = (categoryList?.Count > 5) ? categoryList[5] : null,
    //     Category6 = (categoryList?.Count > 6) ? categoryList[6] : null,
    //     Category7 = (categoryList?.Count > 7) ? categoryList[7] : null,
    //     Category8 = (categoryList?.Count > 8) ? categoryList[8] : null,
    //     Category9 = (categoryList?.Count == 9) ? categoryList[9] : null,
    //     Category0WithSynonyms = (categoryList?.Count > 0) ? categoryList[0].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category1WithSynonyms = (categoryList?.Count > 1) ? categoryList[1].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category2WithSynonyms = (categoryList?.Count > 2) ? categoryList[2].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category3WithSynonyms = (categoryList?.Count > 3) ? categoryList[3].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category4WithSynonyms = (categoryList?.Count > 4) ? categoryList[4].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category5WithSynonyms = (categoryList?.Count > 5) ? categoryList[5].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category6WithSynonyms = (categoryList?.Count > 6) ? categoryList[6].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category7WithSynonyms = (categoryList?.Count > 7) ? categoryList[7].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category8WithSynonyms = (categoryList?.Count > 8) ? categoryList[8].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category9WithSynonyms = (categoryList?.Count == 9) ? categoryList[9].Select(a => synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(a))).ToList() : null,
    //     Category0Id = (categoryIdList?.Count > 0) ? categoryIdList[0] : new List<int>(),
    //     Category1Id = (categoryIdList?.Count > 1) ? categoryIdList[1] : new List<int>(),
    //     Category2Id = (categoryIdList?.Count > 2) ? categoryIdList[2] : new List<int>(),
    //     Category3Id = (categoryIdList?.Count > 3) ? categoryIdList[3] : new List<int>(),
    //     Category4Id = (categoryIdList?.Count > 4) ? categoryIdList[4] : new List<int>(),
    //     Category5Id = (categoryIdList?.Count > 5) ? categoryIdList[5] : new List<int>(),
    //     Category6Id = (categoryIdList?.Count > 6) ? categoryIdList[6] : new List<int>(),
    //     Category7Id = (categoryIdList?.Count > 7) ? categoryIdList[7] : new List<int>(),
    //     Category8Id = (categoryIdList?.Count > 8) ? categoryIdList[8] : new List<int>(),
    //     Category9Id = (categoryIdList?.Count == 9) ? categoryIdList[9] : new List<int>(),
    //     CategoryCodes = categoryCodes.Select(a => long.Parse(a)).ToList(),
    //     FirstCategoryId = variant.FirstCategoryIds,
    //     Feature1Id = variant.Feature1Id,
    //     Feature1Value = variant.Feature1Value,
    //     Feature1ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature1Value)),
    //     Feature2Id = variant.Feature2Id,
    //     Feature2Value = variant.Feature2Value,
    //     Feature2ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature2Value)),
    //     Feature3Id = variant.Feature3Id,
    //     Feature3Value = variant.Feature3Value,
    //     Feature3ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature3Value)),
    //     Feature4Id = variant.Feature4Id,
    //     Feature4Value = variant.Feature4Value,
    //     Feature4ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature4Value)),
    //     Feature5Id = variant.Feature5Id,
    //     Feature5Value = variant.Feature5Value,
    //     Feature5ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature5Value)),
    //     Feature6Id = variant.Feature6Id,
    //     Feature6Value = variant.Feature6Value,
    //     Feature6ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature6Value)),
    //     Feature7Id = variant.Feature7Id,
    //     Feature7Value = variant.Feature7Value,
    //     Feature7ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature7Value)),
    //     Feature8Id = variant.Feature8Id,
    //     Feature8Value = variant.Feature8Value,
    //     Feature8ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature8Value)),
    //     Feature9Id = variant.Feature9Id,
    //     Feature9Value = variant.Feature9Value,
    //     Feature9ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature9Value)),
    //     Feature10Id = variant.Feature10Id,
    //     Feature10Value = variant.Feature10Value,
    //     Feature10ValueWithSynonym = synonymService.ReplaceGlobalInline(synonymService.ReplaceMaterialInline(variant.Feature10Value)),
    //     Feature1IdWithCategoryCode = (variant.Feature1Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature1Id : null,
    //     Feature1ValueWithCategoryCode = (variant.Feature1Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature1Value : null,
    //     Feature2IdWithCategoryCode = (variant.Feature2Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature2Id : null,
    //     Feature2ValueWithCategoryCode = (variant.Feature2Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature2Value : null,
    //     Feature3IdWithCategoryCode = (variant.Feature3Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature3Id : null,
    //     Feature3ValueWithCategoryCode = (variant.Feature3Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature3Value : null,
    //     Feature4IdWithCategoryCode = (variant.Feature4Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature4Id : null,
    //     Feature4ValueWithCategoryCode = (variant.Feature4Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature4Value : null,
    //     Feature5IdWithCategoryCode = (variant.Feature5Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature5Id : null,
    //     Feature5ValueWithCategoryCode = (variant.Feature5Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature5Value : null,
    //     Feature6IdWithCategoryCode = (variant.Feature6Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature6Id : null,
    //     Feature6ValueWithCategoryCode = (variant.Feature6Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature6Value : null,
    //     Feature7IdWithCategoryCode = (variant.Feature7Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature7Id : null,
    //     Feature7ValueWithCategoryCode = (variant.Feature7Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature7Value : null,
    //     Feature8IdWithCategoryCode = (variant.Feature8Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature8Id : null,
    //     Feature8ValueWithCategoryCode = (variant.Feature8Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature8Value : null,
    //     Feature9IdWithCategoryCode = (variant.Feature9Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature9Id : null,
    //     Feature9ValueWithCategoryCode = (variant.Feature9Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature9Value : null,
    //     Feature10IdWithCategoryCode = (variant.Feature10Id is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature10Id : null,
    //     Feature10ValueWithCategoryCode = (variant.Feature10Value is not null) ? string.Join(",", categoryCodes) + ":" + variant.Feature10Value : null,
    //     Size = variant.Size,
    //     SizeSynonyms = synonymService.ReplaceUnitInline(variant.Size),
    //     Color = "สี " + variant.Color,
    //     ColorSynonyms = synonymService.ReplaceColorInline(variant.Color),
    //     Material = variant.Material,
    //     MaterialSynonyms = synonymService.ReplaceMaterialInline(variant.Material),
    //     Durable = variant.Durable,
    //     ClickBoost = Math.Max(clickBoostScore, 0),
    //     SellBoost = Math.Max(sellBoostScore, 0),
    // };
    const productVariants = await this.prismaService.product_variant.findMany({
      where: {
        id: {
          in: [
            11934, 17465, 11699, 30713, 24457, 8889, 19039, 19571, 19385, 24360,
            5000, 7777, 23415, 25555, 14415, 30010, 29993, 11499, 18749, 15000,
          ],
        },
      },
      include: {
        product: {
          include: {
            brand: { select: { id: true, name: true } },
            product_tag: { select: { tagName: true } },
            product_image: {
              select: { document: { select: { filePath: true } } },
            },
          },
        },
        agent_product: {
          select: { agent: { select: { branch: { select: { id: true } } } } },
        },
        product_variant_category: {
          select: {
            // 1
            category: {
              select: {
                name: true,
                d365CategoryCode: true,
                category_tag: { select: { tagName: true } },
                // 2
                category: {
                  select: {
                    name: true,
                    d365CategoryCode: true,
                    category_tag: { select: { tagName: true } },
                    // 3
                    category: {
                      select: {
                        name: true,
                        d365CategoryCode: true,
                        category_tag: { select: { tagName: true } },
                        // 4
                        category: {
                          select: {
                            name: true,
                            d365CategoryCode: true,
                            category_tag: { select: { tagName: true } },
                            // 5
                            category: {
                              select: {
                                name: true,
                                d365CategoryCode: true,
                                category_tag: { select: { tagName: true } },
                                // 6
                                category: {
                                  select: {
                                    name: true,
                                    d365CategoryCode: true,
                                    category_tag: { select: { tagName: true } },
                                    // 7
                                    category: {
                                      select: {
                                        name: true,
                                        d365CategoryCode: true,
                                        category_tag: {
                                          select: { tagName: true },
                                        },
                                        // 8
                                        category: {
                                          select: {
                                            name: true,
                                            d365CategoryCode: true,
                                            category_tag: {
                                              select: { tagName: true },
                                            },
                                            // 9
                                            category: {
                                              select: {
                                                name: true,
                                                d365CategoryCode: true,
                                                category_tag: {
                                                  select: { tagName: true },
                                                },
                                              },
                                            },
                                          },
                                        },
                                      },
                                    },
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        product_variant_dimension: {
          select: {
            value: true,
            product_dimension: {
              select: {
                product_dimension_master: { select: { name: true } },
              },
            },
          },
        },
        product_variant_tag: { select: { tagName: true } },
        product_variant_image: {
          select: { document: { select: { filePath: true } } },
        },
        product_variant_attribute: {
          where: { status: 'Active' },
          select: {
            stringValue: true,
            product_attribute_master: {
              select: { name: true, description: true },
            },
          },
        },
      },
    });
    // clickBoostDict
    // sellBoostDict

    const productVariantSearchList: ProductVariantSearchModel[] = []; // as ProductVariantSearchModel[]
    for (let i = 0; i < productVariants.length; i++) {
      const productVariant = productVariants[i];
      const productVarientCategorys =
        productVariant.product_variant_category[0].category;
      const productVariantSearchModel: ProductVariantSearchModel = {
        id: productVariant.id,
        productId: productVariant.product?.id,
        productName: productVariant.product?.name,
        productVariantName: productVariant.alias,
        productVariantDescription: productVariant.description,
        brandId: productVariant.product?.brand?.id,
        brand: productVariant.product?.brand?.name,
        series: productVariant.series,
        model: productVariant.model,
        barcode: productVariant.barcode,
        internalBarcode: productVariant.internalBarcode,
        dimensions: productVariant.product_variant_dimension.map(
          (item) =>
            `${item.product_dimension.product_dimension_master.name} = ${item.value}`,
        ),
        productTags:
          productVariant.product?.product_tag
            .map((item) => item.tagName)
            .join(',') || null,
        // productVariantTags, // not use
        categoryCode:
          productVariant.product_variant_category[0].category.d365CategoryCode,
        category: productVariant.product_variant_category[0].category.name, // is need nest cat?
        categoryTag:
          productVariant.product_variant_category[0].category.category_tag
            .map((item) => item.tagName)
            .join(','), // is need nest cat?
        imageUrl:
          productVariant.product?.product_image.map(
            (item) => item.document.filePath,
          ) || [], // need add image of product varient?
        feature: productVariant.product_variant_attribute.map(
          (item) =>
            `${item.product_attribute_master.name} = ${item.stringValue}`,
        ),
        material: productVariant.material,
        // these are duplicate from feature
        // size,
        // color,
        // durable,
        // for boots
        // clickBoost,
        // sellBoost
      };

      productVariantSearchList.push(productVariantSearchModel);
    }
    return productVariantSearchList;
  }

  async createProductIndex() {
    return this.esProductService.createIndex();
  }

  async dumpProduct() {
    try {
      const productVatiantSearchList =
        await this.getProductVariantSearchModel();
      for (let i = 0; i < productVatiantSearchList.length; i++) {
        const product = productVatiantSearchList[i];
        await this.esProductService.addProductToIndex(product);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async searchProduct(query: string) {
    return this.esProductService.searchProduct(query);
  }
}
