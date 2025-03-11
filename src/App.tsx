import { useEffect, useState, useRef } from 'react';
import { Heart, Cake, Stars, Music, Gift, ChevronRight,  Menu, X, Clock, Bell, Volume2, VolumeX, Calculator, Camera, Coffee, Sparkles, MapPin } from 'lucide-react';

// Math Game Component
function MathGame() {
  const [equation, setEquation] = useState({ a: 0, b: 0, c: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showVoucher, setShowVoucher] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');

  // Generate new algebra problem
  const generateProblem = () => {
    // Generate coefficients and answer
    // We'll create equations in the form: ax + b = c
    // where x is what we're solving for
    const x = Math.floor(Math.random() * 10) + 1; // The actual answer we want
    const a = Math.floor(Math.random() * 5) + 1; // Coefficient of x
    const b = Math.floor(Math.random() * 20) - 10; // Random number to add/subtract
    const c = a * x + b; // Calculate the right side of equation

    setEquation({ a, b, c });
    setUserAnswer('');
    setMessage('');
  };

  // Initialize game
  useEffect(() => {
    generateProblem();
  }, []);

  // Generate voucher code
  const generateVoucherCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'GOFOOD';
    for(let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  // Format equation string
  const getEquationString = () => {
    const { a, b, c } = equation;
    const bSign = b >= 0 ? '+' : '-';
    const absB = Math.abs(b);
    return `${a}x ${bSign} ${absB} = ${c}`;
  };

  // Check answer
  const checkAnswer = () => {
    const { a, b, c } = equation;
    const correctAnswer = (c - b) / a;
    
    if (Math.abs(parseFloat(userAnswer) - correctAnswer) < 0.001) {
      const newVoucherCode = generateVoucherCode();
      setVoucherCode(newVoucherCode);
      setShowVoucher(true);
      setMessage('🎉 Selamat! Kamu benar! Ini hadiah voucher GoFood untukmu.');
    } else {
      setMessage('❌ Maaf, jawabanmu salah. Coba lagi!');
      generateProblem();
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '6285156161724'; // Ganti dengan nomor WA yang sesuai
    const message = `Halo, saya ingin menukarkan voucher GoFood dengan kode: ${voucherCode}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-md mx-auto bg-neutral-800 rounded-xl p-8 shadow-lg">
      {!showVoucher ? (
        <>
          <div className="text-3xl mb-8 text-center">
            Selesaikan persamaan:
            <div className="mt-4 font-mono">{getEquationString()}</div>
          </div>
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              step="0.1"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:border-rose-500 focus:outline-none"
              placeholder="Nilai x = ?"
            />
            <button
              onClick={checkAnswer}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Cek
            </button>
          </div>
          <div className="text-sm text-gray-400 text-center">
            Masukkan nilai x yang membuat persamaan menjadi benar
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="text-2xl font-bold mb-4 text-rose-500">
            🎉 Selamat! 🎉
          </div>
          <div className="bg-neutral-700 p-4 rounded-lg mb-6">
            <p className="text-lg mb-2">Kode Voucher GoFood:</p>
            <p className="text-2xl font-mono font-bold text-rose-500">{voucherCode}</p>
          </div>
          <button
            onClick={handleWhatsAppClick}
            className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors mb-4"
          >
            Tukar via WhatsApp
          </button>
          <button
            onClick={() => {
              setShowVoucher(false);
              generateProblem();
            }}
            className="w-full px-6 py-3 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Main Lagi
          </button>
        </div>
      )}
      {message && !showVoucher && (
        <div className="mt-4 text-center text-lg">{message}</div>
      )}
    </div>
  );
}

// Main App Component
function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const galleryImages = [
    {
      url: "./SnapInsta.to_476304972_18486970153058990_2745167561444704161_n.jpg",
      caption: "Top 3 waktu lo pake baju ini 😏"
    },
    {
      url: "./SnapInsta.to_476101100_18486970144058990_1874640697307737782_n.jpg",
      caption: "Kaya 'sumpah 'cakep banget'😉 "
    },
    {
      url: "./SnapInsta.to_476134949_18486970135058990_2042773977449006890_n.jpg",
      caption: "Difoto ini juga yang buat gue realize kalo lo cakep"
    },
    {
      url: "./473162047_1152689756285011_5035513448573006777_n.jpg",
      caption: "Of course! karena poninya"
    },
    {
      url: "./SnapInsta.to_322300622_523561136418222_7153053258090488930_n.jpg",
      caption: "Ini juga"
    },
    {
      url: "./SnapInsta.to_321912546_662176412354160_8386125347914396386_n.jpg",
      caption: "KARENAAAAA GINGSULNYA"
    }
  ];

  const medicationSchedule = [
    { time: "08:00", medicine: "Morning Medicine", note: "Take with breakfast" },
    { time: "13:00", medicine: "Afternoon Medicine", note: "Take after lunch" },
    { time: "20:00", medicine: "Evening Medicine", note: "Take before bed" }
  ];

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setShowMessage(true), 1000);
    
    audioRef.current = new Audio('./thecdi.ca - LANY - anything 4 u (Lyric Video) (256 KBps).mp3');
    audioRef.current.loop = true;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          alert("Please interact with the page first to enable music");
        });
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <audio ref={audioRef} src="./thecdi.ca - LANY - anything 4 u (Lyric Video) (256 KBps).mp3" loop />
      
      <button 
        onClick={toggleMusic} 
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors duration-300"
        aria-label={isMusicPlaying ? "Mute music" : "Play music"}
      >
        {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
     
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <div className="text-xl font-semibold logo-font bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              
            </div>
          </div>
         
          <div className="hidden md:flex gap-8">
            {['home', 'gallery', 'memories', 'game', 'message'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium capitalize ${
                  activeSection === section ? 'text-rose-500' : 'text-gray-400 hover:text-white'
                } transition-colors`}
              >
                {section}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mobile-menu bg-black/95 border-b border-white/10">
            <div className="px-6 py-4 space-y-4">
              {['home', 'gallery', 'memories', 'game', 'message'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${
                    activeSection === section 
                      ? 'bg-rose-500/20 text-rose-500' 
                      : 'text-gray-400 hover:bg-white/10 hover:text-white'
                  } transition-colors`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="relative h-screen overflow-hidden">
        <img
          src="./SnapInsta.to_441624796_745961217404789_7186868695890977408_n.jpg"
          alt="Birthday Flowers"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        
        <div className={`relative h-full flex flex-col items-center justify-center px-4 text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-6">
            Hi Cindy!
          </h1>
          <p className="text-xl md:text-3xl font-light text-gray-200 mb-8">
            Happy Belated Birthday! 🎂 
          </p>
        </div>
      </section>

      <div className={`transition-all duration-1000 delay-500 ${showMessage ? 'opacity-100' : 'opacity-0'}`}>
        <section className="py-32 px-6 bg-neutral-900">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-3xl md:text-4xl font-light leading-relaxed text-gray-200">
            
            <span className="text-rose-500"> Makasih udah nyapa dunia gue, </span> <br/>
            semoga nggak cuma numpang lewat.             
            </p>
          </div>
        </section>

        <section id="gallery" className="py-32 px-6 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">My favorites photo of u</h2>
            <p className="text-xl text-gray-400 mb-12">from 1 to 6</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    src={image.url}
                    alt={image.caption}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-lg font-medium">{image.caption}</span>
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="memories" className="py-32 px-6 bg-gradient-to-b from-neutral-900 to-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Sparkles className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Special Moments</h2>
              <p className="text-xl text-gray-400">Every moment with you becomes a beautiful memory ✨</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* First Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Camera className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">01 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">First Time We Met</h3>
                <p className="text-gray-400 mb-6">
                  That magical moment when our paths crossed for the first time. Your smile lit up the entire room.
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Coffee Shop</span>
                </div>
              </div>

              {/* Second Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Coffee className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">15 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Late Night Talks</h3>
                <p className="text-gray-400 mb-6">
                  Those endless conversations where we lost track of time, sharing stories and dreams.
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Favorite Cafe</span>
                </div>
              </div>

              {/* Third Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Music className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">20 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Favorite Song</h3>
                <p className="text-gray-400 mb-6">
                  The moment we discovered we both love the same music. Now it's our song.
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Music Festival</span>
                </div>
              </div>

              {/* Fourth Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Stars className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">25 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Stargazing Night</h3>
                <p className="text-gray-400 mb-6">
                  Under the stars, we shared our deepest secrets and brightest hopes for the future.
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Rooftop Garden</span>
                </div>
              </div>

              {/* Fifth Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Gift className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">30 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Surprise Gift</h3>
                <p className="text-gray-400 mb-6">
                  The joy in your eyes when you received that unexpected surprise. Priceless!
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Your Place</span>
                </div>
              </div>

              {/* Sixth Memory */}
              <div className="group relative bg-neutral-800 rounded-2xl p-8 hover:bg-neutral-700 transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-4 right-4">
                  <Cake className="w-6 h-6 text-rose-500" />
                </div>
                <div className="mb-6">
                  <span className="text-rose-500 text-sm font-medium">31 March 2024</span>
                </div>
                <h3 className="text-2xl font-bold mb-4">Birthday Celebration</h3>
                <p className="text-gray-400 mb-6">
                  Your special day filled with laughter, cake, and beautiful moments together.
                </p>
                <div className="flex items-center text-sm text-rose-400">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Birthday Venue</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="game" className="py-32 px-6 bg-neutral-900">
          <div className="max-w-4xl mx-auto text-center">
            <Calculator className="w-16 h-16 mx-auto mb-8 text-rose-500" />
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Algebra Challenge!</h2>
            <p className="text-xl text-gray-400 mb-12">
              Selesaikan soal aljabar dengan benar dan dapatkan voucher GoFood! 🎁<br/>
              Kamu bisa menukarkan voucher dengan menghubungi via WhatsApp
            </p>
            <MathGame />
          </div>
        </section>

        <section id="message" className="py-32 px-6 bg-black">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Daily Medication Schedule
              </h2>
              <p className="text-xl text-gray-400 mb-12">
                Because I care about your health, here's your daily reminder ❤️
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {medicationSchedule.map((schedule, index) => (
                <div key={index} className="bg-neutral-900 rounded-xl p-6 border border-rose-500/20 hover:border-rose-500/50 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <Clock className="w-6 h-6 text-rose-500" />
                    <span className="text-2xl font-bold text-rose-500">{schedule.time}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{schedule.medicine}</h3>
                  <p className="text-gray-400">{schedule.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-300 italic mb-8">
                "Your health is my priority. Remember to take your medicine on time, because I want to spend many more birthdays with you. 💕"
              </p>
              <button 
                className="px-12 py-4 bg-rose-500 text-white rounded-full text-lg font-semibold hover:bg-rose-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center mx-auto gap-2"
                onClick={() => alert('Reminder set! I will always be here to remind you. ❤️')}
              >
                <Bell className="w-5 h-5" />
                Set Reminder
              </button>
            </div>
          </div>
        </section>
      </div>
 
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Gallery Image"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default App;