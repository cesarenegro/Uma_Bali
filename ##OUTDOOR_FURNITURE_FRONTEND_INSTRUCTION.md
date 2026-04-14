# OUTDOOR FURNITURE MANUFACTURER — FULL FRONTEND BUILD INSTRUCTIONS
### For AI Coder / React + Tailwind Implementation
**Version:** 1.0 | **Stack:** React 18 + Tailwind CSS + React Router v6 + Zustand + Framer Motion

---

## ⚠️ BEFORE YOU WRITE ANY CODE — READ THIS FIRST

### IMAGE PREPROCESSING PIPELINE (MANDATORY STEP 0)

Before building any frontend component, execute the following image quality pipeline:

```
FROM THE GIVEN PATH/FOLDERS:

1. Scan all product image files recursively
2. For each image, evaluate:
   - Sharpness / blur quality
   - Presence of awkward lighting artifacts, lens aberrations, chromatic distortion
   - Presence of unwanted shadows cast on background
   - Presence of text, watermarks, captions, or overlaid labels
   - Background cleanliness (transparent PNG preferred; white fallback acceptable)

3. For each image that fails quality criteria:
   - Remake it using the Gemini image generation API (gemini-2.0-flash-preview-image-generation or equivalent)
   - Prompt template for Gemini remake:
     "Recreate this exact product: same view angle, same materials, same colors, same proportions.
      Output: pure product image, no background, transparent PNG preferred or clean white background.
      No shadows cast on floor or background. No text. No captions. No watermarks. No decorative context.
      Lighting: soft, even studio lighting. Style: luxury product photography, ultra-clean."
   - Save remade image with suffix _remade.png alongside original
   - Update the image reference in the product data JSON to point to _remade version

4. Accepted output formats: .png (transparent background preferred), .webp with alpha
5. Rejected: JPGs with harsh shadow, images with text overlays, blurry renders, images with chromatic aberration
```

---

## SECTION 1 — REFERENCE ANALYSIS SUMMARY

Based on analysis of:
- **RODA** (rodaonline.com) — Premium Italian outdoor furniture, 2-tier nav, product+collection dual taxonomy, login system, configurator
- **Talenti** (talentispa.com) — Italian outdoor+indoor brand, catalogue-first nav, Outdoor/Indoor split, contract/hospitality segment
- **Ethimo** (ethimo.com) — Italian outdoor brand, designer-attributed collections, strong filter system, Stories editorial section, Contract/Nautical verticals

### KEY PATTERNS EXTRACTED

| Pattern | RODA | Talenti | Ethimo | Our Implementation |
|---|---|---|---|---|
| Nav levels | 2 | 2 | 2 | 2 |
| Product taxonomy | Type + Collection | Collection first | Type + Collection + Designer | Type + Collection + Designer |
| Language switcher | Yes (5 langs) | Yes (5 langs) | Yes (4 langs) | Yes |
| Login/account | Yes | Yes | No | Yes |
| Configurator | Yes | No | Yes | Yes |
| AI Generator | No | No | No | **YES (our differentiator)** |
| Filter panel | No | No | Yes (Collection + Designer) | Yes (extended) |
| Contract/B2B section | Implied | Yes | Yes | Yes |
| Editorial/Stories | Yes (Projects + News) | Yes (Projects) | Yes (Stories + Projects) | Yes |

---

## SECTION 2 — SITEMAP (MERGED BEST PRACTICES)

```
/                                    → Homepage
│
├── /products                        → All Products (type-based index)
│   ├── /products/sofas
│   ├── /products/lounge-chairs
│   ├── /products/chairs
│   ├── /products/armchairs
│   ├── /products/tables
│   ├── /products/side-tables
│   ├── /products/sunloungers
│   ├── /products/daybeds
│   ├── /products/barstools
│   ├── /products/parasols
│   ├── /products/pergolas
│   ├── /products/outdoor-kitchen
│   ├── /products/poufs
│   ├── /products/rugs
│   ├── /products/lighting
│   ├── /products/planters
│   └── /products/accessories
│
├── /product/:slug                   → Product Detail Page (PDP)
│
├── /collections                     → Collections Index
│   └── /collections/:slug           → Single Collection Page
│
├── /designers                       → Designers Index
│   └── /designers/:slug             → Single Designer Page
│
├── /projects                        → Projects / Installation Index
│   └── /projects/:slug              → Single Project Page
│
├── /stories                         → Editorial / Inspiration Index
│   └── /stories/:slug               → Single Story / Article
│
├── /ai-generator                    → AI Outdoor Space Generator
│
├── /configurator                    → Product Configurator (embedded or redirect)
│
├── /contract                        → Contract / Hospitality Section
│
├── /catalogues                      → PDF Catalogue Downloads
│
├── /materials                       → Materials & Finishes Reference
│
├── /showrooms                       → Showroom Locator
│
├── /stores                          → Dealer / Store Finder
│
├── /news                            → News Index
│   └── /news/:slug                  → Single News Article
│
├── /about                           → Company / Brand Story
├── /sustainability                  → Sustainable Thinking Page
├── /designers                       → Designers Overview
│
├── /account                         → User Account (login required)
│   ├── /account/login
│   ├── /account/register
│   ├── /account/wishlist
│   ├── /account/orders
│   └── /account/reset-password
│
├── /contact                         → Contact / Inquiry Form
├── /privacy-policy
├── /cookie-policy
└── /terms-of-use
```

---

## SECTION 3 — PAGE TYPE DEFINITIONS

### 3.1 HOMEPAGE

**Purpose:** Brand showcase + navigation gateway  
**Sections (in order):**
1. `HeroSection` — Fullscreen video or ambient image + headline + CTA pair ("Discover Collections" / "AI Space Generator")
2. `CategoryGrid` — 4–6 product type tiles with overlay labels (hover reveals "+")
3. `FeaturedCollections` — 3-column editorial grid: collection name + designer + cover image
4. `AIGeneratorTeaser` — Full-width banner promoting the AI generator feature
5. `FeaturedProjects` — 2–3 horizontal project cards with location + name
6. `NewsHighlights` — 3 latest news tiles
7. `BrandManifesto` — Video section + short brand text
8. `MaterialsPreview` — Visual materials strip linking to /materials
9. `NewsletterBanner` — Email capture form

---

### 3.2 PRODUCT CATEGORY PAGE (`/products/:category`)

**Purpose:** Browse products within a type  
**Sections:**
1. `CategoryHero` — Category name + short description + breadcrumb
2. `FilterPanel` — Left sidebar or top bar filters
3. `ProductGrid` — Responsive grid of `ProductCard` components
4. `Pagination` or infinite scroll

**Filter Dimensions:**
- Collection name
- Designer
- Material (teak / aluminum / rope / wicker / synthetic fiber)
- Finish
- Suitable environment (garden / terrace / poolside / contract)
- Style (modern / classic / minimal / sculptural)

---

### 3.3 PRODUCT DETAIL PAGE — PDP (`/product/:slug`)

**Component breakdown (strict order):**

```
[Breadcrumb]
[Product Name] [Collection Badge] [Designer Credit]
[ImageGallery]       ← Primary + thumbnails, zoom, variant switch
[ProductSummary]     ← Short description, key materials
[VariantSelector]    ← Finish / fabric / size options
[DimensionsBlock]    ← Table: W × D × H per variant, downloadable PDF
[SpecsBlock]         ← Materials, structure, finishes, weatherproofing rating
[CTA Block]          ← [Request Info] [Add to Wishlist] [Download Tech Sheet]
[ConfiguratorLink]   ← "Configure this product in 3D"
[RelatedProducts]    ← Products from same collection
[ProjectsUsedIn]     ← Projects cards where this product appears
[CollectionBanner]   ← Link to parent collection
```

---

### 3.4 COLLECTION PAGE (`/collections/:slug`)

**Sections:**
1. `CollectionHero` — Full-width lifestyle image, collection name, designer name, year
2. `CollectionDescription` — Brand narrative text
3. `ProductGrid` — All products in this collection
4. `MaterialsUsed` — Visual list of materials in this collection
5. `ProjectsUsing` — Real-world installations
6. `RelatedCollections` — 3 other collections

---

### 3.5 PROJECTS PAGE (`/projects` + `/projects/:slug`)

**Index:** Masonry or 3-col grid, filterable by: country / product type / environment  
**Single project:**
1. `ProjectHero` — Full-width cover image
2. `ProjectMeta` — Location, year, context (residential / hospitality / contract)
3. `ProjectGallery` — Multiple image gallery
4. `ProductsUsed` — Grid of `ProductCard` mini versions (linked to PDPs)
5. `ProjectNarrative` — Editorial text body
6. `RelatedProjects`

---

### 3.6 STORIES PAGE (`/stories` + `/stories/:slug`)

**Index:** Editorial magazine grid (varied card sizes)  
**Single story:** Long-form layout with inline product cards, image breaks, pull quotes

---

### 3.7 AI GENERATOR PAGE (`/ai-generator`)

See Section 11 for full spec.

---

### 3.8 CONTACT PAGE

- Inquiry form: Name, Company, Email, Phone, Country, Message, Product of Interest (multi-select from catalog)
- Showroom locator map embed
- Download section (press kit, catalogues)

---

### 3.9 LEGAL PAGES

- `/privacy-policy` — Standard long-form text layout
- `/cookie-policy` — Cookie table + preference management
- `/terms-of-use` — Standard layout

---

## SECTION 4 — PRODUCT DATA MODEL

```typescript
// Core Product Entity
interface Product {
  id: string;                        // UUID
  slug: string;                      // URL-safe unique name e.g. "lodge-sofa-3-seater"
  name: string;                      // Display name e.g. "Lodge XL Sofa"
  collectionId: string;              // FK → Collection
  designerId: string | null;         // FK → Designer
  categoryIds: string[];             // FK[] → Category (a sofa can be in sofas + daybeds)
  shortDescription: string;          // 1–2 sentences, used in ProductCard
  longDescription: string;           // Full PDP text (HTML or Markdown)
  
  // Media
  primaryImage: ProductImage;
  images: ProductImage[];            // All gallery images
  technicalDrawing: string | null;   // URL to PDF or SVG
  videoUrl: string | null;
  
  // Variants
  variants: ProductVariant[];
  
  // Technical specs
  materials: MaterialSpec[];
  weatherproofingRating: string | null;   // e.g. "IP55" or "Outdoor Grade A"
  suitableEnvironments: EnvironmentTag[]; // ['garden', 'poolside', 'contract', 'nautical']
  styleTagIds: string[];             // FK[] → StyleTag
  
  // Catalog data
  isNew: boolean;
  isFeatured: boolean;
  isAvailableForContract: boolean;
  catalogYear: number;
  
  // Relations
  relatedProductIds: string[];
  projectIds: string[];              // Projects this product appears in
  
  // AI Generator metadata
  aiMeta: ProductAIMeta;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
  
  createdAt: string;
  updatedAt: string;
}

interface ProductImage {
  url: string;
  altText: string;
  type: 'lifestyle' | 'cutout' | 'detail' | 'technical' | 'context';
  variantId?: string;               // If image shows a specific variant
  isProcessed: boolean;             // true = passed through Gemini image pipeline
  originalUrl?: string;             // Reference to pre-processing source
}

interface ProductVariant {
  id: string;
  label: string;                    // e.g. "3-seater / Teak / Sunbrella Gray"
  sku: string;
  dimensions: Dimensions;
  weight: number | null;            // kg
  frameFinish: string;              // e.g. "White aluminum"
  fabricCode: string | null;
  fabricColor: string | null;
  woodFinish: string | null;
  isDefault: boolean;
  isAvailable: boolean;
  priceIndicator: 'on_request' | 'contact_dealer' | number | null;
  image: string | null;             // Variant-specific cutout image URL
}

interface Dimensions {
  widthCm: number;
  depthCm: number;
  heightCm: number;
  seatHeightCm?: number;
  armHeightCm?: number;
  tableTopHeightCm?: number;
}

interface MaterialSpec {
  component: string;                // e.g. "Frame", "Seat", "Tabletop"
  material: string;                 // e.g. "Teak Grade A", "Powder-coated aluminum"
  notes: string | null;
}

interface ProductAIMeta {
  boundingBoxCm: { w: number; d: number; h: number };
  productType: ProductAIType;       // used for scene placement logic
  anchorPoint: 'floor' | 'wall' | 'ceiling';
  sceneCategories: string[];        // ['dining', 'lounge', 'poolside', 'shade']
  primaryCutoutImageUrl: string;    // Clean transparent-background image for scene composition
}

type ProductAIType =
  | 'sofa' | 'lounge_chair' | 'dining_chair' | 'barstool'
  | 'dining_table' | 'coffee_table' | 'side_table'
  | 'sunlounger' | 'daybed' | 'parasol' | 'pergola'
  | 'outdoor_kitchen' | 'lighting' | 'planter' | 'rug' | 'accessory';

type EnvironmentTag = 'garden' | 'terrace' | 'poolside' | 'rooftop' | 'contract' | 'nautical' | 'indoor';
```

---

## SECTION 5 — CATEGORY DATA MODEL

```typescript
interface Category {
  id: string;
  slug: string;
  name: string;                     // e.g. "Sofas", "Lounge Chairs"
  parentId: string | null;          // For subcategories (e.g. Complements > Poufs)
  description: string;
  coverImage: string;
  sortOrder: number;
  isVisible: boolean;
  productCount: number;             // Computed field
}

// Category Tree (flat + parentId)
const CATEGORY_TREE = [
  { slug: 'sofas', parent: null },
  { slug: 'lounge-chairs', parent: null },
  { slug: 'chairs', parent: null },
  { slug: 'armchairs', parent: null },
  { slug: 'tables', parent: null },
  { slug: 'side-tables', parent: null },
  { slug: 'sunloungers', parent: null },
  { slug: 'daybeds', parent: null },
  { slug: 'barstools', parent: null },
  { slug: 'parasols', parent: null },
  { slug: 'pergolas', parent: null },
  { slug: 'outdoor-kitchen', parent: null },
  { slug: 'complements', parent: null },
  { slug: 'poufs', parent: 'complements' },
  { slug: 'rugs', parent: 'complements' },
  { slug: 'lighting', parent: 'complements' },
  { slug: 'planters', parent: 'complements' },
  { slug: 'accessories', parent: 'complements' },
];
```

---

## SECTION 6 — COLLECTION DATA MODEL

```typescript
interface Collection {
  id: string;
  slug: string;
  name: string;
  designerId: string | null;
  year: number;
  coverImage: string;
  heroImage: string;
  description: string;
  narrative: string;                // Long editorial text
  productIds: string[];
  materialIds: string[];
  tagIds: string[];
  isNew: boolean;
  isFeatured: boolean;
  catalogueUrl: string | null;
  metaTitle: string;
  metaDescription: string;
}
```

---

## SECTION 7 — DESIGNER DATA MODEL

```typescript
interface Designer {
  id: string;
  slug: string;
  name: string;
  nationality: string;
  portrait: string;
  bio: string;
  collectionIds: string[];
  productIds: string[];
  websiteUrl: string | null;
}
```

---

## SECTION 8 — PROJECT DATA MODEL

```typescript
interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;                 // City, Country
  country: string;
  year: number;
  context: 'residential' | 'hospitality' | 'contract' | 'yacht' | 'public';
  coverImage: string;
  heroImage: string;
  galleryImages: string[];
  description: string;
  productIds: string[];             // Products used in this project
  collectionIds: string[];
  environmentTags: EnvironmentTag[];
  isFeatured: boolean;
  metaTitle: string;
  metaDescription: string;
}
```

---

## SECTION 9 — COMPONENT ARCHITECTURE (REACT)

All components are defined by **structure and purpose only**. No styles, no colors.

### 9.1 LAYOUT COMPONENTS

```tsx
// Root layout wrapper — renders on all pages
<RootLayout>
  <TopBanner />          // Optional: promo, fair announcements, language
  <Header />
  <main>{children}</main>
  <Footer />
  <CookieBanner />
</RootLayout>

// Header structure
<Header>
  <HeaderTop>            // Secondary nav: Contact, News, Materials, Catalogues, Login
    <LanguageSwitcher />
    <AccountMenu />
    <SearchTrigger />
  </HeaderTop>
  <HeaderMain>           // Logo + primary nav
    <Logo />
    <NavigationMenu />
    <MobileMenuTrigger />
  </HeaderMain>
</Header>

// NavigationMenu — mega menu pattern
<NavigationMenu>
  <NavItem label="Products">
    <MegaMenu>
      <CategoryList />       // All product categories with icons
    </MegaMenu>
  </NavItem>
  <NavItem label="Collections">
    <MegaMenu>
      <CollectionPreviewGrid />
    </MegaMenu>
  </NavItem>
  <NavItem label="Designers" href="/designers" />
  <NavItem label="Projects" href="/projects" />
  <NavItem label="AI Generator" href="/ai-generator" badge="NEW" />
  <NavItem label="Company">
    <DropdownMenu>
      <DropdownItem href="/about">About Us</DropdownItem>
      <DropdownItem href="/sustainability">Sustainability</DropdownItem>
      <DropdownItem href="/materials">Materials</DropdownItem>
    </DropdownMenu>
  </NavItem>
</NavigationMenu>

// Footer structure
<Footer>
  <FooterBrand>          // Logo + tagline + social links
  <FooterLinks>          // 4 columns: Products / Company / Services / Legal
  <FooterNewsletter />
  <FooterBottom>         // Copyright + language + cookie settings
</Footer>
```

---

### 9.2 PRODUCT COMPONENTS

```tsx
// ProductCard — used in grids, category pages, related sections
interface ProductCardProps {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'primaryImage' | 'shortDescription' | 'collectionId' | 'isNew'>;
  variant?: 'default' | 'compact' | 'featured';
  showCollection?: boolean;
  showWishlistButton?: boolean;
  onAddToWishlist?: (productId: string) => void;
}
<ProductCard>
  <ProductCardImage>        // Hover: show secondary/cutout image
    {isNew && <NewBadge />}
    <WishlistButton />
  </ProductCardImage>
  <ProductCardBody>
    <CollectionBadge />
    <ProductName />
    <ProductShortDesc />
    <CTALink>              // "Discover" or "Configure"
  </ProductCardBody>
</ProductCard>

// ProductGrid — renders ProductCard list
interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  loading?: boolean;
  emptyState?: ReactNode;
}
<ProductGrid>
  {products.map(p => <ProductCard key={p.id} product={p} />)}
  {loading && <SkeletonGrid />}
</ProductGrid>

// ProductGallery — PDP image viewer
interface ProductGalleryProps {
  images: ProductImage[];
  activeVariantId?: string;
}
<ProductGallery>
  <MainImageViewer>
    <ZoomButton />
    <LightboxTrigger />
  </MainImageViewer>
  <ThumbnailStrip>
    {images.map(img => <Thumbnail key={img.url} ... />)}
  </ThumbnailStrip>
  <Lightbox />            // Full-screen gallery modal
</ProductGallery>

// VariantSelector — PDP variant switching
interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
}
<VariantSelector>
  <VariantGroup label="Frame Finish">
    {frameFinishes.map(f => <SwatchButton key={f} />)}
  </VariantGroup>
  <VariantGroup label="Fabric">
    {fabrics.map(f => <SwatchButton key={f} />)}
  </VariantGroup>
  <VariantGroup label="Size">
    {sizes.map(s => <SizeButton key={s} />)}
  </VariantGroup>
</VariantSelector>

// DimensionsBlock — PDP dimensions table
<DimensionsBlock>
  <DimensionsTable>
    <DimensionsRow label="Width" value={variant.dimensions.widthCm} unit="cm" />
    <DimensionsRow label="Depth" value={variant.dimensions.depthCm} unit="cm" />
    <DimensionsRow label="Height" value={variant.dimensions.heightCm} unit="cm" />
    <DimensionsRow label="Seat Height" value={variant.dimensions.seatHeightCm} unit="cm" />
    <DimensionsRow label="Weight" value={variant.weight} unit="kg" />
  </DimensionsTable>
  <DownloadButton href={product.technicalDrawing}>Technical Sheet PDF</DownloadButton>
</DimensionsBlock>

// FilterPanel — category/collection page filtering
interface FilterPanelProps {
  filters: FilterConfig[];
  activeFilters: Record<string, string[]>;
  onChange: (key: string, values: string[]) => void;
  onReset: () => void;
  productCount: number;
}
<FilterPanel>
  <FilterHeader>
    <ActiveFilterCount />
    <ResetButton />
  </FilterHeader>
  {filters.map(f =>
    f.type === 'multiselect' ? <MultiselectFilter {...f} /> :
    f.type === 'swatch' ? <SwatchFilter {...f} /> :
    <CheckboxFilter {...f} />
  )}
</FilterPanel>
```

---

### 9.3 COLLECTION COMPONENTS

```tsx
// CollectionCard — used in homepage + collection index
<CollectionCard>
  <CollectionImage />
  <CollectionName />
  <DesignerCredit />
  <CollectionYear />
  <CTALink>Discover</CTALink>
</CollectionCard>

// CollectionGrid
<CollectionGrid>
  {collections.map(c => <CollectionCard key={c.id} collection={c} />)}
</CollectionGrid>
```

---

### 9.4 PROJECT + STORY COMPONENTS

```tsx
// ProjectCard
<ProjectCard>
  <ProjectCoverImage />
  <ProjectMeta>
    <ProjectTitle />
    <ProjectLocation />
    <ProjectYear />
    <ProjectContext />        // residential | hospitality | contract
  </ProjectMeta>
</ProjectCard>

// StoryCard
<StoryCard variant="portrait" | "landscape" | "featured">
  <StoryCoverImage />
  <StoryCategory />
  <StoryTitle />
  <StoryExcerpt />
  <ReadMoreLink />
</StoryCard>

// ProductsUsedInProject — shows linked products at bottom of project page
<ProductsUsedInProject>
  <SectionTitle>Products used in this project</SectionTitle>
  <HorizontalScrollRow>
    {products.map(p => <ProductCard key={p.id} variant="compact" />)}
  </HorizontalScrollRow>
</ProductsUsedInProject>
```

---

### 9.5 UTILITY COMPONENTS

```tsx
<Breadcrumb items={[{ label: 'Products', href: '/products' }, { label: 'Sofas', href: '/products/sofas' }, { label: 'Lodge XL Sofa' }]} />

<LanguageSwitcher langs={['en', 'it', 'fr', 'de', 'es']} current="en" />

<SearchOverlay>
  <SearchInput />
  <QuickLinks />           // Suggested categories
  <SearchResults />        // Real-time product suggestions
</SearchOverlay>

<WishlistDrawer>
  <WishlistItem />
  <WishlistCTA>Request Info for All</WishlistCTA>
</WishlistDrawer>

<InquiryModal product={product}>
  <InquiryForm fields={['name', 'company', 'email', 'phone', 'country', 'message']} />
</InquiryModal>

<SkeletonCard />           // Loading placeholder for ProductCard
<SkeletonGrid count={12} />
```

---

## SECTION 10 — ROUTING STRUCTURE

```tsx
// App.tsx — React Router v6 route tree

<BrowserRouter>
  <Routes>
    <Route path="/" element={<RootLayout />}>
      
      {/* Public routes */}
      <Route index element={<HomePage />} />
      
      {/* Product catalog */}
      <Route path="products" element={<ProductsIndexPage />} />
      <Route path="products/:category" element={<CategoryPage />} />
      <Route path="product/:slug" element={<ProductDetailPage />} />
      
      {/* Collections */}
      <Route path="collections" element={<CollectionsIndexPage />} />
      <Route path="collections/:slug" element={<CollectionDetailPage />} />
      
      {/* Designers */}
      <Route path="designers" element={<DesignersIndexPage />} />
      <Route path="designers/:slug" element={<DesignerDetailPage />} />
      
      {/* Projects */}
      <Route path="projects" element={<ProjectsIndexPage />} />
      <Route path="projects/:slug" element={<ProjectDetailPage />} />
      
      {/* Stories / Editorial */}
      <Route path="stories" element={<StoriesIndexPage />} />
      <Route path="stories/:slug" element={<StoryDetailPage />} />
      
      {/* News */}
      <Route path="news" element={<NewsIndexPage />} />
      <Route path="news/:slug" element={<NewsDetailPage />} />
      
      {/* AI Generator */}
      <Route path="ai-generator" element={<AIGeneratorPage />} />
      
      {/* Configurator */}
      <Route path="configurator" element={<ConfiguratorPage />} />
      
      {/* Contract */}
      <Route path="contract" element={<ContractPage />} />
      
      {/* Materials */}
      <Route path="materials" element={<MaterialsPage />} />
      
      {/* Catalogues */}
      <Route path="catalogues" element={<CataloguesPage />} />
      
      {/* Showrooms */}
      <Route path="showrooms" element={<ShowroomsPage />} />
      <Route path="showrooms/:city" element={<ShowroomDetailPage />} />
      
      {/* Stores */}
      <Route path="stores" element={<StoresPage />} />
      
      {/* Company */}
      <Route path="about" element={<AboutPage />} />
      <Route path="sustainability" element={<SustainabilityPage />} />
      
      {/* Contact */}
      <Route path="contact" element={<ContactPage />} />
      
      {/* Legal */}
      <Route path="privacy-policy" element={<PrivacyPage />} />
      <Route path="cookie-policy" element={<CookiePolicyPage />} />
      <Route path="terms-of-use" element={<TermsPage />} />
      
      {/* Account (protected) */}
      <Route path="account" element={<ProtectedRoute><AccountLayout /></ProtectedRoute>}>
        <Route index element={<AccountDashboard />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      
      {/* Auth */}
      <Route path="account/login" element={<LoginPage />} />
      <Route path="account/register" element={<RegisterPage />} />
      <Route path="account/reset-password" element={<ResetPasswordPage />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
      
    </Route>
  </Routes>
</BrowserRouter>
```

### URL parameter conventions:
- `:category` → kebab-case category slug e.g. `sofas`, `lounge-chairs`, `side-tables`
- `:slug` → kebab-case content slug e.g. `lodge-xl-sofa`, `villa-magnan-france`
- Query params for filters: `?collection=lodge&designer=christophe-pillet&material=teak`
- Pagination: `?page=2`
- Language prefix: handled via `i18n` locale routing (e.g. `/fr/products/sofas`)

---

## SECTION 11 — AI OUTDOOR SPACE GENERATOR (FULL SPEC)

### 11.1 Route: `/ai-generator`

### 11.2 Page Structure

```tsx
<AIGeneratorPage>
  <GeneratorHero>          // Headline + short description of feature
  <GeneratorWorkspace>
    <StepFlow currentStep={step}>
      <Step1_SpaceSetup />       // User describes their outdoor space
      <Step2_ProductSelection /> // User picks products from catalog
      <Step3_StyleParams />      // Ambiance, time of day, season preferences
      <Step4_GenerateScene />    // AI generates scene image
    </StepFlow>
  </GeneratorWorkspace>
</AIGeneratorPage>
```

### 11.3 Step 1 — Space Setup

```tsx
<Step1_SpaceSetup>
  <SpaceTypeSelector>
    options: ['Garden', 'Terrace', 'Rooftop', 'Pool Area', 'Loggia', 'Courtyard', 'Yacht Deck']
  </SpaceTypeSelector>
  <SpaceDimensions>
    fields: widthM, depthM (optional, used for product placement scale)
  </SpaceDimensions>
  <EnvironmentContext>
    options: ['Mediterranean', 'Nordic', 'Tropical', 'Alpine', 'Urban', 'Coastal']
  </EnvironmentContext>
</Step1_SpaceSetup>
```

### 11.4 Step 2 — Product Selection

```tsx
<Step2_ProductSelection>
  <ProductBrowser>
    // Mini product catalog, filterable by category
    // Shows only products with valid aiMeta.primaryCutoutImageUrl
    <ProductTypeFilter />
    <ProductSearchInput />
    <AIProductGrid>
      {products.map(p => <AIProductTile key={p.id} product={p} onSelect={...} />)}
    </AIProductGrid>
  </ProductBrowser>
  <SelectedProductsTray>
    // Shows selected products with quantity controls
    // Warns if bounding box overlap detected (optional)
    <SelectedProduct removable quantity />
    <SceneSummary>   // e.g. "Dining area for 6 + lounge zone selected"
  </SelectedProductsTray>
</Step2_ProductSelection>
```

**Product data required for AI generator:**
```typescript
// Minimum product fields needed by AI module
interface AIProductPayload {
  id: string;
  name: string;
  productType: ProductAIType;
  primaryCutoutImageUrl: string;     // MUST be clean transparent-background image
  boundingBoxCm: { w: number; d: number; h: number };
  anchorPoint: 'floor' | 'wall' | 'ceiling';
  sceneCategories: string[];
  materials: string[];               // For prompt enrichment
  primaryMaterialColor: string;      // For coherence checks
}
```

### 11.5 Step 3 — Style Parameters

```tsx
<Step3_StyleParams>
  <TimeOfDaySelector>   // Morning / Afternoon / Golden Hour / Night
  <SeasonSelector>      // Spring / Summer / Autumn / Winter
  <MoodSelector>        // Minimal / Lush / Mediterranean / Zen / Modern
  <LightingStyle>       // Natural / Dramatic / Soft / Candlelight
</Step3_StyleParams>
```

### 11.6 Step 4 — AI Scene Generation

```typescript
// Prompt construction logic (to be sent to Gemini or equivalent image gen API)

function buildScenePrompt(input: AIGeneratorInput): string {
  const products = input.selectedProducts
    .map(p => `${p.name} (${p.materials.join(', ')})`)
    .join(', ');

  return `
    Photorealistic outdoor scene.
    Space type: ${input.spaceType}.
    Environment: ${input.environment}.
    Season: ${input.season}. Time of day: ${input.timeOfDay}.
    Mood: ${input.mood}. Lighting: ${input.lightingStyle}.
    
    The scene includes the following furniture items placed naturally:
    ${products}
    
    Render the space as an architectural photography shot.
    Style: luxury outdoor living magazine photography.
    No people unless specified. No text or watermarks.
    High resolution, sharp details, natural materials visible.
  `.trim();
}

// Output actions available after generation:
// 1. Download generated image (PNG)
// 2. Share generated scene
// 3. "Shop these products" → link all selected products in scene to their PDPs
// 4. "Modify scene" → back to Step 2/3
// 5. "Save to wishlist" → saves all selected products to user wishlist
// 6. "Request a quote for this setup" → pre-fills inquiry form with all product list
```

### 11.7 Connection Between AI Generator and Product Database

```
ProductDatabase
    │
    ├── Filter: isAvailable = true
    ├── Filter: aiMeta.primaryCutoutImageUrl != null
    └── Expose: AIProductPayload[]
            │
            ▼
    AIGeneratorStore (Zustand)
            │
            ├── selectedProducts: AIProductPayload[]
            ├── sceneParams: SceneParams
            └── generatedSceneUrl: string | null
                        │
                        ▼
            Image Generation API (Gemini / Imagen)
                        │
                        ▼
            GeneratedScene displayed in UI
                        │
                        ├── ProductLinks → /product/:slug (each selected product)
                        ├── WishlistSave → AccountStore
                        └── InquiryPrefill → /contact?products=id1,id2,id3
```

---

## SECTION 12 — STATE MANAGEMENT (ZUSTAND)

```typescript
// stores/productStore.ts
interface ProductStore {
  products: Product[];
  categories: Category[];
  collections: Collection[];
  designers: Designer[];
  activeFilters: FilterState;
  searchQuery: string;
  setFilter: (key: string, values: string[]) => void;
  resetFilters: () => void;
  setSearch: (q: string) => void;
  getProductsByCategory: (categorySlug: string) => Product[];
  getProductsByCollection: (collectionSlug: string) => Product[];
}

// stores/wishlistStore.ts
interface WishlistStore {
  items: WishlistItem[];
  addItem: (product: Product, variant?: ProductVariant) => void;
  removeItem: (productId: string) => void;
  clearWishlist: () => void;
  isInWishlist: (productId: string) => boolean;
}

// stores/aiGeneratorStore.ts
interface AIGeneratorStore {
  step: 1 | 2 | 3 | 4;
  spaceConfig: SpaceConfig;
  selectedProducts: AIProductPayload[];
  styleParams: StyleParams;
  generatedSceneUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  setStep: (step: number) => void;
  setSpaceConfig: (config: Partial<SpaceConfig>) => void;
  addProduct: (product: AIProductPayload) => void;
  removeProduct: (productId: string) => void;
  setStyleParams: (params: Partial<StyleParams>) => void;
  generateScene: () => Promise<void>;
  resetGenerator: () => void;
}

// stores/accountStore.ts
interface AccountStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}
```

---

## SECTION 13 — E-COMMERCE / INTERACTION LOGIC

### Inquiry Flow (primary conversion action — no direct cart)

```
User lands on PDP
    → Selects variant
    → Clicks "Request Information"
    → InquiryModal opens (pre-filled with product name + variant)
    → User fills: Name, Company, Email, Phone, Country, Message
    → Optional: "Add more products" → opens mini catalog to add to inquiry
    → Form submits to CRM / email endpoint
    → Confirmation message displayed
    → Optional: "Save to wishlist" offered post-submission
```

### Wishlist Flow

```
User clicks WishlistButton on ProductCard or PDP
    → If not logged in: SoftGateModal (login or continue as guest)
    → Item added to WishlistStore (persisted via localStorage)
    → WishlistDrawer can be opened from header icon
    → From Wishlist: "Request Info for All Items" → InquiryForm pre-filled
    → From Wishlist: "Share Wishlist" → shareable URL generated
```

### Catalogue Download Flow

```
User visits /catalogues
    → Clicks download
    → Gate: requires email (optional, soft gate)
    → PDF opens in new tab or downloads
```

---

## SECTION 14 — I18N STRUCTURE

```typescript
// Supported locales
const LOCALES = ['en', 'it', 'fr', 'de', 'es'] as const;

// Route prefix approach: /{locale}/path
// Default locale (en) can be prefix-less or prefixed

// Translation namespaces:
// common.json       — nav, buttons, labels
// products.json     — product-related strings
// categories.json   — category names and descriptions
// meta.json         — SEO strings per page type
// forms.json        — form labels, validation messages
// ai-generator.json — AI feature strings
```

---

## SECTION 15 — PERFORMANCE REQUIREMENTS

- Lazy-load all images (IntersectionObserver or `loading="lazy"`)
- ProductGrid: use virtual scroll for lists > 50 items
- Route-based code splitting: each page = separate chunk
- Image formats: WebP primary, PNG fallback, AVIF where supported
- ProductCard images: preload on hover (prefetch on `mouseenter`)
- AI Generator: show skeleton + progress indicator during generation (may take 5–15s)
- Filter changes: debounce 200ms before re-filtering product list

---

## SECTION 16 — ACCESSIBILITY REQUIREMENTS

- All interactive elements: keyboard navigable, visible focus ring
- Images: meaningful `alt` text from `ProductImage.altText`
- Modal dialogs: focus trap + `role="dialog"` + `aria-modal="true"`
- Navigation: `role="navigation"` + `aria-label` for each nav region
- Filter panel: `role="group"` + `fieldset`/`legend` per filter group
- Language switcher: `lang` attribute updates on `<html>` element
- Color contrast: minimum AA on all text (handled in Tailwind config)

---

## SECTION 17 — FILE/FOLDER STRUCTURE

```
src/
├── components/
│   ├── layout/
│   │   ├── RootLayout.tsx
│   │   ├── Header.tsx
│   │   ├── NavigationMenu.tsx
│   │   ├── Footer.tsx
│   │   └── TopBanner.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── VariantSelector.tsx
│   │   ├── DimensionsBlock.tsx
│   │   ├── FilterPanel.tsx
│   │   └── InquiryModal.tsx
│   ├── collection/
│   │   ├── CollectionCard.tsx
│   │   └── CollectionGrid.tsx
│   ├── project/
│   │   ├── ProjectCard.tsx
│   │   └── ProductsUsedInProject.tsx
│   ├── story/
│   │   └── StoryCard.tsx
│   ├── ai-generator/
│   │   ├── Step1_SpaceSetup.tsx
│   │   ├── Step2_ProductSelection.tsx
│   │   ├── Step3_StyleParams.tsx
│   │   ├── Step4_GenerateScene.tsx
│   │   └── AIProductTile.tsx
│   └── ui/
│       ├── Breadcrumb.tsx
│       ├── LanguageSwitcher.tsx
│       ├── SearchOverlay.tsx
│       ├── WishlistDrawer.tsx
│       ├── SkeletonCard.tsx
│       ├── CookieBanner.tsx
│       └── ProtectedRoute.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── ProductsIndexPage.tsx
│   ├── CategoryPage.tsx
│   ├── ProductDetailPage.tsx
│   ├── CollectionsIndexPage.tsx
│   ├── CollectionDetailPage.tsx
│   ├── DesignersIndexPage.tsx
│   ├── DesignerDetailPage.tsx
│   ├── ProjectsIndexPage.tsx
│   ├── ProjectDetailPage.tsx
│   ├── StoriesIndexPage.tsx
│   ├── StoryDetailPage.tsx
│   ├── NewsIndexPage.tsx
│   ├── AIGeneratorPage.tsx
│   ├── ConfiguratorPage.tsx
│   ├── ContractPage.tsx
│   ├── MaterialsPage.tsx
│   ├── CataloguesPage.tsx
│   ├── ShowroomsPage.tsx
│   ├── AboutPage.tsx
│   ├── SustainabilityPage.tsx
│   ├── ContactPage.tsx
│   ├── account/
│   │   ├── LoginPage.tsx
│   │   ├── RegisterPage.tsx
│   │   ├── AccountDashboard.tsx
│   │   ├── WishlistPage.tsx
│   │   └── ProfilePage.tsx
│   └── legal/
│       ├── PrivacyPage.tsx
│       ├── CookiePolicyPage.tsx
│       └── TermsPage.tsx
├── stores/
│   ├── productStore.ts
│   ├── wishlistStore.ts
│   ├── aiGeneratorStore.ts
│   └── accountStore.ts
├── hooks/
│   ├── useProducts.ts
│   ├── useFilter.ts
│   ├── useWishlist.ts
│   ├── useSearch.ts
│   └── useAIGenerator.ts
├── lib/
│   ├── api.ts              // API client
│   ├── imageProcessor.ts   // Gemini image pipeline integration
│   └── aiPromptBuilder.ts  // Scene prompt construction
├── types/
│   └── index.ts            // All TypeScript interfaces (from Section 4–8)
├── i18n/
│   └── locales/
│       ├── en/
│       ├── it/
│       ├── fr/
│       ├── de/
│       └── es/
└── App.tsx                 // Router tree (from Section 10)
```

---

## SECTION 18 — DEPENDENCIES

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "i18next": "^23.0.0",
    "react-i18next": "^14.0.0",
    "react-intersection-observer": "^9.5.0",
    "@tanstack/react-query": "^5.0.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0",
    "@types/react": "^18.3.0",
    "vite": "^5.0.0"
  }
}
```

---

## SECTION 19 — IMAGE PIPELINE — TECHNICAL IMPLEMENTATION

```typescript
// lib/imageProcessor.ts

import { GoogleGenerativeAI } from "@google/generative-ai";

interface ImageProcessingResult {
  originalPath: string;
  processedPath: string;
  wasReprocessed: boolean;
  qualityScore: number;     // 0–100 estimated quality
  issues: string[];         // e.g. ['harsh_shadow', 'text_overlay', 'blur']
}

async function processProductImage(
  imagePath: string,
  productContext: { name: string; category: string; materials: string[] }
): Promise<ImageProcessingResult> {
  
  // 1. Load image from disk
  // 2. Run quality assessment (blur detection, shadow detection, text detection)
  // 3. If quality score < threshold (e.g. 70):
  //    a. Build Gemini prompt:
  const prompt = `
    Recreate this exact outdoor furniture product: ${productContext.name}
    Category: ${productContext.category}
    Materials: ${productContext.materials.join(', ')}
    
    Requirements:
    - Same exact view angle as reference
    - Same materials, textures, and colors
    - Same proportions and design details
    - Pure white or transparent background
    - No shadows cast on background
    - No text, watermarks, labels, or captions
    - Soft even studio lighting
    - Ultra-clean luxury product photography style
    - High resolution, sharp edges
  `;
  //    b. Call Gemini API with reference image + prompt
  //    c. Save output as {originalName}_remade.png
  //    d. Return new path
  
  // 4. If quality passes: return original path unchanged
}

// Batch processing entry point
async function processProductImageFolder(folderPath: string): Promise<void> {
  // Recursively scan folder
  // Process each .jpg, .jpeg, .png, .webp file
  // Update product data JSON references
  // Log processing report
}
```

---

## SECTION 20 — FUNCTIONAL REQUIREMENTS SUMMARY

### CATALOG REQUIREMENTS
- [ ] Browse all products by category type
- [ ] Browse by collection
- [ ] Filter by: collection, designer, material, environment, style
- [ ] Full-text search across products, collections, projects
- [ ] Product detail with variant selection + dimensions + specs
- [ ] Download technical sheet (PDF) per product
- [ ] Add to wishlist from any product surface
- [ ] Inquiry form per product with variant pre-fill
- [ ] Related products (same collection) on PDP
- [ ] Projects using this product on PDP
- [ ] Multi-language (EN, IT, FR, DE, ES)

### E-COMMERCE REQUIREMENTS
- [ ] Wishlist (guest + authenticated)
- [ ] Share wishlist via URL
- [ ] Request inquiry: single product or bulk from wishlist
- [ ] CRM/email endpoint for inquiry submissions
- [ ] User account: register, login, reset password
- [ ] Saved wishlists in account
- [ ] PDF catalogue download (with optional email gate)
- [ ] Dealer/showroom locator

### AI GENERATOR REQUIREMENTS
- [ ] Product selection from catalog (filtered to AI-ready products)
- [ ] Space configuration (type, dimensions, environment)
- [ ] Style parameter selection (mood, season, time of day, lighting)
- [ ] Scene generation via Gemini/Imagen API
- [ ] Generated scene download
- [ ] "Shop the scene" → links to product PDPs
- [ ] Save scene products to wishlist
- [ ] Request quote for entire scene setup
- [ ] Gemini image pipeline for product image preprocessing (clean cutouts)

---

*End of AI Coder Instruction Document — v1.0*
*Reference sites analyzed: rodaonline.com, talentispa.com, ethimo.com*
