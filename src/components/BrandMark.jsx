// Authentic True Inspire brand mark from the current supplied identity.
export function BrandMark({ className = '', ...props }) {
  return (
    <span className={`brand-mark-frame ${className}`} aria-hidden="true" {...props}>
      <img
        src="/assets/true-inspire-logo-blue-monogram.png"
        alt=""
        className="brand-mark-img"
        width="440"
        height="470"
        loading="eager"
      />
    </span>
  );
}
