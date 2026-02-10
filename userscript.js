// ==UserScript==
// @name         Safety Audio Addon
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Press "7" to active
// @author       SirJackie
// @match        https://www.geo-fs.com/*
// @match        https://play.geofs.com/*
// @match        https://*.geo-fs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';


    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Funnel+Sans:ital,wght@0,300..800;1,300..800&display=swap';
    document.head.appendChild(fontLink);


    const CHIME_URL = "https://raw.githubusercontent.com/ChristianPilotAlex003/GeoFS-Seatbelt-Sign-Sound/main/670297__kinoton__airplane-seatbelt-sign-beep.mp3";
    const PA_ANNOUNCEMENT_URL = "https://od.lk/s/NTRfNDAyMDM4Mzdf/Cabin%20Announcement.mp3";

    const safetyAudios = [
        { airline: "Vietnam Airlines", url: "https://od.lk/s/NTRfNDAyMDM3NzVf/Phim%20Hu%CC%9Bo%CC%9B%CC%81ng%20Da%CC%82%CC%83n%20An%20Toa%CC%80n%20Bay%202025_%20Chuye%CC%82%CC%81n%20Bay%20No%CC%9B%CC%89%20Hoa%20%28The%20Blossoming%29%20-%20Vietnam%20Airlines.mp3" },
        { airline: "Qantas", url: "https://od.lk/s/NTRfNDAyMDM3Nzdf/Qantas%20Safety%20Video%202024.mp3" },
        { airline: "Air India", url: "https://od.lk/s/NTRfNDAyMDM3Nzhf/Safety%20Mudras%20-%20Air%20India%27s%20Inflight%20Safety%20Video.mp3" },
        { airline: "Sri Lanka Airlines", url: "https://od.lk/s/NTRfNDAyMDM3Nzlf/SriLankan%20Airlines%20_%20Onboard%20Safety%20Video%202024.mp3" },
        { airline: "SWSS", url: "https://od.lk/s/NTRfNDAyMDM3ODBf/SWISS%20Safety%20Video%202025%20_%20SWISS.mp3" },
        { airline: "United", url: "https://od.lk/s/NTRfNDAyMDM3ODNf/United%20%E2%80%94%20Safety%20in%20Motion.mp3" },
        { airline: "THAI Airways", url: "https://od.lk/s/NTRfNDAyMDM3ODJf/Thai%20Airways%20New%20B787-9%20Safety%20Video.mp3" },
        { airline: "Malaysian Airlines", url: "https://od.lk/s/NTRfNDAyMDM3ODRf/Where%20Culture%20Takes%20Flight%20_%20Malaysia%20Airlines%20In-flight%20Safety%20Video%202025.mp3" },
        { airline: "STARLUX", url: "https://od.lk/s/NTRfNDAyMDM3ODVf/%E6%98%9F%E5%AE%87%E8%88%AA%E7%A9%BA%E6%A9%9F%E4%B8%8A%E5%AE%89%E5%85%A8%E5%BD%B1%E7%89%87%20%EF%BC%8D%20STARWONDERERS%20%E6%98%9F%E6%8E%A2%E8%80%85%20_%20Safety%20Film%EF%BD%9CSTARLUX%20Airlines.mp3" },
        { airline: "Cathay Pacific", url: "https://od.lk/s/NTRfNDAyMDM3OTRf/CATHAY%20PACIFIC%20SAFETY%20VIDEO%202024%20%E5%9C%8B%E6%B3%B0%E8%88%AA%E7%A9%BA%E9%A3%9B%E8%A1%8C%E5%AE%89%E5%85%A8%E7%A4%BA%E7%AF%84%E7%9F%AD%E7%89%87%202024.mp3" },
        { airline: "British Airways", url: "https://od.lk/s/NTRfNDAyMDM3OTNf/British%20Airways%20_%20Safety%20Video%202024%20_%20May%20We%20Haveth%20One%E2%80%99s%20Attention.mp3" },
        { airline: "ANA", url: "https://od.lk/s/NTRfNDAyMDM3OTJf/ANA%20Safety%20Video%20featuring%20Poke%CC%81mon.mp3" },
        { airline: "Air Canada", url: "https://od.lk/s/NTRfNDAyMDM3ODlm/Air%20Canada_%20New%20Safety%20Video%20_%20Nouvelle%20vide%CC%81o%20de%20se%CC%81curite%CC%81.mp3" },
        { airline: "Air China", url: "https://od.lk/s/NTRfNDAyMDM3OTBf/Air%20China%20Safety%20Video%20%E5%9B%BD%E8%88%AA%20%E5%AE%89%E5%85%A8%E9%A1%BB%E7%9F%A5%20%E4%B8%AD%E5%9B%BD%E5%9B%BD%E9%9A%9B%E8%88%AA%E7%A9%BA%20%E6%A9%9F%E5%86%85%E5%AE%89%E5%85%A8%E3%83%92%E3%82%99%E3%83%86%E3%82%99%E3%82%AA%202023.mp3" },
        { airline: "American Airlines", url: "https://od.lk/s/NTRfNDAyMDM3OTFf/American%20Airlines%20Safety%20Video.mp3" },
        { airline: "Qatar Airways", url: "https://od.lk/s/NTRfNDAyMDM3ODhf/A%20safety%20video%20coming%20from%20the%20Hart%20_%20Qatar%20Airways.mp3" },
        { airline: "EVA Air", url: "https://od.lk/s/NTRfNDAyMDM3ODZf/2026%20EVA%20Air%20Safety%20Video%20%E3%80%8AFlying%20with%20EVA%20AIR%E3%80%8B.mp3" },
        { airline: "Delta", url: "https://od.lk/s/NTRfNDAyMDM3ODdf/A%20Hundred%20Years%20of%20Safety%20-%20Delta%27s%202025%20Centennial%20Safety%20Video.mp3" },
        { airline: "LATAM", url: "https://od.lk/s/NTRfNDAyMDM3OTdf/Experience%20South%20America%20with%20our%20safety%20video%21.mp3" },
        { airline: "Hainan Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MDBf/Hainan%20Airlines%20Safety%20Video%20%282024%29.mp3" },
        { airline: "Air New Zealand", url: "https://od.lk/s/NTRfNDAyMDM4MDFf/It%E2%80%99s%20Game%20on%20for%20Safety%20%23AirNZSafetyVideo.mp3" },
        { airline: "ITA Airways", url: "https://od.lk/s/NTRfNDAyMDM4MDNf/ITA%20Airways%20_%20Istruzioni%20di%20sicurezza%20a%20bordo%20_%20Safety%20video.mp3" },
        { airline: "Japan Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MDRf/JAL%20%28Japan%20Airlines%29%20in-flight%20safety%20video%2C%20New%20Version.mp3" },
        { airline: "Jetstar", url: "https://od.lk/s/NTRfNDAyMDM4MDVf/Jetstar%20A320%20Safety%20demo.mp3" },
        { airline: "KLM", url: "https://od.lk/s/NTRfNDAyMDM4MDZf/KLM%20Flight%20Safety.mp3" },
        { airline: "Korean Air", url: "https://od.lk/s/NTRfNDAyMDM4MDdf/Korean%20Air%2C%20in-flight%20safety%20video.mp3" },
        { airline: "LOT Polish Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MDhf/New%20LOT%20Polish%20Airlines%20Safety%20Video.mp3" },
        { airline: "Etihad", url: "https://od.lk/s/NTRfNDAyMDM4MTBf/New%20Safety%20Video%20_%20Etihad.mp3" },
        { airline: "Turkish Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MTFf/NEW%20Turkish%20Airlines%20LEGO%20Safety%20Video.mp3" },
        { airline: "Emirates", url: "https://od.lk/s/NTRfNDAyMDM4MTJf/Our%20New%20No-Nonsense%20Safety%20Video%20_%20Emirates.mp3" },
        { airline: "Lufthansa", url: "https://od.lk/s/NTRfNDAyMDM4MTRf/Our%20new%20Safety%20Video%20_%20Lufthansa.mp3" },
        { airline: "Philippines Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MTZf/Philippine%20Airlines%20Inflight%20Safety%20Video%20%23PALSafetynovela%20_%20Care%20That%20Comes%20From%20The%20Heart.mp3" },
        { airline: "Singapore Airlines", url: "https://od.lk/s/NTRfNDAyMDM4MThf/Welcome%20on%20board%C2%A0_%20Introducing%20Singapore%20Airlines%E2%80%99%20New%20In-flight%20Safety%20Video_.mp3" }
    ];

    
    const style = document.createElement('style');
    style.innerHTML = `
        #safety-addon-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.95);
            width: 320px;
            max-height: 480px;
            background: rgba(255, 255, 255, 0.2); /* Tăng độ trong suốt (0.4 -> 0.2) */
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #000;
            font-family: 'Funnel Sans', sans-serif;
            z-index: 999999;
            display: none;
            flex-direction: column;
            border-radius: 28px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            padding: 16px;
            user-select: none;
        }

        #safety-addon-container.active {
            display: flex;
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }

        .drag-handle {
            height: 12px;
            cursor: move;
            display: flex;
            justify-content: center;
            margin-bottom: 12px;
        }
        .drag-handle::after {
            content: '';
            width: 36px;
            height: 4px;
            background: rgba(0,0,0,0.1);
            border-radius: 10px;
        }

        .search-box {
            background: rgba(255, 255, 255, 0.3);
            border: 1px solid rgba(0, 0, 0, 0.05);
            padding: 12px 18px;
            color: #000;
            width: 100%;
            box-sizing: border-box;
            outline: none;
            margin-bottom: 16px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 16px;
            font-family: 'Funnel Sans', sans-serif;
            transition: all 0.3s;
        }

        .search-box:focus {
            background: rgba(255, 255, 255, 0.5);
            border-color: rgba(0, 0, 0, 0.15);
        }

        .audio-list {
            flex-grow: 1;
            overflow-y: auto;
            padding-right: 4px;
        }

        .audio-item {
            padding: 14px 18px;
            margin-bottom: 6px;
            background: rgba(255, 255, 255, 0.1);
            cursor: pointer;
            transition: all 0.2s;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border: 1px solid transparent;
        }

        .audio-item:hover {
            background: rgba(255, 255, 255, 0.4);
        }

        .audio-item.playing {
            background: #ffffff;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
            border-color: rgba(0,0,0,0.05);
        }

        .airline-name {
            font-weight: 600;
            font-size: 14px;
            letter-spacing: -0.3px;
        }

        .status-dot {
            width: 8px;
            height: 8px;
            background: #000;
            border-radius: 50%;
            display: none;
        }

        .audio-item.playing .status-dot {
            display: block;
            animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.6); }
            100% { opacity: 1; transform: scale(1); }
        }

        .audio-list::-webkit-scrollbar { width: 4px; }
        .audio-list::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
    `;
    document.head.appendChild(style);

    const container = document.createElement('div');
    container.id = 'safety-addon-container';
    container.innerHTML = `
        <div class="drag-handle"></div>
        <input type="text" class="search-box" placeholder="Search airline...">
        <div class="audio-list" id="audio-list-items"></div>
    `;
    document.body.appendChild(container);

    const listContainer = document.getElementById('audio-list-items');
    const searchInput = container.querySelector('.search-box');


    const audioPlayer = new Audio();
    audioPlayer.style.display = "none";
    document.body.appendChild(audioPlayer);


    let currentSafetyUrl = "";

    const playSequence = async (targetUrl) => {

        if (currentSafetyUrl === targetUrl && !audioPlayer.paused) {
            audioPlayer.pause();
            updateUI();
            return;
        }

        currentSafetyUrl = targetUrl;
        updateUI();

        try {

            if (CHIME_URL) {
                audioPlayer.src = CHIME_URL;
                await audioPlayer.play();
                await new Promise(res => audioPlayer.onended = res);
            }


            if (PA_ANNOUNCEMENT_URL) {
                audioPlayer.src = PA_ANNOUNCEMENT_URL;
                await audioPlayer.play();
                await new Promise(res => audioPlayer.onended = res);
            }


            audioPlayer.src = targetUrl;
            await audioPlayer.play();
            audioPlayer.onended = () => {
                currentSafetyUrl = "";
                updateUI();
            };
        } catch (err) {
            console.error("Audio Playback Error:", err);
        }
    };


    let isDragging = false;
    let offsetX, offsetY;
    const dragHandle = container.querySelector('.drag-handle');

    dragHandle.onmousedown = (e) => {
        isDragging = true;
        const rect = container.getBoundingClientRect();
        container.style.transform = 'none';
        container.style.top = rect.top + 'px';
        container.style.left = rect.left + 'px';
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    };

    document.onmousemove = (e) => {
        if (!isDragging) return;
        container.style.left = (e.clientX - offsetX) + 'px';
        container.style.top = (e.clientY - offsetY) + 'px';
    };

    document.onmouseup = () => isDragging = false;

  
    function updateUI() {
        document.querySelectorAll('.audio-item').forEach(div => {
            const url = div.getAttribute('data-url');
            if (url === currentSafetyUrl && !audioPlayer.paused) {
                div.classList.add('playing');
            } else {
                div.classList.remove('playing');
            }
        });
    }

    function renderAudios(filter = "") {
        listContainer.innerHTML = "";
        const filtered = safetyAudios.filter(v =>
            v.airline.toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach(v => {
            const div = document.createElement('div');
            div.className = 'audio-item';
            div.setAttribute('data-url', v.url);
            if (v.url === currentSafetyUrl && !audioPlayer.paused) div.classList.add('playing');

            div.innerHTML = `
                <span class="airline-name">${v.airline}</span>
                <div class="status-dot"></div>
            `;

            div.onclick = () => playSequence(v.url);
            listContainer.appendChild(div);
        });
    }

    searchInput.oninput = (e) => renderAudios(e.target.value);

    window.onkeydown = (e) => {
        if (e.key === "7") {
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                if (document.activeElement !== searchInput) return;
            }

            if (container.classList.contains('active')) {
                container.classList.remove('active');
                setTimeout(() => { container.style.display = 'none'; }, 400);
            } else {
                container.style.display = 'flex';
                renderAudios(searchInput.value);
                setTimeout(() => {
                    container.classList.add('active');
                    searchInput.focus();
                }, 10);
            }
        }
    };

})();
