import { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Navigation Component
function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#auftrag', label: 'Auftrag' },
    { href: '#prozess', label: 'Prozess' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#kontakt', label: 'Kontakt' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-gray-100' 
          : 'bg-white'
      }`}
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="flex items-center justify-between h-20">
          <a 
            href="#" 
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="font-medium text-base tracking-tight text-anthracite">
              NEXLOL
            </span>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">
              Unternehmensberatung
            </span>
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm text-gray-600 hover:text-anthracite transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:block">
            <span className="text-xs text-gray-400 tracking-wide">
              Kaufmann für Versicherungen und Finanzen IHK
            </span>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-anthracite" />
            ) : (
              <Menu className="w-5 h-5 text-anthracite" />
            )}
          </button>
        </div>
      </div>

      <div 
        className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="px-8 py-8 space-y-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left text-base text-anthracite hover:text-gray-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-400">
              Kaufmann für Versicherungen und Finanzen IHK
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center bg-white pt-20">
      <div className="w-full px-8 lg:px-16 xl:px-24 py-24">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-anthracite leading-snug tracking-tight mb-8">
            Projektsteuerung & Beratung.<br />
            Präzision im Schadensfall.
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl leading-relaxed mb-12">
            Strukturierte Planung und neutrale Koordination von Versicherungsschäden. 
            Fachliche Expertise für effiziente Prozesse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => scrollToSection('#kontakt')}
              variant="outline"
              className="border-anthracite text-anthracite hover:bg-anthracite hover:text-white px-6 py-3 text-sm font-normal transition-colors rounded-none"
            >
              Beratung anfordern
            </Button>
            <Button 
              onClick={() => scrollToSection('#expertise')}
              variant="ghost"
              className="text-gray-600 hover:text-anthracite px-6 py-3 text-sm font-normal transition-colors"
            >
              Leistungsportfolio
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mission Section
function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="auftrag" 
      ref={sectionRef}
      className="py-32 bg-white border-t border-gray-100"
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-sm text-gray-400 mb-4 block">01 / Auftrag</span>
              <h2 className="text-2xl lg:text-3xl font-medium text-anthracite leading-snug">
                Wir transformieren komplexe Schadenslagen in geordnete Abläufe.
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className={`space-y-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                Unser Fokus liegt auf technischer Exzellenz und objektiver Bewertung. 
                Als neutrale Schnittstelle zwischen Versicherer und Geschädigtem 
                gewährleisten wir transparente Prozesse und lückenlose Dokumentation.
              </p>

              <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wide">Präzise Analyse</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Detaillierte Bestandsaufnahme und objektive Bewertung aller schadenrelevanten Faktoren.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wide">Effiziente Steuerung</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Strukturierte Projektkoordination mit definierten Meilensteinen.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wide">Neutrale Schnittstelle</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Unabhängige Vermittlung für faire und nachvollziehbare Lösungen.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wide">Kostentransparenz</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Transparente Kostenkontrolle und Optimierung der Schadensregulierung.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Inhaber: <span className="text-anthracite">Miko Harrmann</span>, Kaufmann für Versicherungen und Finanzen IHK
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Process Section
function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Analyse',
      description: 'Umfassende Schadensaufnahme vor Ort. Erfassung aller relevanten Details. Erstellung einer fundierten Bestandsaufnahme.'
    },
    {
      number: '02',
      title: 'Planung',
      description: 'Entwicklung eines Sanierungskonzepts. Detaillierter Zeitplan und Budgetplanung. Ressourcenallokation.'
    },
    {
      number: '03',
      title: 'Steuerung',
      description: 'Koordination aller Beteiligten. Kontinuierliches Monitoring. Projektmanagement bis zur Fertigstellung.'
    },
    {
      number: '04',
      title: 'Abschluss',
      description: 'Qualitätskontrolle und Dokumentation. Übergabe nach Erfüllung aller Anforderungen.'
    }
  ];

  return (
    <section 
      id="prozess" 
      ref={sectionRef}
      className="py-32 bg-gray-50"
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm text-gray-400 mb-4 block">02 / Prozess</span>
          <h2 className="text-2xl lg:text-3xl font-medium text-anthracite">
            Der Sanierungsprozess
          </h2>
        </div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`group border-t border-gray-200 py-10 transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-2">
                  <span className="text-3xl font-light text-gray-300">{step.number}</span>
                </div>
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-medium text-anthracite">{step.title}</h3>
                </div>
                <div className="lg:col-span-7">
                  <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Expertise Section
function ExpertiseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const expertise = [
    {
      title: 'Schadenanalyse',
      description: 'Präzise Bewertung und Dokumentation von Versicherungsschäden. Vor-Ort-Begutachtung, Kostenschätzung und Gutachtenerstellung.',
      details: ['Vor-Ort-Begutachtung', 'Kostenschätzung', 'Dokumentation', 'Gutachtenerstellung']
    },
    {
      title: 'Projektsteuerung',
      description: 'Koordination und Überwachung von Sanierungsprojekten. Zeitmanagement, Qualitätskontrolle und lückenloses Reporting.',
      details: ['Zeitmanagement', 'Koordination', 'Qualitätskontrolle', 'Reporting']
    },
    {
      title: 'Kostenmanagement',
      description: 'Transparente Kostenkontrolle und Optimierung. Analyse aller Kostenfaktoren, Budgetplanung und Abrechnung.',
      details: ['Kostenanalyse', 'Budgetplanung', 'Abrechnung', 'Transparenz']
    },
    {
      title: 'Dokumentation',
      description: 'Lückenlose Dokumentation für die Schadensabwicklung. Fotodokumentation, Berichtswesen und Aktenverwaltung.',
      details: ['Fotodokumentation', 'Berichtswesen', 'Aktenverwaltung', 'Archivierung']
    }
  ];

  return (
    <section 
      id="expertise" 
      ref={sectionRef}
      className="py-32 bg-white border-t border-gray-100"
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className={`mb-20 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-sm text-gray-400 mb-4 block">03 / Expertise</span>
          <h2 className="text-2xl lg:text-3xl font-medium text-anthracite mb-4">
            Leistungsportfolio
          </h2>
          <p className="text-gray-600 max-w-xl">
            Vier Säulen der fachlichen Kompetenz.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-gray-200">
          {expertise.map((item, index) => (
            <div 
              key={item.title}
              className={`bg-white p-10 cursor-pointer hover:bg-gray-50 transition-colors ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
              onClick={() => setSelectedCard(index)}
            >
              <h3 className="text-lg font-medium text-anthracite mb-4">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">{item.description}</p>
              <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-anthracite transition-colors">
                Details
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={selectedCard !== null} onOpenChange={() => setSelectedCard(null)}>
        <DialogContent className="max-w-lg rounded-none">
          {selectedCard !== null && (
            <>
              <DialogHeader>
                <DialogTitle className="text-lg font-medium text-anthracite mb-4">
                  {expertise[selectedCard].title}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-600 leading-relaxed">
                  {expertise[selectedCard].description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-4">Leistungsumfang</h4>
                <div className="grid grid-cols-2 gap-3">
                  {expertise[selectedCard].details.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="kontakt" 
      ref={sectionRef}
      className="py-32 bg-gray-50 border-t border-gray-100"
    >
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-sm text-gray-400 mb-4 block">04 / Kontakt</span>
              <h2 className="text-2xl lg:text-3xl font-medium text-anthracite mb-6">
                Erstberatung
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Kontaktieren Sie uns für eine unverbindliche Erstberatung. 
                Wir analysieren Ihren Fall und entwickeln eine maßgeschneiderte Lösung.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className={`grid sm:grid-cols-2 gap-8 transition-all duration-700 delay-150 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-8 bg-white border border-gray-100">
                <Mail className="w-5 h-5 text-gray-400 mb-4" />
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">E-Mail</h3>
                <a 
                  href="mailto:projekt@nexlol.de"
                  className="text-anthracite hover:text-gray-600 transition-colors"
                >
                  projekt@nexlol.de
                </a>
              </div>

              <div className="p-8 bg-white border border-gray-100">
                <Phone className="w-5 h-5 text-gray-400 mb-4" />
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">Telefon</h3>
                <a 
                  href="tel:+496181123456"
                  className="text-anthracite hover:text-gray-600 transition-colors"
                >
                  +49 (0) 6181 123456
                </a>
              </div>

              <div className="p-8 bg-white border border-gray-100 sm:col-span-2">
                <MapPin className="w-5 h-5 text-gray-400 mb-4" />
                <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">Anschrift</h3>
                <p className="text-anthracite">
                  NEXLOL Unternehmensberatung & Projektsteuerung<br />
                  Hahnenkammstr. 25<br />
                  63450 Hanau
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-16 bg-white border-t border-gray-100">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-medium text-base text-anthracite">NEXLOL</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">Unternehmensberatung</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              Professionelle Projektsteuerung und Beratung bei Versicherungsschäden. 
              Strukturierte Prozesse und lückenlose Dokumentation.
            </p>
          </div>

          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { href: '#auftrag', label: 'Auftrag' },
                { href: '#prozess', label: 'Prozess' },
                { href: '#expertise', label: 'Expertise' },
                { href: '#kontakt', label: 'Kontakt' }
              ].map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-anthracite transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs text-gray-400 uppercase tracking-wide mb-4">Rechtliches</h4>
            <p className="text-sm text-gray-600 leading-relaxed">
              Inhaber: Miko Harrmann<br />
              Kaufmann für Versicherungen und Finanzen IHK
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Nexlol Unternehmensberatung & Projektsteuerung
          </p>
          <p className="text-xs text-gray-400">
            www.nexlol.de
          </p>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <HeroSection />
        <MissionSection />
        <ProcessSection />
        <ExpertiseSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
