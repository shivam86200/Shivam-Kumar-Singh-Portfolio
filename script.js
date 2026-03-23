// script.js

// 0. Matrix Hacker Background
const canvas = document.getElementById('matrix-canvas');
if(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    for(let x = 0; x < columns; x++) drops[x] = 1;

    function drawMatrix() {
        ctx.fillStyle = 'rgba(11, 11, 22, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        for(let i = 0; i < drops.length; i++) {
            const text = letters.charAt(Math.floor(Math.random() * letters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    // Only run if dark theme is active
    let matrixInterval = setInterval(drawMatrix, 33);
}

// 1. Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const icon = themeToggle.querySelector('i');
const body = document.body;

// Check local storage for theme
if(localStorage.getItem('theme') === 'light') {
    body.setAttribute('data-theme', 'light');
    icon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// 2. Typing Animation
const textArray = [
    "Software Developer & Cybersecurity Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById("typing");

function type() {
    if(!typingElement) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typingElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 70;

    if (!isDeleting && charIndex === currentText.length) {
        // If it's the last text, stop completely
        if (textIndex === textArray.length - 1) {
            return; // Stops the loop
        }
        typeSpeed = 2000; // Pause at end before deleting
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex++;
        typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
}
// Start typing anim
setTimeout(type, 500);

// 3. GitHub Fetch removed as per user request to display single static project.

// 4. Particles (tsParticles) Integration
if(typeof tsParticles !== "undefined"){
    tsParticles.load("tsparticles", {
        preset: "stars",
        background: { color: "transparent" },
        particles: {
            number: { value: 70, density: { enable: true, value_area: 800 } },
            color: { value: ["#9b5cff", "#ff5da2", "#ffffff"] },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 2, random: true },
            links: { 
                enable: true, 
                color: "#9b5cff", 
                opacity: 0.2, 
                distance: 150 
            },
            move: { enable: true, speed: 1, direction: "none", random: true, out_mode: "out" }
        },
        interactivity: {
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" }
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        }
    });
}

// 5. GSAP Apple-Style Scroll Animations
if(typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Reveals
    gsap.from(".gsap-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });

    // Sections general fade-up
    gsap.utils.toArray('.gsap-fade').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Staggered Fade Up lists
    gsap.utils.toArray('.skills-grid, .about-container').forEach(parent => {
        const children = parent.querySelectorAll('.gsap-fade-up');
        if(children.length > 0) {
            gsap.from(children, {
                scrollTrigger: {
                    trigger: parent,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "back.out(1.2)"
            });
        }
    });

    // Directional Fades
    gsap.utils.toArray('.gsap-fade-left').forEach(element => {
        gsap.from(element, {
            scrollTrigger: { trigger: element, start: "top 85%" },
            x: 40, opacity: 0, duration: 1, ease: "power2.out"
        });
    });

    gsap.utils.toArray('.gsap-fade-right').forEach(element => {
        gsap.from(element, {
            scrollTrigger: { trigger: element, start: "top 85%" },
            x: -40, opacity: 0, duration: 1, ease: "power2.out"
        });
    });

    // Form special reveal
    gsap.from('.glass-form', {
        scrollTrigger: { trigger: '.contact', start: "top 80%" },
        scale: 0.95, y: 50, opacity: 0, duration: 1, ease: "back.out(1.5)"
    });
}

// 6. Magnetic Hover Elements
const magneticEls = document.querySelectorAll('.magnetic');
magneticEls.forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Gentle magnetic pull
        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    });
});

// 7. Navbar Scroll Effect / Active Link
const nav = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Nav background
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    // Scroll Progress bar
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";
    }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn');
const navList = document.getElementById('nav-list');
if(menuBtn && navList) {
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('show');
        const icon = menuBtn.querySelector('i');
        if(navList.classList.contains('show')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close menu when clicking a link
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        });
    });
}

// Mouse Parallax for Hero Elements
document.addEventListener('mousemove', function(e) {
    if (window.innerWidth <= 1024) return;
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const heroRight = document.querySelector('.hero-right');
    if(heroRight) {
        heroRight.style.transform = `translate(${x * 30 - 15}px, ${y * 30 - 15}px)`;
    }
    
    // Background bubbles moving slightly
    const bubbles = document.querySelectorAll('.hero > div[style*="border-radius: 50%"]');
    bubbles.forEach((bubble, idx) => {
        bubble.style.transform = `translate(${x * (20 + idx * 10) - (10 + idx * 5)}px, ${y * (20 + idx * 10) - (10 + idx * 5)}px)`;
    });
});

// 8. Interactive Hacking Lab Terminal
function runCommand(cmd) {
    const output = document.getElementById('terminal-output');
    if(!output) return;
    const prompt = `<div style="color: #fff; margin-top: 10px;">root@cyber-lab:~# ${cmd}</div>`;
    output.innerHTML += prompt;
    
    if (cmd === 'scan') {
        output.innerHTML += `<div style="color: #0f0;">Starting nmap scan on 192.168.1.0/24...</div>`;
        setTimeout(() => { output.innerHTML += `<div style="color: #0f0;">Host is up (0.0020s latency).<br>Not shown: 998 closed ports<br>PORT   STATE SERVICE<br>22/tcp open  ssh<br>80/tcp open  http<br><br>Nmap done: 1 IP address (1 host up) scanned in 1.23 seconds</div>`; output.scrollTop = output.scrollHeight; }, 1500);
    } else if (cmd === 'crack') {
        output.innerHTML += `<div style="color: #0f0;">Starting brute-force attack...</div>`;
        setTimeout(() => { output.innerHTML += `<div style="color: #0f0;">Trying admin:admin... Failed</div>`; }, 500);
        setTimeout(() => { output.innerHTML += `<div style="color: #0f0;">Trying admin:password... Failed</div>`; }, 1000);
        setTimeout(() => { output.innerHTML += `<div style="color: #ff5f56;">Match found! admin:qwerty123</div>`; output.scrollTop = output.scrollHeight; }, 2000);
    } else if (cmd === 'vuln') {
        output.innerHTML += `<div style="color: #0f0;">Scanning target structure for vulnerabilities...</div>`;
        setTimeout(() => { output.innerHTML += `<div style="color: #ffbd2e;">[!] Warning: Outdated Apache Server (v2.4.49)</div>`; }, 800);
        setTimeout(() => { output.innerHTML += `<div style="color: #ff5f56;">[!] CRITICAL: Directory Traversal Vulnerability (CVE-2021-41773)</div>`; }, 1600);
        setTimeout(() => { output.innerHTML += `<div style="color: #27c93f;">[+] Scan complete. Generate report to view details.</div>`; output.scrollTop = output.scrollHeight; }, 2400);
    } else if (cmd === 'clear') {
        output.innerHTML = `<div>Welcome to the Interactive Cybersecurity Lab.</div>
                <div>Available commands: 
                    <span style="color: #ffbd2e; cursor: pointer; text-decoration: underline;" onclick="runCommand('scan')">scan</span>, 
                    <span style="color: #ffbd2e; cursor: pointer; text-decoration: underline;" onclick="runCommand('crack')">crack</span>, 
                    <span style="color: #ffbd2e; cursor: pointer; text-decoration: underline;" onclick="runCommand('vuln')">vuln</span>,
                    <span style="color: #ffbd2e; cursor: pointer; text-decoration: underline;" onclick="runCommand('clear')">clear</span>
                </div>
                <div style="margin-bottom: 15px;">Click a command to execute.</div>`;
    }
    output.scrollTop = output.scrollHeight;
}

// 9. AI Chatbot
const cbToggle = document.getElementById('chatbot-toggle');
const cbWindow = document.getElementById('chatbot-window');
const cbClose = document.getElementById('chatbot-close');
const cbInput = document.getElementById('chatbot-input');
const cbSend = document.getElementById('chatbot-send');
const cbMessages = document.getElementById('chatbot-messages');

if(cbToggle && cbWindow) {
    cbToggle.addEventListener('click', () => { cbWindow.style.display = 'flex'; });
    cbClose.addEventListener('click', () => { cbWindow.style.display = 'none'; });

    function botReply(text) {
        const msg = document.createElement('div');
        msg.style.cssText = "background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px; color: #fff; font-size: 0.9rem; align-self: flex-start; max-width: 80%;";
        msg.innerText = text;
        cbMessages.appendChild(msg);
        cbMessages.scrollTop = cbMessages.scrollHeight;
    }

    function handleSend() {
        const userText = cbInput.value.trim();
        if (!userText) return;
        const msg = document.createElement('div');
        msg.style.cssText = "background: linear-gradient(135deg, #6366f1, #a855f7); padding: 10px; border-radius: 8px; color: #fff; font-size: 0.9rem; align-self: flex-end; max-width: 80%;";
        msg.innerText = userText;
        cbMessages.appendChild(msg);
        cbInput.value = '';
        cbMessages.scrollTop = cbMessages.scrollHeight;
        
        setTimeout(() => {
            let reply = "I'm a simple mock AI. But Shivam is great at cybersecurity!";
            if(userText.toLowerCase().includes('skill')) reply = "Shivam excels in Penetration Testing, Python, C++, and Network Security!";
            if(userText.toLowerCase().includes('project')) reply = "Check out his Memory Allocation Tracker and Electric Grid Failure Prediction tools!";
            if(userText.toLowerCase().includes('hire') || userText.toLowerCase().includes('contact')) reply = "You should definitely contact him through the Contact form below!";
            botReply(reply);
        }, 800);
    }

    cbSend.addEventListener('click', handleSend);
    cbInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });
}

// 10. Threat Intelligence Dashboard & SOC Setup
function initDashboard() {
    
    // SOC Animated Counters and Live Clock
    const liveClock = document.getElementById('live-clock');
    if(liveClock) {
        setInterval(() => {
            const now = new Date();
            liveClock.innerText = now.toLocaleTimeString() + " (IST)";
        }, 1000);
    }
    
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if(!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    setTimeout(() => {
        animateValue("soc-threats", 0, 142, 2000);
        animateValue("soc-blocked", 0, 137, 2000);
        animateValue("soc-scans", 0, 5, 1000);
    }, 1000);


    // 3D Cyber Attack Globe using Globe.gl
    const globeViz = document.getElementById('globeViz');
    if(globeViz && window.Globe) {
        const globe = Globe()(globeViz)
          .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
          .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
          .backgroundColor('#000000')
          .arcColor(() => '#ef4444')
          .arcDashLength(0.4)
          .arcDashGap(0.2)
          .arcDashAnimateTime(1500);

        // Simulated locations: [lat, lng, name]
        const locations = [
            [37.77, -122.41], [40.71, -74.00], [51.50, -0.12],
            [35.68, 139.69], [28.61, 77.20], [-33.86, 151.20]
        ];
        
        setInterval(() => {
            const arcsData = [];
            for (let i = 0; i < 3; i++) {
                const startNode = locations[Math.floor(Math.random() * locations.length)];
                const endNode = locations[Math.floor(Math.random() * locations.length)];
                if (startNode !== endNode) {
                    arcsData.push({
                        startLat: startNode[0], startLng: startNode[1],
                        endLat: endNode[0], endLng: endNode[1]
                    });
                }
            }
            globe.arcsData(arcsData);
        }, 2000);
        
        // Auto-rotate
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 2.0;
        
        window.addEventListener('resize', () => {
            globe.width(globeViz.clientWidth);
            globe.height(globeViz.clientHeight);
        });
    }

    // Threat Feed
    const feed = document.getElementById('threat-feed');
    const ips = ['192.168.', '10.0.', '172.16.', '203.0.', '8.8.'];
    if(feed) {
        setInterval(() => {
            const ip = ips[Math.floor(Math.random()*ips.length)] + Math.floor(Math.random()*255) + '.' + Math.floor(Math.random()*255);
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            const time = new Date().toLocaleTimeString();
            entry.innerHTML = `[${time}] <span style="color:#ef4444;">BLOCKED</span>: SSH Brute Force from ${ip}`;
            feed.prepend(entry);
            if(feed.children.length > 5) feed.lastChild.remove();
        }, 2000);
    }

    // Dark Web Monitor
    const darkFeed = document.getElementById('dark-web-monitor');
    const keywords = ['Breach discussion found:', 'DB Dump listed for:', 'Credential leak:', '0-day exploit talk:'];
    const targets = ['Corp_DB_2025.sql', 'admin@target.com', 'Apache CVE', 'ClientList.csv', 'Hash.txt'];
    if(darkFeed) {
        setInterval(() => {
            const kw = keywords[Math.floor(Math.random()*keywords.length)];
            const tg = targets[Math.floor(Math.random()*targets.length)];
            const entry = document.createElement('div');
            entry.className = 'log-entry';
            entry.innerHTML = `> <span style="color:#facc15;">${kw}</span> ${tg}`;
            darkFeed.prepend(entry);
            if(darkFeed.children.length > 5) darkFeed.lastChild.remove();
        }, 3500);
    }

    // Packet Analyzer Visualization
    const pktCanvas = document.getElementById('packet-canvas');
    if(pktCanvas) {
        const pCtx = pktCanvas.getContext('2d');
        const resizePkt = () => { pktCanvas.width = pktCanvas.clientWidth; pktCanvas.height = pktCanvas.clientHeight; };
        resizePkt();
        window.addEventListener('resize', resizePkt);
        
        let offset = 0;
        function drawPackets() {
            pCtx.clearRect(0, 0, pktCanvas.width, pktCanvas.height);
            pCtx.fillStyle = 'rgba(15, 19, 31, 0.4)';
            pCtx.fillRect(0, 0, pktCanvas.width, pktCanvas.height);
            
            pCtx.strokeStyle = '#38bdf8';
            pCtx.lineWidth = 2;
            pCtx.beginPath();
            for(let x = 0; x < pktCanvas.width; x += 5) {
                const y = (pktCanvas.height/2) + Math.sin((x + offset) * 0.03) * 30 * Math.sin((x - offset) * 0.01) + (Math.random()*15);
                pCtx.lineTo(x, y);
            }
            pCtx.stroke();
            offset += 3;
            requestAnimationFrame(drawPackets);
        }
        drawPackets();
    }

    // AI Threat Detection Graph
    const aiCanvas = document.getElementById('ai-chart-canvas');
    if(aiCanvas) {
        const aCtx = aiCanvas.getContext('2d');
        const resizeAi = () => { aiCanvas.width = aiCanvas.clientWidth; aiCanvas.height = aiCanvas.clientHeight; };
        resizeAi();
        window.addEventListener('resize', resizeAi);
        
        const data = Array(50).fill(50);
        function drawAIChart() {
            aCtx.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
            
            // Generate data
            const val = data[data.length - 1] + (Math.random() - 0.5) * 15;
            data.push(Math.max(10, Math.min(180, val)));
            data.shift();
            
            // Random Anomaly Spike
            if(Math.random() > 0.96) data[data.length-1] = Math.min(190, data[data.length-1] + 80);

            aCtx.beginPath();
            aCtx.moveTo(0, aiCanvas.height - (data[0] * (aiCanvas.height/200)));
            const step = aiCanvas.width / 50;
            for(let i=1; i<data.length; i++) {
                aCtx.lineTo(i*step, aiCanvas.height - (data[i] * (aiCanvas.height/200)));
            }
            aCtx.strokeStyle = '#27c93f';
            aCtx.lineWidth = 2;
            aCtx.stroke();
            
            aCtx.fillStyle = 'rgba(39, 201, 63, 0.1)';
            aCtx.lineTo(aiCanvas.width, aiCanvas.height);
            aCtx.lineTo(0, aiCanvas.height);
            aCtx.fill();

            // Detect Anomaly visually
            if(data[data.length-1] > 140) {
                aCtx.fillStyle = '#ef4444';
                aCtx.font = "bold 12px sans-serif";
                aCtx.fillText("ANOMALY DETECTED", aiCanvas.width - 140, 30);
                aCtx.beginPath();
                aCtx.arc(aiCanvas.width, aiCanvas.height - (data[data.length-1] * (aiCanvas.height/200)), 6, 0, Math.PI*2);
                aCtx.fill();
            }

            setTimeout(() => requestAnimationFrame(drawAIChart), 100);
        }
        drawAIChart();
    }
}
setTimeout(initDashboard, 500);

// 11. Boot Loader Sequence
const loader = document.getElementById('boot-loader');
if(loader) {
    // Add typing/boot sound effect (optional/simulated)
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        function beep(vol, freq, dur) {
            v=audioCtx.createOscillator()
            u=audioCtx.createGain()
            v.connect(u)
            v.frequency.value=freq
            v.type="square"
            u.connect(audioCtx.destination)
            u.gain.value=vol*0.01
            v.start(audioCtx.currentTime)
            v.stop(audioCtx.currentTime+dur*0.001)
        }
        setTimeout(() => beep(5, 520, 100), 800);
        setTimeout(() => beep(5, 520, 100), 1600);
        setTimeout(() => beep(5, 700, 200), 2400);
    } catch(e) {}
    
    setTimeout(() => { document.getElementById('load-msg-1').style.display = 'inline'; }, 800);
    setTimeout(() => { document.getElementById('load-msg-2').style.display = 'inline'; }, 1600);
    setTimeout(() => { document.getElementById('load-msg-3').style.display = 'inline'; }, 2400);
    setTimeout(() => { 
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 3200);
}

// 12. Custom Hover Cursor
const cursorDot = document.querySelector('.cursor-dot');
const cursorGlow = document.querySelector('.cursor-glow');

if(cursorDot && cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });
    
    // Smooth glow loop
    function animateGlow() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        cursorGlow.style.transform = `translate(${glowX - 20}px, ${glowY - 20}px)`;
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
    
    // Interactive hover states
    document.querySelectorAll('a, button, .magnetic, .skill, .skill-tab, .glitch').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '60px';
            cursorGlow.style.height = '60px';
            cursorGlow.style.background = 'rgba(0, 255, 204, 0.1)';
            cursorGlow.style.borderColor = '#00ffcc';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '40px';
            cursorGlow.style.height = '40px';
            cursorGlow.style.background = 'transparent';
            cursorGlow.style.borderColor = 'rgba(0, 255, 204, 0.5)';
        });
    });
}

// 13. Radar Chart (Chart.js)
setTimeout(() => {
    const radarCtx = document.getElementById('skillRadar');
    if(radarCtx && window.Chart) {
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Network Security', 'Pen Testing', 'Malware Analysis', 'Python/C++', 'Cryptography', 'SIEM'],
                datasets: [{
                    label: 'Skill Proficiency Level',
                    data: [90, 85, 75, 95, 80, 70],
                    fill: true,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgb(99, 102, 241)',
                    pointBackgroundColor: 'rgb(255, 93, 162)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 93, 162)'
                }]
            },
            options: {
                elements: { line: { tension: 0.3 } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255,255,255,0.1)' },
                        grid: { color: 'rgba(255,255,255,0.1)' },
                        pointLabels: { color: '#a1a1aa', font: { size: 12 } },
                        ticks: { display: false }
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}, 1000);

// 14. Command Palette (CTRL + K)
const paletteOverlay = document.getElementById('command-palette-overlay');
const paletteSearch = document.getElementById('palette-search');
const paletteResults = document.getElementById('palette-results');
const commands = [
    { name: "Home Dashboard", action: "home", icon: "fa-home" },
    { name: "Threat Intelligence", action: "threat-dashboard", icon: "fa-shield-alt" },
    { name: "Interactive Lab", action: "labs", icon: "fa-terminal" },
    { name: "Featured Projects", action: "projects", icon: "fa-project-diagram" },
    { name: "Skills Overview", action: "skills", icon: "fa-brain" },
    { name: "Contact Securely", action: "contact", icon: "fa-envelope" }
];

function closePalette() {
    paletteOverlay.style.display = 'none';
    paletteSearch.value = '';
}

if(paletteOverlay) {
    window.addEventListener('keydown', (e) => {
        if((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            paletteOverlay.style.display = 'flex';
            paletteSearch.focus();
            renderPaletteResults(commands);
        }
        if(e.key === 'Escape') {
            closePalette();
        }
    });
    
    paletteOverlay.addEventListener('click', (e) => {
        if(e.target === paletteOverlay) closePalette();
    });

    paletteSearch.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const filtered = commands.filter(c => c.name.toLowerCase().includes(val));
        renderPaletteResults(filtered);
    });

    function renderPaletteResults(list) {
        paletteResults.innerHTML = '';
        if(list.length === 0) {
            paletteResults.innerHTML = '<div style="color:#64748b; padding:10px;">No matching modules found.</div>';
            return;
        }
        list.forEach((c, index) => {
            const d = document.createElement('div');
            d.style.cssText = `padding: 12px 15px; color: white; display: flex; align-items: center; gap: 15px; cursor: pointer; border-radius: 6px; margin-bottom: 5px; background: ${index === 0 ? 'rgba(99, 102, 241, 0.2)' : 'transparent'};`;
            d.innerHTML = `<i class="fas ${c.icon}" style="color:#6366f1;"></i> ${c.name}`;
            
            d.addEventListener('mouseenter', () => {
                Array.from(paletteResults.children).forEach(ch => ch.style.background = 'transparent');
                d.style.background = 'rgba(99, 102, 241, 0.2)';
            });
            
            d.addEventListener('click', () => {
                const sect = document.getElementById(c.action);
                if(sect) sect.scrollIntoView({behavior: 'smooth'});
                closePalette();
            });
            
            paletteResults.appendChild(d);
        });
    }
}
