// A compact vector tracing of the studio's existing TI and four-point star mark.
// Shared with the Three.js extrusion so the scene and navigation use one identity.
export const brandPaths = [
  'M92 0 C88 18 81 26 64 32 C81 38 88 47 92 64 C96 47 103 38 120 32 C103 26 96 18 92 0Z',
  'M0 87 C12 70 24 65 43 65 L87 65 L49 85 C36 91 18 86 0 87Z',
  'M86 76 C65 88 54 107 54 132 L54 195 C74 182 85 167 85 145Z',
  'M99 65 L176 59 L99 105Z',
  'M111 103 L141 84 L141 154 C141 177 128 193 102 201 C110 187 111 176 111 158Z',
];

export function BrandMark({ className = '', ...props }) {
  return <svg className={`brand-mark ${className}`} viewBox="-5 -5 186 216" fill="currentColor" aria-hidden="true" {...props}>{brandPaths.map((d, index) => <path key={index} d={d} />)}</svg>;
}
