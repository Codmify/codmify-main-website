/** Decorative brand geometry; positioned inside a section, behind its content. */
export default function BrandBackdrop({ dark = false, orbit = false }: { dark?: boolean; orbit?: boolean }) {
  return <div aria-hidden="true" className={`brand-backdrop${dark ? " brand-backdrop-dark" : ""}${orbit ? " brand-backdrop-orbit" : ""}`}>
    <div className="brand-light brand-light-one" />
    <div className="brand-light brand-light-two" />
    <svg className="brand-contours" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" fill="none">
      {[0, 1, 2, 3, 4, 5, 6].map(i => <path key={i} d={`M ${580 + i * 35} -80 C ${280 + i * 45} 120, ${1180 + i * 35} 260, ${680 + i * 48} 680`} />)}
    </svg>
    {orbit && <div className="brand-orbits"><i /><i /><i /><span className="brand-orbit-node" /></div>}
  </div>;
}
