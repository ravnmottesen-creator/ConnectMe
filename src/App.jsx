import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Users, Calendar, User, Search, X, Menu, Moon, Sun, MapPin, Check } from 'lucide-react';

// NavBar ligger nå utenfor for å unngå re-render feil
const NavBar = ({ darkMode, setDarkMode, menuOpen, setMenuOpen, currentScreen, setCurrentScreen }) => (
  <nav className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b fixed top-0 left-0 right-0 z-50`}>
    <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
        ConnectMe
      </h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-purple-100 text-purple-600'}`}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-purple-100'}`}
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </div>
    {menuOpen && (
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="max-w-6xl mx-auto grid grid-cols-5 gap-2">
          {[
            { screen: 'home', icon: Heart, label: 'Hjem' },
            { screen: 'groups', icon: Users, label: 'Grupper' },
            { screen: 'events', icon: Calendar, label: 'Events' },
            { screen: 'messages', icon: MessageCircle, label: 'Chat' },
            { screen: 'profile', icon: User, label: 'Profil' }
          ].map(item => (
            <button
              key={item.screen}
              onClick={() => {
                setCurrentScreen(item.screen);
                setMenuOpen(false);
              }}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg ${
                currentScreen === item.screen
                  ? darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-600'
                  : darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    )}
  </nav>
);

const ConnectMeApp = () => {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSearch, setLocationSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  
  const [userProfile, setUserProfile] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    interests: [],
    email: ''
  });

  const allInterests = [
    { name: 'Fortnite', category: 'Gaming', icon: '🎮' },
    { name: 'Valorant', category: 'Gaming', icon: '🎯' },
    { name: 'Apex Legends', category: 'Gaming', icon: '🔫' },
    { name: 'Call of Duty', category: 'Gaming', icon: '💥' },
    { name: 'Minecraft', category: 'Gaming', icon: '⛏️' },
    { name: 'Roblox', category: 'Gaming', icon: '🎲' },
    { name: 'FIFA', category: 'Gaming', icon: '⚽' },
    { name: 'League of Legends', category: 'Gaming', icon: '🏆' },
    { name: 'Fotball', category: 'Sport', icon: '⚽' },
    { name: 'Håndball', category: 'Sport', icon: '🤾' },
    { name: 'Basketball', category: 'Sport', icon: '🏀' },
    { name: 'Dans', category: 'Sport', icon: '💃' },
    { name: 'Svømming', category: 'Sport', icon: '🏊' },
    { name: 'Tegning', category: 'Kreativt', icon: '🎨' },
    { name: 'Musikk', category: 'Kreativt', icon: '🎵' },
    { name: 'Foto', category: 'Kreativt', icon: '📸' },
    { name: 'Skriving', category: 'Kreativt', icon: '✍️' },
    { name: 'Lesing', category: 'Annet', icon: '📚' },
    { name: 'Programmering', category: 'Annet', icon: '💻' },
    { name: 'Film/Serier', category: 'Annet', icon: '🎬' },
    { name: 'Dyr/Natur', category: 'Annet', icon: '🌿' }
  ];

  const norwegianLocations = [
    'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand', 'Drammen', 
    'Fredrikstad', 'Sandnes', 'Tromsø', 'Sarpsborg', 'Skien', 'Ålesund',
    'Sandefjord', 'Haugesund', 'Tønsberg', 'Moss', 'Bodø', 'Arendal',
    'Hamar', 'Larvik', 'Halden', 'Askøy', 'Kongsberg', 'Molde',
    'Harstad', 'Horten', 'Gjøvik', 'Lillehammer', 'Mo i Rana', 'Kristiansund',
    'Elverum', 'Flisa', 'Kongsvinger', 'Skånes-området', 'Lørenskog', 
    'Ski', 'Grimstad', 'Mandal', 'Egersund', 'Mosjøen',
    'Narvik', 'Hammerfest', 'Alta', 'Sortland', 'Levanger', 'Steinkjer',
    'Namsos', 'Bryne', 'Jessheim', 'Lillestrøm', 'Sandvika', 'Asker'
  ].sort();

  const mockUsers = [
    { id: 1, name: 'Emma', age: 16, location: 'Flisa', interests: ['Fortnite', 'Minecraft', 'Fotball', 'Musikk'], bio: 'Elsker gaming og fotball! 🎮⚽', commonInterests: 3, image: '👧' },
    { id: 2, name: 'Lucas', age: 15, location: 'Flisa', interests: ['Valorant', 'Programmering', 'Fotball'], bio: 'Coder på fritiden, gamer på kvelden 💻', commonInterests: 2, image: '👦' },
    { id: 3, name: 'Sofia', age: 17, location: 'Kristiansand', interests: ['Minecraft', 'Tegning', 'Dyr/Natur'], bio: 'Kreativ sjel som elsker dyr og natur 🎨🌿', commonInterests: 2, image: '👧' },
    { id: 4, name: 'Noah', age: 16, location: 'Kristiansand', interests: ['FIFA', 'Basketball', 'Fotball'], bio: 'Sport er livet! ⚽🏀', commonInterests: 3, image: '👦' },
    { id: 5, name: 'Mia', age: 14, location: 'Kongsvinger', interests: ['Roblox', 'Dans', 'Musikk'], bio: 'Danser og spiller! Lets vibe 💃🎵', commonInterests: 2, image: '👧' },
    { id: 6, name: 'Oliver', age: 15, location: 'Oslo', interests: ['Fortnite', 'Foto', 'Film/Serier'], bio: 'Kreativ gamer som elsker film 🎬🎮', commonInterests: 2, image: '👦' },
  ];

  useEffect(() => {
    if (currentScreen === 'home' && userProfile.interests.length >= 2) {
      const filteredMatches = mockUsers.filter(user => {
        const common = user.interests.filter(i => userProfile.interests.includes(i)).length;
        const matchesLocation = userProfile.location === user.location;
        return common >= 2 && matchesLocation;
      });
      setMatches(filteredMatches);
    }
  }, [currentScreen, userProfile]);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const sendFriendRequest = (user) => {
    setFriendRequests([...friendRequests, { ...user, status: 'pending' }]);
    alert("Venneforespørsel sendt til " + user.name + "! 🎉");
    setSelectedUser(null);
  };

  const filteredLocations = norwegianLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className={darkMode ? 'dark' : ''}>
      {currentScreen === 'onboarding' ? (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'} flex items-center justify-center p-4`}>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 max-w-md w-full`}>
            <div className="mb-6">
              <h1 className={`text-3xl font-bold text-center mb-2 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                ConnectMe
              </h1>
              <div className="flex justify-between mb-2 mt-4">
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className={`h-2 flex-1 mx-1 rounded-full ${
                      step <= onboardingStep
                        ? darkMode ? 'bg-purple-600' : 'bg-purple-500'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-center`}>
                Steg {onboardingStep} av 4
              </p>
            </div>

            {onboardingStep === 1 && (
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Velkommen! 👋
                </h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  La oss finne venner som passer for deg.
                </p>
                <input
                  type="email"
                  placeholder="E-postadresse"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                  className={`w-full p-3 mb-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <input
                  type="text"
                  placeholder="Fornavn / Brukernavn"
                  value={userProfile.name}
                  onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                  className={`w-full p-3 mb-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <input
                  type="number"
                  placeholder="Alder (13-17)"
                  value={userProfile.age}
                  onChange={(e) => setUserProfile({...userProfile, age: e.target.value})}
                  className={`w-full p-3 mb-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Skriv inn ditt sted (f.eks. Flisa, Kristiansand)"
                    value={locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e.target.value);
                      setUserProfile({...userProfile, location: e.target.value});
                    }}
                    className={`w-full p-3 mb-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  />
                  {locationSearch && !norwegianLocations.includes(locationSearch) && (
                    <div className={`absolute w-full max-h-48 overflow-y-auto ${darkMode ? 'bg-gray-700' : 'bg-white'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-lg mt-1 shadow-lg z-10`}>
                      {filteredLocations.slice(0, 5).map(loc => (
                        <button
                          key={loc}
                          onClick={() => {
                            setUserProfile({...userProfile, location: loc});
                            setLocationSearch(loc);
                          }}
                          className={`w-full text-left p-3 ${darkMode ? 'hover:bg-gray-600 text-white' : 'hover:bg-gray-100'} transition-colors`}
                        >
                          {loc}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {onboardingStep === 2 && (
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Fortell om deg selv ✨
                </h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Skriv en kort bio andre kan se
                </p>
                <textarea
                  placeholder="F.eks: Elsker gaming og fotball! Alltid klar for nye venner 🎮⚽"
                  value={userProfile.bio}
                  onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                  className={`w-full p-3 mb-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none`}
                />
              </div>
            )}

            {onboardingStep === 3 && (
              <div>
                <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Velg interesser 🎯
                </h2>
                <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Velg 2-10 interesser (valgt: {selectedInterests.length}/10)
                </p>
                <div className="max-h-96 overflow-y-auto mb-4">
                  {['Gaming', 'Sport', 'Kreativt', 'Annet'].map(category => (
                    <div key={category} className="mb-4">
                      <h3 className={`font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {allInterests
                          .filter(i => i.category === category)
                          .map(interest => (
                            <button
                              key={interest.name}
                              onClick={() => toggleInterest(interest.name)}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                selectedInterests.includes(interest.name)
                                  ? darkMode 
                                    ? 'border-purple-500 bg-purple-900 text-purple-300' 
                                    : 'border-purple-500 bg-purple-100 text-purple-700'
                                  : darkMode
                                    ? 'border-gray-700 bg-gray-700 text-gray-300 hover:border-gray-600'
                                    : 'border-gray-200 hover:border-purple-300'
                              }`}
                            >
                              <span className="text-xl mr-2">{interest.icon}</span>
                              <span className="text-sm">{interest.name}</span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {onboardingStep === 4 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className={`w-20 h-20 rounded-full ${darkMode ? 'bg-purple-900' : 'bg-purple-100'} flex items-center justify-center mx-auto mb-4`}>
                    <Check className={`w-10 h-10 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  </div>
                  <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Profilen er klar! 🎉
                  </h2>
                  <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Vi har sendt en verifiseringslenke til {userProfile.email}
                  </p>
                </div>
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4 mb-6 text-left`}>
                  <p className={`text-sm font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Din profil:
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    👤 {userProfile.name}, {userProfile.age} år
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    📍 {userProfile.location}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    ❤️ {selectedInterests.length} interesser
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {onboardingStep > 1 && (
                <button
                  onClick={() => setOnboardingStep(onboardingStep - 1)}
                  className={`flex-1 py-3 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} font-semibold`}
                >
                  Tilbake
                </button>
              )}
              <button
                onClick={() => {
                  if (onboardingStep === 3) {
                    setUserProfile({...userProfile, interests: selectedInterests});
                  }
                  if (onboardingStep === 4) {
                    setCurrentScreen('home');
                  } else {
                    setOnboardingStep(onboardingStep + 1);
                  }
                }}
                disabled={
                  (onboardingStep === 1 && (!userProfile.name || !userProfile.age || !userProfile.location || !userProfile.email)) ||
                  (onboardingStep === 3 && selectedInterests.length < 2)
                }
                className={`flex-1 py-3 rounded-lg font-semibold ${
                  darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {onboardingStep === 4 ? 'Kom i gang!' : 'Neste'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <NavBar 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
            menuOpen={menuOpen} 
            setMenuOpen={setMenuOpen} 
            currentScreen={currentScreen} 
            setCurrentScreen={setCurrentScreen} 
          />
          
          {currentScreen === 'home' && (
            <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'} pt-20 pb-8`}>
              <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                  <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    Finn venner 🎯
                  </h2>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    {matches.length} personer matcher med deg i {userProfile.location}!
                  </p>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Søk etter navn eller interesser..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                </div>

                {matches.length === 0 && (
                  <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-md p-8 text-center`}>
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      Ingen matcher i {userProfile.location} ennå
                    </h3>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Prøv å endre lokasjon eller legg til flere interesser!
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  {matches
                    .filter(user => 
                      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      user.interests.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()))
                    )
                    .map(user => (
                    <div
                      key={user.id}
                      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-xl shadow-md p-6 border cursor-pointer hover:shadow-lg transition-shadow`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="text-5xl">{user.image}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                              {user.name}, {user.age}
                            </h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                              {user.commonInterests} felles
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mb-3">
                            <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {user.location}
                            </span>
                          </div>
                          <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {user.bio}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {user.interests.slice(0, 3).map(interest => (
                              <span
                                key={interest}
                                className={`text-xs px-2 py-1 rounded-full ${
                                  userProfile.interests.includes(interest)
                                    ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                                    : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {interest}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedUser && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          {selectedUser.name}, {selectedUser.age}
                        </h3>
                        <button
                          onClick={() => setSelectedUser(null)}
                          className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="text-6xl text-center mb-4">{selectedUser.image}</div>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                          {selectedUser.location}
                        </span>
                      </div>
                      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedUser.bio}
                      </p>
                      <div className="mb-6">
                        <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                          Interesser:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedUser.interests.map(interest => (
                            <span
                              key={interest}
                              className={`text-sm px-3 py-1 rounded-full ${
                                userProfile.interests.includes(interest)
                                  ? darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-700'
                                  : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {interest}
                              {userProfile.interests.includes(interest) && ' ✓'}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => sendFriendRequest(selectedUser)}
                        className={`w-full py-3 rounded-lg font-semibold ${
                          darkMode ? 'bg-purple-600 text-white' : 'bg-purple-500 text-white'
                        } hover:opacity-90 transition-opacity`}
                      >
                        Send venneforespørsel ✉️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {currentScreen === 'groups' && <div className="pt-24 text-center">Kommer snart!</div>}
          {currentScreen === 'events' && <div className="pt-24 text-center">Kommer snart!</div>}
          {currentScreen === 'messages' && <div className="pt-24 text-center">Kommer snart!</div>}
          {currentScreen === 'profile' && <div className="pt-24 text-center">Din profil (Se Home for demo)</div>}
        </>
      )}
    </div>
  );
};

export default ConnectMeApp;
