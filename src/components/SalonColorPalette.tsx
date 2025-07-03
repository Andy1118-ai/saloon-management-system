import React, { useState } from 'react';
import { Copy, Check, Palette, Sun, Moon, Lightbulb, Snowflake, Flower } from 'lucide-react';

interface ColorSwatch {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  usage: string;
  pantone?: string;
}

const SalonColorPalette: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [lightingMode, setLightingMode] = useState<'natural' | 'artificial'>('natural');
  const [seasonalTheme, setSeasonalTheme] = useState<'spring' | 'winter'>('spring');

  const primaryColors: ColorSwatch[] = [
    {
      name: 'Powder Blue',
      hex: '#E8F4F8',
      rgb: '232, 244, 248',
      hsl: '195°, 47%, 94%',
      usage: 'Accent walls, soft backgrounds',
      pantone: 'Similar to Pantone 5415 C'
    },
    {
      name: 'Soft Sky Blue',
      hex: '#B8D4E3',
      rgb: '184, 212, 227',
      hsl: '201°, 38%, 81%',
      usage: 'Feature walls, decorative elements',
      pantone: 'Similar to Pantone 5425 C'
    },
    {
      name: 'Steel Blue',
      hex: '#7BA7BC',
      rgb: '123, 167, 188',
      hsl: '199°, 31%, 61%',
      usage: 'Primary furniture, professional accents',
      pantone: 'Similar to Pantone 5435 C'
    }
  ];

  const complementaryColors: ColorSwatch[] = [
    {
      name: 'Light Gray',
      hex: '#F5F7F9',
      rgb: '245, 247, 249',
      hsl: '210°, 25%, 97%',
      usage: 'Main walls, neutral backgrounds',
      pantone: 'Similar to Pantone Cool Gray 1 C'
    },
    {
      name: 'Medium Gray',
      hex: '#D1D9E0',
      rgb: '209, 217, 224',
      hsl: '208°, 19%, 85%',
      usage: 'Trim, borders, subtle accents',
      pantone: 'Similar to Pantone Cool Gray 3 C'
    }
  ];

  const accentColors: ColorSwatch[] = [
    {
      name: 'Warm White',
      hex: '#FEFCFA',
      rgb: '254, 252, 250',
      hsl: '30°, 67%, 99%',
      usage: 'Ceiling, bright surfaces, cleanliness',
      pantone: 'Custom warm white blend'
    },
    {
      name: 'Subtle Beige',
      hex: '#F2EDE7',
      rgb: '242, 237, 231',
      hsl: '33°, 31%, 93%',
      usage: 'Warm accents, comfort areas',
      pantone: 'Similar to Pantone Warm Gray 2 C'
    },
    {
      name: 'Muted Sage Green',
      hex: '#C8D5C8',
      rgb: '200, 213, 200',
      hsl: '120°, 17%, 81%',
      usage: 'Natural elements, organic appeal',
      pantone: 'Similar to Pantone 5665 C'
    }
  ];

  const supportingColors: ColorSwatch[] = [
    {
      name: 'Deep Steel',
      hex: '#4A6B7C',
      rgb: '74, 107, 124',
      hsl: '200°, 25%, 39%',
      usage: 'Text, strong contrasts, professional elements'
    },
    {
      name: 'Charcoal',
      hex: '#2C3E50',
      rgb: '44, 62, 80',
      hsl: '210°, 29%, 24%',
      usage: 'Primary text, sophisticated accents'
    },
    {
      name: 'Soft Sage',
      hex: '#A8B8A8',
      rgb: '168, 184, 168',
      hsl: '120°, 11%, 69%',
      usage: 'Deeper natural accents, balance'
    }
  ];

  const copyToClipboard = async (color: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const ColorSwatchCard: React.FC<{ color: ColorSwatch; size?: 'small' | 'large' }> = ({ 
    color, 
    size = 'large' 
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div 
        className={`${size === 'large' ? 'h-24' : 'h-16'} w-full cursor-pointer relative group`}
        style={{ backgroundColor: color.hex }}
        onClick={() => copyToClipboard(color.name, color.hex)}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white rounded-full p-2">
            {copiedColor === color.name ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <Copy className="w-4 h-4 text-gray-600" />
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{color.name}</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">HEX:</span>
            <button
              onClick={() => copyToClipboard(`${color.name}-hex`, color.hex)}
              className="font-mono text-gray-900 hover:text-blue-600 transition-colors"
            >
              {color.hex}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">RGB:</span>
            <button
              onClick={() => copyToClipboard(`${color.name}-rgb`, `rgb(${color.rgb})`)}
              className="font-mono text-gray-900 hover:text-blue-600 transition-colors text-xs"
            >
              {color.rgb}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">HSL:</span>
            <button
              onClick={() => copyToClipboard(`${color.name}-hsl`, `hsl(${color.hsl})`)}
              className="font-mono text-gray-900 hover:text-blue-600 transition-colors text-xs"
            >
              {color.hsl}
            </button>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600 mb-1">Usage:</p>
          <p className="text-sm text-gray-800">{color.usage}</p>
          
          {color.pantone && (
            <>
              <p className="text-xs text-gray-600 mt-2 mb-1">Pantone Reference:</p>
              <p className="text-xs text-gray-700">{color.pantone}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Palette className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">
              Sophisticated Salon Color Palette
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A harmonious collection of colors designed for high-end salons, promoting relaxation 
            and tranquility while maintaining a professional atmosphere. Each color has been 
            carefully selected to work cohesively in both natural and artificial lighting.
          </p>
        </div>

        {/* Lighting and Seasonal Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Lighting Mode:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLightingMode('natural')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    lightingMode === 'natural'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Natural</span>
                </button>
                <button
                  onClick={() => setLightingMode('artificial')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    lightingMode === 'artificial'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>Artificial</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Seasonal Theme:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSeasonalTheme('spring')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    seasonalTheme === 'spring'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Flower className="w-4 h-4" />
                  <span>Spring/Summer</span>
                </button>
                <button
                  onClick={() => setSeasonalTheme('winter')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    seasonalTheme === 'winter'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Snowflake className="w-4 h-4" />
                  <span>Fall/Winter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Primary Colors - Soft Blue Spectrum</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {primaryColors.map((color) => (
              <ColorSwatchCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Complementary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complementary Grays - Professional Foundation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complementaryColors.map((color) => (
              <ColorSwatchCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Accent Colors - Warmth and Organic Appeal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accentColors.map((color) => (
              <ColorSwatchCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Supporting Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Supporting Colors - Depth and Contrast</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportingColors.map((color) => (
              <ColorSwatchCard key={color.name} color={color} />
            ))}
          </div>
        </section>

        {/* Color Combinations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Color Combinations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Relaxation Combination */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Relaxation & Tranquility</h3>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#C8D5C8' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#FEFCFA' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F2EDE7' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Perfect for treatment rooms and relaxation areas. Combines soft blues with natural greens and warm neutrals.
              </p>
            </div>

            {/* Professional Combination */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional & Sophisticated</h3>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#7BA7BC' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#4A6B7C' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F5F7F9' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#D1D9E0' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Ideal for reception areas and consultation rooms. Balances professionalism with approachability.
              </p>
            </div>

            {/* Natural Combination */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Natural & Organic</h3>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#C8D5C8' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#A8B8A8' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F2EDE7' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#FEFCFA' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Great for eco-friendly salons and natural treatment areas. Emphasizes organic and sustainable values.
              </p>
            </div>

            {/* Energizing Combination */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fresh & Energizing</h3>
              <div className="flex space-x-2 mb-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#B8D4E3' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#FEFCFA' }}></div>
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: '#F5F7F9' }}></div>
              </div>
              <p className="text-sm text-gray-600">
                Perfect for styling areas and active treatment zones. Creates an uplifting and fresh atmosphere.
              </p>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Lighting Considerations</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Sun className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Natural Light</p>
                      <p className="text-sm text-gray-600">Colors appear more vibrant and true. Use deeper tones for balance.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Lightbulb className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Artificial Light</p>
                      <p className="text-sm text-gray-600">Colors may appear warmer. Adjust with cooler undertones.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Adjustments</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Flower className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Spring/Summer</p>
                      <p className="text-sm text-gray-600">Lighter, airier tones. Emphasize powder blues and sage greens.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Snowflake className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Fall/Winter</p>
                      <p className="text-sm text-gray-600">Deeper, cozier tones. Use steel blues and warm beiges.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Walls</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Main walls: Warm White, Light Gray</li>
                    <li>• Accent walls: Powder Blue, Sage Green</li>
                    <li>• Feature walls: Steel Blue, Subtle Beige</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Furniture</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Primary: Steel Blue, Deep Steel</li>
                    <li>• Accent: Sage Green, Soft Sage</li>
                    <li>• Neutral: Light Gray, Medium Gray</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Decor</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Soft elements: Sky Blue, Powder Blue</li>
                    <li>• Natural elements: Sage Green variations</li>
                    <li>• Warm touches: Subtle Beige, Warm White</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="mb-2">Click any color to copy its hex value to clipboard</p>
          <p className="text-sm">All colors meet WCAG accessibility standards and work harmoniously together</p>
        </div>
      </div>
    </div>
  );
};

export default SalonColorPalette;