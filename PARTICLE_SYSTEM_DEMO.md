# Interactive Particle System - Rosa Toral Therapy Website

## Overview
I've created a sophisticated interactive particle system that enhances the therapeutic, calming atmosphere of your wellness website. The system features organic floating elements that respond naturally to user interaction.

## Key Features

### 1. **Organic Movement Patterns**
- Particles float naturally with sine-wave wobble effects
- Each particle has unique movement characteristics
- Gentle upward drift creates a serene atmosphere
- Smooth friction and physics-based movement

### 2. **Mouse Interaction**
- Particles gently drift away from the cursor
- Creates an interactive, responsive experience
- Force field effect within 100px radius
- Can be toggled on/off via controls

### 3. **Seasonal Variations**
The system automatically detects and adapts to seasons:

- **Spring**: Cherry blossoms, pollen, and light orbs
- **Summer**: Pollen, light orbs, and sparkles
- **Autumn**: Falling leaves, pollen, and sparkles
- **Winter**: Snowflakes, light orbs, and sparkles

### 4. **Earth-Tone Color Palette**
All particles use your website's earth-tone colors:
- Sage greens
- Terracotta oranges
- Golden hour yellows
- Cream and sand neutrals

### 5. **Performance Optimization**
- **60 FPS Target**: Smooth animation with frame limiting
- **Performance Modes**: Low (30fps), Medium (45fps), High (60fps)
- **Canvas Rendering**: Hardware-accelerated for efficiency
- **Particle Limit**: 20-30 particles for optimal performance
- **FPS Monitor**: Real-time performance tracking

### 6. **User Controls**
Interactive control panel with:
- Enable/disable toggle
- Seasonal theme selector
- Particle density slider (10-40 particles)
- Performance mode selection
- Mouse interaction toggle
- Keyboard shortcut (Cmd+P) for quick toggle

### 7. **Particle Types**

#### Cherry Blossoms (Spring)
- 5-petal flower shape
- Soft pink/cream colors
- Larger size for visibility

#### Leaves (Autumn)
- Elliptical leaf shape
- Terracotta and rust colors
- Natural falling motion

#### Snowflakes (Winter)
- 6-pointed crystalline structure
- White/cream colors with opacity
- Gentle drifting movement

#### Light Orbs
- Glowing circular particles
- Radial gradient effect
- Subtle halo/glow

#### Sparkles
- 4-pointed star shape
- Small, twinkling effect
- Enhanced glow

#### Pollen
- Simple circular particles
- Smallest size
- Natural floating behavior

## Technical Implementation

### Architecture
- **Custom React Hook**: `useParticles` manages all particle logic
- **Canvas API**: Hardware-accelerated rendering
- **TypeScript**: Full type safety
- **Framer Motion**: Smooth UI animations for controls

### Performance Features
- Request Animation Frame optimization
- Delta time calculations for smooth motion
- Particle recycling (no memory leaks)
- Viewport-based culling
- Efficient collision detection

### Accessibility
- Particles are purely decorative (aria-hidden)
- Controls are keyboard accessible
- Clear visual feedback
- Respects reduced motion preferences

## Usage

### Basic Integration
```tsx
<ParticleSystem
  autoDetectSeason={true}
  defaultEnabled={true}
  defaultParticleCount={25}
  defaultPerformanceMode="high"
/>
```

### Test Page
Visit `/particle-test` to see a dedicated demo page showcasing all particle features.

## Customization Options

### Adjust Particle Count
- Slider control: 10-40 particles
- Default: 25 particles
- Recommended: 20-30 for best performance

### Performance Modes
- **Low**: 30 FPS, for older devices
- **Medium**: 45 FPS, balanced performance
- **High**: 60 FPS, smooth animation

### Seasonal Themes
- Auto-detect based on current month
- Manual selection via control panel
- Each season has unique particle types and colors

## Benefits for Your Website

1. **Enhanced Atmosphere**: Creates a calming, therapeutic environment
2. **User Engagement**: Interactive elements increase time on site
3. **Brand Alignment**: Earth tones match your wellness theme
4. **Professional Polish**: Subtle animations show attention to detail
5. **Seasonal Relevance**: Automatically adapts throughout the year
6. **Performance**: Optimized to not impact site speed

## Control Panel Features

The floating control button (sparkles icon) in the bottom-right corner provides:
- Quick access to all particle settings
- Real-time FPS monitoring
- Intuitive controls matching your site's design
- Smooth animations and transitions

## Future Enhancements (Optional)

1. **Weather Integration**: Adapt particles to local weather
2. **Time of Day**: Different effects for morning/evening
3. **Special Events**: Holiday-themed particles
4. **Sound Effects**: Optional ambient sounds
5. **Mobile Gestures**: Touch interactions for mobile devices

## Files Created

1. `/lib/hooks/useParticles.ts` - Core particle logic hook
2. `/components/ParticleSystem.tsx` - Main component with controls
3. `/app/particle-test/page.tsx` - Demo page

## How to Use

1. The particle system is integrated into your main layout
2. Users can toggle it on/off with Cmd+P
3. Click the sparkles button for full controls
4. Particles automatically adapt to the current season

The system enhances your website's therapeutic atmosphere while maintaining excellent performance and user control.