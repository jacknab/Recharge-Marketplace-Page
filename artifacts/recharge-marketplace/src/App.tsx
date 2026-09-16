import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Bell, ChevronRight, Gift, Heart, MapPin, Search, ShoppingCart, Sparkles, Star, Tag, Ticket, UserRound, Utensils, Wrench, X } from 'lucide-react';
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
    { id: 'camera', name: 'Sale on Vintage Cameras and Film', meta: 'Five Points, Denver', rating: '4.6', reviews: '53', price: '$61', was: '$82', save: '25%', image: '/clean/cameras.jpg', position: 'center', categories: ['Hair'] },
  ];
  const giftDeals = [
    { id: 'gift-bowling', name: 'Bowling (Shoes included) for Easy Fun with Friends at Lucky Strike', meta: 'East, DENVER', rating: '4.8', reviews: '5,140', price: '$39', was: '$70.49', save: '-45%', cashback: '5% Cashback', image: '/clean/group.jpg', position: 'center' },
    { id: 'gift-resort', name: 'Great Wolf Lodge Colorado Springs Water Park Resort', meta: 'Colorado Springs, CO', rating: '4.6', reviews: '2,913', price: '$128.84/night', was: '$198.20', save: '-35%', cashback: '5% Cashback', image: '/clean/friends.jpg', position: 'center' },
    { id: 'gift-massage', name: 'Couples 50-Minutes Therapy Deep Tissue or Swedish Body Massage', meta: 'West Westminster, Westminster', rating: '4.4', reviews: '188', price: '$160.29', was: '$296', save: '-40%', cashback: 'Popular Gift', image: '/spa-hero.jpg', position: '75% 70%' },
    { id: 'gift-oil-change', name: 'Up to 31% Off Jiffy Lube: 15-Minute Drive-Thru Oil Change', meta: 'Northeast, Denver', rating: '4.4', reviews: '9,864', price: '$39.99', was: '$57.99', save: '-31%', cashback: '5% Cashback', image: '/clean/lavender.jpg', position: 'center' },
    { id: 'gift-spa', name: 'Relax and recharge with a spa day made for gifting', meta: 'Aurora, CO', rating: '4.7', reviews: '1,028', price: '$74', was: '$110', save: '-33%', cashback: 'Popular Gift', image: '/clean/salon.jpg', position: 'center' },
  ];
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
              <div className="brand-logo" aria-label="Certxa home">CERTXA</div>
              <label className="search-box" data-testid="search-box">
                <input data-testid="input-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Spa" aria-label="Search deals" />
                {query ? <button className="search-button" data-testid="button-clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={12} /></button> : <span className="search-button" aria-hidden="true"><Search size={13} /></span>}
              </label>
              <div className="top-actions">
                <button className="icon-action" onClick={() => setFeedback('Your saved deals are waiting here')} aria-label="Saved deals"><Heart size={18} strokeWidth={1.6} /><span className="cart-count">{favorites.length}</span></button>
                <button className="icon-action" onClick={() => setFeedback('No new notifications')} aria-label="Notifications"><Bell size={18} strokeWidth={1.6} /></button>
                <button className="icon-action" data-testid="button-cart" onClick={() => setFeedback('Your cart is waiting here')} aria-label="Cart"><ShoppingCart size={19} strokeWidth={1.6} /><span className="cart-count cart-count-cart">{favorites.length || 1}</span></button>
                <button className="profile-button" onClick={() => setFeedback('Account menu')}>TB <span>⌄</span></button>
              </div>
            </div>
          </div>
          <nav className="category-bar no-scrollbar" aria-label="Deal categories">
            {categories.map(({ name, key, icon: Icon }) => <button key={name} className={`category-item ${category === key ? 'active' : ''}`} data-testid={`button-category-${name.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setCategory(key)}><Icon size={15} strokeWidth={1.4} />{name}</button>)}
          </nav>
        </header>
        <section className="hero" aria-label="Promotion">
          <img src="/reference/hero.jpg" alt="Relaxing facial treatment" />
          <div className="hero-copy"><div className="hero-title">Recharge your Glow</div><div className="hero-subtitle">Extra savings on facial care — this week only!</div></div>
          <div className="hero-code">USE CODE: <span>RELAX</span></div>
        </section>
        <section className="deals-section">
          <div className="deals-top">
            <h2 className="section-heading">Trending Deals</h2>
            <div className="location-wrap">
              <button className="location-button" data-testid="button-location" onClick={() => setShowLocations((value) => !value)}><MapPin size={8} fill="currentColor" /> <strong>{location}</strong> · <span>Change Location</span></button>
              {showLocations && <div className="location-menu" data-testid="menu-locations">{['Aurora, CO', 'Denver, CO', 'Boulder, CO'].map((place) => <button key={place} data-testid={`button-location-${place.split(',')[0].toLowerCase()}`} onClick={() => { setLocation(place); setShowLocations(false); }}>{place}</button>)}</div>}
            </div>
          </div>
          <div className="deal-rail no-scrollbar" data-testid="deal-rail">
              {filteredDeals.length ? filteredDeals.map((deal) => <article key={deal.id} className="deal-card" data-testid={`card-deal-${deal.id}`} onClick={() => selectDeal(deal.name)}>
              <div className="deal-image"><img src={deal.image} alt="" style={{ objectPosition: deal.position }} /><span className="deal-badge">▣ Popular Gift</span><button className={`heart-button ${favorites.includes(deal.id) ? 'loved' : ''}`} data-testid={`button-favorite-${deal.id}`} onClick={(event) => { event.stopPropagation(); toggleFavorite(deal.id); }} aria-label={`Favorite ${deal.name}`}><Heart size={11} fill={favorites.includes(deal.id) ? 'currentColor' : 'none'} /></button></div>
               <div className="deal-name">{deal.name}</div><div className="deal-meta">{deal.meta}</div><div className="deal-rating"><Star size={8} fill="currentColor" /> {deal.rating} ({deal.reviews})</div><div className="deal-price"><del>{deal.was}</del>{deal.price}</div>
            </article>) : <div className="empty-deals" data-testid="empty-deals">No deals match your search. Try a different category.</div>}
          </div>
          <div className="card-feedback" data-testid="status-feedback">{feedback}</div>
        </section>
        <section className="editorial" aria-label="Explore experiences">
          <div className="mosaic">
            <article className="mosaic-card" data-testid="card-editorial-recharge" onClick={() => selectDeal('Recharge This Fall')}><img src="/spa-hero.jpg" alt="Woman enjoying a spa treatment" /><div className="mosaic-label">Recharge This Fall<small>Massage, facials, spas & fitness up to 80% off</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-summer" onClick={() => selectDeal('Summerween starts now')}><img src="/clean/lavender.jpg" alt="Summer experience" /><div className="mosaic-label">Summerween starts now<small>Save on spooky fun before Halloween prices rise</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-office" onClick={() => selectDeal('Save on Office 2024')}><img src="/clean/salon.jpg" alt="Bright home office" /><div className="mosaic-label">Save on Office 2024<small>Get a Lifetime License for Less</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-getaway" onClick={() => selectDeal('Your Turn to Get Away')}><img src="/clean/friends.jpg" alt="Friends enjoying a getaway" /><div className="mosaic-label">Your Turn to Get Away</div></article>
            <article className="mosaic-card" data-testid="card-editorial-memories" onClick={() => selectDeal('Preserve Memories')}><img src="/clean/cameras.jpg" alt="Vintage cameras" /><div className="mosaic-label">Preserve Memories</div></article>
            <article className="mosaic-card" data-testid="card-editorial-final" onClick={() => selectDeal('Explore More')}><img src="/clean/group.jpg" alt="Explore more deals" /></article>
          </div>
        </section>
        <section className="gift-section" aria-labelledby="trending-gifts-heading">
          <div className="gift-panel">
            <div className="gift-heading-row">
              <h2 id="trending-gifts-heading" className="gift-heading"><Gift size={16} strokeWidth={1.7} /> Trending gifts</h2>
              <button className="gift-see-all" onClick={() => setFeedback('Showing all trending gifts')}>See all <ChevronRight size={15} /></button>
            </div>
            <div className="gift-rail no-scrollbar" data-testid="gift-rail">
              {giftDeals.map((deal) => <article key={deal.id} className="gift-card" data-testid={`card-gift-${deal.id}`} onClick={() => selectDeal(deal.name)}>
                <div className="gift-image"><img src={deal.image} style={{ objectPosition: deal.position }} alt="" /><span className={`gift-badge ${deal.cashback === 'Popular Gift' ? 'popular' : ''}`}>{deal.cashback}</span><button className="gift-heart" onClick={(event) => { event.stopPropagation(); toggleFavorite(deal.id); }} aria-label={`Favorite ${deal.name}`}><Heart size={17} /></button></div>
                <div className="gift-name">{deal.name}</div>
                <div className="gift-meta">{deal.meta}</div>
                <div className="gift-location"><MapPin size={11} fill="currentColor" /> {deal.meta.split(',')[0]} <span>◆ {deal.id === 'gift-oil-change' ? '3.2' : deal.id === 'gift-resort' ? '50.7' : '4.6'} mi</span></div>
                <div className="gift-rating"><Star size={12} fill="currentColor" /> {deal.rating} <span>({deal.reviews})</span></div>
                <div className="gift-price"><del>{deal.was}</del> <strong>{deal.price}</strong> <span>{deal.save}</span></div>
              </article>)}
            </div>
          </div>
          <div className="card-feedback gift-feedback" data-testid="gift-feedback">{feedback}</div>
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
