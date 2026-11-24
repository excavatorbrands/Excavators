export function IronCrestLogo({ compact = false }) {
  return (
    <a className={`logo-lockup ${compact ? 'logo-compact' : ''}`} href="/" aria-label="Iron Crest home">
      <svg className="logo-emblem" viewBox="0 0 64 64" aria-hidden="true">
        <path d="M32 3 40 8 49 7 53 16 61 23 57 32 61 41 53 48 49 57 40 56 32 61 24 56 15 57 11 48 3 41 7 32 3 23 11 16 15 7 24 8Z" fill="currentColor" />
        <path d="m12 39 11-14 7 8 8-12 14 18Z" fill="#0c1218" />
        <path d="M13 44h38" stroke="#0c1218" strokeWidth="3" strokeLinecap="round" />
        <path d="M19 18 32 10l13 8" fill="none" stroke="#0c1218" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <span className="logo-type">
        <strong>IRON <b>CREST</b></strong>
        <small>EXCAVATOR SOLUTIONS</small>
      </span>
    </a>
  );
}
