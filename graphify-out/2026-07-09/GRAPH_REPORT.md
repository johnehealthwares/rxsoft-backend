# Graph Report - /Users/john/develop/rxsoft/rxsoft-backend  (2026-07-09)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 7910 nodes · 22177 edges · 243 communities (215 shown, 28 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 1106 edges (avg confidence: 0.65)
- Token cost: 11,006 input · 12,668 output

## Graph Freshness
- Built from commit: `5153384c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- URL Parameter Normalization
- UI Component Library
- Website Layout & Auth
- Route Building Utilities
- APM Module Entities
- React Fiber Work Loop
- Flow Graph Manipulation
- Admin Hooks & Queries
- NestJS App Configuration
- App Shell Layout
- React Suspense & Resources
- Data Fetching Utilities
- Data Page UI Components
- Branch & Consultation Entities
- Goods Receipt Entities
- Auth Token Management
- APM Election & GOTV
- Audit Log Controller
- Sales Controller
- NestJS HTTP Decorators
- React Commit Phase
- Item & Category Entities
- Purchases Controller
- APM Content & Tour
- APM Frontend Pages
- Party ORM Entity
- Time Picker Utilities
- React Event System
- Receivables ORM Entities
- Create Page Components
- Stock Locations Controller
- Accounting Controller
- Pricing Controller
- Generic Products CRUD
- Number Input Utilities
- Accounting Module
- Organizations Controller
- Categories Controller
- Audit Log Entity
- APM Admin Dashboard
- APM Election Service
- Auth Proxy Controller
- Manufacturers Controller
- Backoff & React Effects
- Receivables API & Cache
- Receivable Entities
- APM Canvassing Module
- React Commit Callbacks
- NestJS Common Decorators
- Warehouse Controller & Entity
- Purchases DTOs
- Point of Sale Components
- React Query Utilities
- Integration Test Helpers
- Payment Methods Controller
- Floating UI Utilities
- Auth Pages & Form Utils
- React Query Provider
- Website Admin & DTOs
- Submission ORM Entities
- Drug Components Controller
- Receivables Operations
- Audit Module
- Canvassing Mongoose Schemas
- Cache Module
- Spreadsheet Import Services
- Conversion Dashboard API
- Blog & Health Entities
- Node Animation Utilities
- Canvassing DTOs
- In-Memory Item Repository
- APM Public Endpoints
- React Hooks Internals
- Project Dependencies
- NestJS Decorators
- Axios Utilities
- Attribute Sync & Import
- Chat UI & API
- Catalog Module & Items
- In-Memory Sales Repository
- User Settings Forms
- APM ORM Entities
- Item Catalog Entities & Mapper
- Sale Detail DTOs
- TypeScript Config
- Mantine Theme Utilities
- DOM Positioning Utilities
- Questionnaire & Conversation UI
- Items Controller
- Inventory & Stock Management
- Dev Dependencies
- APM Geographic Data
- Achievement & Agenda Schemas
- Candidate Tour Schemas
- UOM Category Entity
- Drag Event Utilities
- Import Target Abstractions
- Canvassing Visit Schemas
- Delivery & Order Entities
- Product & Auth Use Cases
- React Utility Hooks
- Item DTOs
- Inventory Stock Management
- File Upload Controller
- Exception Filter & Logging
- Floating UI Utilities
- Spreadsheet Import Framework
- APM Conversion Service
- Generic Drug Cache Service
- React Flow UI Components
- D3 Interpolation Functions
- React Query Mutation
- Suppliers CRUD Controller
- Goods Receipt Controller
- Citizen Feedback ORM Entities
- Classification & Item Categories
- Inventory Controller
- Entity Import Service
- APM Mongo Seed Service
- APM Seed Service
- Goods Receipt DTOs
- NestJS Common Decorators
- General Utility Functions
- React Query Helpers
- Campaign & Event Schemas
- Conversion & Stakeholder Schemas
- Gotv & Incident Schemas
- Purchase Order UI
- Inventory Module & Use Cases
- User POS Config
- D3 Drag & Transform
- React DOM Utilities
- Conversion DTOs
- NestJS Controller Decorators
- Organisation Config Module
- React Query Observer
- Entity Import Sync
- Google Sheet Status Writer
- Inventory Repository Implementations
- Sale DTOs
- Item Seed Data
- Project Scripts
- React UI Sidecar Components
- D3 Selection & Attributes
- Item Dependencies Use Case
- Reports Controller
- Organisation Config Controller
- Organisation Config Entity
- CSS Class Utilities
- Zustand Store Hooks
- Coding Concept Pages
- Redis Client
- UOM DTOs
- Color Format Utilities
- Item List DTO
- Website Auth Controller
- HTTP Header Utilities
- URL Utilities
- Medicine Seed Data
- Stock Movement List DTO
- Permissions Guard
- App Controller
- Stock Balance List DTO
- Create UOM DTO
- List UOMs DTO
- Axios Utilities
- Color Clamping
- Get Item Use Case
- UOM Service
- Jest Configuration
- HTTP Header Parsing
- List Query Filter
- Replace Item DTO
- Pagination Query DTO
- Receive Goods Use Case
- Axios Cancel Token
- Scheduler Utilities
- APM Controllers
- Update Org Config DTO
- Package Metadata
- Axios Instance
- In-Memory Cache Store
- DB Reset & Seed
- Health Check
- Nest CLI Config
- Inventory Use Cases
- Bezier Edge Path
- Edge Path Utilities
- Edge Handle Utilities
- Generic Drug Data
- Event Schema
- News Article Schema
- Polling Unit Schema
- Result Entry Schema
- Testimonial Schema
- Ward Schema
- Stock Adjustment DTO
- Generic ORM Entity
- React Flow Node/Edge Types
- UOM Details Page
- Appointment Entity
- Category Entity
- Customer Entity
- Daily Sale Entity
- Current Stock Entity
- Seed Location & Warehouse
- Stock Balance DTO
- Customer Purchase Entity
- Seed Accounting Data
- Constructor Injection
- TypeScript Build Config
- Adminer PostgreSQL
- Identity Module Summary
- Docker Compose Config
- Catalog Module Summary
- Product Entity
- JWT Auth Guard
- Permission Entity
- Role Entity
- User Entity
- Inventory Module Summary
- Stock Adjustment Entity
- Test Plan Index
- Photo Entity
- Photo Entity
- README Document
- Project Status Overview
- Swagger API Spec
- Generic Products Controller
- Health Controller
- Items Controller
- Yarn Configuration

## God Nodes (most connected - your core abstractions)
1. `RequestUser` - 176 edges
2. `CurrentUser` - 165 edges
3. `constructor()` - 119 edges
4. `useQuery()` - 107 edges
5. `normalizeParams()` - 98 edges
6. `push()` - 87 edges
7. `ListQueryDto` - 82 edges
8. `get()` - 74 edges
9. `DataPageShell()` - 71 edges
10. `WebsiteLayout()` - 67 edges

## Surprising Connections (you probably didn't know these)
- `createIntegrationTestContext()` --references--> `test`  [EXTRACTED]
  src/integration/support/sqlite-test-helpers.ts → package.json
- `seedItemsTemplates()` --indirect_call--> `a()`  [INFERRED]
  src/database/seeds/4-seed-item-template.ts → public/assets/index-DuM1cidb.js
- `seedPriceTemplates()` --indirect_call--> `a()`  [INFERRED]
  src/database/seeds/5-seed-price-template.ts → public/assets/index-DuM1cidb.js
- `MiniMap()` --references--> `transform`  [EXTRACTED]
  public/assets/flow-graph-Dwih7ASd.js → package.json
- `tweenRemove()` --indirect_call--> `i()`  [INFERRED]
  public/assets/flow-graph-Dwih7ASd.js → public/assets/index-DuM1cidb.js

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Identity Authentication & Authorization Flow** — phase3_identity_module_summary_login_use_case, phase3_identity_module_summary_refresh_token_use_case, phase3_identity_module_summary_create_user_use_case, phase3_identity_module_summary_assign_role_use_case, phase3_identity_module_summary_list_users_use_case, phase3_identity_module_summary_jwt_auth_guard, phase3_identity_module_summary_roles_guard, phase3_identity_module_summary_user, phase3_identity_module_summary_role, phase3_identity_module_summary_password_hasher_port, phase3_identity_module_summary_token_issuer_port [INFERRED 0.75]
- **Catalog Product Management Flow** — phase3_catalog_module_summary_create_product_use_case, phase3_catalog_module_summary_get_product_use_case, phase3_catalog_module_summary_list_products_use_case, phase3_catalog_module_summary_product, phase3_catalog_module_summary_generic_product, phase3_catalog_module_summary_pharmacology_info, phase3_catalog_module_summary_product_repository, phase3_catalog_module_summary_products_controller [INFERRED 0.75]
- **Inventory Stock Adjustment Flow** — phase3_inventory_module_summary_create_stock_adjustment_use_case, phase3_inventory_module_summary_list_stock_balances_use_case, phase3_inventory_module_summary_stock_balance, phase3_inventory_module_summary_stock_adjustment, phase3_inventory_module_summary_inventory_repository, phase3_inventory_module_summary_inventory_controller [INFERRED 0.75]
- **ImportTarget Implementations** — src_database_import_prompt_ai_md_repository_import_target, src_database_import_prompt_ai_md_query_builder_import_target, src_database_import_prompt_ai_md_api_import_target, src_database_import_prompt_ai_md_database_import_target [EXTRACTED 1.00]
- **SpreadsheetStatusWriter Implementations** — src_database_import_prompt_ai_md_excel_status_writer, src_database_import_prompt_ai_md_google_sheet_status_writer [EXTRACTED 1.00]
- **Core Existing Services (to extend)** — src_database_import_prompt_ai_md_spreadsheet_import_service, src_database_import_prompt_ai_md_google_sheet_import_service, src_database_import_prompt_ai_md_google_sheet_reader_service, src_database_import_prompt_ai_md_entity_import_service, src_database_import_prompt_ai_md_attribute_sync_service, src_database_import_prompt_ai_md_import_registry_service, src_database_import_prompt_ai_md_validation_service [EXTRACTED 1.00]

## Communities (243 total, 28 thin omitted)

### Community 0 - "URL Parameter Normalization"
Cohesion: 0.01
Nodes (268): RFC-3986, RFC-5322, RFC-9562, active(), applyDerivedStateFromProps(), _array(), _assertThisInitialized(), _base64() (+260 more)

### Community 1 - "UI Component Library"
Cohesion: 0.03
Nodes (161): AccordionChevron(), getInitialsColor(), hashCode(), clsx(), createVarsResolver(), extractStyleProps(), factory(), genericFactory() (+153 more)

### Community 2 - "Website Layout & Auth"
Cohesion: 0.03
Nodes (153): UnauthorisedError(), ForbiddenError(), AboutPage(), AppSidebar(), AuthenticatedLayout(), AutoLogout(), filterNavGroupsByModule(), getModuleDashboard() (+145 more)

### Community 3 - "Route Building Utilities"
Cohesion: 0.03
Nodes (142): from(), buildBranch(), buildRouteBranch(), cleanPath(), ClientOnly(), compileDecodeCharMap(), createDynamicNode(), createLRUCache() (+134 more)

### Community 4 - "APM Module Entities"
Cohesion: 0.02
Nodes (145): ApmModule, Module, AchievementOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn (+137 more)

### Community 5 - "React Fiber Work Loop"
Cohesion: 0.03
Nodes (144): aborted(), assertIsMounted(), attemptEarlyBailoutIfNoScheduledUpdate(), bailoutHooks(), bailoutOffscreenComponent(), bailoutOnAlreadyFinishedWork(), beginWork(), callComponentWillReceiveProps() (+136 more)

### Community 6 - "Flow Graph Manipulation"
Cohesion: 0.02
Nodes (34): applyChanges(), applyNodeChanges(), childFind(), childMatcher(), childrenFilter(), Color(), contextListener(), decompose_default() (+26 more)

### Community 7 - "Admin Hooks & Queries"
Cohesion: 0.07
Nodes (86): invalidateApmAdmin(), useAgents(), useAgentStats(), useAllVisitStats(), useCanvassingSessions(), useCanvassingStats(), useContentAssets(), useConversionDashboard() (+78 more)

### Community 8 - "NestJS App Configuration"
Cohesion: 0.05
Nodes (59): appConfigService, databaseConfig, AuditAction(), Roles(), JwtAuthGuard, Injectable, RolesGuard, Injectable (+51 more)

### Community 9 - "App Shell Layout"
Cohesion: 0.04
Nodes (92): AppShellMediaStyles(), assignAsideVariables(), assignFooterVariables(), assignHeaderVariables(), assignNavbarVariables(), assignPaddingVariables(), getBaseSize(), getPaddingValue() (+84 more)

### Community 10 - "React Suspense & Resources"
Cohesion: 0.04
Nodes (104): accumulateSuspenseyCommitOnFiber(), acquireResource(), add(), addTrappedEventListener(), adoptPreloadPropsForScript(), adoptPreloadPropsForStylesheet(), attachPingListener(), attachSuspenseRetryListeners() (+96 more)

### Community 11 - "Data Fetching Utilities"
Cohesion: 0.03
Nodes (100): LayoutProvider(), allSettled(), batch(), build(), buildAttributeFields(), cancelQueries(), canRun(), catch() (+92 more)

### Community 12 - "Data Page UI Components"
Cohesion: 0.06
Nodes (64): ConfirmDialog(), UomEditRoute(), DataPageShell(), DebouncedTextInput(), DialogActions(), formatJson(), getDirtyPayload(), getErrorMessage() (+56 more)

### Community 13 - "Branch & Consultation Entities"
Cohesion: 0.03
Nodes (75): BranchOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ConsultationChannel (+67 more)

### Community 14 - "Goods Receipt Entities"
Cohesion: 0.05
Nodes (50): GoodsReceiptLineOrmEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn (+42 more)

### Community 15 - "Auth Token Management"
Cohesion: 0.03
Nodes (92): clearTokens(), decodeUserFromAccessToken(), getAccessToken(), getRefreshToken(), persistTokens(), creatorInherit(), ack(), addEventListeners() (+84 more)

### Community 16 - "APM Election & GOTV"
Cohesion: 0.08
Nodes (34): ApmAgentController, ApmGotvController, ApmIncidentController, ApmResultController, ApiBearerAuth, ApiOperation, ApiTags, Body (+26 more)

### Community 17 - "Audit Log Controller"
Cohesion: 0.04
Nodes (52): AuditController, ApiBearerAuth, ApiTags, Controller, Get, Query, Roles, UseGuards (+44 more)

### Community 18 - "Sales Controller"
Cohesion: 0.04
Nodes (64): SalesController, SalesListResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, AuditAction, Body (+56 more)

### Community 19 - "NestJS HTTP Decorators"
Cohesion: 0.06
Nodes (19): ApiBody, ApiConsumes, Req, ApiBearerAuth, ApiOperation, ApiTags, Body, Controller (+11 more)

### Community 20 - "React Commit Phase"
Cohesion: 0.05
Nodes (81): bubbleProperties(), captureCommitPhaseErrorOnRoot(), checkIfRootIsPrerendering(), claimNextRetryLane(), commitRoot(), commitRootWhenReady(), compare(), completeUnitOfWork() (+73 more)

### Community 21 - "Item & Category Entities"
Cohesion: 0.04
Nodes (73): ItemOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn (+65 more)

### Community 22 - "Purchases Controller"
Cohesion: 0.18
Nodes (16): PurchasesController, ApiBearerAuth, ApiTags, AuditAction, Body, Controller, Delete, Get (+8 more)

### Community 23 - "APM Content & Tour"
Cohesion: 0.06
Nodes (29): ApmContentController, ApmListeningController, ApmTourController, ApmTruthDeskController, ApiBearerAuth, ApiOperation, ApiTags, Body (+21 more)

### Community 24 - "APM Frontend Pages"
Cohesion: 0.10
Nodes (47): AchievementsPage(), AgendaPage(), AgendaSection(), ApmHomepage(), CitizensSpeakForm(), getInfoValue(), JoinMovementForm(), MediaGallery() (+39 more)

### Community 25 - "Party ORM Entity"
Cohesion: 0.05
Nodes (38): RelationId, PartyOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique (+30 more)

### Community 26 - "Time Picker Utilities"
Cohesion: 0.10
Nodes (25): AmPmControlsList(), clampTime(), convertTimeTo12HourFormat(), convertTo24HourFormat(), getData(), getFormattedTime(), getParsedTime(), getTimeFromDate() (+17 more)

### Community 27 - "React Event System"
Cohesion: 0.04
Nodes (87): accumulateEnterLeaveListenersForEvent(), accumulateOrCreateContinuousQueuedReplayableEvent(), accumulateTwoPhaseListeners(), attemptContinuousHydration(), attemptExplicitHydrationTarget(), attemptHydrationAtCurrentPriority(), attemptReplayContinuousQueuedEvent(), attemptReplayContinuousQueuedEventInMap() (+79 more)

### Community 28 - "Receivables ORM Entities"
Cohesion: 0.05
Nodes (52): PaymentMethodOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, SaleLineOrmEntity (+44 more)

### Community 29 - "Create Page Components"
Cohesion: 0.05
Nodes (32): GenericCreatePage(), GenericCreatePage(), ItemCreatePage(), DataPageForm(), getModelConfig(), cleanNotifications(), cleanNotificationsQueue(), getDistributedNotifications() (+24 more)

### Community 30 - "Stock Locations Controller"
Cohesion: 0.07
Nodes (44): StockLocationsController, ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Get (+36 more)

### Community 31 - "Accounting Controller"
Cohesion: 0.07
Nodes (52): CurrentUser, RequestUser, AccountingController, GlAccountListResponse, JournalEntryLineListResponse, JournalEntryListResponse, JournalListResponse, ApiBearerAuth (+44 more)

### Community 32 - "Pricing Controller"
Cohesion: 0.09
Nodes (37): PricingController, ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Delete (+29 more)

### Community 33 - "Generic Products CRUD"
Cohesion: 0.04
Nodes (63): GenericProductsController, ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Get (+55 more)

### Community 34 - "Number Input Utilities"
Cohesion: 0.07
Nodes (50): clamp(), SpinInput(), addInputMode(), applyThousandSeparator(), canStep(), canStepBigInt(), caretUnknownFormatBoundary(), charIsNumber() (+42 more)

### Community 35 - "Accounting Module"
Cohesion: 0.07
Nodes (40): AccountingModule, Module, GlAccountOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique (+32 more)

### Community 36 - "Organizations Controller"
Cohesion: 0.07
Nodes (41): OrganizationListResponse, OrganizationsController, ApiBearerAuth, ApiTags, AuditAction, Body, Controller, Delete (+33 more)

### Community 37 - "Categories Controller"
Cohesion: 0.07
Nodes (36): CategoriesController, ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Delete, Get (+28 more)

### Community 38 - "Audit Log Entity"
Cohesion: 0.06
Nodes (49): AuditLogOrmEntity, Column, PrimaryGeneratedColumn, InjectRepository, AuditLogType, AccountReceivableEntityType, AuditLogEntityType, CatalogItemCategoryEntityType (+41 more)

### Community 39 - "APM Admin Dashboard"
Cohesion: 0.08
Nodes (18): ApmAdminController, ApiBearerAuth, ApiOperation, ApiTags, Controller, Get, Query, Roles (+10 more)

### Community 40 - "APM Election Service"
Cohesion: 0.05
Nodes (9): ListQueryDto, IsInt, Max, Min, Type, ApmElectionMongoService, Injectable, ApmMongoService (+1 more)

### Community 41 - "Auth Proxy Controller"
Cohesion: 0.06
Nodes (27): AuthProxyController, ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Get, Headers (+19 more)

### Community 42 - "Manufacturers Controller"
Cohesion: 0.07
Nodes (39): ManufacturersController, ApiBearerAuth, ApiTags, AuditAction, Body, Controller, Delete, Get (+31 more)

### Community 43 - "Backoff & React Effects"
Cohesion: 0.04
Nodes (49): Backoff(), catchall(), _check(), clone(), cloneDef(), commitBeforeMutationEffects(), containsNode(), convertBaseSchema() (+41 more)

### Community 44 - "Receivables API & Cache"
Cohesion: 0.07
Nodes (27): ReceivableMutationResponse, ReceivablesListResponse, ReceivableTransactionsListResponse, ReceivableResponseDto, ApiProperty, ReceivableTransactionResponseDto, ApiProperty, ApiPropertyOptional (+19 more)

### Community 45 - "Receivable Entities"
Cohesion: 0.08
Nodes (32): AccountReceivable, ReceivableTransaction, ReceivableTransactionOrmEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne (+24 more)

### Community 46 - "APM Canvassing Module"
Cohesion: 0.10
Nodes (18): controllers, ApmCanvassingController, ApmSentimentController, ApmVolunteerAssignmentController, ApiBearerAuth, ApiOperation, ApiTags, Body (+10 more)

### Community 47 - "React Commit Callbacks"
Cohesion: 0.08
Nodes (49): callCallback(), captureCommitPhaseError(), clearContainerSparingly(), clearHydrationBoundary(), commitActivityHydrationCallbacks(), commitCachePassiveMountEffect(), commitCallbacks(), commitClassCallbacks() (+41 more)

### Community 48 - "NestJS Common Decorators"
Cohesion: 0.08
Nodes (33): ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Get, Param, Patch (+25 more)

### Community 49 - "Warehouse Controller & Entity"
Cohesion: 0.09
Nodes (31): ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Delete, Get (+23 more)

### Community 50 - "Purchases DTOs"
Cohesion: 0.16
Nodes (17): CreatePurchaseDto, CreatePurchaseLineDto, PurchaseLineDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString, IsIn (+9 more)

### Community 51 - "Point of Sale Components"
Cohesion: 0.09
Nodes (37): useMantineStyleNonce(), onClose(), calculateTotals(), CartTable(), createSale(), CustomerQuickAddModal(), getHotkeyMatcher(), HeldSalesDrawer() (+29 more)

### Community 52 - "React Query Utilities"
Cohesion: 0.09
Nodes (36): createResult(), addConsumeAwareSignal(), ensureQueryFn(), noop(), replaceData(), cancel(), #clearStaleTimeout(), destroy() (+28 more)

### Community 53 - "Integration Test Helpers"
Cohesion: 0.15
Nodes (16): createIntegrationTestContext(), destroyIntegrationTestContext(), hasDbTestDeps, hasLoopbackSocketPermission, IntegrationTestContext, Repositories, seedBaseData(), SeededIds (+8 more)

### Community 54 - "Payment Methods Controller"
Cohesion: 0.09
Nodes (29): PaymentMethodsController, ApiBearerAuth, ApiTags, AuditAction, Body, Controller, Delete, Get (+21 more)

### Community 55 - "Floating UI Utilities"
Cohesion: 0.11
Nodes (36): clamp(), computeCoordsFromPlacement(), convertValueToCoords(), evaluate(), expandPaddingObject(), fn(), getAlignment(), getAlignmentAxis() (+28 more)

### Community 56 - "Auth Pages & Form Utils"
Cohesion: 0.12
Nodes (40): ForgotPassword(), AuthLayout(), path(), RxResetPasswordPage(), changeErrorIndices(), clearListState(), fieldResultFromErrors(), filterErrors() (+32 more)

### Community 57 - "React Query Provider"
Cohesion: 0.08
Nodes (34): handleErrorInNextTick(), RxWarehousesPage(), Y(), addToEnd(), addToStart(), canFetch(), clearGcTimeout(), clearInterval() (+26 more)

### Community 58 - "Website Admin & DTOs"
Cohesion: 0.18
Nodes (37): ORDER_STATUS_TRANSITIONS, AddToCartDto, CreateArticleDto, CreateConsultationDto, CreateContactDto, CreateDeliveryDto, CreateHealthConcernDto, CreateOrderDto (+29 more)

### Community 59 - "Submission ORM Entities"
Cohesion: 0.05
Nodes (34): ContactSubmissionOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, DonationOrmEntity, Column, CreateDateColumn (+26 more)

### Community 60 - "Drug Components Controller"
Cohesion: 0.09
Nodes (25): DrugComponentsController, ApiBearerAuth, ApiTags, AuditAction, Body, Controller, Delete, Get (+17 more)

### Community 61 - "Receivables Operations"
Cohesion: 0.08
Nodes (32): ReceivablesController, toReceivableResponse(), toTransactionResponse(), ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body (+24 more)

### Community 62 - "Audit Module"
Cohesion: 0.09
Nodes (22): AUDIT_LOG_REPOSITORY, auditConfigService, AuditModule, Global, Module, AuditLogOrmEntity, Column, CreateDateColumn (+14 more)

### Community 63 - "Canvassing Mongoose Schemas"
Cohesion: 0.08
Nodes (32): CanvassingSessionDocument, CanvassingSessionSchema, CanvassingSessionSchemaFactory, Prop, Schema, ContactSubmissionDocument, ContactSubmissionSchema, ContactSubmissionSchemaFactory (+24 more)

### Community 64 - "Cache Module"
Cohesion: 0.08
Nodes (15): CacheModule, Global, Module, AppCacheService, Injectable, Inject, Optional, Inject (+7 more)

### Community 65 - "Spreadsheet Import Services"
Cohesion: 0.10
Nodes (13): xlsx, ExcelStatusWriter, SpreadsheetImportService, Injectable, GoogleSheetImportService, Injectable, GoogleSheetReaderService, Injectable (+5 more)

### Community 66 - "Conversion Dashboard API"
Cohesion: 0.17
Nodes (5): ApiOperation, Get, Param, Query, Roles

### Community 67 - "Blog & Health Entities"
Cohesion: 0.07
Nodes (26): BlogArticleOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, HealthConcernOrmEntity (+18 more)

### Community 68 - "Node Animation Utilities"
Cohesion: 0.07
Nodes (36): AENode(), bindKey(), calcNextPosition(), calculateXYZPosition(), clampNodeExtent(), createNodeInternals(), delay_default(), delayConstant() (+28 more)

### Community 69 - "Canvassing DTOs"
Cohesion: 0.12
Nodes (15): CreateCanvassingSessionDto, CreateCanvassingVisitDto, CreateVolunteerAssignmentDto, ApiProperty, ApiPropertyOptional, IsInt, IsNotEmpty, IsOptional (+7 more)

### Community 70 - "In-Memory Item Repository"
Cohesion: 0.10
Nodes (11): Item, InMemoryItemRepository, Injectable, GenericProductLookup, ItemCategoryLookup, ItemDependencySearchQuery, ItemListQuery, ItemMetrics (+3 more)

### Community 71 - "APM Public Endpoints"
Cohesion: 0.21
Nodes (17): Body, Post, CitizenFeedbackDto, CreateContactDto, DonationDto, EventRegistrationDto, IssueReportDto, JoinMovementDto (+9 more)

### Community 72 - "React Hooks Internals"
Cohesion: 0.09
Nodes (34): actionStateReducer(), areHookInputsEqual(), basicStateReducer(), createFunctionComponentUpdateQueue(), mountActionState(), mountEffect(), mountEffectImpl(), mountStateImpl() (+26 more)

### Community 73 - "Project Dependencies"
Cohesion: 0.06
Nodes (33): dependencies, axios, class-transformer, class-validator, cloudinary, cross-fetch, dotenv, exceljs (+25 more)

### Community 74 - "NestJS Decorators"
Cohesion: 0.15
Nodes (17): ApiQuery, ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Delete, Get (+9 more)

### Community 75 - "Axios Utilities"
Cohesion: 0.08
Nodes (14): concat(), dispatchRequest(), formDataToJSON(), isCancel$1(), parsePropPath(), remove(), removeBrackets(), renderKey() (+6 more)

### Community 76 - "Attribute Sync & Import"
Cohesion: 0.12
Nodes (12): AttributeSyncService, Injectable, IMPORT_CONFIG, ImportRegistryService, Injectable, DatabaseImportTarget, EntityCache, ImportEntityConfig (+4 more)

### Community 77 - "Chat UI & API"
Cohesion: 0.12
Nodes (22): Chats(), ChatUiPage(), ConversationListItem(), ConversationThread(), fetchConversationInbox(), fetchConversationMessages(), fetchNextPage(), getConversationSocket() (+14 more)

### Community 78 - "Catalog Module & Items"
Cohesion: 0.15
Nodes (13): catalogConfigService, CatalogModule, Module, ItemDependencyResponse, ItemListResponse, ITEM_REPOSITORY, CreateItemUseCase, Injectable (+5 more)

### Community 79 - "In-Memory Sales Repository"
Cohesion: 0.14
Nodes (13): Sale, InMemorySalesRepository, Injectable, CreateSaleRefundRepositoryPayload, CreateSaleRefundResult, CreateSaleRepositoryPayload, CreateSaleResult, SalesListQuery (+5 more)

### Community 80 - "User Settings Forms"
Cohesion: 0.20
Nodes (22): AccountForm(), SettingsAccount(), AppearanceForm(), SettingsAppearance(), ContentSection(), DisplayForm(), SettingsDisplay(), decrease() (+14 more)

### Community 81 - "APM ORM Entities"
Cohesion: 0.07
Nodes (25): CandidateTourOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ContentAssetOrmEntity, Column (+17 more)

### Community 82 - "Item Catalog Entities & Mapper"
Cohesion: 0.12
Nodes (13): ItemCategory, ForeignProperty, GenericProductResponse, ItemCategoryResponse, PharmaceuticsResponse, ApiProperty, CatalogMapper, findByBarcode() (+5 more)

### Community 83 - "Sale Detail DTOs"
Cohesion: 0.36
Nodes (10): SaleDetailCategoryDto, SaleDetailCustomerDto, SaleDetailItemDto, SaleDetailLineDto, SaleDetailPaymentDto, SaleDetailPaymentMethodDto, SaleDetailResponseDto, SaleDetailUomDto (+2 more)

### Community 84 - "TypeScript Config"
Cohesion: 0.07
Nodes (28): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, esModuleInterop, experimentalDecorators, forceConsistentCasingInFileNames (+20 more)

### Community 85 - "Mantine Theme Utilities"
Cohesion: 0.09
Nodes (24): deepMerge(), isObject(), MantineThemeProvider(), convertCssVariables(), cssVariablesObjectToString(), getColorSchemeCssVariables(), getElement(), getMergedVariables() (+16 more)

### Community 86 - "DOM Positioning Utilities"
Cohesion: 0.15
Nodes (30): contains(), createAttribute(), getClippingElementAncestors(), getComputedStyle$1(), getContainingBlock(), getFrameElement(), getNearestOverflowAncestor(), getNodeChildren() (+22 more)

### Community 87 - "Questionnaire & Conversation UI"
Cohesion: 0.15
Nodes (24): getRowsFromPayload(), RemoteSelectField(), useApiProvider(), ConversationLoader(), CreateConversationForm(), decorateConversations(), EntryModeTabs(), formatAnswer() (+16 more)

### Community 88 - "Items Controller"
Cohesion: 0.20
Nodes (17): ItemsController, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, AuditAction, Body, Controller (+9 more)

### Community 89 - "Inventory & Stock Management"
Cohesion: 0.09
Nodes (9): StockBalance, InventoryRepository, Inject, Optional, Inject, Optional, Inject, Optional (+1 more)

### Community 90 - "Dev Dependencies"
Cohesion: 0.07
Nodes (27): devDependencies, eslint, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-prettier, globals, jest (+19 more)

### Community 91 - "APM Geographic Data"
Cohesion: 0.15
Nodes (8): ApmDataController, ApiOperation, ApiTags, Controller, Get, Param, ApmConversionService, Injectable

### Community 92 - "Achievement & Agenda Schemas"
Cohesion: 0.08
Nodes (21): AchievementDocument, AchievementSchema, AchievementSchemaFactory, Prop, Schema, AgendaItemDocument, AgendaItemSchema, AgendaItemSchemaFactory (+13 more)

### Community 93 - "Candidate Tour Schemas"
Cohesion: 0.08
Nodes (21): CandidateTourDocument, CandidateTourSchema, CandidateTourSchemaFactory, Prop, Schema, ContentAssetDocument, ContentAssetSchema, ContentAssetSchemaFactory (+13 more)

### Community 94 - "UOM Category Entity"
Cohesion: 0.09
Nodes (20): Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn, UomCategoryOrmEntity (+12 more)

### Community 95 - "Drag Event Utilities"
Cohesion: 0.10
Nodes (25): copy(), dispatchConstant(), dispatchEvent(), dispatchFunction(), DragEvent(), end_default(), nodrag_default(), noevent_default$1() (+17 more)

### Community 96 - "Import Target Abstractions"
Cohesion: 0.09
Nodes (4): ApiImportTarget, QueryBuilderImportTarget, RepositoryImportTarget, ImportTarget

### Community 97 - "Canvassing Visit Schemas"
Cohesion: 0.08
Nodes (21): CanvassingVisitDocument, CanvassingVisitSchema, CanvassingVisitSchemaFactory, Prop, Schema, CitizenFeedbackDocument, CitizenFeedbackSchema, CitizenFeedbackSchemaFactory (+13 more)

### Community 98 - "Delivery & Order Entities"
Cohesion: 0.08
Nodes (25): DeliveryOrmEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn (+17 more)

### Community 99 - "Product & Auth Use Cases"
Cohesion: 0.11
Nodes (24): Phase 3 Additional Test Cases, Create Product Use Case, Generic Product Entity, Get Product Use Case, InMemory Product Repository, List Products Use Case, Pharmacology Info Entity, Product Repository Interface (+16 more)

### Community 100 - "React Utility Hooks"
Cohesion: 0.10
Nodes (24): clearTimeoutIfSet(), createEventEmitter(), deepEqual(), getDelay(), getDocument(), getDPR(), getFloatingFocusElement(), isMouseLikePointerType() (+16 more)

### Community 101 - "Item DTOs"
Cohesion: 0.08
Nodes (19): CreateItemDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString (+11 more)

### Community 102 - "Inventory Stock Management"
Cohesion: 0.17
Nodes (12): StockAdjustment, ItemReference, StockLocationReference, StockLotReference, InventoryMapper, AdjustStockByReferencePayload, CreateStoreStockLocationPayload, StockBalanceQuery (+4 more)

### Community 103 - "File Upload Controller"
Cohesion: 0.11
Nodes (15): Body, Controller, Delete, Inject, Post, Roles, UseGuards, UseInterceptors (+7 more)

### Community 104 - "Exception Filter & Logging"
Cohesion: 0.11
Nodes (15): Catch, AppModule, Module, GlobalExceptionFilter, PG_ERROR_CODES, maskSensitive(), RequestLoggingInterceptor, SafeBody (+7 more)

### Community 105 - "Floating UI Utilities"
Cohesion: 0.19
Nodes (24): autoUpdate(), convertOffsetParentRelativeRectToViewportRelativeRect(), detectOverflow(), getBoundingClientRect(), getClientRectFromClippingAncestor(), getClippingRect(), getCssDimensions(), getDocumentElement() (+16 more)

### Community 106 - "Spreadsheet Import Framework"
Cohesion: 0.11
Nodes (24): ApiImportTarget, AttributeSyncService, DatabaseImportTarget, Complete Generic Spreadsheet Import Framework Specification, EAV (Entity-Attribute-Value), EntityImportService, ExcelStatusWriter, FULL_SYNC Support (+16 more)

### Community 108 - "Generic Drug Cache Service"
Cohesion: 0.10
Nodes (11): Inject, Optional, Inject, Optional, GenericDrugCacheService, Injectable, CachedGenericProduct, GenericProductLookup (+3 more)

### Community 109 - "React Flow UI Components"
Cohesion: 0.12
Nodes (23): A11yDescriptions(), areEqual(), AriaLiveMessage(), Attribution(), Background(), cc(), ConnectionLineWrapper(), DotPattern() (+15 more)

### Community 110 - "D3 Interpolation Functions"
Cohesion: 0.10
Nodes (23): attrInterpolate(), attrInterpolateNS(), exponential(), gamma(), interpolateTransform(), number_default(), on_default$1(), one() (+15 more)

### Community 111 - "React Query Mutation"
Cohesion: 0.15
Nodes (17): setMutationDefaults(), setQueryDefaults(), hashKey(), shallowEqualObjects(), bindMethods(), constructor(), continue(), #dispatch() (+9 more)

### Community 112 - "Suppliers CRUD Controller"
Cohesion: 0.09
Nodes (18): SuppliersController, ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Get (+10 more)

### Community 113 - "Goods Receipt Controller"
Cohesion: 0.15
Nodes (17): InflowController, ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller, Get (+9 more)

### Community 114 - "Citizen Feedback ORM Entities"
Cohesion: 0.09
Nodes (18): CitizenFeedbackOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Entity (+10 more)

### Community 115 - "Classification & Item Categories"
Cohesion: 0.10
Nodes (19): ClassificationOrmEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn (+11 more)

### Community 116 - "Inventory Controller"
Cohesion: 0.21
Nodes (15): InventoryController, mapBalance(), ApiBearerAuth, ApiOperation, ApiTags, AuditAction, Body, Controller (+7 more)

### Community 117 - "Entity Import Service"
Cohesion: 0.17
Nodes (5): Injectable, EntityImportService, ValidationError, Injectable, ValidationService

### Community 120 - "Goods Receipt DTOs"
Cohesion: 0.18
Nodes (14): GoodsReceiptLineResponseDto, GoodsReceiptResponseDto, ReceiveGoodsDto, ReceiveGoodsLineDto, ApiProperty, ApiPropertyOptional, IsArray, IsDateString (+6 more)

### Community 121 - "NestJS Common Decorators"
Cohesion: 0.18
Nodes (15): ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Get, Param, Patch (+7 more)

### Community 122 - "General Utility Functions"
Cohesion: 0.13
Nodes (20): throttle(), array(), arrayAll(), clearNow(), create(), inherit(), nap(), newId() (+12 more)

### Community 123 - "React Query Helpers"
Cohesion: 0.16
Nodes (20): ensureInfiniteQueryData(), ensureQueryData(), fetchInfiniteQuery(), fetchQuery(), ToggleActive(), resolveQueryBoolean(), resolveStaleTime(), timeUntilStale() (+12 more)

### Community 124 - "Campaign & Event Schemas"
Cohesion: 0.10
Nodes (16): CampaignInfoDocument, CampaignInfoSchema, CampaignInfoSchemaFactory, Prop, Schema, EventRegistrationDocument, EventRegistrationSchema, EventRegistrationSchemaFactory (+8 more)

### Community 125 - "Conversion & Stakeholder Schemas"
Cohesion: 0.10
Nodes (16): ConversionScoreDocument, ConversionScoreSchema, ConversionScoreSchemaFactory, Prop, Schema, StakeholderDocument, StakeholderSchema, StakeholderSchemaFactory (+8 more)

### Community 126 - "Gotv & Incident Schemas"
Cohesion: 0.10
Nodes (16): GotvRecordDocument, GotvRecordSchema, GotvRecordSchemaFactory, Prop, Schema, IncidentReportDocument, IncidentReportSchema, IncidentReportSchemaFactory (+8 more)

### Community 127 - "Purchase Order UI"
Cohesion: 0.20
Nodes (17): PoLinesTable(), PoSettingsDrawer(), PoSummary(), PoToolbar(), PurchasesPage(), QuickAddSupplierModal(), UnpostPasswordModal(), UomSelect() (+9 more)

### Community 128 - "Inventory Module & Use Cases"
Cohesion: 0.22
Nodes (8): inventoryConfigService, CreateStockAdjustmentUseCase, Injectable, INVENTORY_REPOSITORY, ListStockBalancesUseCase, Injectable, ListStockMovementsUseCase, Injectable

### Community 129 - "User POS Config"
Cohesion: 0.16
Nodes (13): Body, Get, Patch, Roles, ApiPropertyOptional, IsBoolean, IsInt, IsOptional (+5 more)

### Community 130 - "D3 Drag & Transform"
Cohesion: 0.11
Nodes (18): transform, ^.+\\.(t|j)s$, arraylike(), constant_default$3(), cosh(), data_default(), datum(), defaultTransform() (+10 more)

### Community 131 - "React DOM Utilities"
Cohesion: 0.15
Nodes (8): createPortal(), createPortal$1(), formatProdErrorMessage(), getCrossOriginStringAs(), preinit(), preinitModule(), preload(), preloadModule()

### Community 132 - "Conversion DTOs"
Cohesion: 0.35
Nodes (15): CreateConversionActivityDto, CreateStakeholderDto, CreateWhatsAppGroupDto, ApiProperty, ApiPropertyOptional, IsInt, IsNotEmpty, IsOptional (+7 more)

### Community 133 - "NestJS Controller Decorators"
Cohesion: 0.19
Nodes (13): ApiBearerAuth, ApiOperation, ApiTags, Body, Controller, Get, Headers, Param (+5 more)

### Community 134 - "Organisation Config Module"
Cohesion: 0.12
Nodes (13): InjectEntityManager, OrganisationConfigModule, Module, ApiBearerAuth, ApiTags, Controller, UseGuards, UserPosConfigController (+5 more)

### Community 135 - "React Query Observer"
Cohesion: 0.19
Nodes (17): isValidTimeout(), addObserver(), bindMethods(), #clearRefetchInterval(), #computeRefetchInterval(), constructor(), #executeFetch(), getDefaultState() (+9 more)

### Community 136 - "Entity Import Sync"
Cohesion: 0.21
Nodes (3): Injectable, EntityImportService, ImportContext

### Community 137 - "Google Sheet Status Writer"
Cohesion: 0.21
Nodes (11): GoogleSheetStatusWriter, importPriceListItems(), importPriceLists(), loadLookupMap(), LookupMaps, mainStandalone(), newLookupMaps(), safeText() (+3 more)

### Community 138 - "Inventory Repository Implementations"
Cohesion: 0.18
Nodes (5): InMemoryInventoryRepository, Injectable, StoreStockLocation, Injectable, TypeormInventoryRepository

### Community 139 - "Sale DTOs"
Cohesion: 0.19
Nodes (16): CreateSaleDto, CreateSaleLineDto, CreateSaleLineInput, CreateSalePaymentDto, CreateSalePaymentInput, ApiProperty, ApiPropertyOptional, IsArray (+8 more)

### Community 140 - "Item Seed Data"
Cohesion: 0.28
Nodes (15): ensureNotFound(), importClassifications(), importItemCategories(), importItems(), importUomCategories(), importUoms(), loadLookupMap(), LookupMaps (+7 more)

### Community 141 - "Project Scripts"
Cohesion: 0.13
Nodes (15): scripts, build, db:reset-and-seed, format, lint, seed, start, start:debug (+7 more)

### Community 142 - "React UI Sidecar Components"
Cohesion: 0.18
Nodes (8): assignRef(), createSidecarMedium(), getOutermostShadowParent(), innerCreateMedium(), RemoveScrollSideCar(), __spreadArray(), useCallbackRef(), useMergeRefs()

### Community 143 - "D3 Selection & Attributes"
Cohesion: 0.13
Nodes (15): append_default(), attr_default(), attr_default$1(), attrTween(), attrTween_default(), creator_default(), insert_default(), namespace_default() (+7 more)

### Community 144 - "Item Dependencies Use Case"
Cohesion: 0.14
Nodes (11): ListItemDependenciesDto, ApiPropertyOptional, IsInt, IsOptional, IsString, Max, Min, Type (+3 more)

### Community 145 - "Reports Controller"
Cohesion: 0.19
Nodes (9): ReportsController, ApiBearerAuth, ApiTags, Controller, Get, Header, Query, Roles (+1 more)

### Community 146 - "Organisation Config Controller"
Cohesion: 0.18
Nodes (11): OrganisationConfigController, ApiBearerAuth, ApiTags, Body, Controller, Get, Patch, Roles (+3 more)

### Community 147 - "Organisation Config Entity"
Cohesion: 0.18
Nodes (10): OrganisationConfigOrmEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn, OrganisationConfigService (+2 more)

### Community 149 - "CSS Class Utilities"
Cohesion: 0.15
Nodes (14): classArray(), classed_default(), classedAdd(), classedFalse(), classedRemove(), classedTrue(), classList(), join_default() (+6 more)

### Community 150 - "Zustand Store Hooks"
Cohesion: 0.19
Nodes (10): useStoreWithEqualityFn(), useDebugValue(), useEffect(), useMemo(), useRef(), useState(), useSyncExternalStore(), checkIfSnapshotChanged() (+2 more)

### Community 151 - "Coding Concept Pages"
Cohesion: 0.24
Nodes (7): CodingConceptMatchPage(), CodingConceptSearchPage(), CodingConceptUploadPage(), ConceptSummaryCard(), MetadataPreview(), readFile(), UploadPanel()

### Community 152 - "Redis Client"
Cohesion: 0.23
Nodes (6): encodeCommand(), isRespError(), ParsedResp, parseResp(), RedisRespClient, RespValue

### Community 153 - "UOM DTOs"
Cohesion: 0.15
Nodes (10): ApiPropertyOptional, IsBoolean, IsIn, IsNumber, IsOptional, IsString, MaxLength, Min (+2 more)

### Community 154 - "Color Format Utilities"
Cohesion: 0.15
Nodes (13): color_formatHex(), color_formatHex8(), color_formatHsl(), color_formatRgb(), displayable(), hsl(), hsl2rgb(), hslConvert() (+5 more)

### Community 155 - "Item List DTO"
Cohesion: 0.15
Nodes (11): ListItemsDto, ApiPropertyOptional, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+3 more)

### Community 156 - "Website Auth Controller"
Cohesion: 0.22
Nodes (9): ApiOperation, ApiResponse, ApiTags, Body, Controller, HttpCode, InjectRepository, Post (+1 more)

### Community 157 - "HTTP Header Utilities"
Cohesion: 0.20
Nodes (12): accessor(), buildAccessors(), delete(), forEach(), formatHeader(), normalize(), normalizeValue(), set() (+4 more)

### Community 158 - "URL Utilities"
Cohesion: 0.18
Nodes (12): assertValidHttpProtocolURL(), buildFullPath(), buildURL(), combineURLs(), getUri(), isAbsoluteURL(), normalizeURLForProtocolCheck(), read() (+4 more)

### Community 159 - "Medicine Seed Data"
Cohesion: 0.17
Nodes (10): CATEGORIES, OdooCategory, OdooPartner, OdooProductTemplate, OdooProductVariant, OdooUom, ParsedBackup, PARTNERS (+2 more)

### Community 160 - "Stock Movement List DTO"
Cohesion: 0.17
Nodes (10): ListStockMovementsDto, ApiPropertyOptional, IsDateString, IsIn, IsInt, IsOptional, IsUUID, Max (+2 more)

### Community 161 - "Permissions Guard"
Cohesion: 0.22
Nodes (5): required(), PermissionsGuard, Injectable, UserWithPermissions, permissionMatches()

### Community 162 - "App Controller"
Cohesion: 0.29
Nodes (5): AppController, Controller, Get, AppService, Injectable

### Community 163 - "Stock Balance List DTO"
Cohesion: 0.18
Nodes (8): ListStockBalancesDto, ApiPropertyOptional, IsInt, IsOptional, IsString, Max, Min, Type

### Community 164 - "Create UOM DTO"
Cohesion: 0.18
Nodes (11): CreateUomDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional (+3 more)

### Community 165 - "List UOMs DTO"
Cohesion: 0.18
Nodes (10): ListUomsDto, ApiPropertyOptional, IsBoolean, IsIn, IsInt, IsOptional, IsString, Max (+2 more)

### Community 166 - "Axios Utilities"
Cohesion: 0.20
Nodes (10): AxiosURLSearchParams(), hasOwnOrPrototypeToJSON(), isBuffer(), isFlatArray(), isSpecCompliantForm(), isVisitable(), redactConfig(), source() (+2 more)

### Community 167 - "Color Clamping"
Cohesion: 0.27
Nodes (10): clamp(), clampa(), clamph(), clampi(), clampt(), formatHsl(), hex(), rgb_formatHex() (+2 more)

### Community 168 - "Get Item Use Case"
Cohesion: 0.20
Nodes (6): Inject, InjectRepository, GetItemUseCase, Inject, Injectable, Optional

### Community 169 - "UOM Service"
Cohesion: 0.27
Nodes (5): Injectable, InjectRepository, Optional, UomsService, toUomType()

### Community 170 - "Jest Configuration"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, moduleNameMapper, rootDir, testEnvironment, testRegex (+1 more)

### Community 171 - "HTTP Header Parsing"
Cohesion: 0.25
Nodes (9): clear(), findKey(), get(), getAdapter$1(), getSetCookie(), has(), matchHeaderValue(), normalizeHeader() (+1 more)

### Community 172 - "List Query Filter"
Cohesion: 0.33
Nodes (7): applyFilter(), applyFilters(), ListQuery, ListResult, paramName(), parseFilter(), resolveField()

### Community 173 - "Replace Item DTO"
Cohesion: 0.22
Nodes (9): ReplaceItemDto, ApiProperty, ApiPropertyOptional, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString (+1 more)

### Community 174 - "Pagination Query DTO"
Cohesion: 0.22
Nodes (7): PaginationQueryDto, ApiPropertyOptional, IsInt, IsOptional, Max, Min, Type

### Community 175 - "Receive Goods Use Case"
Cohesion: 0.07
Nodes (20): NotEquals, ReceiveGoodsUseCase, Inject, Injectable, Optional, ApplyReceivableAdjustmentDto, ApiProperty, ApiPropertyOptional (+12 more)

### Community 176 - "Axios Cancel Token"
Cohesion: 0.29
Nodes (8): cancel(), constructor(), done(), onloadend(), settle(), subscribe(), toAbortSignal(), unsubscribe()

### Community 177 - "Scheduler Utilities"
Cohesion: 0.57
Nodes (8): advanceTimers(), handleTimeout(), peek(), performWorkUntilDeadline(), requestHostTimeout(), shouldYieldToHost(), unstable_now(), unstable_scheduleCallback()

### Community 178 - "APM Controllers"
Cohesion: 0.16
Nodes (10): ApmConversionController, ApmStakeholderController, ApmWhatsAppController, ApiBearerAuth, ApiTags, Body, Controller, Post (+2 more)

### Community 179 - "Update Org Config DTO"
Cohesion: 0.25
Nodes (7): ApiPropertyOptional, IsBoolean, IsInt, IsOptional, IsString, Min, UpdateOrganisationConfigDto

### Community 181 - "Package Metadata"
Cohesion: 0.29
Nodes (6): author, description, license, name, private, version

### Community 182 - "Axios Instance"
Cohesion: 0.43
Nodes (7): assertOptions(), bind(), createInstance(), generateHTTPMethod(), merge(), mergeConfig$1(), request()

### Community 184 - "DB Reset & Seed"
Cohesion: 0.52
Nodes (6): getConfig(), main(), resetPostgresDatabase(), resetSqliteDatabase(), runSqlFile(), SupportedDbType

### Community 185 - "Health Check"
Cohesion: 0.29
Nodes (5): HealthController, ApiOperation, ApiTags, Controller, Get

### Community 186 - "Nest CLI Config"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 187 - "Inventory Use Cases"
Cohesion: 0.40
Nodes (6): Create Stock Adjustment Use Case, InMemory Inventory Repository, Inventory Controller, Inventory Repository Interface, List Stock Balances Use Case, Stock Balance Entity

### Community 188 - "Bezier Edge Path"
Cohesion: 0.33
Nodes (6): calculateControlOffset(), getBezierEdgeCenter(), getBezierPath(), getControl(), getControlWithCurvature(), getSimpleBezierPath()

### Community 189 - "Edge Path Utilities"
Cohesion: 0.33
Nodes (6): getBend(), getEdgeCenter(), getPoints(), getSmoothStepPath(), getStraightPath(), getDirection()

### Community 190 - "Edge Handle Utilities"
Cohesion: 0.33
Nodes (6): getClosestHandle(), getHandleLookup(), getHandles(), getHandleType(), handlePointerDown(), isValidHandle()

### Community 191 - "Generic Drug Data"
Cohesion: 0.33
Nodes (5): DrugComponentIndexEntry, GenericDrug, genericDrugData, GenericDrugSeedData, Pharmaceutics

### Community 192 - "Event Schema"
Cohesion: 0.33
Nodes (5): EventDocument, EventSchema, EventSchemaFactory, Prop, Schema

### Community 193 - "News Article Schema"
Cohesion: 0.33
Nodes (5): NewsArticleDocument, NewsArticleSchema, NewsArticleSchemaFactory, Prop, Schema

### Community 194 - "Polling Unit Schema"
Cohesion: 0.33
Nodes (5): PollingUnitDocument, PollingUnitSchema, PollingUnitSchemaFactory, Prop, Schema

### Community 195 - "Result Entry Schema"
Cohesion: 0.33
Nodes (5): ResultEntryDocument, ResultEntrySchema, ResultEntrySchemaFactory, Prop, Schema

### Community 196 - "Testimonial Schema"
Cohesion: 0.33
Nodes (5): TestimonialDocument, TestimonialSchema, TestimonialSchemaFactory, Prop, Schema

### Community 197 - "Ward Schema"
Cohesion: 0.33
Nodes (5): Prop, Schema, WardDocument, WardSchema, WardSchemaFactory

### Community 198 - "Stock Adjustment DTO"
Cohesion: 0.33
Nodes (5): CreateStockAdjustmentDto, ApiProperty, IsNotEmpty, IsNumber, IsString

### Community 199 - "Generic ORM Entity"
Cohesion: 0.40
Nodes (4): PrimaryColumn, Generic, Column, Entity

### Community 200 - "React Flow Node/Edge Types"
Cohesion: 0.40
Nodes (5): createEdgeTypes(), createNodeTypes(), isMatchingKey(), cleanEnum(), k()

### Community 201 - "UOM Details Page"
Cohesion: 0.50
Nodes (4): JsonDetailCard(), RxUomDetailsPage(), titleFromPath(), UomDetailsRoute()

### Community 202 - "Appointment Entity"
Cohesion: 0.40
Nodes (4): Appointment, Column, Entity, PrimaryGeneratedColumn

### Community 203 - "Category Entity"
Cohesion: 0.40
Nodes (4): Category, Column, Entity, PrimaryGeneratedColumn

### Community 204 - "Customer Entity"
Cohesion: 0.40
Nodes (4): Customer, Column, Entity, PrimaryGeneratedColumn

### Community 205 - "Daily Sale Entity"
Cohesion: 0.40
Nodes (4): DailySale, Column, Entity, PrimaryGeneratedColumn

### Community 206 - "Current Stock Entity"
Cohesion: 0.40
Nodes (4): CurrentStock, Column, Entity, PrimaryGeneratedColumn

### Community 207 - "Seed Location & Warehouse"
Cohesion: 0.70
Nodes (4): getColumns(), quoteIdentifier(), seedWarehouseAndStockLocation(), tableExists()

### Community 208 - "Stock Balance DTO"
Cohesion: 0.60
Nodes (4): StockBalanceItemRefDto, StockBalanceLocationRefDto, StockBalanceLotRefDto, ApiProperty

### Community 209 - "Customer Purchase Entity"
Cohesion: 0.50
Nodes (3): CustomerPurchase, Column, Entity

## Knowledge Gaps
- **267 isolated node(s):** `$schema`, `collection`, `sourceRoot`, `deleteOutDir`, `name` (+262 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GenericDrugCacheService` connect `Generic Drug Cache Service` to `Generic Products CRUD`, `Item DTOs`, `Get Item Use Case`, `Data Page UI Components`, `Branch & Consultation Entities`, `Catalog Module & Items`, `Item Dependencies Use Case`, `Website Admin & DTOs`?**
  _High betweenness centrality (0.235) - this node is a cross-community bridge._
- **Why does `applyChanges()` connect `Flow Graph Manipulation` to `Pricing Controller`?**
  _High betweenness centrality (0.196) - this node is a cross-community bridge._
- **Why does `Pagination()` connect `Data Page UI Components` to `URL Parameter Normalization`, `Website Layout & Auth`, `Admin Hooks & Queries`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `constructor()` (e.g. with `from()` and `fn()`) actually correct?**
  _`constructor()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **What connects `$schema`, `collection`, `sourceRoot` to the rest of the system?**
  _271 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `URL Parameter Normalization` be split into smaller, more focused modules?**
  _Cohesion score 0.005321523224996513 - nodes in this community are weakly interconnected._
- **Should `UI Component Library` be split into smaller, more focused modules?**
  _Cohesion score 0.03133790119004688 - nodes in this community are weakly interconnected._