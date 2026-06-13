# Complete Generic Spreadsheet Import Framework + End-to-End Integration Tests

## Objective

Complete and productionize the existing NestJS generic spreadsheet import framework.

The framework already contains a partial implementation.

Your task is to:

1. Complete all missing functionality.
2. Refactor where necessary.
3. Implement all missing abstractions.
4. Add comprehensive integration tests.
5. Verify functionality against SQLite.
6. Verify functionality against both:

   * Excel workbook imports
   * Google Sheets imports

The final result should be a reusable master-data import framework requiring minimal configuration.

---

# Existing Codebase

The following services already exist and should be extended rather than rewritten:

```text
SpreadsheetImportService
GoogleSheetImportService
GoogleSheetReaderService
EntityImportService
AttributeSyncService
ImportRegistryService
ValidationService
```

Existing contracts:

```ts
ImportTarget
ImportContext
ImportReport
RowSyncResult
SyncMode
ValidationResult
```

Preserve these abstractions.

---

# Functional Requirements

---

## Sheet → Entity Mapping

Worksheet names map directly to entities.

Example:

```text
uom_category
uom
item_category
classification
item
drug
```

Sheet:

```text
item
```

maps to:

```text
item entity
item repository
item table
```

No entity-specific importers.

---

## Synchronization Rules

Every importable entity contains:

```text
uuid
code
```

Lookup order:

```text
1. uuid
2. code
3. create new
```

Behavior:

```text
existing uuid -> update
existing code -> update
missing -> create
```

Codes may change.

UUID is authoritative.

---

## UUID Writeback

When a row creates a new record:

```text
uuid empty
```

Importer must:

```text
generate uuid
save entity
record generated uuid
write uuid back into source spreadsheet
```

Spreadsheet update occurs after sheet processing.

---

## Relation Resolution

Convention:

```regex
(.+)_code$
```

Examples:

```text
uom_category_code
classification_code
category_code
```

Resolved through cache.

Example:

```text
uom_category_code=MASS
```

↓

```text
uomCategoryId=123
```

No relation ids.

No relation uuids.

---

## Sheet Order

Workbook order is authoritative.

Process sheets exactly in workbook order.

Do not build dependency graphs.

---

# EAV Support

Tables:

## Attribute

```text
id
uuid
code
name
```

## AttributeValue

```text
id
entityType
entityUuid
attributeId
value
```

Configuration:

```ts
{
  item: {
    eav: [
      'color',
      'weight',
      'size'
    ]
  }
}
```

Configured EAV fields are stored in AttributeValue.

---

# EAV Synchronization

Current implementation inserts duplicates.

Replace with upsert behavior.

Preload:

```text
all attributes
all attribute values
```

Build cache:

```ts
Map<
 entityType:entityUuid:attributeId,
 AttributeValue
>
```

Behavior:

```text
existing -> update
missing -> insert
```

No duplicate attribute values.

---

# Validation Layer

Implement ValidationService.

Must validate:

## Duplicate UUID

Duplicate uuid within spreadsheet.

## Duplicate Code

Duplicate code within spreadsheet.

## Missing Code

code required.

## Invalid Relations

Unresolvable relation codes.

## Missing EAV Attributes

Configured attribute does not exist.

## Unknown Columns

Optional strict mode support.

---

# Sync Modes

Support:

```ts
enum SyncMode {
  INSERT_ONLY,
  UPDATE_ONLY,
  UPSERT,
  FULL_SYNC,
}
```

---

## INSERT_ONLY

```text
existing -> error
new -> create
```

---

## UPDATE_ONLY

```text
existing -> update
new -> error
```

---

## UPSERT

```text
existing -> update
new -> create
```

---

## FULL_SYNC

```text
existing -> update
new -> create
missing -> deactivate
```

Do not hard delete.

Implement generic soft-deactivation.

Config:

```ts
{
  softDeleteField: 'active'
}
```

Default:

```text
active
```

When entity exists in database but not spreadsheet:

```text
active=false
```

---

# Import Context

Use per-import context.

Never store caches in singleton service state.

Example:

```ts
class ImportContext {
  caches
  results
}
```

---

# Row-Level Error Handling

Do not abort imports.

Bad rows:

```text
ERROR
```

Good rows:

```text
SUCCESS
```

Continue processing.

---

# Spreadsheet Status Updates

Add automatic system columns:

```text
sync_status
sync_message
sync_time
```

Also update:

```text
uuid
```

for newly created records.

Examples:

```text
SUCCESS
Created
```

```text
SUCCESS
Updated
```

```text
ERROR
Unable to resolve category MASSX
```

---

# Spreadsheet Writer Abstraction

Implement:

```ts
interface SpreadsheetStatusWriter {
  updateRows(...)
}
```

Implementations:

## ExcelStatusWriter

Uses XLSX.

Supports:

```text
uuid
sync_status
sync_message
sync_time
```

updates.

---

## GoogleSheetStatusWriter

Uses Google Sheets API.

Supports:

```text
uuid
sync_status
sync_message
sync_time
```

updates.

---

# ImportTarget Abstraction

Implement:

```ts
interface ImportTarget {
  findAll()
  create()
  save()
  getColumns()
}
```

---

# Implementations

## RepositoryImportTarget

TypeORM repository.

---

## QueryBuilderImportTarget

TypeORM QueryBuilder.

---

## ApiImportTarget

HttpService-backed.

---

## DatabaseImportTarget

DataSource.query-backed.

---

# Import Registry

Refactor:

```ts
getRepository()
```

↓

```ts
getTarget()
```

Registry stores ImportTarget instances.

---

# Cache Strategy

Database size is small.

Maximum expected:

```text
< 10,000 rows per entity
```

Allowed strategy:

```text
findAll()
build caches
```

After save:

```text
reload all
rebuild cache
```

Optimization is not required.

Simplicity is preferred.

---

# Import Report

Return:

```ts
interface ImportReport {
  sheet
  processed
  success
  failed
  errors
}
```

Spreadsheet import returns aggregated reports.

---

# Integration Tests

Create a complete integration test suite.

Use:

```text
SQLite in-memory database
```

for all tests.

---

# Test Schema

Create entities:

## UomCategory

```text
id
uuid
code
name
active
```

## Uom

```text
id
uuid
code
name
uomCategoryId
active
```

## Item

```text
id
uuid
code
name
active
```

## Attribute

```text
id
uuid
code
name
```

## AttributeValue

```text
id
entityType
entityUuid
attributeId
value
```

---

# Excel Import Integration Test

Create workbook:

## uom_category

```text
uuid
code
name
```

Rows:

```text
MASS
LENGTH
```

---

## uom

```text
uuid
code
name
uom_category_code
```

Rows:

```text
KG -> MASS
G -> MASS
M -> LENGTH
```

Run import.

Verify:

```text
records created
relations resolved
uuids assigned
status columns updated
```

---

# Google Sheets Integration Test

Mock Google Sheets API.

Provide identical data.

Verify:

```text
sheet order processing
relations resolved
status updates sent
uuid updates sent
```

---

# Update Test

Import initial workbook.

Import second workbook:

```text
same uuid
different code
different name
```

Verify:

```text
existing entity updated
no duplicate created
```

---

# EAV Test

Configure:

```ts
item: {
  eav: ['color']
}
```

Workbook:

```text
uuid
code
name
color
```

Verify:

```text
AttributeValue created
```

Reimport:

```text
color changes
```

Verify:

```text
AttributeValue updated
not duplicated
```

---

# Validation Test

Workbook contains:

```text
duplicate code
```

Verify:

```text
validation error
sheet status updated
```

---

# FULL_SYNC Test

Database:

```text
A
B
C
```

Workbook:

```text
A
B
```

Verify:

```text
C.active=false
```

---

# Expected Deliverables

Implement:

```text
ImportRegistryService
RepositoryImportTarget
QueryBuilderImportTarget
ApiImportTarget
DatabaseImportTarget
SpreadsheetStatusWriter
ExcelStatusWriter
GoogleSheetStatusWriter
UUID writeback
AttributeSyncService upsert logic
FULL_SYNC support
```

Add:

```text
integration tests
SQLite test database
Google Sheets mock
Excel workbook fixtures
```

All tests must pass.
