import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  // State for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Create refs for animated elements
  const headerRef = useRef(null);
  const heroRef = useRef(null);
  const heroContentRef = useRef(null);
  const heroTitleRef = useRef(null);
  const heroDescRef = useRef(null);
  const heroImageRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);
  const testimonialsRef = useRef(null);
  const testimonialCardsRef = useRef([]);
  const ctaRef = useRef(null);
  const footerRef = useRef(null);
  const techRef = useRef(null);
  const faqRef = useRef(null);
  const pricingRef = useRef(null);

  useEffect(() => {
    console.log("Running animations");

    // HEADER ANIMATION - slide from top
    gsap.fromTo(headerRef.current, 
      { y: -100 }, 
      { y: 0, duration: 1, ease: "power2.out" }
    );

    // HERO CONTENT ANIMATIONS
    const heroTl = gsap.timeline();
    
    // Title animation - slide from left
    heroTl.fromTo(heroTitleRef.current,
      { x: -100 },
      { x: 0, duration: 1, ease: "power2.out" }
    );
    
    // Description animation - slide from left with delay
    heroTl.fromTo(heroDescRef.current,
      { x: -100 },
      { x: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );
    
    // Buttons animation - slide up
    heroTl.fromTo(".hero-buttons .btn",
      { y: 50 },
      { y: 0, duration: 0.7, stagger: 0.2, ease: "back.out" },
      "-=0.4"
    );
    
    // Hero image animation - slide from right
    heroTl.fromTo(heroImageRef.current,
      { x: 100 },
      { x: 0, duration: 1, ease: "power2.out" },
      "-=1"
    );

    // FEATURE CARDS - staggered from bottom
    gsap.fromTo(
      ".feature-card",
      { y: 100 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 75%",
        }
      }
    );

    // TESTIMONIAL CARDS - alternate left/right
    document.querySelectorAll(".testimonial-card").forEach((card, index) => {
      const direction = index % 2 === 0 ? -100 : 100;
      
      gsap.fromTo(
        card,
        { x: direction },
        {
          x: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });

    // TECHNOLOGY SECTION
    gsap.fromTo(
      ".tech-item",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: techRef.current,
          start: "top 75%",
        }
      }
    );

    // FAQ ITEMS
    gsap.fromTo(
      ".faq-item",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: faqRef.current,
          start: "top 80%",
        }
      }
    );

    // PRICING CARDS
    gsap.fromTo(
      ".pricing-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 75%",
        }
      }
    );

    // CTA SECTION - slide up
    gsap.fromTo(
      ctaRef.current,
      { y: 100 },
      {
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        }
      }
    );

    // FOOTER COLUMNS - staggered from bottom
    gsap.fromTo(
      ".footer-col",
      { y: 50 },
      {
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      }
    );
    
    // Parallax effect for hero image
    gsap.to(".hero-parallax", {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
    
    // Add scroll listener for header effects
    const handleScroll = () => {
      if (window.scrollY > 50) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };
    
    // Add this to your useEffect function to handle active nav links
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    const handleNavHighlight = () => {
      let scrollY = window.scrollY;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleNavHighlight);
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavHighlight);
    };
  }, []);

  // FAQ Toggle
  const toggleFaq = (index) => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems[index].classList.toggle('active');
  };

  // Function to add cards to refs array
  const addToFeatureRefs = (el) => {
    if (el && !featureCardsRef.current.includes(el)) {
      featureCardsRef.current.push(el);
    }
  };

  const addToTestimonialRefs = (el) => {
    if (el && !testimonialCardsRef.current.includes(el)) {
      testimonialCardsRef.current.push(el);
    }
  };

  // Add this useEffect hook to handle the before/after slider functionality
  useEffect(() => {
    // Before/After Slider Functionality
    const beforeAfterContainers = document.querySelectorAll('.before-after');
    
    beforeAfterContainers.forEach(container => {
      const slider = container.querySelector('.comparison-slider');
      const beforeImage = container.querySelector('.before-image');
      
      let isDragging = false;
      
      const handleDrag = (e) => {
        if (!isDragging) return;
        
        const containerRect = container.getBoundingClientRect();
        let position;
        
        // Check if this is a touch event or mouse event
        if (e.type === 'touchmove') {
          position = (e.touches[0].clientX - containerRect.left) / containerRect.width;
        } else {
          position = (e.clientX - containerRect.left) / containerRect.width;
        }
        
        // Constrain position between 0 and 1
        position = Math.max(0, Math.min(1, position));
        
        // Update slider and before image positions
        slider.style.left = `${position * 100}%`;
        beforeImage.style.width = `${position * 100}%`;
      };
      
      const startDrag = () => {
        isDragging = true;
        container.classList.add('dragging');
      };
      
      const endDrag = () => {
        isDragging = false;
        container.classList.remove('dragging');
      };
      
      // Mouse events
      container.addEventListener('mousedown', startDrag);
      window.addEventListener('mouseup', endDrag);
      window.addEventListener('mousemove', handleDrag);
      
      // Touch events
      container.addEventListener('touchstart', startDrag);
      window.addEventListener('touchend', endDrag);
      window.addEventListener('touchmove', handleDrag);
    });
    
    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Here you would normally filter the gallery items
        // For example: const category = button.textContent;
        // And then show/hide items based on category
      });
    });
    
    return () => {
      // Clean up event listeners
      beforeAfterContainers.forEach(container => {
        container.removeEventListener('mousedown', startDrag);
        container.removeEventListener('touchstart', startDrag);
      });
      
      window.removeEventListener('mouseup', endDrag);
      window.removeEventListener('mousemove', handleDrag);
      window.removeEventListener('touchend', endDrag);
      window.removeEventListener('touchmove', handleDrag);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Floating Appointment Button */}
      <div className="floating-btn">
        <button className="btn btn-primary">Book Now</button>
      </div>

      {/* Header - Enhanced */}
      <header className="header" ref={headerRef}>
        <div className="container">
          <div className="logo">
            <h2>Elite<span>Derm</span></h2>
          </div>
          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            <ul>
              <li><a href="#home" className="active">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#doctor">Dr. Morgan</a></li>
              <li><a href="#tech">Technology</a></li>
              <li><a href="#testimonials">Results</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </nav>
          <button className="btn btn-secondary desktop-btn">Book Consultation</button>
          <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-bg hero-parallax"></div>
        <div className="container">
          <div className="hero-content" ref={heroContentRef}>
            <div className="hero-badge">
              <div className="hero-badge-content">
                <div className="badge-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15L8.5 16.5L9 13L6.5 10.5L10 10L12 7L14 10L17.5 10.5L15 13L15.5 16.5L12 15Z" fill="#4a90e2" stroke="#4a90e2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="9" stroke="#4a90e2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="badge-text">Board Certified Excellence</span>
              </div>
            </div>
            <h1 ref={heroTitleRef}>Expert Skin, Hair & Laser Solutions</h1>
            <p ref={heroDescRef}>
              Experience transformative aesthetic treatments delivered by 
              Dr. Morgan, a board-certified dermatologist with over 15 years 
              of specialized experience in advanced dermatological care.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary">Schedule Appointment</button>
              <button className="btn btn-outline">Browse Treatments</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat">
                <span className="stat-number">5k+</span>
                <span className="stat-label">Happy Patients</span>
              </div>
              <div className="stat">
                <span className="stat-number">25+</span>
                <span className="stat-label">Treatment Options</span>
              </div>
            </div>
          </div>
          <div className="hero-image" ref={heroImageRef}>
            <img 
              src="/images/hero-clinic.jpg" 
              alt="Modern dermatology clinic interior" 
              className="hero-main-image" 
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="features" ref={featuresRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Our Expertise</div>
            <h2>Our Specialized Treatments</h2>
            <p>Comprehensive care for all your dermatological and aesthetic needs</p>
          </div>
          <div className="features-grid">
            {[
              {
                title: "Advanced Skin Care",
                description: "Medical-grade treatments for acne, rosacea, eczema, and psoriasis. Our specialized protocols combine prescription medications with cutting-edge procedures.",
                icon: "✨"
              },
              {
                title: "Hair Restoration",
                description: "Customized solutions for hair loss including PRP therapy, follicular unit transplantation, laser therapy, and pharmaceutical interventions.",
                icon: "💆"
              },
              {
                title: "Laser Treatments",
                description: "State-of-the-art laser technology for hair removal, skin resurfacing, scar reduction, tattoo removal, and vascular lesions.",
                icon: "🔆"
              },
              {
                title: "Aesthetic Procedures",
                description: "Non-surgical rejuvenation with Botox, dermal fillers, chemical peels, microneedling with PRP, and body contouring treatments.",
                icon: "👩‍⚕️"
              }
            ].map((feature, index) => (
              <div className="feature-card" key={index} ref={addToFeatureRefs}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <a href="#" className="feature-link">Learn More <span>→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Section */}
      <section id="doctor" className="doctor">
        <div className="container">
          <div className="doctor-profile">
            <div className="doctor-image">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700&q=80" 
                alt="Dr. Elizabeth Morgan, Board-Certified Dermatologist" 
                className="doctor-portrait" 
              />
              <div className="experience-badge">15+ Years Experience</div>
            </div>
            <div className="doctor-bio">
              <div className="bio-decoration"></div>
              <div className="section-badge">Meet Your Doctor</div>
              <h2>Dr. Elizabeth Morgan</h2>
              <p className="credentials">
                MD <span className="credential-dot"></span> FAAD <span className="credential-dot"></span> Board-Certified Dermatologist
              </p>
              <p>
                Dr. Morgan completed her dermatology residency at Johns Hopkins University and
                fellowship training in cosmetic dermatology at Harvard Medical School. With
                over 15 years of experience, she specializes in advanced laser techniques, 
                hair restoration, and minimally invasive cosmetic procedures.
              </p>
              <p>
                As an active researcher and educator, Dr. Morgan has published numerous articles
                in peer-reviewed journals and regularly speaks at international conferences. Her
                commitment to personalized care and natural-looking results has earned her recognition
                as one of the top dermatologists in the region.
              </p>
              
              <div className="expertise-areas">
                <span className="expertise-tag">Advanced Laser Techniques</span>
                <span className="expertise-tag">Hair Restoration</span>
                <span className="expertise-tag">Cosmetic Dermatology</span>
                <span className="expertise-tag">Non-Surgical Rejuvenation</span>
                <span className="expertise-tag">Medical Dermatology</span>
              </div>
              
              <div className="credentials-list">
                <div className="credential-item">
                  <div className="credential-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </div>
                  <div className="credential-text">
                    Board Certified by the American Board of Dermatology
                  </div>
                </div>
                <div className="credential-item">
                  <div className="credential-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div className="credential-text">
                    Fellow of the American Academy of Dermatology
                  </div>
                </div>
                <div className="credential-item">
                  <div className="credential-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
                    </svg>
                  </div>
                  <div className="credential-text">
                    Member of the American Society for Laser Medicine & Surgery
                  </div>
                </div>
              </div>
              
              <div className="doctor-cta">
                <button className="btn btn-outline">Download CV</button>
                <button className="btn btn-primary">Book Appointment</button>
              </div>
            </div>
          </div>
          
          <div className="doctor-stats">
            <div className="doctor-stat">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="8.5" cy="7" r="4"></circle>
                  <line x1="20" y1="8" x2="20" y2="14"></line>
                  <line x1="23" y1="11" x2="17" y2="11"></line>
                </svg>
              </div>
              <div className="stat-value">5,000+</div>
              <div className="stat-label">Patients Treated</div>
            </div>
            <div className="doctor-stat">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div className="stat-value">30+</div>
              <div className="stat-label">Published Articles</div>
            </div>
            <div className="doctor-stat">
              <div className="stat-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="stat-value">15+</div>
              <div className="stat-label">Industry Awards</div>
            </div>
          </div>
          
          <div className="education-timeline">
            <div className="education-item">
              <div className="education-dot"></div>
              <div className="education-year">2005-2008</div>
              <div className="education-degree">Dermatology Residency</div>
              <div className="education-institution">Johns Hopkins University School of Medicine</div>
            </div>
            <div className="education-item">
              <div className="education-dot"></div>
              <div className="education-year">2008-2010</div>
              <div className="education-degree">Fellowship in Cosmetic Dermatology</div>
              <div className="education-institution">Harvard Medical School</div>
            </div>
            <div className="education-item">
              <div className="education-dot"></div>
              <div className="education-year">2001-2005</div>
              <div className="education-degree">Doctor of Medicine (MD)</div>
              <div className="education-institution">Columbia University College of Physicians and Surgeons</div>
            </div>
            <div className="education-item">
              <div className="education-dot"></div>
              <div className="education-year">1997-2001</div>
              <div className="education-degree">Bachelor of Science in Biology, Summa Cum Laude</div>
              <div className="education-institution">Yale University</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Section - Enhanced */}
      <section id="tech" className="technology" ref={techRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Medical Innovation</div>
            <h2>Our Advanced Technology</h2>
            <p>Discover the cutting-edge equipment that sets our treatments apart</p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-item">
              <div className="tech-image">
                <div className="tech-badge">Skin Resurfacing</div>
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80" 
                  alt="Fraxel Dual Laser device for skin resurfacing" 
                />
                <div className="tech-overlay"></div>
              </div>
              <div className="tech-content">
                <h3>Fraxel® Dual Laser</h3>
                <div className="tech-specs">
                  <div className="tech-spec">
                    Treatment Time: <span>30-60 min</span>
                  </div>
                  <div className="tech-spec">
                    Recovery: <span>3-7 days</span>
                  </div>
                </div>
                <p>The gold standard for fractional skin resurfacing, precisely targeting damaged skin cells while preserving surrounding healthy tissue. Treats fine lines, wrinkles, sun damage and acne scars with minimal downtime.</p>
                <div className="tech-conditions">
                  <div className="tech-condition">Fine Lines</div>
                  <div className="tech-condition">Wrinkles</div>
                  <div className="tech-condition">Acne Scars</div>
                  <div className="tech-condition">Sun Damage</div>
                </div>
                <div className="tech-footer">
                  <a href="#" className="tech-link">Learn More <span>→</span></a>
                </div>
              </div>
            </div>
            
            <div className="tech-item">
              <div className="tech-image">
                <div className="tech-badge">Hair Restoration</div>
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80" 
                  alt="NeoGraft 2.0 hair restoration system" 
                />
                <div className="tech-overlay"></div>
              </div>
              <div className="tech-content">
                <h3>NeoGraft® 2.0</h3>
                <div className="tech-specs">
                  <div className="tech-spec">
                    Treatment Time: <span>4-8 hours</span>
                  </div>
                  <div className="tech-spec">
                    Recovery: <span>7-10 days</span>
                  </div>
                </div>
                <p>Advanced follicular unit extraction system for precise, natural-looking hair restoration with faster recovery times. This minimally invasive technology eliminates linear scarring and provides more comfortable treatment.</p>
                <div className="tech-conditions">
                  <div className="tech-condition">Pattern Baldness</div>
                  <div className="tech-condition">Receding Hairline</div>
                  <div className="tech-condition">Thinning Hair</div>
                </div>
                <div className="tech-footer">
                  <a href="#" className="tech-link">Learn More <span>→</span></a>
                </div>
              </div>
            </div>
            
            <div className="tech-item">
              <div className="tech-image">
                <div className="tech-badge">Diagnostic</div>
                <img 
                  src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80" 
                  alt="VISIA Skin Analysis system" 
                />
                <div className="tech-overlay"></div>
              </div>
              <div className="tech-content">
                <h3>VISIA® Skin Analysis</h3>
                <div className="tech-specs">
                  <div className="tech-spec">
                    Analysis Time: <span>15-20 min</span>
                  </div>
                  <div className="tech-spec">
                    Recovery: <span>None</span>
                  </div>
                </div>
                <p>Comprehensive digital imaging technology that reveals subsurface skin conditions for personalized treatment planning. This multi-spectral analysis identifies eight key areas of skin health invisible to the naked eye.</p>
                <div className="tech-conditions">
                  <div className="tech-condition">UV Spots</div>
                  <div className="tech-condition">Pores</div>
                  <div className="tech-condition">Wrinkles</div>
                  <div className="tech-condition">Texture</div>
                </div>
                <div className="tech-footer">
                  <a href="#" className="tech-link">Learn More <span>→</span></a>
                </div>
              </div>
            </div>
            
            <div className="tech-item">
              <div className="tech-image">
                <div className="tech-badge">Body Contouring</div>
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=350&q=80" 
                  alt="CoolSculpting Elite body contouring system" 
                />
                <div className="tech-overlay"></div>
              </div>
              <div className="tech-content">
                <h3>CoolSculpting® Elite</h3>
                <div className="tech-specs">
                  <div className="tech-spec">
                    Treatment Time: <span>35-60 min</span>
                  </div>
                  <div className="tech-spec">
                    Recovery: <span>None</span>
                  </div>
                </div>
                <p>Non-invasive fat reduction technology that freezes and eliminates stubborn fat cells without surgery or downtime. The latest generation device features dual applicators for treating multiple areas simultaneously.</p>
                <div className="tech-conditions">
                  <div className="tech-condition">Abdomen</div>
                  <div className="tech-condition">Flanks</div>
                  <div className="tech-condition">Thighs</div>
                  <div className="tech-condition">Double Chin</div>
                </div>
                <div className="tech-footer">
                  <a href="#" className="tech-link">Learn More <span>→</span></a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-stats">
            <div className="tech-stat">
              <div className="tech-stat-number">15+</div>
              <div className="tech-stat-label">Advanced Technologies</div>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-number">98%</div>
              <div className="tech-stat-label">Patient Satisfaction</div>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-number">5k+</div>
              <div className="tech-stat-label">Successful Treatments</div>
            </div>
            <div className="tech-stat">
              <div className="tech-stat-number">$2M+</div>
              <div className="tech-stat-label">Technology Investment</div>
            </div>
          </div>
          
          <div className="tech-video">
            <img 
              src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=675&q=80" 
              alt="Advanced technology demonstration video thumbnail" 
            />
            <div className="video-play-button"></div>
          </div>
          
          <div className="tech-comparison">
            <div className="comparison-header">
              <h3>Why Our Technology Makes the Difference</h3>
              <p>See how our advanced systems compare to traditional treatments</p>
            </div>
            <div className="comparison-grid">
              <div className="comparison-item">
                <div className="comparison-item-header">
                  <h4>Traditional Treatments</h4>
                </div>
                <div className="comparison-body">
                  <ul className="comparison-features">
                    <li>Generic approach to all patients</li>
                    <li>Limited customization options</li>
                    <li>Longer recovery periods</li>
                    <li>Less precise application</li>
                    <li>Requires multiple sessions</li>
                  </ul>
                </div>
              </div>
              <div className="comparison-item">
                <div className="comparison-item-header">
                  <h4>Our Advanced Technology</h4>
                </div>
                <div className="comparison-body">
                  <ul className="comparison-features">
                    <li>Personalized treatment protocols</li>
                    <li>Tailored to individual needs</li>
                    <li>Minimal to no downtime</li>
                    <li>Precise targeting of problem areas</li>
                    <li>Faster results with fewer sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="tech-cta">
            <button className="btn btn-primary">Schedule a Technology Consultation</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials" ref={testimonialsRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Success Stories</div>
            <h2>Patient Success Stories</h2>
            <p>Real results from real patients</p>
          </div>
          <div className="testimonials-slider">
            {[
              {
                quote: "After struggling with severe acne for over a decade, Dr. Morgan's customized treatment plan completely transformed my skin in just 3 months. The confidence I've gained is immeasurable.",
                author: "Jennifer K.",
                treatment: "Acne Treatment Program",
                rating: 5
              },
              {
                quote: "The hair restoration protocol Dr. Morgan designed for me produced results when nothing else worked. My hairline has been restored naturally, and no one can tell I had treatment.",
                author: "Michael T.",
                treatment: "PRP Hair Restoration",
                rating: 5
              },
              {
                quote: "I had embarrassing facial redness for years until I found Dr. Morgan. Her laser treatments have dramatically reduced my rosacea symptoms with no downtime. My skin looks better at 45 than it did at 35!",
                author: "Rebecca S.",
                treatment: "Laser Therapy",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div className="testimonial-card" key={index} ref={addToTestimonialRefs}>
                <div className="testimonial-rating">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="quote">"{testimonial.quote}"</p>
                <div className="author">
                  <p className="name">{testimonial.author}</p>
                  <p className="company">{testimonial.treatment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Enhanced Before/After Gallery Section */}
      <section id="gallery" className="gallery">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Real Results</div>
            <h2>Before & After Gallery</h2>
            <p>See the transformations our patients have experienced</p>
          </div>
          
          <div className="gallery-filter">
            <button className="filter-btn active">All Results</button>
            <button className="filter-btn">Skin Treatments</button>
            <button className="filter-btn">Hair Restoration</button>
            <button className="filter-btn">Laser Procedures</button>
            <button className="filter-btn">Non-Surgical</button>
          </div>
          
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="condition-tag">Acne</div>
              <div className="before-after">
                <div className="before-image">
                  <img 
                    src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="Before acne treatment" 
                  />
                  <span className="image-label">Before</span>
                </div>
                <div className="after-image">
                  <img 
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="After acne treatment" 
                  />
                  <span className="image-label">After</span>
                </div>
                <div className="comparison-slider"></div>
              </div>
              <div className="gallery-content">
                <h4>Advanced Acne Treatment</h4>
                <p>Custom medical-grade therapy combining topical treatments, laser therapy, and dietary adjustments</p>
                <div className="treatment-info">
                  <div className="treatment-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>3 months</span>
                    </div>
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span>4 sessions</span>
                    </div>
                  </div>
                  <div className="patient-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Female, 24</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item">
              <div className="condition-tag">Hair Loss</div>
              <div className="before-after">
                <div className="before-image">
                  <img 
                    src="https://images.unsplash.com/photo-1585751119414-ef2636f8aede?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="Before hair restoration" 
                  />
                  <span className="image-label">Before</span>
                </div>
                <div className="after-image">
                  <img 
                    src="https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="After hair restoration" 
                  />
                  <span className="image-label">After</span>
                </div>
                <div className="comparison-slider"></div>
              </div>
              <div className="gallery-content">
                <h4>PRP Hair Restoration</h4>
                <p>Combined PRP therapy with pharmaceutical treatment and laser stimulation</p>
                <div className="treatment-info">
                  <div className="treatment-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>6 months</span>
                    </div>
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span>5 sessions</span>
                    </div>
                  </div>
                  <div className="patient-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Male, 38</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item">
              <div className="condition-tag">Wrinkles</div>
              <div className="before-after">
                <div className="before-image">
                  <img 
                    src="https://images.unsplash.com/photo-1521224911436-5b591bea1a9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="Before skin rejuvenation" 
                  />
                  <span className="image-label">Before</span>
                </div>
                <div className="after-image">
                  <img 
                    src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="After skin rejuvenation" 
                  />
                  <span className="image-label">After</span>
                </div>
                <div className="comparison-slider"></div>
              </div>
              <div className="gallery-content">
                <h4>Fractional Laser Resurfacing</h4>
                <p>Fraxel® treatment for fine lines, wrinkles and sun damage with collagen stimulation</p>
                <div className="treatment-info">
                  <div className="treatment-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>2 months</span>
                    </div>
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span>2 sessions</span>
                    </div>
                  </div>
                  <div className="patient-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Female, 52</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="gallery-item">
              <div className="condition-tag">Volume Loss</div>
              <div className="before-after">
                <div className="before-image">
                  <img 
                    src="https://images.unsplash.com/photo-1623082574892-b4dc18d6e339?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="Before non-surgical rejuvenation" 
                  />
                  <span className="image-label">Before</span>
                </div>
                <div className="after-image">
                  <img 
                    src="https://images.unsplash.com/photo-1614251055880-ee96e4803393?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=700&q=80" 
                    alt="After non-surgical rejuvenation" 
                  />
                  <span className="image-label">After</span>
                </div>
                <div className="comparison-slider"></div>
              </div>
              <div className="gallery-content">
                <h4>Non-Surgical Facial Rejuvenation</h4>
                <p>Custom combination of dermal fillers and Botox for natural-looking volume restoration</p>
                <div className="treatment-info">
                  <div className="treatment-meta">
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      <span>Immediate</span>
                    </div>
                    <div className="meta-item">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                      <span>1 session</span>
                    </div>
                  </div>
                  <div className="patient-profile">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span>Female, 45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="gallery-pagination">
            <span className="page-dot active"></span>
            <span className="page-dot"></span>
            <span className="page-dot"></span>
          </div>
          
          <div className="gallery-cta">
            <button className="btn btn-primary">View Full Before & After Gallery</button>
          </div>
        </div>
      </section>

      {/* Pricing Section - Updated UI */}
      <section id="pricing" className="pricing" ref={pricingRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Transparent Pricing</div>
            <h2>Treatment Packages</h2>
            <p>Customized solutions for your unique needs</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <div className="treatment-icon">✨</div>
                <h3>Skin Essentials</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">299</span>
                  <span className="period">/session</span>
                </div>
              </div>
              <div className="pricing-body">
                <div className="treatment-details">
                  <div className="detail-item">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">60 min</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Sessions</span>
                    <span className="detail-value">1 session</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Results</span>
                    <span className="detail-value">Immediate</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>Comprehensive Skin Analysis</li>
                  <li>Medical-Grade Facial</li>
                  <li>Custom Treatment Plan</li>
                  <li>Skincare Product Recommendations</li>
                  <li>30-Day Follow-Up</li>
                </ul>
                <button className="btn btn-outline">Book Consultation</button>
              </div>
              <div className="best-for">Best for: <span>First-time patients or basic skin concerns</span></div>
            </div>
            
            <div className="pricing-card featured">
              <div className="featured-tag">Most Popular</div>
              <div className="pricing-header">
                <div className="treatment-icon">🔆</div>
                <h3>Advanced Rejuvenation</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">599</span>
                  <span className="period">/session</span>
                </div>
              </div>
              <div className="pricing-body">
                <div className="treatment-details">
                  <div className="detail-item">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">90 min</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Sessions</span>
                    <span className="detail-value">1-3 recommended</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Results</span>
                    <span className="detail-value">2-4 weeks</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>VISIA® Digital Skin Analysis</li>
                  <li>Medical-Grade Facial</li>
                  <li>Laser Skin Resurfacing</li>
                  <li>Micro-Needling or Chemical Peel</li>
                  <li>Take-Home Skincare Kit</li>
                  <li>60-Day Follow-Up</li>
                </ul>
                <button className="btn btn-primary">Book Consultation</button>
              </div>
              <div className="best-for">Best for: <span>Anti-aging concerns and skin texture improvement</span></div>
            </div>
            
            <div className="pricing-card">
              <div className="pricing-header">
                <div className="treatment-icon">💆</div>
                <h3>Hair Restoration</h3>
                <div className="price">
                  <span className="currency">$</span>
                  <span className="amount">799</span>
                  <span className="period">/session</span>
                </div>
              </div>
              <div className="pricing-body">
                <div className="treatment-details">
                  <div className="detail-item">
                    <span className="detail-label">Duration</span>
                    <span className="detail-value">120 min</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Sessions</span>
                    <span className="detail-value">3-6 recommended</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Results</span>
                    <span className="detail-value">3-6 months</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li>Comprehensive Scalp Analysis</li>
                  <li>PRP Hair Restoration Treatment</li>
                  <li>Laser Therapy Session</li>
                  <li>Medical Hair Growth Plan</li>
                  <li>3-Month Follow-Up Program</li>
                </ul>
                <button className="btn btn-outline">Book Consultation</button>
              </div>
              <div className="best-for">Best for: <span>Hair thinning and pattern baldness concerns</span></div>
            </div>
          </div>
          <div className="pricing-disclaimer">
            <p>All packages include complimentary consultation. Treatment plans are customized for each patient and prices may vary. Insurance coverage available for certain medical conditions.</p>
          </div>
          <div className="financing-options">
            <div className="financing-option">
              <span>🏦</span> Care Credit
            </div>
            <div className="financing-option">
              <span>💳</span> Major Credit Cards
            </div>
            <div className="financing-option">
              <span>💰</span> HSA/FSA Accepted
            </div>
            <div className="financing-option">
              <span>📱</span> Payment Plans Available
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - NEW */}
      <section id="faq" className="faq" ref={faqRef}>
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Common Questions</div>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our treatments and procedures</p>
          </div>
          <div className="faq-grid">
            <div className="faq-item" onClick={() => toggleFaq(0)}>
              <div className="faq-question">
                <h3>How do I know which treatment is right for me?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>Our comprehensive consultation process helps determine the most effective treatment for your specific concerns. Dr. Morgan conducts a thorough assessment of your skin or hair condition, discusses your goals, and creates a personalized treatment plan that considers your unique characteristics and medical history.</p>
              </div>
            </div>
            
            <div className="faq-item" onClick={() => toggleFaq(1)}>
              <div className="faq-question">
                <h3>How many sessions will I need to see results?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>The number of sessions varies depending on the treatment and your individual condition. Some treatments show immediate results, while others require a series of sessions for optimal outcomes. During your consultation, Dr. Morgan will provide you with a clear timeline and expected number of sessions for your specific treatment plan.</p>
              </div>
            </div>
            
            <div className="faq-item" onClick={() => toggleFaq(2)}>
              <div className="faq-question">
                <h3>Are the treatments painful? What is the recovery time?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>We prioritize your comfort during all procedures. Most treatments involve minimal discomfort, and we utilize topical numbing agents when necessary. Recovery time varies by procedure - some have no downtime, while others may require a few days of healing. We provide detailed aftercare instructions to ensure optimal recovery and results.</p>
              </div>
            </div>
            
            <div className="faq-item" onClick={() => toggleFaq(3)}>
              <div className="faq-question">
                <h3>Do you accept insurance for treatments?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>We accept insurance for medically necessary dermatological treatments. Cosmetic procedures are typically not covered by insurance. Our administrative team can help verify your insurance coverage before treatment and discuss financing options for non-covered services.</p>
              </div>
            </div>
            
            <div className="faq-item" onClick={() => toggleFaq(4)}>
              <div className="faq-question">
                <h3>How do I prepare for my first appointment?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>For your first appointment, please arrive 15 minutes early to complete paperwork. Bring a list of current medications, any relevant medical records, and information about previous treatments. Avoid wearing makeup if you're coming for a facial treatment, and wear comfortable clothing. We recommend avoiding sun exposure for 1-2 weeks before laser treatments.</p>
              </div>
            </div>
            
            <div className="faq-item" onClick={() => toggleFaq(5)}>
              <div className="faq-question">
                <h3>Are the results permanent?</h3>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>Result longevity varies by treatment. Some procedures provide permanent results (like laser hair removal), while others require maintenance treatments to sustain results. Factors like aging, lifestyle, and sun exposure can affect longevity. We provide detailed information about expected results and maintenance recommendations during your consultation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Journey - NEW */}
      <section id="journey" className="journey">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Your Experience</div>
            <h2>The Patient Journey</h2>
            <p>What to expect when you choose EliteDerm</p>
          </div>
          <div className="journey-timeline">
            <div className="journey-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Initial Consultation</h3>
                <p>Meet with Dr. Morgan for a comprehensive assessment of your concerns and goals. We'll review your medical history and develop a personalized treatment plan.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Treatment Session</h3>
                <p>Experience our state-of-the-art treatments in a comfortable, relaxing environment with our expert medical team ensuring your comfort and safety.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Recovery & Aftercare</h3>
                <p>Receive detailed aftercare instructions and premium products to optimize your healing and results. Our team is available to answer any questions.</p>
              </div>
            </div>
            <div className="journey-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Follow-Up Care</h3>
                <p>Return for scheduled follow-up appointments to monitor your progress, make any necessary adjustments to your treatment plan, and maintain your results.</p>
              </div>
            </div>
          </div>
          <div className="journey-cta">
            <button className="btn btn-primary">Start Your Journey Today</button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta" ref={ctaRef}>
        <div className="container">
          <h2>Transform Your Appearance Today</h2>
          <p>Schedule your personalized consultation with Dr. Morgan and discover the most effective treatments for your unique needs.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">Book Your Consultation</button>
            <button className="btn btn-outline">Call (212) 555-7890</button>
          </div>
          <div className="cta-highlight">
            <span>✓ Same-week appointments available</span>
            <span>✓ Complimentary virtual consultations</span>
            <span>✓ Flexible payment options</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" ref={footerRef}>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h3>Elite<span>Derm</span></h3>
              <p>Providing exceptional medical and aesthetic dermatology care using the most advanced techniques and technologies available.</p>
              <div className="social-icons">
                <a href="#" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
              <div className="footer-badges">
                <img src="/images/badges/abd-badge.png" alt="American Board of Dermatology" />
                <img src="/images/badges/aad-badge.png" alt="American Academy of Dermatology" />
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Our Services</h4>
              <ul>
                <li><a href="#skin">Medical Dermatology</a></li>
                <li><a href="#hair">Hair Restoration</a></li>
                <li><a href="#laser">Laser Treatments</a></li>
                <li><a href="#aesthetic">Aesthetic Procedures</a></li>
                <li><a href="#body">Body Contouring</a></li>
                <li><a href="#injectable">Injectable Treatments</a></li>
              </ul>
            </div>
            
            <div className="footer-col">
              <h4>Clinic Hours</h4>
              <ul className="hours-list">
                <li><span>Monday - Friday:</span> <span>9am - 5pm</span></li>
                <li><span>Saturday:</span> <span>10am - 2pm</span></li>
                <li><span>Sunday:</span> <span>Closed</span></li>
              </ul>
              <div className="emergency-care">
                <h4>Emergency Care</h4>
                <p>After-hours urgent care available for established patients. Call our emergency line at (212) 555-7999.</p>
              </div>
            </div>
            
            <div className="footer-col">
              <h4>Contact Us</h4>
              <ul className="contact-list">
                <li>
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>
                  <span>123 Medical Parkway, Suite 300<br />New York, NY 10021</span>
                </li>
                <li>
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </span>
                  <span>(212) 555-7890</span>
                </li>
                <li>
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </span>
                  <span>info@elitederm.com</span>
                </li>
              </ul>
              <div className="newsletter">
                <h4>Stay Informed</h4>
                <p>Subscribe to our newsletter for skincare tips and special offers.</p>
                <form className="newsletter-form">
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit" className="btn btn-primary">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Accessibility</a>
              <a href="#">Sitemap</a>
            </div>
            <p>&copy; {new Date().getFullYear()} EliteDerm Medical Spa. All rights reserved.</p>
            <p className="disclaimer">All before and after photos represent real patients and results. Individual results may vary.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;