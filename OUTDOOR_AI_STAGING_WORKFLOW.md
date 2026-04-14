# OUTDOOR AI STAGING WORKFLOW
## Technical Implementation Document for AI Coder

## 1. Objective

Build a frontend web feature for an outdoor furniture manufacturer that allows a user to:

1. Upload a real photo of their garden, terrace, patio, poolside, or outdoor area.
2. Select products from the website catalog using product thumbnails shown in a left-side panel.
3. Send the uploaded environment image plus the selected furniture references to an image generation/editing pipeline.
4. Generate a new photorealistic image of the same outdoor space, now furnished with the selected products.
5. Optionally refine the result with simple follow-up adjustments.

This is **not** a generic text-to-image feature. It must be built as a **controlled image-editing and product-placement workflow** using:
- the user’s uploaded scene image as the base environment,
- the real catalog products as reference assets,
- a structured prompt builder,
- optional scene analysis / segmentation,
- a multimodal image editing API.

---

## 2. Main Product Goal

The feature must help potential customers visualize how the manufacturer’s real furniture collection would look inside their own outdoor space.

The output must feel:
- premium,
- photorealistic,
- commercially usable,
- faithful to the selected furniture,
- visually coherent with the original scene.

The system must preserve:
- camera angle,
- architecture,
- pool shape,
- garden layout,
- paving/decking,
- major vegetation,
- overall scene identity.

The system must insert:
- only the selected products,
- with plausible scale,
- in believable positions,
- with realistic light, shadows, perspective, and spacing.

---

## 3. Recommended Product Experience

### 3.1 MVP user flow

1. User opens the “Visualize in Your Space” page.
2. User uploads one outdoor image.
3. Frontend validates the image.
4. Left panel displays product categories and thumbnails.
5. User selects one or more products.
6. User optionally chooses a layout mode:
   - Dining setup
   - Lounge setup
   - Poolside setup
   - Mixed outdoor arrangement
7. User clicks **Generate Preview**.
8. Backend builds a structured request and sends it to the chosen image API.
9. User receives a generated preview.
10. User can refine with simple commands such as:
   - move dining area closer to the pool,
   - reduce sofa size,
   - add more space between lounge and dining,
   - use only two sunbeds.

### 3.2 Recommended V2 flow

After the MVP works, add:
- suggested placement zones,
- click-to-place areas,
- optional scene masks,
- saved render history,
- downloadable final render.

Do **not** start with full drag-and-drop free placement. It adds complexity and instability too early.

---

## 4. Core System Principles

### 4.1 This is not prompt-only generation
The output quality will be poor if the system relies only on text prompts.

The workflow must always combine:
- the environment image,
- one or more product reference images,
- product metadata,
- a structured instruction prompt.

### 4.2 Preserve the original outdoor scene
The model must treat the uploaded image as the base scene.
It must not redesign the house, move the pool, replace the paving, or alter the garden significantly.

### 4.3 Preserve product identity
The inserted furniture must remain close to the selected real products.
The system must not invent random furniture that merely looks “similar”.

### 4.4 Use controlled placement logic
The system should not leave product placement fully to the generative model.
A lightweight scene-analysis layer should help define plausible furniture zones.

---

## 5. Recommended Technical Architecture

## 5.1 Frontend
Recommended stack:
- React
- Tailwind CSS
- TypeScript
- Zustand or React Context for local state
- React Query or SWR for async request state

### Main frontend areas
- Main scene upload area
- Left-side product/category panel
- Selected items tray
- Render action bar
- Preview/result area
- Optional refine controls

### Main frontend components
- `SceneUploader`
- `ScenePreview`
- `ProductCategorySidebar`
- `ProductThumbnailCard`
- `SelectedProductsTray`
- `LayoutModeSelector`
- `GenerateButton`
- `RefinePanel`
- `RenderResultViewer`
- `RenderHistoryPanel` (later phase)

---

## 5.2 Backend
Recommended stack:
- Node.js + TypeScript or Python FastAPI
- Object storage for uploads and generated outputs
- Redis for job state / caching if needed
- Postgres for metadata and history
- Queue worker for render jobs if render time is not instant

### Backend responsibilities
- upload handling,
- image validation,
- scene preprocessing,
- scene analysis,
- product metadata lookup,
- prompt generation,
- API orchestration,
- render job tracking,
- refine loop management,
- caching.

---

## 5.3 Storage
Use a structured storage approach.

### User uploads
- original uploaded scene
- normalized working image
- analysis overlays / masks

### Product assets
Each catalog item should have AI-ready assets:
- clean product reference image(s)
- optional transparent PNG
- optional white-background image
- optional multiple angles

### Generated outputs
- preview render
- refined render versions
- final HQ export

---

## 6. Product Asset Preparation Requirements

This part is critical.
The quality of the feature depends heavily on the quality of the furniture assets.

Each product should have:
- stable product ID,
- category,
- collection/family,
- dimensions,
- material tags,
- 1–3 high-quality reference images,
- if possible, clean cutout or neutral background versions.

### Example product metadata schema

```json
{
  "id": "sunbed_014",
  "name": "Teak Outdoor Sunbed",
  "category": "sunbed",
  "collection": "Mediterraneo",
  "dimensions_cm": {"w": 78, "d": 205, "h": 35},
  "materials": ["teak", "outdoor fabric"],
  "finishes": ["natural teak", "sand fabric"],
  "reference_images": [
    "/assets/products/sunbed_014/angle.png",
    "/assets/products/sunbed_014/front.png"
  ],
  "ai_tags": [
    "outdoor sunbed",
    "teak frame",
    "premium",
    "poolside",
    "minimal contemporary"
  ]
}
```

### Product categories to support initially
- dining chair
- dining table
- lounge chair
- sofa
- sectional sofa
- coffee table
- side table
- sunbed
- ottoman / pouf
- bench

---

## 7. Scene Analysis Layer

A controlled rendering workflow should not blindly place furniture into the photo.

The system should first analyze the environment image and estimate:
- ground plane,
- terrace/deck/paving,
- grass area,
- pool edge,
- walls,
- major fixed objects,
- likely usable placement areas.

### Goals of scene analysis
- avoid placing furniture floating in space,
- avoid unrealistic scale,
- avoid occluding essential architecture incorrectly,
- guide the render prompt with placement zones.

### Recommended tooling
For segmentation and scene guidance, consider using a segmentation model such as SAM 2.
Use it to generate candidate zones or masks rather than attempting full CAD-like reconstruction.

### Output of scene analysis
Return a scene summary JSON.

```json
{
  "scene_type": "garden_with_pool",
  "camera_angle": "3_4_view",
  "lighting": "daylight",
  "zones": [
    {
      "id": "zone_dining",
      "surface": "patio",
      "confidence": 0.89,
      "recommended_use": "dining"
    },
    {
      "id": "zone_lounge",
      "surface": "deck",
      "confidence": 0.83,
      "recommended_use": "lounge"
    },
    {
      "id": "zone_poolside",
      "surface": "pool_edge",
      "confidence": 0.91,
      "recommended_use": "sunbeds"
    }
  ],
  "constraints": [
    "preserve architecture",
    "preserve pool geometry",
    "preserve major planting",
    "do_not_change_camera_angle"
  ]
}
```

---

## 8. Prompt Builder Logic

This must be implemented as a system-generated prompt builder, not a freeform user prompt.

### Input to prompt builder
- scene metadata,
- user image,
- selected products,
- optional layout mode,
- optional zone choices,
- optional refine instructions.

### Responsibilities of prompt builder
- instruct the model to preserve the environment,
- instruct the model to insert only selected products,
- assign products to plausible zones,
- maintain product fidelity,
- maintain realistic scale and perspective,
- avoid adding unwanted extra furniture.

### Example base prompt template

```text
Use the uploaded outdoor photo as the base scene.
Preserve architecture, pool shape, paving, vegetation, camera angle, perspective, and overall lighting.
Insert only the selected outdoor furniture shown in the provided reference images.
Place the dining table and 4 dining chairs in the patio area.
Place the selected sofa and coffee table in the lounge zone.
Place 2 selected sunbeds near the pool edge.
Keep the inserted products faithful to the reference images in shape, material, finish, and proportions.
Ensure scale is realistic and placement is believable.
Maintain realistic contact shadows, spacing, and outdoor editorial-quality photorealism.
Do not redesign the property.
Do not add extra furniture.
```

### Example refine prompt template

```text
Use the previous generated image as the new base.
Keep all selected products and preserve the scene.
Move the dining area slightly closer to the pergola.
Reduce the visual dominance of the sofa area.
Increase open circulation space between the dining set and the lounge set.
Keep photorealism, realistic shadows, and product fidelity.
```

### Negative instructions to include
- do not redesign the garden,
- do not alter the architecture,
- do not add furniture not selected,
- do not change product family,
- do not distort furniture scale,
- do not create surreal staging,
- do not generate clutter.

---

## 9. Recommended API Strategy

## 9.1 Primary recommendation for MVP
Use **Google Gemini 2.5 Flash Image / Nano Banana** as the first integrated image generation/editing API.

### Why
- strong multimodal workflow,
- suitable for image+text editing,
- fast enough for preview-oriented product UX,
- good fit for iterative refinement.

### Use case in this project
- preview render generation,
- iterative refinement,
- environment-preserving edits,
- product insertion using references.

## 9.2 Secondary / premium option
Evaluate a premium rendering path using either:
- OpenAI GPT Image, or
- FLUX.2 / similar multi-reference capable model.

### Why
These can be used later for:
- higher quality marketing-grade renders,
- stronger control on product fidelity,
- premium HQ export mode.

## 9.3 Recommended rollout strategy
### Phase 1
- one engine only,
- fast preview generation,
- stable MVP.

### Phase 2
- add fallback or premium final-render engine,
- compare quality on selected environments,
- use best engine for HQ final output.

---

## 10. Placement Logic Recommendations

Pure generative placement is unstable.
Introduce lightweight rule logic.

### Example placement rules
- dining sets should prefer patio / paved areas,
- lounge sets should prefer deck / seating zones,
- sunbeds should prefer pool-edge zones,
- avoid placing large furniture on narrow grass strips,
- avoid blocking primary visual axis to pool or house,
- avoid overlapping existing furniture unless explicitly intended.

### Optional future feature
Let the user click one suggested zone for each product group:
- place dining here,
- place lounge here,
- place sunbeds here.

This provides control without requiring full drag-and-drop.

---

## 11. Backend API Design

Suggested endpoint structure:

### `POST /api/scene/upload`
Uploads image and returns upload ID.

### `POST /api/scene/analyze`
Input:
- upload ID

Output:
- normalized image URL
- scene metadata
- placement zones
- quality flags

### `GET /api/products`
Returns catalog products or filtered category data.

### `POST /api/render/generate`
Input:
- scene ID
- selected product IDs
- layout mode
- optional zone selections

Output:
- render job ID
- status

### `GET /api/render/:jobId`
Output:
- pending / processing / complete / failed
- preview URL
- diagnostics if failed

### `POST /api/render/refine`
Input:
- previous render ID
- refine instruction

Output:
- new render job ID

---

## 12. Internal Data Contracts

## 12.1 Selected products request

```json
{
  "scene_id": "scene_123",
  "layout_mode": "mixed",
  "selected_products": [
    {
      "product_id": "table_002",
      "quantity": 1
    },
    {
      "product_id": "chair_017",
      "quantity": 4
    },
    {
      "product_id": "sofa_005",
      "quantity": 1
    },
    {
      "product_id": "coffee_table_004",
      "quantity": 1
    },
    {
      "product_id": "sunbed_014",
      "quantity": 2
    }
  ]
}
```

## 12.2 Prompt builder internal output

```json
{
  "base_scene_image": "/uploads/scene_123/normalized.jpg",
  "reference_images": [
    "/assets/products/table_002/angle.png",
    "/assets/products/chair_017/front.png",
    "/assets/products/sofa_005/angle.png"
  ],
  "prompt": "Use the uploaded outdoor photo as the base scene...",
  "negative_constraints": [
    "do not redesign the garden",
    "do not add extra furniture",
    "do not alter architecture"
  ],
  "zone_mapping": {
    "table_002": "zone_dining",
    "chair_017": "zone_dining",
    "sofa_005": "zone_lounge",
    "coffee_table_004": "zone_lounge",
    "sunbed_014": "zone_poolside"
  }
}
```

---

## 13. Frontend State Model

Suggested top-level state:

```ts
interface VisualizerState {
  sceneUploadId: string | null;
  sceneImageUrl: string | null;
  sceneAnalysis: SceneAnalysisResult | null;
  selectedProducts: SelectedProduct[];
  layoutMode: 'dining' | 'lounge' | 'poolside' | 'mixed' | null;
  renderJobId: string | null;
  renderStatus: 'idle' | 'uploading' | 'analyzing' | 'ready' | 'rendering' | 'done' | 'error';
  renderImageUrl: string | null;
  refineInstruction: string;
}
```

Frontend must support:
- optimistic UI for product selection,
- explicit loading states,
- retry states,
- render history persistence per session.

---

## 14. Validation Rules

The coder must implement validation before sending requests to the image API.

### Input image validation
Reject or warn if:
- image resolution too low,
- scene too dark,
- severe blur,
- no visible outdoor area,
- impossible angle,
- file too large.

### Product validation
- product asset missing,
- product image too weak,
- no category,
- reference image broken.

### Prompt validation
- prompt must include preserve-scene instructions,
- prompt must include product fidelity instructions,
- prompt must include no-extra-furniture instruction.

### Output validation
After receiving the result, check for:
- missing selected items,
- visibly wrong scale,
- strong scene deformation,
- obviously wrong materials,
- severe artifacts.

If result fails quality checks, automatically retry once with a stricter prompt.

---

## 15. Quality Bar

The final generated image must satisfy these criteria:
- scene still recognizable as the user’s original space,
- selected products visibly present,
- product forms reasonably faithful to references,
- furniture placed in believable positions,
- realistic scale,
- realistic shadows,
- no floating products,
- no duplicated random furniture,
- no destruction of original architecture,
- premium commercial visual quality.

If these are not met, the render is not acceptable.

---

## 16. Recommended MVP Scope

### Must have
- upload scene image,
- select products,
- generate one preview,
- refine once,
- save render result,
- basic scene analysis,
- structured prompt builder,
- premium-looking UI.

### Not needed in MVP
- full drag-and-drop,
- user manual masking,
- full 3D reconstruction,
- multi-view synchronized rendering,
- AR.

---

## 17. Roadmap

## Phase 1 — MVP
- build UI,
- connect upload,
- product selection,
- prompt builder,
- one image API integration,
- one-step preview generation.

## Phase 2 — Controlled placement
- scene zones,
- click-to-place,
- refine loop,
- improved quality validation.

## Phase 3 — Premium render mode
- higher resolution final render,
- optional second rendering engine,
- better product fidelity scoring,
- render export.

## Phase 4 — Advanced personalization
- saved user projects,
- multiple scene uploads,
- collection recommendations,
- style filters,
- assisted layout suggestions.

---

## 18. Implementation Order for the AI Coder

Build in this sequence:

1. product asset schema
2. upload page and image validation
3. left-side product panel with categories and thumbnails
4. selected product state management
5. scene upload backend
6. scene analysis endpoint
7. prompt builder service
8. first render endpoint
9. first image API integration
10. result viewer
11. refine endpoint
12. output validation and retry logic
13. caching
14. UI refinement

Do not skip the prompt builder and scene analysis architecture.
Do not hardcode freeform prompts directly in the frontend.
Do not use random staging logic disconnected from the selected products.

---

## 19. Non-Negotiable Rules

- The uploaded scene is the base truth.
- The selected products are the only allowed furniture references.
- Product identity must be preserved as much as possible.
- The model must not redesign the property.
- The result must look commercially premium.
- Validation must happen before and after render generation.
- The frontend UX must feel simple even if backend logic is structured.

---

## 20. Final Recommendation

For the first production version:
- use **Gemini 2.5 Flash Image / Nano Banana** for preview rendering,
- add a light **scene analysis / segmentation** layer,
- use structured product metadata,
- build a strict internal prompt builder,
- postpone drag-and-drop to a later phase,
- keep the system centered on **real product visualization**, not generic AI decoration.

This will produce the best balance of:
- development speed,
- output quality,
- product fidelity,
- UX simplicity,
- future scalability.

