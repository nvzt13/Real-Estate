import Link from 'next/link'

export default function Header() {
  return (
    <>
      {/* Sub Header */}
      <div className="sub-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <ul className="info">
                <li><i className="fa fa-envelope"></i> info@company.com</li>
                <li><i className="fa fa-map"></i> Sunny Isles Beach, FL 33160</li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
              <ul className="social-links">
                <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                <li><a href="https://x.com/minthu" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header-area header-sticky">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link href="/" className="logo">
                  <h1>Villa</h1>
                </Link>
                <ul className="nav">
                  <li><Link href="/" className="active">Home</Link></li>
                  <li><Link href="/properties">Properties</Link></li>
                  <li><Link href="/property-details">Property Details</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                  <li><Link href="#"><i className="fa fa-calendar"></i> Schedule a visit</Link></li>
                </ul>
                <a className='menu-trigger'>
                  <span>Menu</span>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}