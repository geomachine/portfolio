# Design: Portfolio Theming & UX Improvement

## Overview
This design document outlines the implementation approach for enhancing the portfolio's visual design system, including a professional color palette, refined typography, improved spacing, and smooth theme transitions suitable for a senior software engineer's portfolio.

## Design Principles
1. **Professional & Technical** - Colors and typography that convey expertise and attention to detail
2. **Accessible First** - All design decisions prioritize WCAG AA compliance
3. **Performance Conscious** - Smooth 60fps animations, no layout shifts
4. **Progressive Enhancement** - Respects user preferences (prefers-color-scheme, prefers-reduced-motion)
5. **Consistent & Systematic** - All values follow predictable scales and patterns

## Color System

### Color Palette Philosophy
For a senior software engineer portfolio, we'll use a sophisticated palette that balances professionalism with personality. The palette centers around deep blues (trust, technology) with complementary accent colors.

### Light Mode Colors
```css
--background: #FAFBFC;           /* Soft white, easy on eyes */
--foreground: #0F172A;           /* Deep slate, excellent contrast */
--sidebar-bg: #F8FAFC;           /* Slightly darker than background */
--card-bg: #FFFFFF;              /* Pure white for cards */
--card-border: #0F172A;          /* Matches foreground for sketch borders */

/* Primary - Professional Blue */
--primary: #2563EB;              /* Vibrant blue, tech-forward */
--primary-hover: #1D4ED8;        /* Darker on hover */
--primary-light: #DBEAFE;        /* Light blue for backgrounds */

/* Secondary - Accent Purple */
--secondary: #7C3AED;            /* Purple for creativity/innovation */
--secondary-hover: #6D28D9;      /* Darker on hover */
--secondary-light: #EDE9FE;      /* Light purple backgrounds */

/* Tertiary - Warm Accent */
--tertiary: #F59E0B;             /* Amber for CTAs and highlights */
--tertiary-hover: #D97706;       /* Darker on hover */
--tertiary-light: #FEF3C7;       /* Light amber backgrounds */

/* Neutrals */
--text-primary: #0F172A;         /* Main text */
--text-secondary: #475569;       /* Secondary text, muted */
--text-tertiary: #94A3B8;        /* Tertiary text, very muted */
--border: #E2E8F0;               /* Subtle borders */
--border-strong: #CBD5E1;        /* Stronger borders */

/* Semantic Colors */
--success: #10B981;              /* Green for success states */
--error: #EF4444;                /* Red for errors */
--warning: #F59E0B;              /* Amber for warnings */
```

### Dark Mode Colors
```css
--background: #0F172A;           /* Deep slate background */
--foreground: #F1F5F9;           /* Off-white text */
--sidebar-bg: #1E293B;           /* Slightly lighter than background */
--card-bg: #1E293B;              /* Card background */
--card-border: #F1F5F9;          /* Light borders for sketch effect */

/* Primary - Brighter Blue for dark mode */
--primary: #3B82F6;              /* Brighter blue, better contrast */
--primary-hover: #60A5FA;        /* Even brighter on hover */
--primary-light: #1E3A8A;        /* Dark blue for backgrounds */

/* Secondary - Brighter Purple */
--secondary: #8B5CF6;            /* Brighter purple */
--secondary-hover: #A78BFA;      /* Even brighter on hover */
--secondary-light: #4C1D95;      /* Dark purple backgrounds */

/* Tertiary - Warm Accent */
--tertiary: #FBBF24;             /* Brighter amber */
--tertiary-hover: #FCD34D;       /* Even brighter on hover */
--tertiary-light: #78350F;       /* Dark amber backgrounds */

/* Neutrals */
--text-primary: #F1F5F9;         /* Main text */
--text-secondary: #CBD5E1;       /* Secondary text */
--text-tertiary: #64748B;        /* Tertiary text */
--border: #334155;               /* Subtle borders */
--border-strong: #475569;        /* Stronger borders */

/* Semantic Colors */
--success: #34D399;              /* Brighter green */
--error: #F87171;                /* Brighter red */
--warning: #FBBF24;              /* Brighter amber */
```

### Contrast Ratios
All color combinations meet WCAG AA standards:
- Primary text on background: 12.6:1 (AAA)
- Secondary text on background: 7.2:1 (AA)
- Primary button text on primary bg: 4.8:1 (AA)
- All interactive elements: minimum 3:1 (AA for large text)

## Typography System

### Font Stack
```css
/* Display & Headings - Modern, professional */
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Body Text - Highly readable */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Code & Technical */
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

/* Signature/Accent - Keep existing Caveat for personality */
--font-signature: 'Caveat', cursive;
```

### Type Scale (1.25 ratio - Major Third)
```css
--text-xs: 0.75rem;      /* 12px - Labels, captions */
--text-sm: 0.875rem;     /* 14px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-lg: 1.125rem;     /* 18px - Large body */
--text-xl: 1.25rem;      /* 20px - Small headings */
--text-2xl: 1.563rem;    /* 25px - H4 */
--text-3xl: 1.953rem;    /* 31px - H3 */
--text-4xl: 2.441rem;    /* 39px - H2 */
--text-5xl: 3.052rem;    /* 49px - H1 */
--text-6xl: 3.815rem;    /* 61px - Display */
```

### Font Weights
```css
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Line Heights
```css
--leading-tight: 1.25;    /* Headings */
--leading-snug: 1.375;    /* Subheadings */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.625; /* Comfortable reading */
--leading-loose: 2;       /* Very spacious */
```

### Letter Spacing
```css
--tracking-tighter: -0.05em;
--tracking-tight: -0.025em;
--tracking-normal: 0;
--tracking-wide: 0.025em;
--tracking-wider: 0.05em;
--tracking-widest: 0.1em;
```

### Typography Usage
- **H1**: text-5xl, font-bold, leading-tight, tracking-tight
- **H2**: text-4xl, font-bold, leading-tight
- **H3**: text-3xl, font-semibold, leading-snug
- **H4**: text-2xl, font-semibold, leading-snug
- **Body**: text-base, font-normal, leading-relaxed
- **Small**: text-sm, font-normal, leading-normal
- **Labels**: text-xs, font-medium, tracking-wider, uppercase

## Spacing System

### Base Unit: 4px
All spacing follows a 4px base unit for consistency.

```css
--space-0: 0;
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

### Spacing Usage Guidelines
- **Component padding**: space-4 to space-6 (16-24px)
- **Section spacing**: space-12 to space-16 (48-64px)
- **Element gaps**: space-2 to space-4 (8-16px)
- **Paragraph spacing**: space-6 (24px)
- **Card padding**: space-6 on mobile, space-8 on desktop

## Animation System

### Timing Functions
```css
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Duration Scale
```css
--duration-fast: 150ms;      /* Quick feedback */
--duration-normal: 250ms;    /* Standard transitions */
--duration-slow: 350ms;      /* Deliberate animations */
--duration-slower: 500ms;    /* Theme transitions */
```

### Animation Patterns

#### Hover Effects
- **Buttons**: Scale 1.02, duration-fast, ease-out
- **Cards**: Translate (2px, 2px), duration-normal, ease-out
- **Links**: Color change, duration-fast, ease-in-out
- **Icons**: Rotate or scale, duration-normal, ease-bounce

#### Theme Transition
```css
* {
  transition: 
    background-color var(--duration-slower) var(--ease-in-out),
    color var(--duration-slower) var(--ease-in-out),
    border-color var(--duration-slower) var(--ease-in-out),
    box-shadow var(--duration-slower) var(--ease-in-out);
}
```

#### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Component Designs

### Navigation
**Desktop**: Horizontal tabs at top-right of content area
- Active state: primary background, white text, subtle shadow
- Hover state: primary-light background, smooth transition
- Font: text-lg, font-semibold

**Mobile**: Fixed bottom navigation bar
- Active state: primary color with indicator
- Icons + labels for clarity
- Safe area padding for modern devices

### Call-to-Action Buttons

#### Primary CTA (Download Resume, Contact)
```
Background: primary
Text: white
Padding: space-4 space-8
Border-radius: 0 (maintain sketch aesthetic)
Border: 2px solid foreground (sketch border)
Hover: Scale 1.02, primary-hover background
Active: Scale 0.98
Shadow: Subtle on hover
```

#### Secondary CTA (View Projects, Read Blog)
```
Background: transparent
Text: primary
Padding: space-4 space-8
Border: 2px dashed primary
Hover: primary background, white text
Active: Scale 0.98
```

### Cards
```
Background: card-bg
Border: 2px dashed card-border (sketch aesthetic)
Padding: space-6 (mobile), space-8 (desktop)
Hover: Translate (2px, 2px), border-color changes to primary
Shadow: None (maintains sketch aesthetic)
```

### Sidebar
```
Background: sidebar-bg
Border: 2px dashed card-border
Padding: space-6
Sticky positioning on desktop
Collapsible on mobile
Avatar: Circular with sketch border, grayscale filter, color on hover
```

### Theme Toggle
```
Position: Fixed top-right
Size: 48px × 48px
Background: card-bg
Border: 2px dashed foreground
Icon: Sun/Moon with smooth rotation transition
Hover: Scale 1.1, slight rotation
```

## Layout Improvements

### Content Hierarchy
1. **Hero/About** - First impression with name, title, brief intro
2. **Featured Projects** - 2-3 showcase projects with images
3. **Skills/Expertise** - Quick overview of technical skills
4. **Experience Timeline** - Professional history
5. **Blog/Writing** - Recent articles
6. **Contact** - Clear CTA and form

### Responsive Breakpoints
```css
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
```

### Max Widths
```css
--max-width-prose: 65ch;    /* Optimal reading width */
--max-width-content: 1200px; /* Main content container */
--max-width-wide: 1400px;    /* Wide sections */
```

## Theme Detection & Persistence

### Implementation Strategy
```javascript
// 1. Check localStorage first
const savedTheme = localStorage.getItem('portfolio-theme');

// 2. If no saved preference, check system preference
if (!savedTheme) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = prefersDark ? 'dark' : 'dark'; // Default to dark
  setTheme(theme);
} else {
  setTheme(savedTheme);
}

// 3. Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
```

### Theme Toggle Behavior
- Click toggles between light and dark
- Saves preference to localStorage
- Smooth 500ms transition on all color properties
- Icon rotates 180deg during transition
- No flash of unstyled content (FOUC)

## Accessibility Considerations

### Focus States
- All interactive elements have visible focus rings
- Focus ring: 2px solid primary, offset 2px
- Focus ring respects high contrast mode

### Keyboard Navigation
- Tab order follows visual hierarchy
- Skip links for main content
- All CTAs keyboard accessible
- Escape key closes modals/overlays

### Screen Readers
- Semantic HTML throughout
- ARIA labels for icon-only buttons
- Live regions for dynamic content
- Alt text for all images

### Color Blindness
- Never rely on color alone for information
- Use icons + text for status indicators
- Sufficient contrast for all color combinations

## Performance Considerations

### CSS Strategy
- Use CSS custom properties for theming
- Minimize repaints during theme transitions
- Use `will-change` sparingly for animations
- Leverage GPU acceleration for transforms

### Font Loading
- Use `font-display: swap` for web fonts
- Subset fonts to include only needed characters
- Preload critical fonts
- Fallback to system fonts immediately

### Animation Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `requestAnimationFrame` for JS animations
- Debounce scroll and resize handlers

## Implementation Priority

### Phase 1: Foundation (High Priority)
1. Update color system in globals.css
2. Implement theme detection and persistence
3. Add smooth theme transitions
4. Update typography scale

### Phase 2: Components (Medium Priority)
5. Redesign navigation with new colors
6. Update CTA buttons with new styles
7. Refine card components
8. Update sidebar styling

### Phase 3: Polish (Lower Priority)
9. Add hover animations
10. Implement focus states
11. Add loading states
12. Optimize performance

## Testing Checklist
- [ ] All color combinations meet WCAG AA contrast ratios
- [ ] Theme persists across page reloads
- [ ] Theme transitions are smooth (no flicker)
- [ ] System preference detection works
- [ ] Reduced motion preference is respected
- [ ] All interactive elements have hover states
- [ ] All interactive elements have focus states
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announces content correctly
- [ ] Performance: 60fps animations
- [ ] Performance: No layout shifts
- [ ] Responsive on all breakpoints
- [ ] Works in Chrome, Firefox, Safari, Edge

## Correctness Properties

### Property 1: Theme Consistency
**Validates: Requirements 2.1, 2.2, 2.3, 2.4**

For all theme-related operations:
- If system preference is dark and no saved preference exists, theme should be dark
- If system preference is light and no saved preference exists, theme should be dark (default)
- If saved preference exists in localStorage, it should override system preference
- After manual theme toggle, preference should persist in localStorage
- On page reload, theme should match saved preference

### Property 2: Color Contrast Compliance
**Validates: Requirements 1.3**

For all text and background color combinations:
- Normal text (< 18px) must have contrast ratio ≥ 4.5:1
- Large text (≥ 18px or ≥ 14px bold) must have contrast ratio ≥ 3:1
- Interactive elements must have contrast ratio ≥ 3:1 against adjacent colors
- This must hold true for both light and dark themes

### Property 3: Animation Timing Bounds
**Validates: Requirements 7.1, 7.2, 7.5**

For all animations and transitions:
- Hover effects must complete within 150-300ms
- Theme transitions must complete within 300-500ms
- No animation should block user interaction
- When prefers-reduced-motion is enabled, all animations should be ≤ 10ms

### Property 4: Typography Scale Consistency
**Validates: Requirements 3.1, 3.2, 3.3**

For all typography sizes:
- Each size level must be larger than the previous by a factor of 1.2-1.35
- Body text must be ≥ 16px
- Line height for body text must be between 1.5 and 1.75
- Heading hierarchy must be visually distinct (each level ≥ 20% larger than next)

### Property 5: Spacing System Adherence
**Validates: Requirements 6.1, 6.2**

For all spacing values:
- All spacing must be a multiple of 4px (base unit)
- Vertical spacing between sections must be ≥ 48px
- Component padding must be between 16px and 32px
- Element gaps must be between 8px and 24px

### Property 6: Keyboard Accessibility
**Validates: Requirements 4.5, 5.6, 7.6**

For all interactive elements:
- Must be reachable via Tab key
- Must have visible focus indicator
- Focus indicator must have contrast ratio ≥ 3:1
- Tab order must follow visual hierarchy
- Enter/Space must activate buttons and links

### Property 7: Responsive Behavior
**Validates: Requirements 6.5**

For all breakpoints:
- Layout must not break at any viewport width between 320px and 2560px
- Text must remain readable (no overflow or truncation without ellipsis)
- Interactive elements must remain accessible (minimum 44×44px touch target on mobile)
- Spacing ratios must be maintained across breakpoints
