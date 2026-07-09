in rxsoft-backend
Move  isPrescriptionRequired and isControlledSubstance to GenericProductOrmEntity and implement on all levels including in the schema_v2_pharmacy.sql
Move reorderMinQty: number | null and reorderMaxQty: number | null, to StockBalanceOrmEntity and implement on all levels including in the schema_v2_pharmacy.sql
remove sku from product


isPrescriptionRequired,isControlledSubstance,reorderMinQty, reorderMaxQty nnnot yet updated in schema_v2_pharmacy.sql
also, i mean't change PharmacologyInfoOrmEntity to PharmaceuticsOrmEntity in code and in schema_v2_pharmacy.sql

isPrescriptionRequired,isControlledSubstance,reorderMinQty, reorderMaxQty nnnot yet updated in schema_v2_pharmacy.sql

Change pharmacology to pharmaceutics and also in schema_v2_pharmacy.sql

study  schema_v2_pharmacy.sql and implement MVC for pricelist and pricelist item
complete api endpoints for GenericProductOrmEntity, StockLocationOrmEntity and 


also implement API for adjusting price of product in a pricelist if not available
implement api for adjust stock quantity of a product in a location if not available
      



in rxsoft-admin
Create a new  Component pricelist 
autocomplete select the product, autocomplete select the location, select currency and enter price
implement  such that it can be placed inside the Product create page 
a component for each pricelist available for the product


Create a new  Component stock quantity
autocomplete select the product, select the pricelist(normal select), select uom and enter quantity
implement  such that it can be placed inside the Product create page for each location 
implement  such that it can be placed inside the Product create page 
a component for each stock location available for the product


