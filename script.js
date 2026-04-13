document.addEventListener('DOMContentLoaded', () => {
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
        toggleRawBtn: document.getElementById('toggle-raw-data')
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
    const TOTAL_TASKS = 5; // System, Network, Geo, Hardware, Security

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
            setTimeout(() => drawCharts(), 100);
        }
    };

    const formatValue = (val, unit = '') => val ? `${val}${unit}` : '<span class="value-warning">Naməlum</span>';

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
                         Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const now = new Date();
        DOM.sessionIdMain.textContent = sessionId;
        DOM.sessionTime.textContent = now.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        rawData.session = { id: sessionId, timestamp: now.toISOString() };
        
        // Canlı saat
        setInterval(() => {
            const d = new Date();
            DOM.liveDatetime.textContent = d.toLocaleString('az-AZ', { 
                day: '2-digit', month: '2-digit', year: 'numeric', 
                hour: '2-digit', minute: '2-digit', second: '2-digit' 
            });
        }, 1000);
    };

    // --- 1. Sistem Məlumatları (Dərin analiz) ---
    const analyzeSystem = () => {
        const nav = navigator;
        const screenData = window.screen;
        const ua = nav.userAgent;
        
        // OS təxmini
        let os = 'Naməlum';
        if (ua.includes('Windows')) os = 'Windows';
        else if (ua.includes('Mac')) os = 'macOS';
        else if (ua.includes('Linux')) os = 'Linux';
        else if (ua.includes('Android')) os = 'Android';
        else if (ua.includes('iOS')) os = 'iOS';
        
        // Brauzer
        let browser = 'Naməlum';
        if (ua.includes('Firefox')) browser = 'Firefox';
        else if (ua.includes('Edg')) browser = 'Edge';
        else if (ua.includes('Chrome')) browser = 'Chrome';
        else if (ua.includes('Safari')) browser = 'Safari';
        
        const systemInfo = {
            'Əməliyyat Sistemi': os,
            'Brauzer': browser,
            'Brauzer Dili': nav.language,
            'Ekran Həlli': `${screenData.width}x${screenData.height}`,
            'Rəng Dərinliyi': `${screenData.colorDepth} bit`,
            'Vaxt Zonası': Intl.DateTimeFormat().resolvedOptions().timeZone,
            'Touch Dəstəyi': 'ontouchstart' in window ? 'Var' : 'Yoxdur',
            'Do Not Track': nav.doNotTrack || 'Qeyri-aktiv',
            'Cookies Aktiv': nav.cookieEnabled ? 'Bəli' : 'Xeyr',
            'Platform': nav.platform || 'Naməlum',
            'Məhsul Alt': nav.productSub || 'Naməlum',
            'Vendor': nav.vendor || 'Naməlum'
        };
        
        rawData.system = systemInfo;
        Object.entries(systemInfo).forEach(([k, v]) => addGridItem(DOM.systemGrid, k, v));
        updateProgress();
    };

    // --- 2. Şəbəkə və Coğrafiya (ipapi.co) ---
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
                'Ölkə': `${geo.country_name} (${geo.country_code})`,
                'Şəhər': geo.city || 'Naməlum',
                'Region': geo.region || 'Naməlum',
                'Poçt Kodu': geo.postal || 'Naməlum',
                'Vaxt Zonası': geo.timezone || 'Naməlum'
            };
            
            rawData.network = networkInfo;
            Object.entries(networkInfo).forEach(([k, v]) => addGridItem(DOM.networkGrid, k, v));
            
            DOM.geoCoordsText.textContent = `${geo.latitude}, ${geo.longitude}`;
            DOM.ispBadgeDisplay.textContent = geo.org || 'ISP Naməlum';
            
            // Təhlükəsizlik üçün saxla
            rawData.security.proxy = geo.proxy || false;
            rawData.security.hosting = geo.hosting || false;
            rawData.security.tor = geo.tor || false;
            
        } catch (err) {
            console.error('Şəbəkə xətası:', err);
            addGridItem(DOM.networkGrid, 'Xəta', 'API Əlaqəsi Uğursuz', 'value-danger');
        } finally {
            updateProgress();
        }
    };

    // --- 3. GPS Geolokasiya ---
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
        }, 6000);
        
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                clearTimeout(timeout);
                const coords = pos.coords;
                const geoInfo = {
                    'Latitude': coords.latitude.toFixed(6),
                    'Longitude': coords.longitude.toFixed(6),
                    'Dəqiqlik': `±${Math.round(coords.accuracy)} m`,
                    'Hündürlük': coords.altitude ? `${coords.altitude.toFixed(1)} m` : 'Naməlum',
                    'Sürət': coords.speed ? `${coords.speed} m/s` : 'Naməlum'
                };
                rawData.geolocation = geoInfo;
                Object.entries(geoInfo).forEach(([k, v]) => addGridItem(DOM.networkGrid, `GPS: ${k}`, v));
                DOM.geoCoordsText.textContent = `${coords.latitude.toFixed(4)}, ${coords.longitude.toFixed(4)}`;
                updateProgress();
            },
            (err) => {
                clearTimeout(timeout);
                let msg = 'İcazə Rədd Edildi';
                if (err.code === 1) msg = 'İcazə Rədd Edildi';
                else if (err.code === 2) msg = 'Siqnal Tapılmadı';
                rawData.geolocation = { status: msg };
                addGridItem(DOM.networkGrid, 'GPS Status', msg, 'value-danger');
                updateProgress();
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    // --- 4. Aparat Məlumatları ---
    const analyzeHardware = () => {
        const nav = navigator;
        const hardwareInfo = {
            'Məntiqi CPU Nüvəsi': nav.hardwareConcurrency || 'Naməlum',
            'Təxmini RAM': nav.deviceMemory ? `${nav.deviceMemory} GB` : 'Naməlum',
            'Bağlantı Tipi': nav.connection?.effectiveType || 'Naməlum',
            'Təxmini Sürət': nav.connection?.downlink ? `${nav.connection.downlink} Mbps` : 'Naməlum'
        };
        
        rawData.hardware = hardwareInfo;
        Object.entries(hardwareInfo).forEach(([k, v]) => addGridItem(DOM.hardwareGrid, k, v));
        
        // Batareya
        if ('getBattery' in navigator) {
            navigator.getBattery().then(b => {
                const level = `${Math.round(b.level * 100)}%`;
                addGridItem(DOM.hardwareGrid, 'Batareya', `${level} (${b.charging ? 'Şarjda' : 'Batareya'})`);
            }).catch(()=>{});
        }
        updateProgress();
    };

    // --- 5. Təhlükəsizlik və Anomaliya Analizi ---
    const analyzeSecurity = () => {
        const factors = [];
        let riskScore = 0;
        
        if (rawData.security.proxy) { riskScore += 30; factors.push({name: 'Proksi Aşkarlandı', danger: true}); }
        if (rawData.security.hosting) { riskScore += 40; factors.push({name: 'Hosting/Data Mərkəzi', danger: true}); }
        if (rawData.security.tor) { riskScore += 50; factors.push({name: 'Tor Şəbəkəsi', danger: true}); }
        
        // VPN yoxlaması (əlavə heuristics)
        const ua = navigator.userAgent;
        if (ua.includes('Headless') || !navigator.languages || navigator.languages.length === 0) {
            riskScore += 20;
            factors.push({name: 'Headless Brauzer', danger: true});
        }
        
        if (riskScore > 70) riskScore = 85; // Maks
        
        rawData.security.riskScore = riskScore;
        rawData.security.factors = factors;
        
        DOM.riskPercent.textContent = `${riskScore}%`;
        
        // Risk faktorlarını göstər
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
        addGridItem(DOM.securityGrid, 'Risk Skoru', `%${riskScore}`, riskScore > 30 ? 'value-danger' : 'value-highlight');
        
        updateProgress();
    };

    // --- Barmaq İzi və Chart-lar ---
    const generateFingerprintAndRisk = () => {
        // Canvas barmaq izi
        const canvas = document.getElementById('fingerprintCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px "JetBrains Mono"';
            ctx.fillStyle = '#eef5ff';
            ctx.fillText('NEXUS::FINGERPRINT', 10, 10);
            ctx.font = '12px "JetBrains Mono"';
            ctx.fillStyle = '#00e5ff';
            ctx.fillText(`ID: ${rawData.session.id}`, 10, 40);
            
            // Gradient barmaq izi
            const gradient = ctx.createLinearGradient(0, 0, 280, 0);
            gradient.addColorStop(0, '#00e5ff');
            gradient.addColorStop(1, '#bd00ff');
            ctx.fillStyle = gradient;
            ctx.fillRect(10, 60, 260, 4);
        }
        
        // Risk Gauge chart
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
                options: { cutout: '80%', plugins: { tooltip: { enabled: false } } }
            });
        }
        
        // CPU / RAM Chart-lar
        if (navigator.hardwareConcurrency) {
            const cpuCtx = document.getElementById('cpuChart')?.getContext('2d');
            new Chart(cpuCtx, {
                type: 'doughnut',
                data: { datasets: [{ data: [navigator.hardwareConcurrency, 16], backgroundColor: ['#00e5ff', '#1a2330'] }] },
                options: { cutout: '70%' }
            });
        }
        
        if (navigator.deviceMemory) {
            const ramCtx = document.getElementById('ramChart')?.getContext('2d');
            new Chart(ramCtx, {
                type: 'doughnut',
                data: { datasets: [{ data: [navigator.deviceMemory, 16], backgroundColor: ['#bd00ff', '#1a2330'] }] },
                options: { cutout: '70%' }
            });
        }
    };

    const drawCharts = () => {}; // Placeholder

    const updateRawJsonOutput = () => {
        if (DOM.rawJsonOutput) {
            DOM.rawJsonOutput.textContent = JSON.stringify(rawData, null, 2);
        }
    };

    // --- Event Listeners ---
    const setupEventListeners = () => {
        DOM.toggleRawBtn?.addEventListener('click', () => {
            const pre = DOM.rawJsonOutput;
            if (pre.style.display === 'none') pre.style.display = 'block';
            else pre.style.display = 'none';
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
            alert('JSON kopyalandı!');
        });
        
        document.getElementById('refresh-scan-btn')?.addEventListener('click', () => window.location.reload());
    };

    // --- Başlat ---
    setSessionInfo();
    analyzeSystem();
    analyzeNetwork();
    analyzeGeolocation();
    analyzeHardware();
    setTimeout(() => analyzeSecurity(), 1000);
    setupEventListeners();
});