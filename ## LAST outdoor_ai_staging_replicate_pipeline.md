# Outdoor AI Staging Pipeline for Furniture Website

## Objective
Build a production-ready web feature for an outdoor furniture brand where a user:
1. uploads a real photo of their garden / terrace / pool area;
2. selects products from the brand catalog;
3. manually selects the area where the furniture should be placed;
4. generates a photorealistic image that preserves the original scene and only adds the selected furniture.

This document defines the recommended technical pipeline for the AI coder.

---

## Chosen Strategy
**Pipeline Option A**

The user manually selects the area where the furniture should be inserted.

Recommended stack on **Replicate**:
- **Segmentation / masking:** `meta/sam-2` or Grounded SAM
- **Main image editing model:** `qwen/qwen-image-edit-plus`
- **Fallback / secondary model:** `google/nano-banana-pro`

This is not a single-model workflow. It is a controlled pipeline:
1. scene image upload
2. user area selection
3. mask refinement
4. prompt building
5. multi-image editing/compositing
6. preview
7. optional refine loop

---

## Why the Previous Approach Likely Failed
A generic image editing prompt is not enough for this use case.

The task requires all of the following simultaneously:
- preserve the original background almost perfectly;
- insert new branded products;
- respect product identity, materials, and proportions;
- maintain realistic scale and perspective;
- localize edits to one selected region only;
- avoid redesigning the house, garden, pool, paving, or vegetation.

Without a mask and a controlled prompt, most models will reinterpret the entire image.

Therefore:
- **do not rely on prompt-only editing**;
- **do not rely on one “magic” model**;
- **do not let the model choose where to place furniture**.

The area must be explicitly selected by the user and converted into a mask.

---

## Core Product Goal
The generated result must:
- keep the original uploaded photo recognizable;
- preserve architecture, pool geometry, paving, landscaping, and camera angle;
- insert only the selected furniture;
- maintain the real design language of the brand’s products;
- feel like a premium architectural visualization / lifestyle render;
- avoid obvious AI artifacts, floating furniture, scale errors, and unwanted scene changes.

---

## UX Flow

### Step 1 — Upload Scene
The user uploads a photo of their outdoor area.

Accepted scenes may include:
- garden
- terrace
- patio
- pool deck
- courtyard
- outdoor dining area
- villa exterior

### Step 2 — Select Products
The user selects products from the left sidebar.

Examples:
- dining table
- dining chairs
- sofa
- lounge chair
- coffee table
- side table
- sunbed
- ottoman

### Step 3 — Select Placement Area
The user manually selects the area where the furniture should be placed.

This is essential.

The area selection can be implemented as:
- polygon selection
- brush selection
- rectangle selection with refinement
- lasso tool

The selected region becomes the editable zone.

### Step 4 — Generate Preview
The system refines the selected area into a mask, prepares the prompt, sends the request to Replicate, and returns a preview.

### Step 5 — Optional Refine
The user can request refinements such as:
- move sofa slightly left
- reduce scale
- add 2 more chairs
- place sunbeds closer to the pool edge
- increase spacing

---

## Recommended Technical Architecture

### Frontend
Suggested stack:
- React
- Next.js
- Tailwind
- canvas-based selection layer

Frontend responsibilities:
- scene upload
- product selection
- placement-area selection
- preview display
- refine controls
- session state

### Backend
Suggested stack:
- Node.js or Python API server
- queue / async job system for generation tasks
- object storage for uploaded scenes and product references
- caching layer for generated outputs

Backend responsibilities:
- receive scene image and metadata
- receive user selection area
- fetch product references and metadata
- call segmentation model if needed
- build masks
- construct editing prompt
- call Replicate models
- save preview outputs
- handle retries and fallback model routing

---

## Recommended Model Stack on Replicate

### 1. SAM 2 / Grounded SAM
Use for:
- turning the user-selected area into a cleaner editable mask;
- optionally refining edges and excluding non-target geometry.

Purpose:
- constrain the edit to a limited region;
- minimize global changes;
- reduce hallucinations.

Use cases:
- user brushes a patio area
- system refines the selected deck contour
- model receives only that zone as editable

### 2. Qwen Image Edit Plus
Use as the **primary image editing model**.

Why:
- supports multi-image editing;
- supports product-based editing workflows;
- is better suited for controlled compositing than generic creative image generators;
- is better aligned with preserving scene context while inserting references.

Main use:
- base scene image
- area mask
- selected product references
- strict editing prompt

### 3. Nano Banana Pro
Use as a **fallback** or secondary generation path.

Why:
- supports more reference images;
- useful when the scene needs multiple products or more complex composition;
- useful when Qwen struggles with multi-item placement.

Do not use it as the only model by default.

---

## Why Qwen Image Edit Plus Is the Main Choice
Qwen should be the default production model because it offers the best balance of:
- precision editing
- multi-image support
- product fidelity
- scene-aware insertion
- controlled appearance editing

For this product, precision matters more than creative freedom.

---

## Why Masking Is Mandatory
If the user says “put furniture here”, that instruction must become machine-readable.

The model should not decide on its own:
- where the lounge goes
- where the dining set goes
- what part of the patio is editable
- whether part of the house can be modified

The mask defines:
- where edits are allowed
- where edits are forbidden

This is the key control layer for preserving the original uploaded image.

---

## Product Asset Preparation
This part is critical.

Each furniture product in the catalog must have AI-ready references.

### Required per product
- product ID
- product category
- collection name
- material / finish
- dimensions
- 1–3 clean reference images
- optional transparent PNG or white background version
- AI tags

### Product references must be:
- clean
- high resolution
- consistent lighting
- free from clutter
- true to the real product
- visually neutral enough to support scene insertion

If the product references are low quality, the scene output will be unstable.

---

## Suggested Product Metadata Schema
```json
{
  "id": "sunbed_001",
  "name": "Outdoor Sunbed Teak",
  "category": "sunbed",
  "collection": "Portofino",
  "materials": ["teak", "outdoor fabric"],
  "dimensions_cm": {
    "w": 76,
    "d": 205,
    "h": 34
  },
  "reference_images": [
    "/products/sunbed_001/front.png",
    "/products/sunbed_001/angle.png"
  ],
  "ai_tags": [
    "outdoor sunbed",
    "teak frame",
    "premium contemporary",
    "poolside furniture"
  ]
}
```

---

## Generation Pipeline — Detailed

### Phase 1 — Input Collection
Receive:
- scene image
- selected products
- selected placement area
- optional layout preference
- optional refine text

### Phase 2 — Scene Normalization
Pre-process the uploaded image:
- normalize orientation
- resize to model-friendly size
- preserve high enough detail
- generate preview image for frontend
- compute basic quality score

Reject or warn if:
- image too blurry
- extreme fisheye distortion
- night image too dark
- no usable outdoor surface visible

### Phase 3 — Area Mask Creation
Input:
- user-selected polygon / brush / box

Steps:
1. convert user selection to preliminary mask
2. refine with SAM 2 / Grounded SAM if needed
3. exclude geometry outside intended editable zone
4. create final mask

Optional mask logic:
- block house façade from edit
- block sky from edit
- block pool water if not selected
- block major vegetation outside selected zone

### Phase 4 — Product Reference Preparation
For selected products:
- fetch reference images
- fetch metadata
- limit number of refs sent to model
- prioritize best reference angle
- group products logically

Example:
- dining table + chairs as dining group
- sofa + coffee table as lounge group
- sunbeds as poolside group

### Phase 5 — Prompt Builder
Construct a strict system-generated prompt.

The prompt must always include:
- preserve original scene
- edit only the masked area
- insert only selected products
- keep product identity faithful to references
- maintain realistic scale and perspective
- do not alter architecture or landscaping outside mask
- add realistic contact shadows
- no extra furniture

### Example Prompt Template
```text
Use the uploaded outdoor scene photo as the base image.
Preserve the original architecture, pool, paving, vegetation, lighting direction, and camera angle.
Edit only the masked area.
Insert the selected branded outdoor furniture from the provided reference images.
Keep all products faithful to the references in shape, materials, finish, and proportions.
Maintain realistic contact with the ground, believable spacing, and correct scale.
Do not change the house, pool shape, deck geometry, sky, or garden outside the editable area.
Do not add extra furniture or redesign the environment.
Output a photorealistic premium outdoor furniture visualization.
```

### Phase 6 — Primary Generation
Default call:
- model: `qwen/qwen-image-edit-plus`

Inputs:
- base scene image
- mask
- selected product reference images
- generated prompt

Output:
- preview render

### Phase 7 — Fallback Logic
If primary output fails quality checks:
- rerun with modified prompt
- reduce number of product refs if overloaded
- switch to `google/nano-banana-pro`

Fallback conditions:
- poor product fidelity
- severe background drift
- floating furniture
- bad scale
- obvious unwanted modifications

### Phase 8 — Output Validation
Run validation checks on the result.

#### Visual validation goals
- background preserved
- furniture grounded properly
- scale plausible
- no geometry damage
- no duplicated products
- no major AI artifacts
- original scene still recognizable

#### Human-visible failure examples
- furniture floating
- pool changed shape
- patio changed color
- house windows altered
- extra chairs invented
- vegetation restyled unnecessarily

### Phase 9 — Refine Loop
Allow user to request one-step refinements.

Refine input examples:
- place the sofa slightly more to the right
- reduce overall size by 10%
- keep more empty space
- move sunbeds closer to pool border

The refine request should reuse:
- previous output
- original scene
- existing mask
- same product references

---

## Recommended Job Structure

### Backend Endpoints
`POST /api/scene/upload`
- upload scene image

`POST /api/scene/mask`
- receive user-selected area
- build refined mask

`POST /api/render/generate`
- generate preview render

`POST /api/render/refine`
- refine previous render

`GET /api/render/:id`
- get render status and result

---

## Request Payload Example
```json
{
  "scene_image_url": "https://cdn.example.com/scenes/scene_001.jpg",
  "mask_url": "https://cdn.example.com/masks/scene_001_mask.png",
  "selected_products": [
    "sofa_001",
    "coffee_table_004",
    "sunbed_002"
  ],
  "layout_mode": "custom_area",
  "prompt_override": null,
  "refine_instruction": null
}
```

---

## Internal Pipeline Logic
```text
User uploads scene
-> frontend stores image
-> user selects products
-> user marks target area
-> backend refines target area into mask
-> backend fetches product references
-> prompt builder creates strict edit prompt
-> Qwen Image Edit Plus generates preview
-> validator checks output quality
-> if failed, fallback to Nano Banana Pro
-> return preview to frontend
-> optional refine loop
```

---

## Quality Rules for the AI Coder

### Absolute Requirements
- never let the model redesign the full scene by default
- never skip masking
- never send too many uncontrolled product refs
- never use a loose creative prompt
- never place products without an explicit user-selected area

### Product Fidelity Rules
- preserve the exact design language of the selected products
- preserve material tone and finish
- preserve the proportions of each furniture item
- avoid turning one product into another

### Scene Preservation Rules
- preserve architecture
- preserve pool geometry
- preserve paving pattern
- preserve camera framing
- preserve major vegetation and layout

### Output Acceptance Rules
Accept result only if:
- furniture placement is believable
- background mostly preserved
- no obvious distortions
- no extra hallucinated objects
- no large-scale environment rewrite

---

## Performance / Cost Strategy
For MVP:
- generate 1 preview first
- no batch variants by default
- offer “Generate New Variation” only on demand
- cache results by scene + product set + mask hash

This reduces unnecessary API cost.

### Cache Key Suggestion
Hash based on:
- scene image checksum
- product IDs
- mask checksum
- prompt version
- model version

---

## Risks and Mitigations

### Risk 1 — Background drift
**Mitigation:** strict mask + preserve prompt + validator

### Risk 2 — Poor product fidelity
**Mitigation:** better product references + reduce ref count + Qwen primary

### Risk 3 — Bad scale
**Mitigation:** dimension-aware product metadata + prompt guidance + refine loop

### Risk 4 — Too much scene reinterpretation
**Mitigation:** local edit only, no full-image generation

### Risk 5 — Too many user expectations for precision
**Mitigation:** start with “photorealistic visualization” language, not “exact CAD placement” language

---

## MVP Scope Recommendation
Implement only this first:
- one uploaded scene
- manual user-selected area
- up to 3 selected products or 1 grouped set
- one preview generation
- one refine step

Do **not** start with:
- free drag-and-drop 3D placement
- unlimited product count
- multi-area simultaneous editing
- automatic room/garden understanding without user control

The MVP should optimize for reliability, not feature count.

---

## Final Recommendation
Implement this production path first:

### Primary stack
- `meta/sam-2` or Grounded SAM for mask refinement
- `qwen/qwen-image-edit-plus` for main editing
- `google/nano-banana-pro` as fallback

### Why this stack
Because it is the best balance on Replicate today for:
- preserving the original image
- inserting branded products
- controlling edits with user-selected area
- maintaining better product fidelity than generic editing flows

This is the correct architecture for the outdoor furniture site feature.

Do not build this as a single prompt-to-image shortcut.
Build it as a controlled AI staging pipeline.

