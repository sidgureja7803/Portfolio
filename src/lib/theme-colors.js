import * as THREE from 'three';

// Reads the site's actual CSS custom properties (defined in index.css as
// space-separated "H S% L%" triples for hsl(var(--x))) and converts them to
// THREE.Color instances, so the 3D scene always matches the current theme
// exactly instead of hardcoding a separate palette.
function cssHslVarToThreeColor(varName, fallbackHsl) {
  if (typeof window === 'undefined') {
    return new THREE.Color().setHSL(fallbackHsl[0] / 360, fallbackHsl[1], fallbackHsl[2]);
  }

  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  const parts = raw.split(/\s+/);

  if (parts.length !== 3) {
    return new THREE.Color().setHSL(fallbackHsl[0] / 360, fallbackHsl[1], fallbackHsl[2]);
  }

  const h = parseFloat(parts[0]) / 360;
  const s = parseFloat(parts[1]) / 100;
  const l = parseFloat(parts[2]) / 100;
  return new THREE.Color().setHSL(h, s, l);
}

export function getSceneThemeColors() {
  return {
    primary: cssHslVarToThreeColor('--primary', [0, 0, 0.95]),
    accent: cssHslVarToThreeColor('--accent', [0, 0, 0.12]),
    background: cssHslVarToThreeColor('--background', [0, 0, 0.05]),
  };
}
