import { useState, useEffect } from 'react';

const App = () => {
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [error, setError] = useState('');
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [encryptionProgress, setEncryptionProgress] = useState('');
  const [ufoPosition, setUfoPosition] = useState({ x: -150, y: 50 });
  const [showNeonBeam, setShowNeonBeam] = useState(false);
  const [beamIntensity, setBeamIntensity] = useState(0.6);
  const [screenFlash, setScreenFlash] = useState(false);
  const [beamParticles, setBeamParticles] = useState([]);

  // Egyptian hieroglyphic mapping
  const egyptianMap = {
    a: '𓀀', b: '𓁐', c: '𓂀', d: '𓃠', e: '𓅓',
    f: '𓆣', g: '𓇋', h: '𓈖', i: '𓉔', j: '𓊃',
    k: '𓋴', l: '𓌳', m: '𓍯', n: '𓎛', o: '𓏏',
    p: '𓐍', q: '𓑑', r: '𓒐', s: '𓓂', t: '𓔎',
    u: '𓕙', v: '𓖿', w: '𓗛', x: '𓘙', y: '𓙑', z: '𓚫',
    ' ': '𓇌', '!': '𓊪', '?': '𓊨', '.': '𓊡', ',': '𓊢',
    '0': '𓎆', '1': '𓏺', '2': '𓏻', '3': '𓏼', '4': '𓏽',
    '5': '𓏾', '6': '𓏿', '7': '𓐀', '8': '𓐁', '9': '𓐂'
  };

  // Reverse mapping for decryption
  const reverseEgyptianMap = Object.fromEntries(
    Object.entries(egyptianMap).map(([key, value]) => [value, key])
  );

  // Advanced Egyptian encryption with stellar key
  const encryptWithStellarKey = (text, key) => {
    const normalizedText = text.toLowerCase();
    const normalizedKey = key.toLowerCase();
    
    if (normalizedKey.length === 0) return '';
    
    let encrypted = '';
    let keyIndex = 0;
    
    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];
      const keyChar = normalizedKey[keyIndex % normalizedKey.length];
      
      if (egyptianMap[char]) {
        const baseHieroglyph = egyptianMap[char];
        const keyHieroglyph = egyptianMap[keyChar] || '𓊪';
        encrypted += baseHieroglyph + '⭐' + keyHieroglyph + '🌌';
        keyIndex++;
      } else {
        encrypted += egyptianMap[char] || char;
      }
    }
    
    return encrypted;
  };

  // Decryption function
  const decryptWithStellarKey = (encryptedText, key) => {
    const normalizedKey = key.toLowerCase();
    
    if (normalizedKey.length === 0) return '';
    
    const segments = encryptedText.split('🌌').filter(seg => seg.length > 0);
    let decrypted = '';
    let keyIndex = 0;
    
    for (const segment of segments) {
      if (segment.includes('⭐')) {
        const [baseHieroglyph] = segment.split('⭐');
        const originalChar = reverseEgyptianMap[baseHieroglyph];
        if (originalChar) {
          decrypted += originalChar;
          keyIndex++;
        }
      } else {
        const char = reverseEgyptianMap[segment];
        if (char) {
          decrypted += char;
        }
      }
    }
    
    return decrypted;
  };

  // Enhanced UFO Animation with realistic movement and beam effects
  const animateUFOEncryption = async (text) => {
    setShowNeonBeam(false);
    setScreenFlash(false);
    
    // UFO flies in from left with wobbling motion
    for (let x = -150; x <= 200; x += 4) {
      const wobble = Math.sin(x / 15) * 12;
      const hover = Math.sin(x / 25) * 8;
      setUfoPosition({ x, y: 50 + wobble + hover });
      await new Promise(resolve => setTimeout(resolve, 40));
    }

    // UFO stabilizes and powers up
    for (let i = 0; i < 20; i++) {
      setUfoPosition({ x: 200, y: 50 + Math.sin(i / 3) * 3 });
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Screen flash when beam activates
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 200);
    
    // UFO activates beam with intensity variations
    setShowNeonBeam(true);
    
    // Generate beam particles
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 2 + 1
      });
    }
    setBeamParticles(particles);

    // Beam intensity fluctuations
    const intensityInterval = setInterval(() => {
      setBeamIntensity(Math.random() * 0.4 + 0.6);
    }, 150);

    // Character-by-character encryption with enhanced beam effect
    let encryptedSoFar = '';
    const words = text.split(' ');
    
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex];
      let transformedWord = '';
      
      for (let charIndex = 0; charIndex < word.length; charIndex++) {
        const char = word[charIndex].toLowerCase();
        const hieroglyph = egyptianMap[char] || char;
        transformedWord += hieroglyph;
        
        // Flash effect for each character transformation
        if (Math.random() > 0.7) {
          setScreenFlash(true);
          setTimeout(() => setScreenFlash(false), 100);
        }
        
        setEncryptionProgress(encryptedSoFar + transformedWord + '✨');
        await new Promise(resolve => setTimeout(resolve, 250));
      }
      
      encryptedSoFar += transformedWord;
      if (wordIndex < words.length - 1) {
        encryptedSoFar += '𓇌'; // space hieroglyph
      }
    }

    clearInterval(intensityInterval);

    // UFO powers down and flies away
    setShowNeonBeam(false);
    setBeamParticles([]);
    
    for (let x = 200; x <= 500; x += 6) {
      const wobble = Math.sin(x / 12) * 15;
      setUfoPosition({ x, y: 50 + wobble });
      await new Promise(resolve => setTimeout(resolve, 35));
    }
  };

  const encryptMessage = async () => {
    if (!message || !password) {
      setError('🛸 Provide both cosmic message and stellar key for UFO encryption!');
      return;
    }
    
    setIsEncrypting(true);
    setError('');
    setEncryptionProgress('');
    setUfoPosition({ x: -150, y: 50 });
    
    try {
      // Start UFO animation
      await animateUFOEncryption(message);
      
      // Complete encryption
      const encryptedText = encryptWithStellarKey(message, password);
      setEncrypted(encryptedText);
      setDecrypted('');
      setEncryptionProgress('');
    } catch (err) {
      setError('🛸 UFO encryption beam malfunction! Alien technology failed.');
    }
    
    setIsEncrypting(false);
  };

  const decryptMessage = async () => {
    if (!encrypted || !password) {
      setError('🔮 Provide encrypted hieroglyphs and stellar key for decryption!');
      return;
    }
    
    setIsDecrypting(true);
    setError('');
    
    // Enhanced decryption animation
    for (let i = 0; i < 30; i++) {
      if (Math.random() > 0.8) {
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 80);
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    try {
      const decryptedText = decryptWithStellarKey(encrypted, password);
      if (!decryptedText) {
        setError('🔮 Decryption failed! Incorrect key or corrupted hieroglyphs.');
      } else {
        setDecrypted(decryptedText);
      }
    } catch (err) {
      setError('🔮 Decryption ritual failed! The cosmic spirits are silent.');
    }
    
    setIsDecrypting(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(encrypted);
    alert('🛸 Cosmic hieroglyphs copied to galactic clipboard!');
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-purple-900 to-black overflow-hidden">
      {/* Screen Flash Overlay */}
      {screenFlash && (
        <div className="absolute inset-0 bg-cyan-300 opacity-30 z-50 pointer-events-none animate-pulse" />
      )}
      
      {/* Enhanced Animated Stars Background - More Dense */}
      <div className="absolute inset-0">
        {[...Array(300)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor: ['#ffffff', '#00ffff', '#ff00ff', '#ffff00', '#00ff00'][Math.floor(Math.random() * 5)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      {/* More Floating Planets with Enhanced Glow - Using Full Screen */}
      <div className="absolute top-16 left-16 w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-bounce opacity-80 shadow-2xl shadow-blue-400/50" style={{ animationDuration: '3s' }} />
      <div className="absolute top-32 right-20 w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-bounce opacity-70 shadow-2xl shadow-red-400/50" style={{ animationDuration: '4s', animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-32 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-bounce opacity-60 shadow-2xl shadow-green-400/50" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      <div className="absolute top-48 right-48 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-50 shadow-2xl shadow-yellow-400/50" />
      <div className="absolute bottom-32 right-32 w-18 h-18 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full animate-bounce opacity-65 shadow-2xl shadow-purple-400/50" style={{ animationDuration: '6s', animationDelay: '0.5s' }} />
      <div className="absolute top-72 left-72 w-12 h-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full animate-pulse opacity-55 shadow-2xl shadow-cyan-400/50" style={{ animationDelay: '1.5s' }} />

      {/* Enhanced Realistic UFO Spaceship */}
      {isEncrypting && (
        <div 
          className="absolute z-30 transition-all duration-200 ease-linear"
          style={{ 
            left: `${ufoPosition.x}px`, 
            top: `${ufoPosition.y}px`,
            filter: 'drop-shadow(0 0 25px #00ffff) drop-shadow(0 0 50px #00ffff)',
            transform: `rotate(${Math.sin(Date.now() / 1000) * 3}deg)`
          }}
        >
          {/* UFO Body - More Realistic */}
          <div className="relative">
            {/* Main Saucer - Metallic Look */}
            <div className="relative w-20 h-10 bg-gradient-to-br from-gray-200 via-gray-400 to-gray-700 rounded-full border-2 border-cyan-300 shadow-2xl shadow-cyan-400/70"
                 style={{ 
                   background: 'linear-gradient(135deg, #e5e7eb 0%, #9ca3af 25%, #6b7280 50%, #374151 75%, #1f2937 100%)',
                   boxShadow: '0 0 30px #00ffff, inset 0 2px 10px rgba(255,255,255,0.3), inset 0 -2px 10px rgba(0,0,0,0.3)'
                 }}>
              
              {/* UFO Ring Lights - More Realistic */}
              <div className="absolute top-2 left-3 w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/80" 
                   style={{ boxShadow: '0 0 8px #f87171' }} />
              <div className="absolute top-2 left-7 w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/80" 
                   style={{ animationDelay: '0.2s', boxShadow: '0 0 8px #4ade80' }} />
              <div className="absolute top-2 right-7 w-2 h-2 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/80" 
                   style={{ animationDelay: '0.4s', boxShadow: '0 0 8px #60a5fa' }} />
              <div className="absolute top-2 right-3 w-2 h-2 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/80" 
                   style={{ animationDelay: '0.6s', boxShadow: '0 0 8px #facc15' }} />
              
              {/* Central Hub */}
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-600 rounded-full border border-cyan-300" 
                   style={{ boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.4)' }} />
            </div>
            
            {/* UFO Dome - More Realistic Glass Effect */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-8 rounded-t-full border border-cyan-200 overflow-hidden"
                 style={{ 
                   background: 'linear-gradient(to bottom, rgba(34,211,238,0.3) 0%, rgba(34,211,238,0.1) 50%, rgba(34,211,238,0.05) 100%)',
                   boxShadow: 'inset 0 1px 10px rgba(255,255,255,0.3), 0 0 15px rgba(34,211,238,0.5)'
                 }}>
              {/* Alien Silhouette */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-gray-600 rounded-t-full opacity-40" />
            </div>
            
            {/* Enhanced Neon Tractor Beam with Variations */}
            {showNeonBeam && (
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
                {/* Main Beam */}
                <div className="relative w-40 h-60 opacity-80"
                     style={{
                       background: `linear-gradient(to bottom, 
                         rgba(34,211,238,${beamIntensity}) 0%, 
                         rgba(34,211,238,${beamIntensity * 0.8}) 20%, 
                         rgba(34,211,238,${beamIntensity * 0.6}) 40%, 
                         rgba(34,211,238,${beamIntensity * 0.4}) 60%, 
                         rgba(34,211,238,${beamIntensity * 0.2}) 80%, 
                         transparent 100%)`,
                       clipPath: 'polygon(45% 0%, 55% 0%, 85% 100%, 15% 100%)',
                       boxShadow: `0 0 50px rgba(34,211,238,${beamIntensity}), inset 0 0 30px rgba(34,211,238,${beamIntensity * 0.5})`,
                       animation: 'beam-flicker 0.1s ease-in-out infinite alternate'
                     }}>
                  
                  {/* Beam Particles */}
                  {beamParticles.map((particle) => (
                    <div
                      key={particle.id}
                      className="absolute bg-white rounded-full animate-pulse"
                      style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        opacity: particle.opacity,
                        boxShadow: '0 0 6px #ffffff',
                        animation: `float-${particle.id % 3} ${particle.speed}s ease-in-out infinite alternate`
                      }}
                    />
                  ))}
                  
                  {/* Secondary Beam Layers */}
                  <div className="absolute inset-0 w-32 h-48 left-4"
                       style={{
                         background: `linear-gradient(to bottom, 
                           rgba(0,255,255,${beamIntensity * 0.3}) 0%, 
                           rgba(0,255,255,${beamIntensity * 0.1}) 50%, 
                           transparent 100%)`,
                         clipPath: 'polygon(40% 0%, 60% 0%, 90% 100%, 10% 100%)',
                         filter: 'blur(2px)'
                       }} />
                </div>
                
                {/* Outer Glow Effect */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-48 h-72 opacity-30"
                     style={{
                       background: `radial-gradient(ellipse at top, rgba(34,211,238,${beamIntensity * 0.4}) 0%, transparent 70%)`,
                       filter: 'blur(10px)'
                     }} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* More Floating Hieroglyphs - Using Full Screen Space */}
      <div className="absolute top-20 right-16 text-5xl text-yellow-400 animate-pulse opacity-70" style={{ textShadow: '0 0 25px #facc15' }}>𓀀</div>
      <div className="absolute bottom-32 right-24 text-4xl text-cyan-400 animate-bounce opacity-60" style={{ animationDelay: '1s', textShadow: '0 0 25px #22d3ee' }}>𓊪</div>
      <div className="absolute top-48 left-20 text-6xl text-purple-400 animate-pulse opacity-50" style={{ animationDelay: '2s', textShadow: '0 0 25px #a855f7' }}>𓇋</div>
      <div className="absolute bottom-48 left-48 text-4xl text-green-400 animate-bounce opacity-40" style={{ animationDelay: '1.5s', textShadow: '0 0 25px #22c55e' }}>𓅓</div>
      <div className="absolute top-32 left-80 text-5xl text-pink-400 animate-pulse opacity-45" style={{ animationDelay: '0.8s', textShadow: '0 0 25px #f472b6' }}>𓃠</div>
      <div className="absolute bottom-72 right-72 text-4xl text-orange-400 animate-bounce opacity-55" style={{ animationDelay: '1.2s', textShadow: '0 0 25px #fb923c' }}>𓆣</div>
      <div className="absolute top-80 right-96 text-3xl text-teal-400 animate-pulse opacity-35" style={{ animationDelay: '2.5s', textShadow: '0 0 25px #2dd4bf' }}>𓈖</div>

      {/* Enhanced Decryption Animation with More Effects */}
      {isDecrypting && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="relative">
            <div className="text-9xl animate-spin mb-4 text-green-400" 
                 style={{ 
                   animationDuration: '2s', 
                   textShadow: '0 0 40px #22c55e, 0 0 80px #22c55e',
                   filter: 'drop-shadow(0 0 20px #22c55e)'
                 }}>🔮</div>
            <div className="text-green-400 text-3xl font-bold animate-bounce mb-2" 
                 style={{ textShadow: '0 0 20px #22c55e' }}>
              CHANNELING COSMIC ENERGY...
            </div>
            <div className="text-green-300 text-xl mb-4">Decoding alien hieroglyphs</div>
            <div className="flex space-x-3 mt-4">
              {['𓎛', '𓅓', '𓔎', '𓊃', '𓒐', '𓇋', '𓊪'].map((hieroglyph, i) => (
                <div
                  key={i}
                  className="text-green-400 text-4xl animate-pulse"
                  style={{ 
                    animationDelay: `${i * 0.2}s`,
                    textShadow: '0 0 20px #22c55e',
                    transform: `scale(${1 + Math.sin(Date.now() / 500 + i) * 0.2})`
                  }}
                >
                  {hieroglyph}
                </div>
              ))}
            </div>
            
            {/* Mystical Circle */}
            <div className="absolute -inset-8 border-2 border-green-400 rounded-full animate-spin opacity-30" 
                 style={{ animationDuration: '8s' }} />
            <div className="absolute -inset-12 border border-green-400 rounded-full animate-spin opacity-20" 
                 style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
          </div>
        </div>
      )}
      {/* Main Container Card - Enhanced Glass Effect */}
      <div className="relative bg-black bg-opacity-60 backdrop-blur-lg rounded-3xl p-12 shadow-2xl border border-cyan-300 border-opacity-30 max-w-2xl w-full mx-8 z-10"
           style={{ 
             background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,41,59,0.7) 50%, rgba(0,0,0,0.8) 100%)',
             boxShadow: '0 25px 50px rgba(34,211,238,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
             backdropFilter: 'blur(20px)'
           }}>
        
        {/* Glowing Title with Pulsing Effect */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 animate-pulse"
              style={{ 
                textShadow: '0 0 30px rgba(34,211,238,0.8), 0 0 60px rgba(168,85,247,0.6)',
                filter: 'drop-shadow(0 0 10px rgba(34,211,238,0.8))'
              }}>
            🛸 ALIEN HIEROGLYPHIC ENCODER 🛸
          </h1>
          <p className="text-cyan-300 text-xl font-medium mb-2" style={{ textShadow: '0 0 15px rgba(34,211,238,0.6)' }}>
            Advanced UFO Technology for Cosmic Message Encryption
          </p>
          <p className="text-purple-300 text-sm opacity-80">
            ⭐ Using Ancient Egyptian Hieroglyphs with Stellar Key Encryption ⭐
          </p>
        </div>

        {/* Input Section with Enhanced Styling */}
        <div className="space-y-8">
          {/* Message Input */}
          <div className="relative">
            <label className="block text-cyan-300 font-semibold mb-3 text-lg" style={{ textShadow: '0 0 10px rgba(34,211,238,0.6)' }}>
              🌌 Cosmic Message to Encrypt:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your secret message for alien transmission..."
              className="w-full p-6 bg-black bg-opacity-70 border-2 border-cyan-400 border-opacity-50 rounded-2xl text-cyan-100 text-lg placeholder-cyan-400 placeholder-opacity-60 resize-none h-32 focus:outline-none focus:border-opacity-100 focus:bg-opacity-90 transition-all duration-300"
              style={{ 
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(34,211,238,0.2)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(15,23,42,0.9) 100%)'
              }}
            />
            {/* Floating Hieroglyphs around input */}
            <div className="absolute -top-2 -right-2 text-2xl text-yellow-400 animate-pulse opacity-60" style={{ textShadow: '0 0 15px #facc15' }}>𓅓</div>
            <div className="absolute -bottom-2 -left-2 text-2xl text-pink-400 animate-bounce opacity-60" style={{ textShadow: '0 0 15px #f472b6' }}>𓊪</div>
          </div>

          {/* Password Input */}
          <div className="relative">
            <label className="block text-purple-300 font-semibold mb-3 text-lg" style={{ textShadow: '0 0 10px rgba(168,85,247,0.6)' }}>
              ⭐ Stellar Encryption Key:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your cosmic password..."
              className="w-full p-6 bg-black bg-opacity-70 border-2 border-purple-400 border-opacity-50 rounded-2xl text-purple-100 text-lg placeholder-purple-400 placeholder-opacity-60 focus:outline-none focus:border-opacity-100 focus:bg-opacity-90 transition-all duration-300"
              style={{ 
                backdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.2)',
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(30,15,42,0.9) 100%)'
              }}
            />
            {/* Floating Hieroglyphs around password input */}
            <div className="absolute -top-2 -left-2 text-2xl text-green-400 animate-pulse opacity-60" style={{ textShadow: '0 0 15px #22c55e' }}>𓇋</div>
            <div className="absolute -bottom-2 -right-2 text-2xl text-blue-400 animate-bounce opacity-60" style={{ textShadow: '0 0 15px #60a5fa' }}>𓃠</div>
          </div>

          {/* Action Buttons with Enhanced Effects */}
          <div className="flex space-x-6 justify-center pt-4">
            <button
              onClick={encryptMessage}
              disabled={isEncrypting || isDecrypting}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              style={{ 
                boxShadow: '0 10px 30px rgba(34,211,238,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                textShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
            >
              {isEncrypting ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin text-2xl">🛸</div>
                  <span>UFO ENCRYPTING...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>🛸</span>
                  <span>ENCRYPT MESSAGE</span>
                </div>
              )}
            </button>

            <button
              onClick={decryptMessage}
              disabled={isEncrypting || isDecrypting}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-bold rounded-2xl text-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl"
              style={{ 
                boxShadow: '0 10px 30px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
                textShadow: '0 0 10px rgba(255,255,255,0.8)'
              }}
            >
              {isDecrypting ? (
                <div className="flex items-center space-x-3">
                  <div className="animate-spin text-2xl">🔮</div>
                  <span>DECRYPTING...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span>🔮</span>
                  <span>DECRYPT MESSAGE</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Error Display with Enhanced Styling */}
        {error && (
          <div className="mt-8 p-6 bg-red-900 bg-opacity-50 border-2 border-red-400 border-opacity-60 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-bounce">⚠️</div>
              <p className="text-red-300 text-lg font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Encryption Progress Display */}
        {encryptionProgress && (
          <div className="mt-8 p-6 bg-yellow-900 bg-opacity-30 border-2 border-yellow-400 border-opacity-50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-2xl animate-pulse">⚡</div>
              <p className="text-yellow-300 font-semibold text-lg">UFO Encryption in Progress...</p>
            </div>
            <div className="text-yellow-100 text-2xl font-mono bg-black bg-opacity-50 p-4 rounded-xl border border-yellow-400 border-opacity-30"
                 style={{ 
                   wordBreak: 'break-all',
                   textShadow: '0 0 10px rgba(251,191,36,0.6)',
                   minHeight: '60px'
                 }}>
              {encryptionProgress}
            </div>
          </div>
        )}

        {/* Encrypted Result Display */}
        {encrypted && (
          <div className="mt-8 p-6 bg-green-900 bg-opacity-30 border-2 border-green-400 border-opacity-50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl animate-pulse">✨</div>
                <p className="text-green-300 font-semibold text-lg">Encrypted Hieroglyphs:</p>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
                style={{ boxShadow: '0 5px 15px rgba(34,197,94,0.4)' }}
              >
                📋 Copy
              </button>
            </div>
            <div className="text-green-100 text-xl font-mono bg-black bg-opacity-50 p-6 rounded-xl border border-green-400 border-opacity-30 max-h-48 overflow-y-auto"
                 style={{ 
                   wordBreak: 'break-all',
                   textShadow: '0 0 10px rgba(34,197,94,0.6)',
                   lineHeight: '1.8'
                 }}>
              {encrypted}
            </div>
          </div>
        )}

        {/* Decrypted Result Display */}
        {decrypted && (
          <div className="mt-8 p-6 bg-blue-900 bg-opacity-30 border-2 border-blue-400 border-opacity-50 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-2xl animate-pulse">🎯</div>
              <p className="text-blue-300 font-semibold text-lg">Decrypted Message:</p>
            </div>
            <div className="text-blue-100 text-xl bg-black bg-opacity-50 p-6 rounded-xl border border-blue-400 border-opacity-30"
                 style={{ 
                   textShadow: '0 0 10px rgba(59,130,246,0.6)',
                   minHeight: '60px'
                 }}>
              {decrypted}
            </div>
          </div>
        )}

        {/* Enhanced Footer with More Hieroglyphs */}
        <div className="mt-12 text-center border-t border-cyan-300 border-opacity-30 pt-8">
          <div className="flex justify-center space-x-6 mb-4 text-3xl">
            {['𓀀', '𓊪', '𓇋', '𓅓', '𓃠', '𓆣', '𓈖', '𓉔', '𓊃'].map((hieroglyph, i) => (
              <div
                key={i}
                className="animate-pulse opacity-70 hover:opacity-100 transition-opacity duration-300"
                style={{ 
                  animationDelay: `${i * 0.3}s`,
                  textShadow: '0 0 20px rgba(34,211,238,0.8)',
                  color: ['#22d3ee', '#a855f7', '#f472b6', '#22c55e', '#facc15'][i % 5]
                }}
              >
                {hieroglyph}
              </div>
            ))}
          </div>
          <p className="text-cyan-300 text-sm opacity-80 mb-2">
            🌟 Advanced Alien Encryption Technology 🌟
          </p>
          <p className="text-purple-300 text-xs opacity-60">
            Powered by UFO Intelligence & Ancient Egyptian Wisdom
          </p>
        </div>
      </div>

      {/* Additional Floating Elements - More Spread Out */}
      <div className="absolute top-10 left-10 text-6xl text-cyan-400 animate-bounce opacity-40" style={{ animationDelay: '0.5s', textShadow: '0 0 30px #22d3ee' }}>🛸</div>
      <div className="absolute top-16 right-10 text-4xl text-purple-400 animate-pulse opacity-50" style={{ animationDelay: '1s', textShadow: '0 0 25px #a855f7' }}>⭐</div>
      <div className="absolute bottom-20 left-16 text-5xl text-pink-400 animate-bounce opacity-45" style={{ animationDelay: '1.5s', textShadow: '0 0 25px #f472b6' }}>🌌</div>
      <div className="absolute bottom-16 right-20 text-4xl text-yellow-400 animate-pulse opacity-55" style={{ animationDelay: '2s', textShadow: '0 0 25px #facc15' }}>✨</div>
      <div className="absolute top-1/2 left-8 text-3xl text-green-400 animate-bounce opacity-35" style={{ animationDelay: '0.8s', textShadow: '0 0 20px #22c55e' }}>🔮</div>
      <div className="absolute top-1/3 right-12 text-5xl text-blue-400 animate-pulse opacity-40" style={{ animationDelay: '1.8s', textShadow: '0 0 25px #60a5fa' }}>👽</div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-cyan-400 opacity-30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-purple-400 opacity-30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-pink-400 opacity-30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-yellow-400 opacity-30"></div>

    </div>
  );
};

export default App;
// Enhanced UFO Animation with realistic movement and beam effects
  const animateUFOEncryption = async (text) => {
    setShowNeonBeam(false);
    setScreenFlash(false);
    
    // UFO flies in from left with complex wobbling motion
    for (let x = -200; x <= 250; x += 3) {
      const wobble = Math.sin(x / 12) * 18 + Math.cos(x / 8) * 8;
      const hover = Math.sin(x / 20) * 12 + Math.cos(x / 15) * 6;
      const tilt = Math.sin(x / 25) * 5;
      setUfoPosition({ x, y: 50 + wobble + hover, rotation: tilt });
      await new Promise(resolve => setTimeout(resolve, 35));
    }

    // UFO stabilizes with complex hovering pattern
    for (let i = 0; i < 25; i++) {
      const complexHover = Math.sin(i / 2.5) * 4 + Math.cos(i / 1.8) * 2;
      const microWobble = Math.sin(i * 1.2) * 1.5;
      setUfoPosition({ 
        x: 250, 
        y: 50 + complexHover + microWobble,
        rotation: Math.sin(i / 4) * 2
      });
      await new Promise(resolve => setTimeout(resolve, 120));
    }

    // Intense screen flash sequence when beam powers up
    for (let flash = 0; flash < 3; flash++) {
      setScreenFlash(true);
      await new Promise(resolve => setTimeout(resolve, 150));
      setScreenFlash(false);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // UFO activates massive beam with screen-wide variations
    setShowNeonBeam(true);
    
    // Generate dynamic beam particles across screen
    const particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.9 + 0.3,
        speed: Math.random() * 3 + 1,
        color: ['cyan', 'blue', 'purple', 'white'][Math.floor(Math.random() * 4)]
      });
    }
    setBeamParticles(particles);

    // Complex beam intensity and screen flash patterns
    const intensityInterval = setInterval(() => {
      setBeamIntensity(Math.random() * 0.5 + 0.7);
      // Random screen flashes during encryption
      if (Math.random() > 0.85) {
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 80);
      }
    }, 120);

    // Character-by-character encryption with enhanced visual effects
    let encryptedSoFar = '';
    const words = text.split(' ');
    
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex];
      let transformedWord = '';
      
      for (let charIndex = 0; charIndex < word.length; charIndex++) {
        const char = word[charIndex].toLowerCase();
        const hieroglyph = egyptianMap[char] || char;
        transformedWord += hieroglyph;
        
        // Enhanced flash effects for character transformation
        if (Math.random() > 0.6) {
          setScreenFlash(true);
          setTimeout(() => setScreenFlash(false), 90);
        }
        
        // Beam intensity surge during character processing
        setBeamIntensity(0.95);
        setTimeout(() => setBeamIntensity(Math.random() * 0.4 + 0.6), 100);
        
        setEncryptionProgress(encryptedSoFar + transformedWord + '✨⚡');
        await new Promise(resolve => setTimeout(resolve, 220));
      }
      
      encryptedSoFar += transformedWord;
      if (wordIndex < words.length - 1) {
        encryptedSoFar += '𓇌'; // space hieroglyph
      }
    }

    clearInterval(intensityInterval);

    // UFO completion sequence with final flash
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 200);
    
    // UFO powers down with energy dissipation effect
    for (let i = 10; i >= 0; i--) {
      setBeamIntensity(i / 15);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    setShowNeonBeam(false);
    setBeamParticles([]);
    
    // UFO departure with complex exit pattern
    for (let x = 250; x <= 600; x += 5) {
      const exitWobble = Math.sin(x / 10) * 20 + Math.cos(x / 7) * 12;
      const exitHover = Math.sin(x / 18) * 15;
      const exitTilt = Math.sin(x / 12) * 8;
      setUfoPosition({ 
        x, 
        y: 50 + exitWobble + exitHover,
        rotation: exitTilt
      });
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  };

  // Advanced encryption function with stellar key
  const encryptWithStellarKey = (text, key) => {
    const normalizedText = text.toLowerCase();
    const normalizedKey = key.toLowerCase();
    
    if (normalizedKey.length === 0) return '';
    
    let encrypted = '';
    let keyIndex = 0;
    
    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];
      const keyChar = normalizedKey[keyIndex % normalizedKey.length];
      
      if (egyptianMap[char]) {
        const baseHieroglyph = egyptianMap[char];
        const keyHieroglyph = egyptianMap[keyChar] || '𓊪';
        // Enhanced encryption pattern with cosmic separators
        encrypted += baseHieroglyph + '⭐' + keyHieroglyph + '🌌';
        keyIndex++;
      } else {
        encrypted += egyptianMap[char] || char;
      }
    }
    
    return encrypted;
  };

  // Advanced decryption function
  const decryptWithStellarKey = (encryptedText, key) => {
    const normalizedKey = key.toLowerCase();
    
    if (normalizedKey.length === 0) return '';
    
    const segments = encryptedText.split('🌌').filter(seg => seg.length > 0);
    let decrypted = '';
    let keyIndex = 0;
    
    for (const segment of segments) {
      if (segment.includes('⭐')) {
        const [baseHieroglyph] = segment.split('⭐');
        const originalChar = reverseEgyptianMap[baseHieroglyph];
        if (originalChar) {
          decrypted += originalChar;
          keyIndex++;
        }
      } else {
        const char = reverseEgyptianMap[segment];
        if (char) {
          decrypted += char;
        }
      }
    }
    
    return decrypted;
  };

  // Main encryption handler with enhanced error handling
  const encryptMessage = async () => {
    if (!message || !password) {
      setError('🛸 Provide both cosmic message and stellar key for UFO encryption!');
      return;
    }
    
    if (message.length > 500) {
      setError('🛸 Message too long for UFO transmission! Max 500 characters.');
      return;
    }
    
    setIsEncrypting(true);
    setError('');
    setEncryptionProgress('');
    setUfoPosition({ x: -200, y: 50, rotation: 0 });
    
    try {
      // Start enhanced UFO animation
      await animateUFOEncryption(message);
      
      // Complete encryption with stellar key
      const encryptedText = encryptWithStellarKey(message, password);
      setEncrypted(encryptedText);
      setDecrypted('');
      setEncryptionProgress('');
      
      // Success flash
      setScreenFlash(true);
      setTimeout(() => setScreenFlash(false), 300);
      
    } catch (err) {
      setError('🛸 UFO encryption beam malfunction! Alien technology failed.');
      console.error('Encryption error:', err);
    }
    
    setIsEncrypting(false);
  };

  // Enhanced decryption with mystical effects
  const decryptMessage = async () => {
    if (!encrypted || !password) {
      setError('🔮 Provide encrypted hieroglyphs and stellar key for decryption!');
      return;
    }
    
    setIsDecrypting(true);
    setError('');
    
    // Enhanced decryption animation with screen-wide effects
    for (let i = 0; i < 40; i++) {
      if (Math.random() > 0.75) {
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 60);
      }
      
      // Vary the intensity for mystical effect
      if (i % 5 === 0) {
        setBeamIntensity(Math.random() * 0.8 + 0.4);
      }
      
      await new Promise(resolve => setTimeout(resolve, 85));
    }
    
    try {
      const decryptedText = decryptWithStellarKey(encrypted, password);
      if (!decryptedText) {
        setError('🔮 Decryption failed! Incorrect stellar key or corrupted hieroglyphs.');
      } else {
        setDecrypted(decryptedText);
        // Success effects
        setScreenFlash(true);
        setTimeout(() => setScreenFlash(false), 250);
      }
    } catch (err) {
      setError('🔮 Decryption ritual failed! The cosmic spirits reject this key.');
      console.error('Decryption error:', err);
    }
    
    setIsDecrypting(false);
  };

  // Enhanced clipboard function with cosmic feedback
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(encrypted);
      
      // Visual feedback with screen flash
      setScreenFlash(true);
      setTimeout(() => setScreenFlash(false), 150);
      
      // Show temporary success message
      const originalError = error;
      setError('');
      setTimeout(() => {
        setError('🛸 Cosmic hieroglyphs successfully transmitted to galactic clipboard! ✨');
        setTimeout(() => setError(originalError), 2000);
      }, 100);
      
    } catch (err) {
      setError('🛸 Clipboard transmission failed! Check your browser permissions.');
    }
  };
