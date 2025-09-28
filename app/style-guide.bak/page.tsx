'use client'

import { useState } from 'react'

export default function StyleGuide() {
  const [selectedTexture, setSelectedTexture] = useState('linen')

  const colors = [
    { name: 'Warm Sage', class: 'bg-sage', hex: '#8B9574' },
    { name: 'Deep Earth Brown', class: 'bg-forest', hex: '#3D2F27' },
    { name: 'Richer Clay', class: 'bg-terracotta', hex: '#B87A5C' },
    { name: 'Warm Parchment', class: 'bg-cream', hex: '#FAF6F0' },
    { name: 'Moss', class: 'bg-moss', hex: '#6B7C59' },
    { name: 'Bark', class: 'bg-bark', hex: '#5C4033' },
    { name: 'Sand', class: 'bg-sand', hex: '#E8D5C4' },
    { name: 'Golden Hour', class: 'bg-goldenHour', hex: '#D4A574' },
  ]

  const textures = [
    { name: 'Linen', class: 'texture-linen' },
    { name: 'Grain', class: 'texture-grain' },
    { name: 'Parchment', class: 'texture-parchment' },
    { name: 'Paper', class: 'texture-paper' },
    { name: 'Bark', class: 'texture-bark' },
  ]

  const fonts = [
    { name: 'Cormorant Garamond', class: 'font-cormorant', sample: 'The journey of healing begins with a single step' },
    { name: 'Crimson Text', class: 'font-crimson', sample: 'Transform your life through mindful therapy' },
    { name: 'Source Sans 3', class: 'font-sourceSans', sample: 'Professional therapy services in Sonoma County' },
    { name: 'Source Serif 4', class: 'font-sourceSerif', sample: 'Where wellness meets natural beauty' },
    { name: 'Quicksand', class: 'font-quicksand', sample: 'Book your consultation today' },
  ]

  const shadows = [
    { name: 'Warm Small', class: 'shadow-warm-sm' },
    { name: 'Warm Default', class: 'shadow-warm' },
    { name: 'Warm Medium', class: 'shadow-warm-md' },
    { name: 'Warm Large', class: 'shadow-warm-lg' },
    { name: 'Warm Extra Large', class: 'shadow-warm-xl' },
  ]

  return (
    <div className="min-h-screen py-20 px-4 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h1 className="font-cormorant text-earth-6xl text-forest mb-4">
            Style Guide - Phase 1
          </h1>
          <p className="font-sourceSans text-earth-lg text-forest/80">
            Warm Earth Tones Foundation
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="font-crimson text-earth-4xl text-forest mb-8">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {colors.map((color) => (
              <div key={color.name} className="space-y-2">
                <div
                  className={`${color.class} h-32 rounded-lg shadow-warm-md`}
                />
                <div>
                  <p className="font-quicksand font-semibold text-forest">
                    {color.name}
                  </p>
                  <p className="font-sourceSans text-earth-sm text-forest/60">
                    {color.hex}
                  </p>
                  <p className="font-sourceSans text-earth-xs text-forest/40">
                    {color.class}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="font-crimson text-earth-4xl text-forest mb-8">
            Typography
          </h2>
          <div className="space-y-8">
            {fonts.map((font) => (
              <div key={font.name} className="border-l-4 border-terracotta pl-6">
                <p className="font-quicksand text-earth-sm text-terracotta mb-2">
                  {font.name}
                </p>
                <p className={`${font.class} text-earth-2xl text-forest`}>
                  {font.sample}
                </p>
              </div>
            ))}
          </div>

          {/* Type Scale */}
          <div className="mt-12 space-y-4">
            <h3 className="font-cormorant text-earth-2xl text-forest mb-6">
              Earth Type Scale
            </h3>
            <div className="space-y-3">
              <p className="font-cormorant text-earth-7xl text-forest">earth-7xl: Display</p>
              <p className="font-cormorant text-earth-6xl text-forest">earth-6xl: Headline 1</p>
              <p className="font-cormorant text-earth-5xl text-forest">earth-5xl: Headline 2</p>
              <p className="font-crimson text-earth-4xl text-forest">earth-4xl: Headline 3</p>
              <p className="font-crimson text-earth-3xl text-forest">earth-3xl: Headline 4</p>
              <p className="font-sourceSans text-earth-2xl text-forest">earth-2xl: Headline 5</p>
              <p className="font-sourceSans text-earth-xl text-forest">earth-xl: Large text</p>
              <p className="font-sourceSans text-earth-lg text-forest">earth-lg: Body large</p>
              <p className="font-sourceSans text-earth-base text-forest">earth-base: Body default</p>
              <p className="font-sourceSans text-earth-sm text-forest">earth-sm: Body small</p>
              <p className="font-sourceSans text-earth-xs text-forest">earth-xs: Caption</p>
            </div>
          </div>
        </section>

        {/* Textures */}
        <section className="mb-16">
          <h2 className="font-crimson text-earth-4xl text-forest mb-8">
            Organic Textures
          </h2>
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {textures.map((texture) => (
                <button
                  key={texture.name}
                  onClick={() => setSelectedTexture(texture.class)}
                  className={`px-4 py-2 rounded-full font-quicksand transition-colors ${
                    selectedTexture === texture.class
                      ? 'bg-terracotta text-cream'
                      : 'bg-sand text-forest hover:bg-moss hover:text-cream'
                  }`}
                >
                  {texture.name}
                </button>
              ))}
            </div>
          </div>
          <div className={`${selectedTexture} p-12 rounded-lg shadow-warm-lg min-h-[300px]`}>
            <h3 className="font-cormorant text-earth-3xl text-forest mb-4">
              {selectedTexture.replace('texture-', '').charAt(0).toUpperCase() +
               selectedTexture.replace('texture-', '').slice(1)} Texture
            </h3>
            <p className="font-sourceSans text-earth-lg text-forest/80 mb-4">
              This organic texture creates a warm, natural feeling that connects
              with the earth-based therapy approach. The subtle patterns add depth
              without overwhelming the content.
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-terracotta text-cream rounded-full font-quicksand shadow-warm hover:shadow-warm-lg transition-shadow">
                Sample Button
              </button>
              <button className="px-6 py-3 bg-moss text-cream rounded-full font-quicksand shadow-warm hover:shadow-warm-lg transition-shadow">
                Another Button
              </button>
            </div>
          </div>
        </section>

        {/* Shadows */}
        <section className="mb-16">
          <h2 className="font-crimson text-earth-4xl text-forest mb-8">
            Warm Shadows
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {shadows.map((shadow) => (
              <div key={shadow.name} className="text-center">
                <div className={`bg-cream ${shadow.class} p-8 rounded-lg mb-3`}>
                  <div className="w-16 h-16 bg-terracotta rounded-full mx-auto" />
                </div>
                <p className="font-quicksand text-earth-sm text-forest">
                  {shadow.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Component Examples */}
        <section className="mb-16">
          <h2 className="font-crimson text-earth-4xl text-forest mb-8">
            Component Examples
          </h2>

          {/* Card Example */}
          <div className="mb-8">
            <h3 className="font-cormorant text-earth-2xl text-forest mb-4">
              Therapy Service Card
            </h3>
            <div className="max-w-md">
              <div className="texture-linen rounded-lg p-6 shadow-warm-lg">
                <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center mb-4">
                  <span className="text-cream font-cormorant text-earth-xl">✦</span>
                </div>
                <h4 className="font-cormorant text-earth-2xl text-forest mb-2">
                  Individual Therapy
                </h4>
                <p className="font-sourceSans text-earth-base text-forest/80 mb-4">
                  Personalized one-on-one sessions tailored to your unique healing
                  journey and personal growth goals.
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-quicksand text-terracotta font-semibold">
                    From $180/session
                  </span>
                  <button className="text-moss hover:text-bark transition-colors font-quicksand">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Button Variations */}
          <div className="mb-8">
            <h3 className="font-cormorant text-earth-2xl text-forest mb-4">
              Button Styles
            </h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-terracotta text-cream rounded-full font-quicksand shadow-warm hover:shadow-warm-lg hover:bg-bark transition-all">
                Primary Button
              </button>
              <button className="px-6 py-3 bg-moss text-cream rounded-full font-quicksand shadow-warm hover:shadow-warm-lg hover:bg-sage transition-all">
                Secondary Button
              </button>
              <button className="px-6 py-3 bg-sand text-forest rounded-full font-quicksand shadow-warm hover:shadow-warm-lg hover:bg-goldenHour hover:text-cream transition-all">
                Tertiary Button
              </button>
              <button className="px-6 py-3 border-2 border-terracotta text-terracotta rounded-full font-quicksand hover:bg-terracotta hover:text-cream transition-all">
                Outline Button
              </button>
            </div>
          </div>
        </section>

        {/* Usage Notes */}
        <section className="mb-16 texture-parchment rounded-lg p-8">
          <h2 className="font-crimson text-earth-3xl text-forest mb-6">
            Implementation Notes
          </h2>
          <div className="space-y-4 font-sourceSans text-earth-base text-forest/80">
            <p>
              <strong className="text-forest">Phase 1 Complete:</strong> The foundation has been updated with warm earth tones,
              replacing the cooler palette with colors that evoke grounding and natural healing.
            </p>
            <p>
              <strong className="text-forest">Textures:</strong> CSS-based organic textures have been implemented
              using gradients and patterns. These create depth without requiring external images.
            </p>
            <p>
              <strong className="text-forest">Typography:</strong> New font stack includes Cormorant Garamond and
              Crimson Text for headings, Source Sans 3 for body text, and Quicksand as an accent font.
            </p>
            <p>
              <strong className="text-forest">Shadows:</strong> Custom warm shadow utilities use bark brown tones
              instead of default gray shadows, maintaining the earthy aesthetic.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}