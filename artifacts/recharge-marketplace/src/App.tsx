import { type ReactNode, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Bell, Gift, Heart, MapPin, Search, ShoppingCart, Sparkles, Star, Tag, Ticket, UserRound, Utensils, Wrench, X } from 'lucide-react';
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
    { name: 'Fall Recharge', key: 'All', icon: Sparkles },
    { name: 'Beauty & Spas', key: 'Beauty & Spas', icon: Sparkles },
    { name: 'Things To Do', key: 'Things To Do', icon: Ticket },
    { name: 'Auto & Home', key: 'Auto & Home', icon: Wrench },
    { name: 'Food & Drink', key: 'Food & Drink', icon: Utensils },
    { name: 'Gifts', key: 'Gifts', icon: Gift },
    { name: 'Local', key: 'Local', icon: UserRound },
    { name: 'Travel', key: 'Travel', icon: MapPin },
    { name: 'Goods', key: 'Goods', icon: Tag },
  ];
  const deals = [
    { id: 'nails', name: 'Gel and Acrylic Nail Services', meta: 'Willow Park, Aurora', rating: '4.3', reviews: '101', price: '$27.20', was: '$34', save: '32%', image: '/reference/deal-1.jpg', position: 'center', categories: ['Beauty & Spas'] },
    { id: 'massage', name: 'Full Body Massage at Denver School of Massage', meta: '7500 East Arapahoe Road, Centennial', rating: '4.7', reviews: '220', price: '$27.09', was: '$35', save: '26%', image: '/reference/deal-2.jpg', position: 'center', categories: ['Beauty & Spas'] },
    { id: 'facial', name: 'PDO Smooth Threads for Skin Rejuvenation', meta: '9695 South Yosemite Street, Lone Tree', rating: '5', reviews: '77', price: '$144', was: '$180', save: '40%', image: '/reference/deal-3.jpg', position: 'center', categories: ['Beauty & Spas'] },
    { id: 'salon', name: 'Spa A² at Westin Riverfront Resort And Residence', meta: '126 Riverfront Lane, Avon', rating: '4.8', reviews: '18', price: '$114', was: '$139', save: '18%', image: '/reference/deal-4.jpg', position: 'center', categories: ['Beauty & Spas', 'Travel'] },
    { id: 'camera', name: 'Sale on Vintage Cameras and Film', meta: 'Five Points, Denver', rating: '4.6', reviews: '53', price: '$61', was: '$82', save: '25%', image: '/reference/editorial-6.jpg', position: 'center', categories: ['Goods', 'Gifts'] },
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
              <div className="brand-logo" aria-label="Groupon home">GROUPON</div>
              <label className="search-box" data-testid="search-box">
                <input data-testid="input-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Spa" aria-label="Search deals" />
                {query ? <button className="search-button" data-testid="button-clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={12} /></button> : <span className="search-button" aria-hidden="true"><Search size={13} /></span>}
              </label>
              <div className="top-actions">
                <button className="utility-link" onClick={() => setFeedback('Groupon App')}><span className="utility-phone">▣</span> App</button>
                <button className="utility-link" onClick={() => setFeedback('Sell on Groupon')}>▣&nbsp; Sell on Groupon</button>
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
              <div className="deal-name">{deal.name}</div><div className="deal-meta">{deal.meta}</div><div className="deal-rating"><Star size={8} fill="currentColor" /> {deal.rating} ({deal.reviews})</div><div className="deal-price"><del>{deal.was}</del>{deal.price}<span className="deal-save">with code RELAX</span></div>
            </article>) : <div className="empty-deals" data-testid="empty-deals">No deals match your search. Try a different category.</div>}
          </div>
          <div className="card-feedback" data-testid="status-feedback">{feedback}</div>
        </section>
        <section className="editorial" aria-label="Explore experiences">
          <div className="mosaic">
            <article className="mosaic-card" data-testid="card-editorial-recharge" onClick={() => selectDeal('Recharge This Fall')}><img src="/reference/editorial-1.jpg" alt="Woman enjoying a spa treatment" /><div className="mosaic-label">Recharge This Fall<small>Massage, facials, spas & fitness up to 80% off</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-summer" onClick={() => selectDeal('Summerween starts now')}><img src="/reference/editorial-2.jpg" alt="Summer experience" /><div className="mosaic-label">Summerween starts now<small>Save on spooky fun before Halloween prices rise</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-office" onClick={() => selectDeal('Save on Office 2024')}><img src="/reference/editorial-3.jpg" alt="Bright home office" /><div className="mosaic-label">Save on Office 2024<small>Get a Lifetime License for Less</small></div></article>
            <article className="mosaic-card" data-testid="card-editorial-getaway" onClick={() => selectDeal('Your Turn to Get Away')}><img src="/reference/editorial-4.jpg" alt="Friends enjoying a getaway" /><div className="mosaic-label">Your Turn to Get Away</div></article>
            <article className="mosaic-card" data-testid="card-editorial-memories" onClick={() => selectDeal('Preserve Memories')}><img src="/reference/editorial-5.jpg" alt="Vintage cameras" /><div className="mosaic-label">Preserve Memories</div></article>
            <article className="mosaic-card" data-testid="card-editorial-final" onClick={() => selectDeal('Explore More')}><img src="/reference/editorial-6.jpg" alt="Explore more deals" /></article>
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
