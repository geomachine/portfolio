# Tasks: Portfolio Theming & UX Improvement

## 1. Color System Implementation
- [x] 1.1 Update CSS custom properties in globals.css with new color palette
  - Update light mode colors (background, foreground, primary, secondary, tertiary, neutrals)
  - Update dark mode colors with proper contrast adjustments
  - Add semantic colors (success, error, warning)
  - Remove old color variables that are no longer needed
- [ ] 1.2 Update Tailwind theme configuration to use new color tokens
  - Map CSS variables to Tailwind color classes
  - Ensure all color utilities are available
  - Test color classes in components
- [ ] 1.3 Verify WCAG AA contrast ratios for all color combinations
  - Test primary text on background (target: ≥4.5:1)
  - Test secondary text on background (target: ≥4.5:1)
  - Test button text on button backgrounds (target: ≥4.5:1)
  - Test interactive element contrasts (target: ≥3:1)
  - Document contrast ratios in comments

## 2. Theme Detection & Persistence
- [x] 2.1 Implement system preference detection in ThemeProvider
  - Add prefers-color-scheme media query detection
  - Set default to dark mode when no preference detected
  - Handle initial theme setup before first render
- [x] 2.2 Implement localStorage persistence
  - Save theme preference on toggle
  - Restore theme preference on mount
  - Handle edge cases (localStorage unavailable, corrupted data)
- [x] 2.3 Add system preference change listener
  - Listen for prefers-color-scheme changes
  - Only apply if no manual preference saved
  - Clean up listener on unmount
- [x] 2.4 Prevent flash of unstyled content (FOUC)
  - Add inline script in layout.js to set theme before hydration
  - Use data-theme attribute on html element
  - Ensure smooth initial render

## 3. Theme Transition Animations
- [x] 3.1 Add smooth color transitions to globals.css
  - Add transition properties for background-color, color, border-color
  - Set duration to 500ms with ease-in-out timing
  - Apply to all elements using wildcard selector
- [x] 3.2 Add theme toggle animation
  - Rotate icon 180deg during transition
  - Scale button slightly on click
  - Add smooth opacity transition
- [x] 3.3 Implement prefers-reduced-motion support
  - Add media query for reduced motion
  - Set all transitions to 0.01ms when enabled
  - Test with system settings

## 4. Typography System
- [x] 4.1 Add Inter font to the project
  - Install @fontsource/inter or use Google Fonts
  - Add font-display: swap for performance
  - Configure font weights (300, 400, 500, 600, 700)
- [x] 4.2 Update font family variables in globals.css
  - Set --font-display to Inter
  - Set --font-body to Inter
  - Keep --font-signature as Caveat for personality
  - Add --font-mono for code (JetBrains Mono or Fira Code)
- [ ] 4.3 Implement typography scale in Tailwind config
  - Add custom font sizes following 1.25 ratio
  - Add line height tokens
  - Add letter spacing tokens
  - Add font weight tokens
- [ ] 4.4 Update component typography
  - Update all h1-h6 elements with new scale
  - Update body text to text-base with leading-relaxed
  - Update small text and labels
  - Ensure consistent hierarchy throughout

## 5. Spacing System
- [ ] 5.1 Define spacing scale in globals.css
  - Add spacing custom properties (4px base unit)
  - Document spacing usage guidelines in comments
- [ ] 5.2 Update component spacing
  - Update card padding (space-6 mobile, space-8 desktop)
  - Update section spacing (space-12 to space-16)
  - Update element gaps (space-2 to space-4)
  - Ensure consistent vertical rhythm
- [ ] 5.3 Add responsive spacing adjustments
  - Reduce spacing on mobile breakpoints
  - Increase spacing on large desktop breakpoints
  - Test spacing at all breakpoints

## 6. Navigation Improvements
- [x] 6.1 Update navigation styling with new colors
  - Apply primary color to active state
  - Add primary-light background on hover
  - Update text colors using new palette
  - Ensure sketch border aesthetic is maintained
- [x] 6.2 Improve navigation active state indicators
  - Add clear visual distinction for active page
  - Add smooth transition between states
  - Ensure indicator is visible in both themes
- [x] 6.3 Add keyboard focus states to navigation
  - Add visible focus ring (2px solid primary, offset 2px)
  - Ensure focus order follows visual hierarchy
  - Test keyboard navigation flow
- [ ] 6.4 Optimize mobile navigation
  - Ensure touch targets are ≥44px
  - Test fixed bottom positioning
  - Add safe area padding for modern devices

## 7. Call-to-Action Buttons
- [ ] 7.1 Create primary CTA button component
  - Style: primary background, white text, sketch border
  - Add hover effects (scale 1.02, primary-hover background)
  - Add active state (scale 0.98)
  - Add focus state with visible ring
- [ ] 7.2 Create secondary CTA button component
  - Style: transparent background, primary text, dashed border
  - Add hover effects (primary background, white text)
  - Add active state (scale 0.98)
  - Add focus state with visible ring
- [x] 7.3 Add "Download Resume" CTA to sidebar
  - Place prominently in sidebar
  - Use primary CTA styling
  - Add download icon
  - Link to resume file
- [ ] 7.4 Add "Contact Me" floating CTA
  - Position fixed or sticky for easy access
  - Use primary CTA styling
  - Smooth scroll to contact section
  - Add animation on scroll
- [x] 7.5 Update existing buttons with new styles
  - Update form submit buttons
  - Update portfolio filter buttons
  - Update any other interactive buttons
  - Ensure consistent styling across all CTAs

## 8. Card Component Updates
- [x] 8.1 Update card styling with new colors
  - Apply card-bg background
  - Update sketch border with card-border color
  - Update padding (space-6 mobile, space-8 desktop)
- [ ] 8.2 Add card hover effects
  - Translate (2px, 2px) on hover
  - Change border color to primary on hover
  - Add smooth transition (250ms ease-out)
  - Maintain sketch aesthetic
- [x] 8.3 Update service cards (About page)
  - Apply new card styling
  - Update icon colors
  - Add grayscale filter with color on hover
  - Test hover animations
- [x] 8.4 Update project cards (Portfolio page)
  - Apply new card styling
  - Update overlay colors
  - Improve image hover effects
  - Test grayscale to color transition
- [x] 8.5 Update blog cards
  - Apply new card styling
  - Update category badge colors
  - Improve hover effects
  - Test responsive behavior

## 9. Sidebar Enhancements
- [x] 9.1 Update sidebar colors
  - Apply sidebar-bg background
  - Update text colors with new palette
  - Update border colors
  - Ensure contrast in both themes
- [x] 9.2 Improve avatar styling
  - Maintain sketch border aesthetic
  - Add grayscale filter with color on hover
  - Add smooth scale transition
  - Test in both themes
- [x] 9.3 Update contact info styling
  - Update icon backgrounds and colors
  - Add hover effects to contact items
  - Improve visual hierarchy
  - Test icon color transitions
- [x] 9.4 Update social media buttons
  - Apply new button styling
  - Add hover effects
  - Update icon colors
  - Test grayscale to color transition

## 10. Interactive Animations
- [ ] 10.1 Add hover animations to all interactive elements
  - Buttons: scale 1.02, duration 150ms
  - Cards: translate (2px, 2px), duration 250ms
  - Links: color change, duration 150ms
  - Icons: rotate or scale, duration 250ms
- [ ] 10.2 Add focus animations
  - Smooth focus ring appearance
  - Scale slightly on focus
  - Ensure visibility in both themes
- [ ] 10.3 Add loading states for async actions
  - Spinner or skeleton screens
  - Smooth fade-in when content loads
  - Maintain layout during loading
- [ ] 10.4 Test all animations for performance
  - Ensure 60fps on all animations
  - Use Chrome DevTools Performance tab
  - Optimize any janky animations
  - Test on lower-end devices

## 11. Accessibility Improvements
- [ ] 11.1 Add skip links for keyboard navigation
  - Add "Skip to main content" link
  - Style skip link (visible on focus)
  - Test keyboard navigation flow
- [ ] 11.2 Ensure all interactive elements are keyboard accessible
  - Test tab order throughout site
  - Ensure Enter/Space activates buttons
  - Test Escape key for modals/overlays
  - Verify no keyboard traps
- [ ] 11.3 Add ARIA labels where needed
  - Label icon-only buttons
  - Add aria-current to active nav items
  - Add aria-label to theme toggle
  - Add aria-live regions for dynamic content
- [ ] 11.4 Test with screen readers
  - Test with NVDA (Windows) or VoiceOver (Mac)
  - Ensure all content is announced correctly
  - Verify heading hierarchy
  - Test form labels and error messages

## 12. Responsive Design
- [ ] 12.1 Test layout at all breakpoints
  - Test at 320px (small mobile)
  - Test at 640px (mobile landscape)
  - Test at 768px (tablet)
  - Test at 1024px (desktop)
  - Test at 1280px+ (large desktop)
- [ ] 12.2 Ensure touch targets are adequate on mobile
  - Minimum 44×44px for all interactive elements
  - Add padding where needed
  - Test on actual mobile devices
- [ ] 12.3 Optimize typography for mobile
  - Reduce font sizes slightly on mobile
  - Adjust line heights for readability
  - Ensure no text overflow
- [ ] 12.4 Test horizontal scrolling
  - Ensure no horizontal scroll on any breakpoint
  - Fix any overflow issues
  - Test with browser DevTools device emulation

## 13. Performance Optimization
- [ ] 13.1 Optimize font loading
  - Use font-display: swap
  - Preload critical fonts
  - Subset fonts if possible
  - Test font loading performance
- [ ] 13.2 Optimize CSS
  - Remove unused CSS
  - Minimize CSS file size
  - Use CSS containment where appropriate
  - Test CSS performance with DevTools
- [ ] 13.3 Optimize animations
  - Use transform and opacity only
  - Add will-change sparingly
  - Remove any layout-triggering animations
  - Test animation performance
- [ ] 13.4 Measure and optimize Core Web Vitals
  - Test LCP (Largest Contentful Paint) - target <2.5s
  - Test FID (First Input Delay) - target <100ms
  - Test CLS (Cumulative Layout Shift) - target <0.1
  - Fix any issues found

## 14. Testing & Quality Assurance
- [ ] 14.1 Cross-browser testing
  - Test in Chrome
  - Test in Firefox
  - Test in Safari
  - Test in Edge
  - Document any browser-specific issues
- [ ] 14.2 Accessibility testing
  - Run axe DevTools accessibility scan
  - Fix all critical and serious issues
  - Test keyboard navigation
  - Test with screen reader
- [ ] 14.3 Visual regression testing
  - Take screenshots of all pages in both themes
  - Compare before and after
  - Ensure no unintended visual changes
  - Document intentional changes
- [ ] 14.4 Performance testing
  - Run Lighthouse audit
  - Achieve score ≥90 for Performance
  - Achieve score ≥90 for Accessibility
  - Achieve score ≥90 for Best Practices
  - Fix any issues found

## 15. Documentation & Cleanup
- [ ] 15.1 Document color system
  - Add comments to CSS variables
  - Document usage guidelines
  - Create color palette reference
- [ ] 15.2 Document typography system
  - Add comments to font variables
  - Document type scale usage
  - Create typography reference
- [ ] 15.3 Document spacing system
  - Add comments to spacing variables
  - Document spacing usage guidelines
  - Create spacing reference
- [ ] 15.4 Clean up unused code
  - Remove old color variables
  - Remove unused CSS
  - Remove commented-out code
  - Organize CSS logically
- [ ] 15.5 Update README with design system info
  - Document color palette
  - Document typography scale
  - Document spacing system
  - Add screenshots of both themes
