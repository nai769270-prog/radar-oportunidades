const catalog=globalThis.__radarProductCatalog||{products:[]};
if(!globalThis.__radarProductCatalog)globalThis.__radarProductCatalog=catalog;
export function saveDigitalProduct(input={}){const now=new Date().toISOString();const product={id:input.id||crypto.randomUUID(),title:String(input.title||'Produto digital'),slug:String(input.slug||'produto-digital'),price:Number(String(input.price??0).replace(',','.'))||0,currency:input.currency||'BRL',asset:input.asset||null,status:input.status||'draft',category:input.category||null,createdAt:input.createdAt||now,updatedAt:now};const i=catalog.products.findIndex(x=>x.id===product.id);if(i>=0)catalog.products[i]={...catalog.products[i],...product};else catalog.products.unshift(product);return product}
export function listDigitalProducts(){return catalog.products}
export function getDigitalProduct(id){return catalog.products.find(x=>String(x.id)===String(id))||null}
export function getDigitalProductByReference(reference){if(!reference)return null;return catalog.products.find(x=>String(x.id)===String(reference)||String(x.slug)===String(reference))||null}
