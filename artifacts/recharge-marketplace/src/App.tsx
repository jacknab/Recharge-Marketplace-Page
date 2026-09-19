import { type ReactNode, useMemo, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Bell, ChevronDown, ChevronLeft, ChevronRight, Gift, Heart, MapPin, MessageCircle, Search, ShoppingCart, Sparkles, Star, UserRound, X } from 'lucide-react';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('Aurora, CO');
  const [showLocations, setShowLocations] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [feedback, setFeedback] = useState('');

  const categories = [
    { name: 'Hair', key: 'All', icon: UserRound },
    { name: 'Nails', key: 'Nails', icon: Sparkles },
    { name: 'Skin', key: 'Skin', icon: Sparkles },
    { name: 'Barber', key: 'Barber', icon: UserRound },
    { name: 'Wellness', key: 'Wellness', icon: Heart },
  ];
  const deals = [
    { id: 'nails', name: 'Gel and Acrylic Nail Services', meta: 'Willow Park, Aurora', rating: '4.3', reviews: '101', price: '$27.20', was: '$34', save: '32%', image: '/clean/nails.jpg', position: 'center', categories: ['Nails'] },
    { id: 'massage', name: 'Full Body Massage at Denver School of Massage', meta: '7500 East Arapahoe Road, Centennial', rating: '4.7', reviews: '220', price: '$27.09', was: '$35', save: '26%', image: '/clean/massage.jpg', position: 'center', categories: ['Wellness'] },
    { id: 'facial', name: 'PDO Smooth Threads for Skin Rejuvenation', meta: '9695 South Yosemite Street, Lone Tree', rating: '5', reviews: '77', price: '$144', was: '$180', save: '40%', image: '/spa-hero.jpg', position: '75% 70%', categories: ['Skin'] },
    { id: 'salon', name: 'Spa A² at Westin Riverfront Resort And Residence', meta: '126 Riverfront Lane, Avon', rating: '4.8', reviews: '18', price: '$114', was: '$139', save: '18%', image: '/clean/salon.jpg', position: 'center', categories: ['Wellness'] },
    { id: 'nail-art', name: 'Signature Nail Art and Gel Manicure', meta: 'Five Points, Denver', rating: '4.6', reviews: '53', price: '$61', was: '$82', save: '25%', image: '/clean/cameras.jpg', position: 'center', categories: ['Nails'] },
  ];
  const giftDeals = [
    { id: 'gift-bowling', name: 'Classic Gel Manicure at Gloss Nail Studio', meta: 'East Colfax, Denver', rating: '4.8', reviews: '514', price: '$39', was: '$70', save: '-45%', image: '/clean/group.jpg', position: 'center' },
    { id: 'gift-resort', name: 'Signature Pedicure at The Polished Room', meta: 'Cherry Creek, Denver', rating: '4.6', reviews: '291', price: '$64', was: '$98', save: '-35%', image: '/clean/friends.jpg', position: 'center' },
    { id: 'gift-massage', name: 'Gel Extensions and Nail Art at Muse Nails', meta: 'West Westminster, Westminster', rating: '4.4', reviews: '188', price: '$86', was: '$140', save: '-40%', image: '/spa-hero.jpg', position: '75% 70%' },
    { id: 'gift-oil-change', name: 'Express Mani-Pedi at Juniper Nail Bar', meta: 'Northeast, Denver', rating: '4.4', reviews: '986', price: '$39.99', was: '$58', save: '-31%', image: '/clean/lavender.jpg', position: 'center' },
    { id: 'gift-spa', name: 'Spa Pedicure and Callus Care at Olive & Ivy', meta: 'Aurora, CO', rating: '4.7', reviews: '1,028', price: '$74', was: '$110', save: '-33%', image: '/clean/salon.jpg', position: 'center' },
  ];
  const featuredSalons = [
    { id: 'featured-gloss', brand: 'Gloss Nail Studio', name: 'A bright, modern nail bar for clean gel sets', meta: 'East Colfax, Denver', rating: '4.4', reviews: '268', image: '/clean/friends.jpg', position: 'center' },
    { id: 'featured-polished', brand: 'The Polished Room', name: 'Relaxed manicures and detailed pedicures', meta: 'Cherry Creek, Denver', rating: '4.4', reviews: '268', image: '/clean/massage.jpg', position: 'center' },
    { id: 'featured-muse', brand: 'Muse Nails', name: 'Custom nail art, extensions, and luxury care', meta: 'West Westminster, Westminster', rating: '4.4', reviews: '267', image: '/spa-hero.jpg', position: '70% 67%' },
    { id: 'featured-juniper', brand: 'Juniper Nail Bar', name: 'Quick, polished appointments for busy weeks', meta: 'Northeast, Denver', rating: '4.6', reviews: '1,204', image: '/clean/salon.jpg', position: 'center' },
    { id: 'featured-olive', brand: 'Olive & Ivy', name: 'Slow beauty rituals and spa pedicures', meta: 'Aurora, CO', rating: '4.7', reviews: '412', image: '/clean/nails.jpg', position: 'center' },
    { id: 'featured-blush', brand: 'Blush & Buff', name: 'Soft color palettes and careful natural nail care', meta: 'Capitol Hill, Denver', rating: '4.5', reviews: '386', image: '/clean/friends.jpg', position: 'center' },
    { id: 'featured-cinder', brand: 'Cinder Nail Co.', name: 'Modern nail art in a relaxed neighborhood studio', meta: 'Baker, Denver', rating: '4.8', reviews: '179', image: '/clean/massage.jpg', position: 'center' },
    { id: 'featured-lacquer', brand: 'Lacquer Lounge', name: 'Classic polish, gel finishes, and tidy details', meta: 'Lowry, Denver', rating: '4.3', reviews: '521', image: '/spa-hero.jpg', position: '70% 67%' },
    { id: 'featured-poppy', brand: 'Poppy Nail House', name: 'Color-forward manicures for every season', meta: 'South Broadway, Denver', rating: '4.6', reviews: '304', image: '/clean/salon.jpg', position: 'center' },
    { id: 'featured-sage', brand: 'Sage Beauty Bar', name: 'Quiet appointments and restorative pedicures', meta: 'Central Park, Denver', rating: '4.7', reviews: '447', image: '/clean/nails.jpg', position: 'center' },
    { id: 'featured-velvet', brand: 'Velvet Tips', name: 'Detailed nail art with a warm studio feel', meta: 'Five Points, Denver', rating: '4.5', reviews: '233', image: '/clean/friends.jpg', position: 'center' },
    { id: 'featured-citrine', brand: 'Citrine Studio', name: 'Clean gel sets and expressive custom designs', meta: 'Washington Park, Denver', rating: '4.6', reviews: '198', image: '/clean/massage.jpg', position: 'center' },
    { id: 'featured-rosewood', brand: 'Rosewood Nails', name: 'Polished essentials and gentle hand care', meta: 'Highlands, Denver', rating: '4.4', reviews: '615', image: '/spa-hero.jpg', position: '70% 67%' },
    { id: 'featured-ember', brand: 'Ember Nail Atelier', name: 'Artful extensions and long-lasting finishes', meta: 'RiNo, Denver', rating: '4.8', reviews: '156', image: '/clean/salon.jpg', position: 'center' },
    { id: 'featured-magnolia', brand: 'Magnolia Mani Co.', name: 'Fresh manicures in a calm, welcoming space', meta: 'Stapleton, Denver', rating: '4.5', reviews: '342', image: '/clean/nails.jpg', position: 'center' },
    { id: 'featured-copper', brand: 'Copper Moon Nails', name: 'Minimal nail art and glossy gel finishes', meta: 'Sloan’s Lake, Denver', rating: '4.7', reviews: '289', image: '/clean/friends.jpg', position: 'center' },
    { id: 'featured-honey', brand: 'Honeycomb Beauty', name: 'Playful colors and thoughtful nail care', meta: 'Aurora Highlands, Aurora', rating: '4.4', reviews: '274', image: '/clean/massage.jpg', position: 'center' },
    { id: 'featured-violet', brand: 'Violet Hour Nails', name: 'Rich color, fine details, and relaxing service', meta: 'Congress Park, Denver', rating: '4.6', reviews: '367', image: '/spa-hero.jpg', position: '70% 67%' },
    { id: 'featured-marlow', brand: 'Marlow Nail Room', name: 'Personalized sets from a small local team', meta: 'Westminster, CO', rating: '4.7', reviews: '221', image: '/clean/salon.jpg', position: 'center' },
    { id: 'featured-opal', brand: 'Opal Nail Studio', name: 'Bright, clean manicures and spa pedicures', meta: 'Cherry Creek North, Denver', rating: '4.5', reviews: '488', image: '/clean/nails.jpg', position: 'center' },
    { id: 'featured-park', brand: 'Parkside Polish', name: 'Easygoing appointments near the park', meta: 'City Park, Denver', rating: '4.3', reviews: '193', image: '/clean/friends.jpg', position: 'center' },
    { id: 'featured-luna', brand: 'Luna Nail Lab', name: 'Precise shaping and modern nail finishes', meta: 'Arvada, CO', rating: '4.8', reviews: '302', image: '/clean/massage.jpg', position: 'center' },
    { id: 'featured-satin', brand: 'Satin Nails', name: 'Elegant sets and unhurried self-care', meta: 'Belmar, Lakewood', rating: '4.6', reviews: '264', image: '/spa-hero.jpg', position: '70% 67%' },
    { id: 'featured-dahlia', brand: 'Dahlia Beauty Studio', name: 'Soft, polished looks for every occasion', meta: 'Boulder, CO', rating: '4.7', reviews: '351', image: '/clean/salon.jpg', position: 'center' },
    { id: 'featured-north', brand: 'Northside Nail Club', name: 'Neighborhood nail care with a creative edge', meta: 'Northglenn, CO', rating: '4.4', reviews: '187', image: '/clean/nails.jpg', position: 'center' },
  ];
  const dealRailRef = useRef<HTMLDivElement>(null);
  const giftRailRef = useRef<HTMLDivElement>(null);
  const featuredRailRef = useRef<HTMLDivElement>(null);
  const scrollDealRail = (direction: number) => dealRailRef.current?.scrollBy({ left: direction * 230, behavior: 'smooth' });
  const scrollGiftRail = (direction: number) => giftRailRef.current?.scrollBy({ left: direction * 230, behavior: 'smooth' });
  const filteredDeals = useMemo(() => deals.filter((deal) => {
    const matchesCategory = category === 'All' || deal.categories.includes(category);
    const haystack = `${deal.name} ${deal.meta} ${deal.categories.join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  }), [category, query]);
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const selectDeal = (name: string) => {
    setFeedback(`${name} selected`);
    window.setTimeout(() => setFeedback(''), 1800);
  };
  return (
    <div className="market-page">
      <main className="market-shell">
        <header>
          <div className="topbar">
            <div className="topbar-inner">
              <div className="brand-logo" aria-label="Certxa home">Certxa</div>
              <label className="search-box" data-testid="search-box">
                <input data-testid="input-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search beauty, wellness, and more" aria-label="Search deals" />
                {query ? <button className="search-button" data-testid="button-clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={12} /></button> : <span className="search-button" aria-hidden="true"><Search size={13} /></span>}
              </label>
              <div className="top-actions">
                <button className="icon-action" onClick={() => setFeedback('Your saved deals are waiting here')} aria-label="Saved deals"><Heart size={18} strokeWidth={1.6} /><span className="cart-count">{favorites.length}</span></button>
                <button className="icon-action" onClick={() => setFeedback('No new notifications')} aria-label="Notifications"><Bell size={18} strokeWidth={1.6} /></button>
                <button className="icon-action" data-testid="button-cart" onClick={() => setFeedback('Your cart is waiting here')} aria-label="Cart"><ShoppingCart size={19} strokeWidth={1.6} /><span className="cart-count cart-count-cart">{favorites.length || 1}</span></button>
               <button className="profile-button" onClick={() => setFeedback('Account menu')}>TB <ChevronDown size={13} /></button>
              </div>
            </div>
          </div>
          <nav className="category-bar no-scrollbar" aria-label="Deal categories">
            {categories.map(({ name, key, icon: Icon }) => <button key={name} className={`category-item ${category === key ? 'active' : ''}`} data-testid={`button-category-${name.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setCategory(key)}><Icon size={15} strokeWidth={1.4} />{name}</button>)}
          </nav>
        </header>
        <section className="hero" aria-label="Limited-time beauty deals">
          <img src="/spa-hero.jpg" alt="Relaxing facial treatment" />
           <div className="hero-copy"><div className="hero-title">Recharge your Glow</div><div className="hero-subtitle">Shop limited-time prices on facials, massage, nails, and more from trusted providers near you.</div></div>
        </section>
        <section className="deals-section">
          <div className="deals-top">
            <div>
              <h2 className="section-heading">Shop limited-time beauty deals</h2>
              <p className="section-support">Fresh local offers, ready to book today. Start with a deal, then find your new favorite salon below.</p>
            </div>
            <div className="location-wrap">
              <button className="location-button" data-testid="button-location" onClick={() => setShowLocations((value) => !value)}><MapPin size={8} fill="currentColor" /> <strong>{location}</strong> · <span>Change Location</span></button>
              {showLocations && <div className="location-menu" data-testid="menu-locations">{['Aurora, CO', 'Denver, CO', 'Boulder, CO'].map((place) => <button key={place} data-testid={`button-location-${place.split(',')[0].toLowerCase()}`} onClick={() => { setLocation(place); setShowLocations(false); }}>{place}</button>)}</div>}
            </div>
          </div>
          <div className="deal-rail-wrap">
            <button className="rail-arrow rail-arrow-left" onClick={() => scrollDealRail(-1)} aria-label="Previous trending deals"><ChevronLeft size={17} /></button>
            <div className="deal-rail no-scrollbar" ref={dealRailRef} data-testid="deal-rail">
               {filteredDeals.length ? filteredDeals.map((deal) => <article key={deal.id} className="deal-card" data-testid={`card-deal-${deal.id}`} onClick={() => selectDeal(deal.name)}>
                <div className="deal-image"><img src={deal.image} alt="" style={{ objectPosition: deal.position }} /><button className={`heart-button ${favorites.includes(deal.id) ? 'loved' : ''}`} data-testid={`button-favorite-${deal.id}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(deal.id); }} aria-label={`Favorite ${deal.name}`}><Heart size={11} fill={favorites.includes(deal.id) ? 'currentColor' : 'none'} /></button></div>
               <div className="deal-name">{deal.name}</div><div className="deal-meta">{deal.meta}</div><div className="deal-rating"><Star size={8} fill="currentColor" /> {deal.rating} ({deal.reviews})</div><div className="deal-price"><del>{deal.was}</del>{deal.price}</div>
            </article>) : <div className="empty-deals" data-testid="empty-deals">No deals match your search. Try a different category.</div>}
            </div>
            <button className="rail-arrow rail-arrow-right" onClick={() => scrollDealRail(1)} aria-label="Next trending deals"><ChevronRight size={17} /></button>
          </div>
          <div className="card-feedback" data-testid="status-feedback">{feedback}</div>
        </section>
        <section className="gift-section" aria-labelledby="trending-gifts-heading">
          <div className="gift-panel">
             <div className="gift-heading-row">
               <div>
                  <h2 id="trending-gifts-heading" className="gift-heading"><Gift size={16} strokeWidth={1.7} /> Trending gifts from nail salons</h2>
                  <p className="section-note">Giftable manicures, pedicures, and nail art from studios around {location}.</p>
               </div>
              <button className="gift-see-all" onClick={() => setFeedback('Showing all trending gifts')}>See all <ChevronRight size={15} /></button>
            </div>
            <div className="gift-rail-wrap">
              <button className="rail-arrow rail-arrow-left" onClick={() => scrollGiftRail(-1)} aria-label="Previous trending gifts"><ChevronLeft size={17} /></button>
              <div className="gift-rail no-scrollbar" ref={giftRailRef} data-testid="gift-rail">
              {giftDeals.map((deal) => <article key={deal.id} className="gift-card" data-testid={`card-gift-${deal.id}`} onClick={() => selectDeal(deal.name)}>
                 <div className="gift-image"><img src={deal.image} style={{ objectPosition: deal.position }} alt="" /><button className="gift-heart" onClick={(event) => { event.stopPropagation(); toggleFavorite(deal.id); }} aria-label={`Favorite ${deal.name}`}><Heart size={17} /></button></div>
                <div className="gift-name">{deal.name}</div>
                <div className="gift-meta">{deal.meta}</div>
                <div className="gift-location"><MapPin size={11} fill="currentColor" /> {deal.meta.split(',')[0]} <span>{deal.id === 'gift-oil-change' ? '3.2' : deal.id === 'gift-resort' ? '50.7' : '4.6'} mi away</span></div>
                <div className="gift-rating"><Star size={12} fill="currentColor" /> {deal.rating} <span>({deal.reviews})</span></div>
                <div className="gift-price"><del>{deal.was}</del> <strong>{deal.price}</strong> <span>{deal.save}</span></div>
              </article>)}
              </div>
              <button className="rail-arrow rail-arrow-right" onClick={() => scrollGiftRail(1)} aria-label="Next trending gifts"><ChevronRight size={17} /></button>
            </div>
          </div>
          <div className="card-feedback gift-feedback" data-testid="gift-feedback">{feedback}</div>
        </section>
         <section className="featured-section" aria-labelledby="featured-salons-heading">
          <div className="featured-panel">
             <div className="featured-heading-row">
                 <h2 id="featured-salons-heading" className="featured-heading"><MessageCircle size={16} strokeWidth={1.7} /> Featured nail salons</h2>
                <p className="section-note">Meet the nail studios your neighbors are booking now.</p>
            </div>
            <div className="featured-rail-wrap">
              <div className="featured-rail no-scrollbar" ref={featuredRailRef} data-testid="featured-rail">
                 {featuredSalons.map((salon) => <article key={salon.id} className="featured-card" data-testid={`card-featured-${salon.id}`} onClick={() => selectDeal(salon.name)}>
                    <div className="featured-image"><img src={salon.image} style={{ objectPosition: salon.position }} alt="" /><button className="featured-heart" onClick={(event) => { event.stopPropagation(); toggleFavorite(salon.id); }} aria-label={`Favorite ${salon.name}`}><Heart size={18} /></button></div>
                   <div className="featured-source">{salon.brand}</div>
                   <div className="featured-meta">{salon.meta}</div>
                   <div className="featured-rating"><Star size={12} fill="currentColor" /> {salon.rating} <span>({salon.reviews})</span><span className="featured-distance">13.3 mi away</span></div>
                </article>)}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
