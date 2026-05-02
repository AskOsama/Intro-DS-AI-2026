# Arabic SVG Rendering Guidelines

## The Problem: `direction="rtl"` on SVG Root Element

When creating Arabic SVG diagrams, a common mistake is placing `direction="rtl"` on the `<svg>` root element. This causes **unpredictable text positioning** because it affects the entire coordinate system.

## Three Major Issues Caused by Root-Level RTL

### Issue 1: Text Anchor Behavior Becomes Counterintuitive

In an RTL SVG context:
- `text-anchor: start` = text starts at x position, extends **LEFT** (not right!)
- `text-anchor: end` = text ends at x position, extends **LEFT**
- This causes text to overflow container boundaries unexpectedly

**Example Problem:**
```xml
<!-- Box spans x=30 to x=480 -->
<rect x="30" y="400" width="450" height="80"/>
<!-- Text at x=440 with text-anchor: end -->
<text x="440" text-anchor="end">تقسيم البيانات إلى مجموعات</text>
<!-- In RTL context, text extends LEFT unpredictably, may overflow -->
```

### Issue 2: Function Brackets Get Reversed

Code text like `info()` renders as `()info` because the parentheses are treated as RTL characters.

**Example:**
```xml
<!-- This renders as: ()info مقابل ()describe -->
<text>()info مقابل ()describe</text>
```

### Issue 3: Label Positioning Breaks Visual Alignment

Circle/bullet and label pairs become misaligned because coordinates behave differently in RTL context.

---

## The Solution: Text-Level RTL Only

### Step 1: Remove `direction="rtl"` from SVG Root

**Wrong:**
```xml
<svg xmlns="..." viewBox="..." direction="rtl">
```

**Correct:**
```xml
<svg xmlns="..." viewBox="...">
```

### Step 2: Add `direction: rtl` to Arabic Text CSS Classes

```css
/* Arabic text classes - add direction: rtl */
.title { direction: rtl; }
.subtitle { direction: rtl; }
.desc-text { direction: rtl; }
.label-text { direction: rtl; }
.cell-text { direction: rtl; }
.header-text { direction: rtl; }

/* Code/terminal classes - keep direction: ltr */
.code-text { direction: ltr; }
.terminal-text { direction: ltr; }
.output-text { direction: ltr; }
.file-text { direction: ltr; }  /* CSV content */
```

### Step 3: Use Predictable Positioning

With LTR coordinate system:
- `text-anchor: start` = text starts at x, extends **RIGHT**
- `text-anchor: end` = text ends at x, extends **LEFT**
- `text-anchor: middle` = text centered at x

For Arabic right-aligned text:
- Use `text-anchor: end` with x near the RIGHT edge of container
- Text extends LEFT into the container

For Arabic left-aligned text:
- Use `text-anchor: start` with x near the LEFT edge
- Text extends RIGHT

### Step 4: Fix Function Names

Put function names with brackets correctly:
```xml
<!-- Correct - brackets will appear after function names -->
<text class="title">info() مقابل describe(): طريقتان لفهم بياناتك</text>
```

---

## Complete Working Example

```xml
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
  <defs>
    <style>
      /* Arabic text with RTL direction */
      .arabic-text {
        font-family: 'Cairo', Arial, sans-serif;
        direction: rtl;
        text-anchor: end;
      }
      /* Code text with LTR direction */
      .code-text {
        font-family: 'Courier New', monospace;
        direction: ltr;
        text-anchor: start;
      }
    </style>
  </defs>

  <!-- Container box -->
  <rect x="50" y="50" width="400" height="100" fill="#f0f0f0"/>

  <!-- Bullet point at right edge -->
  <circle cx="440" cy="80" r="5" fill="#3498db"/>

  <!-- Arabic text extending left from bullet -->
  <text x="430" y="85" class="arabic-text">هذا النص العربي يمتد لليسار</text>

  <!-- Code text at left, extending right -->
  <text x="60" y="120" class="code-text">df.info()</text>
</svg>
```

---

## Checklist for Arabic SVG Files

- [ ] NO `direction="rtl"` on `<svg>` root element
- [ ] `direction: rtl` added to all Arabic text CSS classes
- [ ] `direction: ltr` on all code/terminal/output classes
- [ ] Function brackets appear AFTER function names: `info()` not `()info`
- [ ] Bullet points/circles inside container boxes
- [ ] Text with `text-anchor: end` positioned near right edge of containers
- [ ] All text stays within its container boundaries

---

## Files Following These Guidelines

- `info_vs_describe_ar.svg`
- `csv_read_write_ar.svg`
- `groupby_concept_ar.svg`
- `iloc_vs_loc_ar.svg`
- `series_vs_dataframe_ar.svg`
- `missing_data_strategies_ar.svg`
- `dataframe_anatomy_ar.svg`
- `pandas_pipeline_ar.svg`

---

## Summary

**Root Cause:** `direction="rtl"` on SVG root element affects entire coordinate system unpredictably.

**Solution:** Remove from root, add `direction: rtl` to individual text CSS classes only. This keeps the coordinate system predictable (LTR) while allowing Arabic text content to render correctly (RTL character order).
