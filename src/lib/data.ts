export type Product={id:string,name:string,sku:string,category:string,description:string,price:number,quantity:number,threshold:number,supplierId:string,image:string};
export type Supplier={id:string,name:string,email:string,phone:string,company:string};
export type Movement={id:string,productId:string,type:"Stock in"|"Stock out"|"Adjustment",quantity:number,date:string,notes:string};
export type Order={id:string,customer:string,email:string,date:string,total:number,status:"Pending"|"Processing"|"Shipped"|"Delivered"|"Cancelled",items:number};
export type Store={products:Product[],suppliers:Supplier[],movements:Movement[],orders:Order[]};
export const seed:Store={
products:[
{id:"p1",name:"Wireless Headphones",sku:"WH-2041",category:"Electronics",description:"Over-ear noise cancelling headphones",price:89.99,quantity:124,threshold:20,supplierId:"s1",image:""},
{id:"p2",name:"Ceramic Coffee Mug",sku:"CC-1092",category:"Home & Living",description:"Hand-finished 12oz stoneware mug",price:18.5,quantity:8,threshold:15,supplierId:"s3",image:""},
{id:"p3",name:"Everyday Backpack",sku:"EB-3301",category:"Accessories",description:"Recycled canvas daypack, 22L",price:64,quantity:46,threshold:12,supplierId:"s2",image:""},
{id:"p4",name:"Desk Lamp",sku:"DL-0877",category:"Home & Living",description:"Adjustable LED lamp with warm light",price:42.99,quantity:5,threshold:10,supplierId:"s3",image:""},
{id:"p5",name:"USB-C Hub",sku:"UH-5018",category:"Electronics",description:"7-in-1 aluminum USB-C hub",price:39.99,quantity:78,threshold:15,supplierId:"s1",image:""},
{id:"p6",name:"Insulated Water Bottle",sku:"WB-2710",category:"Accessories",description:"Stainless steel, double-wall 750ml",price:28,quantity:3,threshold:12,supplierId:"s2",image:""},
{id:"p7",name:"Linen Throw Blanket",sku:"LT-1124",category:"Home & Living",description:"Soft washed linen blend, 130 × 180cm",price:74,quantity:32,threshold:8,supplierId:"s3",image:""},
{id:"p8",name:"Wireless Mouse",sku:"WM-4193",category:"Electronics",description:"Ergonomic bluetooth mouse",price:32.5,quantity:54,threshold:14,supplierId:"s1",image:""},
{id:"p9",name:"Leather Card Holder",sku:"LH-8815",category:"Accessories",description:"Slim full-grain leather card wallet",price:35,quantity:19,threshold:10,supplierId:"s2",image:""},
{id:"p10",name:"Ceramic Planter Set",sku:"CP-6420",category:"Home & Living",description:"Set of two glazed ceramic planters",price:45,quantity:11,threshold:12,supplierId:"s3",image:""},
{id:"p11",name:"Mechanical Keyboard",sku:"MK-1015",category:"Electronics",description:"Compact wireless mechanical keyboard",price:119,quantity:27,threshold:8,supplierId:"s1",image:""},
{id:"p12",name:"Travel Organizer",sku:"TO-5207",category:"Accessories",description:"Multi-pocket packing organizer",price:24,quantity:63,threshold:15,supplierId:"s2",image:""}],
suppliers:[{id:"s1",name:"Maya Chen",email:"maya@techsource.co",phone:"+1 (415) 555-0182",company:"TechSource Wholesale"},{id:"s2",name:"Daniel Ruiz",email:"daniel@carrygoods.com",phone:"+1 (212) 555-0134",company:"Carry Goods Co."},{id:"s3",name:"Olivia Martin",email:"olivia@homestead.co",phone:"+1 (312) 555-0161",company:"Homestead Supply"}],
movements:[{id:"m1",productId:"p1",type:"Stock in",quantity:40,date:"2026-11-12T08:42:00",notes:"Purchase order PO-1048"},{id:"m2",productId:"p2",type:"Stock out",quantity:-3,date:"2026-11-12T08:15:00",notes:"Order #SF-2841"},{id:"m3",productId:"p5",type:"Stock in",quantity:24,date:"2026-11-11T16:20:00",notes:"Supplier delivery"},{id:"m4",productId:"p6",type:"Stock out",quantity:-2,date:"2026-11-11T14:05:00",notes:"Order #SF-2839"},{id:"m5",productId:"p3",type:"Adjustment",quantity:-1,date:"2026-11-10T11:30:00",notes:"Damaged item"},{id:"m6",productId:"p4",type:"Stock in",quantity:12,date:"2026-11-10T09:10:00",notes:"Restock from Homestead"}],
orders:[{id:"SF-2841",customer:"Emma Wilson",email:"emma.wilson@example.com",date:"2026-11-12",total:148.49,status:"Processing",items:2},{id:"SF-2840",customer:"Noah Patel",email:"noah.patel@example.com",date:"2026-11-11",total:89.99,status:"Shipped",items:1},{id:"SF-2839",customer:"Sophia Kim",email:"sophia.kim@example.com",date:"2026-11-11",total:92,status:"Pending",items:3},{id:"SF-2838",customer:"Liam Johnson",email:"liam.johnson@example.com",date:"2026-11-10",total:64,status:"Delivered",items:1},{id:"SF-2837",customer:"Ava Thompson",email:"ava.thompson@example.com",date:"2026-11-09",total:125.5,status:"Delivered",items:2},{id:"SF-2836",customer:"Ethan Brooks",email:"ethan.brooks@example.com",date:"2026-11-08",total:39.99,status:"Cancelled",items:1},{id:"SF-2835",customer:"Mia Garcia",email:"mia.garcia@example.com",date:"2026-11-07",total:74,status:"Shipped",items:1}]
};
export const money=(n:number)=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n);
export const shortDate=(d:string)=>new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(new Date(d));
