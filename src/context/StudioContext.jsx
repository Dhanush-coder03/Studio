import React, { createContext, useContext, useState, useEffect } from 'react';

// Import local photography images
import bigMountainImg from '../assets/images/big-mountain-hero.jpg';
import catWeddingImg from '../assets/images/cat-wedding.jpg';
import catTraditionalImg from '../assets/images/cat-traditional.jpg';
import catMaternityImg from '../assets/images/cat-maternity.jpg';
import catKidsImg from '../assets/images/cat-kids.jpg';
import sliceReceptionImg from '../assets/images/slice-reception.jpg';
import sliceOutdoorImg from '../assets/images/slice-outdoor.jpg';
import sliceSisterhoodImg from '../assets/images/slice-sisterhood.jpg';
import sliceTraditionalImg from '../assets/images/slice-traditional.jpg';
import heroCoupleImg from '../assets/images/hero-couple.jpg';
import templeBgImg from '../assets/images/temple-bg.jpg';
import dslrBgImg from '../assets/images/dslr-bg.jpg';
import sonyAlpha7Img from '../assets/sony_alpha_7.jpg';
import sonyFx3Img from '../assets/sony_fx3.jpg';

const LOCAL_STORAGE_KEY = 'velu_studio_admin_data_v2';

const defaultImages = [
  {
    id: 'img-1',
    title: 'Cinematic Mountain Romance',
    url: bigMountainImg,
    category: 'Showcase',
    caption: 'Couple in flying red gown on mountain cliff',
    createdAt: '2026-01-10',
  },
  {
    id: 'img-2',
    title: 'Heritage Muhurtham Vows',
    url: catWeddingImg,
    category: 'Wedding',
    caption: 'Traditional Tamil wedding rituals and golden moments',
    createdAt: '2026-01-12',
  },
  {
    id: 'img-3',
    title: 'Sacred Temple Saree Portrait',
    url: catTraditionalImg,
    category: 'Traditional',
    caption: 'Handcrafted Kanjivaram silk styling at temple corridor',
    createdAt: '2026-01-15',
  },
  {
    id: 'img-4',
    title: 'Ethereal Maternity Glow',
    url: catMaternityImg,
    category: 'Maternity',
    caption: 'Serene outdoor motherhood celebration',
    createdAt: '2026-01-20',
  },
  {
    id: 'img-5',
    title: 'Joyful Childhood Smile',
    url: catKidsImg,
    category: 'Kids',
    caption: 'Spontaneous and playful candid kids portraits',
    createdAt: '2026-02-01',
  },
  {
    id: 'img-6',
    title: 'Grand Reception Stage Glow',
    url: sliceReceptionImg,
    category: 'Wedding',
    caption: 'Opulent lighting and celebratory couple entry',
    createdAt: '2026-02-05',
  },
  {
    id: 'img-7',
    title: 'Bridesmaids & Sisterhood',
    url: sliceSisterhoodImg,
    category: 'Wedding',
    caption: 'Candid smiles and joyful moments among sisters',
    createdAt: '2026-02-14',
  },
  {
    id: 'img-8',
    title: 'Destination Golden Meadow',
    url: sliceOutdoorImg,
    category: 'Pre-Wedding',
    caption: 'Scenic landscape destination pre-wedding story',
    createdAt: '2026-02-22',
  },
  {
    id: 'img-9',
    title: 'Vibrant Sangeet Garland',
    url: sliceTraditionalImg,
    category: 'Traditional',
    caption: 'Authentic garland exchange and floral details',
    createdAt: '2026-02-28',
  },
  {
    id: 'img-10',
    title: 'Sunset Beach Romance',
    url: heroCoupleImg,
    category: 'Pre-Wedding',
    caption: 'Editorial couple portrait against warm sunset',
    createdAt: '2026-03-01',
  },
  {
    id: 'img-11',
    title: 'Sony Alpha 7 IV Cinema Rig',
    url: sonyAlpha7Img,
    category: 'Equipment',
    caption: 'Primary full-frame camera for low-light portraits',
    createdAt: '2026-03-05',
  },
  {
    id: 'img-12',
    title: 'Sony FX3 Cinema Line Camera',
    url: sonyFx3Img,
    category: 'Equipment',
    caption: 'Dedicated 4K cinema gear for slow-motion wedding films',
    createdAt: '2026-03-05',
  },
  {
    id: 'img-13',
    title: 'Heritage Temple Architecture',
    url: templeBgImg,
    category: 'Traditional',
    caption: 'Divine temple corridor background and ancient stone pillars',
    createdAt: '2026-03-06',
  },
  {
    id: 'img-14',
    title: 'Pro Cinema Lens & DSLR Arsenal',
    url: dslrBgImg,
    category: 'Equipment',
    caption: 'Prime G-Master lenses and bokeh background gear',
    createdAt: '2026-03-07',
  },
];

const defaultServices = [
  {
    id: 'srv-1',
    title: 'Pre-Wedding Cinematic Stories',
    slug: 'pre-wedding',
    category: 'Pre-Wedding',
    image: bigMountainImg,
    priceStarting: '₹45,000',
    description: 'Cinematic destination love stories captured in picturesque outdoor landscapes, misty hill stations, and golden sunset beaches.',
    detailedInfo: 'We travel with you to dreamy locations, equipped with cinema-grade drones and prime portrait glass to craft a movie-like love story before your big day.',
    features: [
      '2 Creative Directors & Cinematographers',
      '4K Cinematic Teaser (60s) for Social Media',
      'FPV & Aerial Drone Cinematography',
      'Up to 3 Costume Changes & Locations',
      '40 Retouched High-Resolution Portraits',
    ],
    isFeatured: true,
    createdAt: '2026-01-01',
  },
  {
    id: 'srv-2',
    title: 'Royal Wedding & Muhurtham',
    slug: 'wedding',
    category: 'Wedding',
    image: catWeddingImg,
    priceStarting: '₹1,20,000',
    description: 'Complete, uncompromising coverage of traditional ceremonies, emotional mangalasutra moments, and grand floral receptions.',
    detailedInfo: 'From sacred early morning Vedic rites to the glamorous reception, our multi-camera team preserves every tear, laugh, and sacred petal.',
    features: [
      '2 Senior Candid Photographers',
      '2 Traditional 4K Cinema Videographers',
      'Full 45-60 Min Narrative Wedding Film',
      'Same-Day Sneak Peek Reel (Within 24 Hours)',
      'Luxury Hand-Bound Leather Photo Album (40 Pgs)',
    ],
    isFeatured: true,
    createdAt: '2026-01-02',
  },
  {
    id: 'srv-3',
    title: 'Traditional Temple Heritage',
    slug: 'traditional',
    category: 'Traditional',
    image: catTraditionalImg,
    priceStarting: '₹55,000',
    description: 'Specialized in South Indian temple ceremonies, Kanjivaram silk heirloom styling, intricate jewelry, and sacred customs.',
    detailedInfo: 'We respect the sanctity of ritual corridors and heritage halls, capturing divine temple architecture and familial warmth with artistic precision.',
    features: [
      'Senior Traditional Photographer & Rig Specialist',
      'Specialized Low-Light Prime Lens Package',
      'Intricate Bridal Jewelry & Saree Detail Focus',
      'High-Resolution Raw Archive on Cloud Drive',
      '25 Premium Fine-Art Cotton Rag Prints',
    ],
    isFeatured: false,
    createdAt: '2026-01-03',
  },
  {
    id: 'srv-4',
    title: 'Maternity & Motherhood',
    slug: 'maternity',
    category: 'Maternity',
    image: catMaternityImg,
    priceStarting: '₹35,000',
    description: 'Tender, gentle celebrations of new life set amidst serene natural meadows, warm studio lights, and floral setups.',
    detailedInfo: 'A comfortable, relaxed session celebrating the glow of motherhood with customized designer gowns, gentle poses, and family inclusion.',
    features: [
      'Relaxed, Unhurried 2-3 Hour Experience',
      'Designer Maternity Gowns & Drapes Provided',
      'Partner & Sibling Inclusion at No Extra Cost',
      '25 Magazine-Grade Fine Art Retouched Portraits',
      'Mini Keepsake Wooden Frame Included',
    ],
    isFeatured: false,
    createdAt: '2026-01-04',
  },
  {
    id: 'srv-5',
    title: 'Kids & Family Candids',
    slug: 'kids',
    category: 'Kids & Family',
    image: catKidsImg,
    priceStarting: '₹30,000',
    description: 'Pure, authentic laughter and innocent childhood smiles captured in spontaneous, joyful candid portraits.',
    detailedInfo: 'No stiff poses or forced smiles. We interact with your little one to document their genuine curiosity, giggles, and milestones.',
    features: [
      'Patient & Kid-Friendly Photography Crew',
      'Interactive Fun Props & Playful Scenarios',
      'First Birthday / Cake Smash Setup Options',
      'Unlimited Digital Captures with Top 30 Edits',
      'Digital Storybook Album Delivery',
    ],
    isFeatured: false,
    createdAt: '2026-01-05',
  },
  {
    id: 'srv-6',
    title: 'Luxury Destination Wedding Supreme',
    slug: 'destination',
    category: 'Destination',
    image: sliceOutdoorImg,
    priceStarting: '₹2,50,000',
    description: 'Multi-day luxury celebration coverage across royal heritage palaces, backwater resorts, and tropical island beaches.',
    detailedInfo: 'An elite photography crew dedicated solely to your destination wedding, including Sangeet, Mehendi, Pool Party, Muhurtham, and Gala Afterparty.',
    features: [
      'Full 3-Day Multi-Event Unrestricted Coverage',
      '4 Cinema Cameras (Sony FX3) & FPV Drone Pilot',
      'Live Same-Evening Teaser Edit for Guests',
      '2 Premium Italian Silk Photo Albums',
      'Complimentary Sunset Pre-Wedding Session',
    ],
    isFeatured: true,
    createdAt: '2026-01-06',
  },
];

const defaultGallery = [
  {
    id: 'gal-1',
    title: 'Ooty Hills Pre-Wedding Romance',
    category: 'Pre-Wedding',
    image: bigMountainImg,
    client: 'Arjun & Keerthana',
    location: 'Nilgiri Hills, Ooty',
    year: '2026',
    description: 'A breathtaking pre-wedding portrait in a flowing scarlet gown overlooking the misty Western Ghats.',
    isFeatured: true,
  },
  {
    id: 'gal-2',
    title: 'Sacred Muhurtham Vows',
    category: 'Wedding',
    image: catWeddingImg,
    client: 'Karthik & Priya',
    location: 'Mayor Ramanathan Chettiar Hall, Chennai',
    year: '2026',
    description: 'Tender glances and sacred yellow thread blessings surrounded by floral brass lamps.',
    isFeatured: true,
  },
  {
    id: 'gal-3',
    title: 'Kanjivaram Saree Heritage',
    category: 'Traditional',
    image: catTraditionalImg,
    client: 'Aishwarya',
    location: 'Madurai Heritage Villa',
    year: '2026',
    description: 'Rich temple jewelry, woven gold zari motifs, and jasmine florals captured in natural window glow.',
    isFeatured: true,
  },
  {
    id: 'gal-4',
    title: 'Golden Hour Motherhood',
    category: 'Maternity',
    image: catMaternityImg,
    client: 'Dr. Shalini & Dr. Rajesh',
    location: 'ECR Meadow Reserve',
    year: '2026',
    description: 'Quiet grace and serene warmth in open fields during twilight golden hour.',
    isFeatured: true,
  },
  {
    id: 'gal-5',
    title: 'Pure Toddler Joy',
    category: 'Kids',
    image: catKidsImg,
    client: 'Baby Aarav (1st Birthday)',
    location: 'Velu Studio Chennai',
    year: '2026',
    description: 'Unfiltered, sparkling eyes and spontaneous toddler giggles in soft studio lighting.',
    isFeatured: true,
  },
  {
    id: 'gal-6',
    title: 'Opulent Reception Stage',
    category: 'Wedding',
    image: sliceReceptionImg,
    client: 'Vignesh & Sneha',
    location: 'ITC Grand Chola, Chennai',
    year: '2026',
    description: 'Sparkler entry, chandelier reflections, and regal black-tie reception portraits.',
    isFeatured: true,
  },
  {
    id: 'gal-7',
    title: 'Sisterhood & Laughter',
    category: 'Wedding',
    image: sliceSisterhoodImg,
    client: 'Deepika & Bridesmaids',
    location: 'Leela Palace, Chennai',
    year: '2026',
    description: 'Unscripted joy and heartfelt embraces while getting the bride ready.',
    isFeatured: false,
  },
  {
    id: 'gal-8',
    title: 'Destination Riverside Meadow',
    category: 'Pre-Wedding',
    image: sliceOutdoorImg,
    client: 'Rahul & Meera',
    location: 'Kumarakom Backwaters, Kerala',
    year: '2026',
    description: 'Casual, romantic stroll along Kerala water banks at sunrise.',
    isFeatured: false,
  },
  {
    id: 'gal-9',
    title: 'Garland Exchange Moments',
    category: 'Traditional',
    image: sliceTraditionalImg,
    client: 'Gautham & Ananya',
    location: 'Karpaga Vinayagar Temple, Pillayarpatti',
    year: '2026',
    description: 'Vibrant rose garlands hoisted high amidst joyful family banter.',
    isFeatured: false,
  },
];

const defaultPackages = [
  {
    id: 'pkg-1',
    name: 'Silver Classic',
    badge: 'Essential',
    price: '₹65,000',
    period: 'Single Event / 1 Day',
    description: 'Perfect for intimate ceremonies, temple weddings, engagements, or reception celebrations.',
    features: [
      '1 Senior Candid Photographer',
      '1 Traditional HD Videographer',
      'Full Event Highlight Film (3-5 mins)',
      '250+ Color Corrected High-Res Images',
      'Private Digital Cloud Gallery (1 Year)',
      'Fast Delivery Within 21 Days',
    ],
    deliverablesSummary: '1 Photographer + 1 Videographer + Cloud Gallery',
    isPopular: false,
  },
  {
    id: 'pkg-2',
    name: 'Gold Cinematic Luxury',
    badge: 'Most Popular',
    price: '₹1,35,000',
    period: '2 Days / Muhurtham & Reception',
    description: 'Our signature bespoke wedding package capturing both morning sacred rituals and grand evening celebration.',
    features: [
      '2 Senior Candid Photographers',
      '2 Cinema Line 4K Videographers',
      '1 Drone Pilot for Stunning Aerial Angles',
      '1-Minute Instagram Teaser + 35-Min Cinema Film',
      '40-Page Handcrafted Flush Mount Album',
      'Pre-Wedding Mini Shoot Included (2 Hours)',
      'High-Speed SSD with All Raw & Final Cuts',
    ],
    deliverablesSummary: '2 Photographers + 2 Videographers + Drone + 40-Pg Album',
    isPopular: true,
  },
  {
    id: 'pkg-3',
    name: 'Diamond Royal Heritage',
    badge: 'Ultra Luxury',
    price: '₹2,40,000',
    period: '3 Days / Full Multi-Day Festivities',
    description: 'Uncompromising, world-class production for grand destination weddings, Sangeet, Muhurtham, and Reception.',
    features: [
      '3 Master Candid Photographers',
      '3 Cinema Line Cameras (Sony FX3 Series)',
      'Dual Drone Aerial Team (FPV & 4K)',
      'Same-Day Evening Video Edit for Reception Guests',
      '2 Luxury Italian Leather Albums (40 Pgs Each)',
      'Full Day Destination Pre-Wedding Shoot Included',
      'Personalized Engraved Wooden Keepsake Box',
    ],
    deliverablesSummary: 'Complete 3-Day Production + Dual Drone + 2 Silk Albums',
    isPopular: false,
  },
];

const defaultContactInfo = {
  studioName: 'Velu Photography Studio',
  tagline: 'Luxury Wedding Photography & Cinematic Films',
  ownerName: 'Velu Rathinam',
  phone: '+91 98401 23456',
  altPhone: '+91 94440 98765',
  email: 'hello@veluphotography.com',
  address: 'No. 48, Heritage Square, Opp. Express Avenue, Anna Salai, Chennai, Tamil Nadu 600002',
  workingHours: 'Mon - Sat: 9:30 AM - 8:30 PM (Sunday by Appointment)',
  whatsapp: '+919840123456',
  instagram: 'https://instagram.com/veluphotography',
  facebook: 'https://facebook.com/veluphotography',
  youtube: 'https://youtube.com/@veluphotography',
  mapEmbedUrl: 'https://maps.google.com/?q=Anna+Salai+Chennai',
};

const defaultInquiries = [
  {
    id: 'inq-1',
    name: 'Aishwarya & Senthil Nathan',
    phone: '+91 98405 11223',
    email: 'aishwarya.senthil@gmail.com',
    weddingDate: '2026-11-18',
    eventType: 'Traditional Tamil Wedding & Reception',
    packageInterested: 'Gold Cinematic Luxury',
    location: 'Madurai Meenakshi Amman Temple & Raja Muthiah Mandapam',
    message: 'We are planning a 2-day traditional temple wedding with around 800 guests. We love your royal heritage style!',
    status: 'Booked',
    dateReceived: '2026-10-18 14:30',
  },
  {
    id: 'inq-2',
    name: 'Karthik & Divya Bharathi',
    phone: '+91 97910 88765',
    email: 'divya.karthik26@outlook.com',
    weddingDate: '2026-12-04',
    eventType: 'Pre-Wedding Shoot & Muhurtham',
    packageInterested: 'Gold Cinematic Luxury',
    location: 'Ooty & Chennai Leela Palace',
    message: 'Looking for a cinematic destination pre-wedding shoot in Ooty followed by Chennai reception.',
    status: 'Contacted',
    dateReceived: '2026-10-19 11:15',
  },
  {
    id: 'inq-3',
    name: 'Dr. Sneha & Vikram Mohan',
    phone: '+91 94432 55678',
    email: 'sneha.mohan@apollo.org',
    weddingDate: '2026-11-29',
    eventType: 'Maternity Fine Art Portrait',
    packageInterested: 'Maternity & Motherhood',
    location: 'ECR Studio Setup',
    message: 'Interested in a private maternity session with outdoor sunset photos in ECR.',
    status: 'New',
    dateReceived: '2026-10-20 09:40',
  },
  {
    id: 'inq-4',
    name: 'Pooja Venkatesh & Rohan',
    phone: '+91 99620 44321',
    email: 'pooja.v@techcorp.in',
    weddingDate: '2027-01-15',
    eventType: 'Luxury Destination Wedding Supreme',
    packageInterested: 'Diamond Royal Heritage',
    location: 'Kovalam Beach Resort, Kerala',
    message: 'Beachfront 3-day wedding with sangeet, cocktail, and muhurtham. Would like drone and same-day teaser.',
    status: 'New',
    dateReceived: '2026-10-21 08:20',
  },
];

const StudioContext = createContext();

export function StudioProvider({ children }) {
  // Initialize state from localStorage or fallback to defaults
  const [images, setImages] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_images`);
      return saved ? JSON.parse(saved) : defaultImages;
    } catch {
      return defaultImages;
    }
  });

  const [services, setServices] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_services`);
      return saved ? JSON.parse(saved) : defaultServices;
    } catch {
      return defaultServices;
    }
  });

  const [gallery, setGallery] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_gallery`);
      return saved ? JSON.parse(saved) : defaultGallery;
    } catch {
      return defaultGallery;
    }
  });

  const [packages, setPackages] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_packages`);
      return saved ? JSON.parse(saved) : defaultPackages;
    } catch {
      return defaultPackages;
    }
  });

  const [contactInfo, setContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_contactInfo`);
      return saved ? JSON.parse(saved) : defaultContactInfo;
    } catch {
      return defaultContactInfo;
    }
  });

  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_inquiries`);
      return saved ? JSON.parse(saved) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  // Current view mode: 'website' or 'admin'
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'website';
  });

  // Toast feedback notifications
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage((prev) => (prev?.id ? null : prev));
    }, 3800);
  };

  // Sync with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        // If not #admin, remain on website unless in admin view
        if (window.location.hash === '#website' || window.location.hash === '') {
          setCurrentView('website');
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_images`, JSON.stringify(images));
    } catch (e) {
      console.warn('LocalStorage save failed for images', e);
    }
  }, [images]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_services`, JSON.stringify(services));
    } catch (e) {
      console.warn('LocalStorage save failed for services', e);
    }
  }, [services]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_gallery`, JSON.stringify(gallery));
    } catch (e) {
      console.warn('LocalStorage save failed for gallery', e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_packages`, JSON.stringify(packages));
    } catch (e) {
      console.warn('LocalStorage save failed for packages', e);
    }
  }, [packages]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_contactInfo`, JSON.stringify(contactInfo));
    } catch (e) {
      console.warn('LocalStorage save failed for contactInfo', e);
    }
  }, [contactInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_inquiries`, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('LocalStorage save failed for inquiries', e);
    }
  }, [inquiries]);

  // Navigate view
  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.location.hash = '#admin';
    } else {
      window.location.hash = '#home';
    }
  };

  // ==========================================
  // Image Actions
  // ==========================================
  const addImage = (imageData) => {
    const newImg = {
      id: `img-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      ...imageData,
    };
    setImages((prev) => [newImg, ...prev]);
    showToast(`Added image "${newImg.title || 'Photo'}" to media library`);
    return newImg;
  };

  const deleteImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    showToast('Image removed from library', 'info');
  };

  // ==========================================
  // Service Actions
  // ==========================================
  const addService = (serviceData) => {
    const newService = {
      id: `srv-${Date.now()}`,
      slug: (serviceData.title || 'service').toLowerCase().replace(/\s+/g, '-'),
      createdAt: new Date().toISOString().split('T')[0],
      isFeatured: false,
      features: [],
      ...serviceData,
    };
    setServices((prev) => [newService, ...prev]);
    showToast(`Service "${newService.title}" created successfully!`);
    return newService;
  };

  const updateService = (id, updatedData) => {
    setServices((prev) =>
      prev.map((srv) => (srv.id === id ? { ...srv, ...updatedData } : srv))
    );
    showToast('Service details updated successfully!');
  };

  const deleteService = (id) => {
    setServices((prev) => prev.filter((srv) => srv.id !== id));
    showToast('Service removed', 'info');
  };

  // ==========================================
  // Gallery Actions
  // ==========================================
  const addGalleryItem = (galleryData) => {
    const newItem = {
      id: `gal-${Date.now()}`,
      year: new Date().getFullYear().toString(),
      isFeatured: true,
      ...galleryData,
    };
    setGallery((prev) => [newItem, ...prev]);
    showToast(`Added "${newItem.title}" to gallery showcase!`);
    return newItem;
  };

  const updateGalleryItem = (id, updatedData) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    showToast('Gallery item updated');
  };

  const deleteGalleryItem = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    showToast('Gallery item deleted', 'info');
  };

  // ==========================================
  // Package Actions
  // ==========================================
  const addPackage = (packageData) => {
    const newPkg = {
      id: `pkg-${Date.now()}`,
      isPopular: false,
      features: [],
      ...packageData,
    };
    setPackages((prev) => [...prev, newPkg]);
    showToast(`Package "${newPkg.name}" added to pricing menu!`);
    return newPkg;
  };

  const updatePackage = (id, updatedData) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg.id === id ? { ...pkg, ...updatedData } : pkg))
    );
    showToast('Package details updated!');
  };

  const deletePackage = (id) => {
    setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    showToast('Package deleted', 'info');
  };

  // ==========================================
  // Contact & Inquiries Actions
  // ==========================================
  const updateContactInfo = (newInfo) => {
    setContactInfo((prev) => ({ ...prev, ...newInfo }));
    showToast('Studio contact details saved successfully!');
  };

  const addInquiry = (inquiryData) => {
    const newInq = {
      id: `inq-${Date.now()}`,
      status: 'New',
      dateReceived: new Date().toLocaleString(),
      ...inquiryData,
    };
    setInquiries((prev) => [newInq, ...prev]);
    showToast('New client inquiry received & recorded in Admin!');
    return newInq;
  };

  const updateInquiryStatus = (id, status) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    showToast(`Inquiry status updated to "${status}"`);
  };

  const deleteInquiry = (id) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    showToast('Inquiry lead removed', 'info');
  };

  // Reset to sample defaults
  const resetToDefaults = () => {
    setImages(defaultImages);
    setServices(defaultServices);
    setGallery(defaultGallery);
    setPackages(defaultPackages);
    setContactInfo(defaultContactInfo);
    setInquiries(defaultInquiries);
    showToast('Restored all demo studio content to factory default', 'info');
  };

  const value = {
    // State
    images,
    services,
    gallery,
    packages,
    contactInfo,
    inquiries,
    currentView,
    toastMessage,
    // Navigation
    navigateTo,
    showToast,
    // Image operations
    addImage,
    deleteImage,
    // Service operations
    addService,
    updateService,
    deleteService,
    // Gallery operations
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    // Package operations
    addPackage,
    updatePackage,
    deletePackage,
    // Contact & Inquiries
    updateContactInfo,
    addInquiry,
    updateInquiryStatus,
    deleteInquiry,
    // Reset
    resetToDefaults,
  };

  return (
    <StudioContext.Provider value={value}>
      {children}
    </StudioContext.Provider>
  );
}

export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
}
