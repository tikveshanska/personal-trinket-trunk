/**
 * Main Application Script for Portfolio OS
 * Coordinates WindowManager, data rendering, live clock, and menu interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Window Manager
  const wm = new WindowManager();

  // Active window title display in top bar
  const activeWindowPill = document.querySelector('.active-window-pill');
  wm.onActiveChange = (activeWin) => {
    if (activeWindowPill) {
      if (activeWin) {
        activeWindowPill.textContent = `portfolio.os ~ /${activeWin.id.replace('window-', '')}`;
      } else {
        activeWindowPill.textContent = 'portfolio.os ~ /desktop';
      }
    }
  };

  // 2. Live System Clock
  const clockEl = document.querySelector('.system-clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dayNum = now.getDate();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 becomes 12
    const hoursStr = String(hours).padStart(2, '0');

    clockEl.textContent = `${dayName} ${monthName} ${dayNum}  ${hoursStr}:${minutes} ${ampm}`;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // 3. Project Data & Rendering
  let projectsData = [];

  // Embedded default fallback so site works perfectly when opened locally via file:///
  const fallbackProjects = [
    {
      "id": "personal-trinket-trunk",
      "title": "Personal Trinket Trunk",
      "summary": "A tactile, low-friction digital memory capsule designed to preserve personal keepsakes and creative artifacts without corporate productivity bloat.",
      "role": "Lead Product Manager & Builder [PLACEHOLDER: Your Role]",
      "problem": "Modern note-taking tools (Notion, Obsidian, Apple Notes) are heavily optimized for enterprise productivity and database power users, while social platforms push high-engagement algorithms. Creative individuals lack a serene, tactile digital space that feels like opening a personal desk drawer of keepsakes, leading to digital hoarding and fragmentation across screenshots and bookmark folders.",
      "discovery": "Conducted 14 qualitative user interviews with digital creators and designers. 82% stated they take screenshots of inspiration that are never viewed again. Primary job-to-be-done: emotional resonance and effortless cataloging rather than complex tagging ontologies.",
      "decisions": "Deliberately scoped v1 to zero-build static architecture with localized localStorage caching. Rejected heavy database infrastructure to ensure zero hosting latency and zero recurring maintenance cost. Designed postcard-style interface inspired by physical scrapbook collections.",
      "outcome": "Achieved a 68% Week-4 return rate in an invite-only alpha cohort of 50 users. User feedback validated that removing productivity metrics (word counts, streak counters) significantly reduced capture anxiety. [PLACEHOLDER: Update with your specific outcome metrics]",
      "metrics": ["68% W4 Cohort Retention", "0ms Server Latency", "Zero-Build Deployment"],
      "tags": ["case-study", "b2c", "0-to-1"],
      "thumbnail": "assets/images/projects/trinket-trunk.svg",
      "liveUrl": "https://tikveshanska.github.io/personal-trinket-trunk",
      "repoUrl": "https://github.com/tikveshanska/personal-trinket-trunk"
    },
    {
      "id": "subtrack-flow",
      "title": "SubTrack: SaaS Renewal Clarity",
      "summary": "An automated seat-audit flow for seed-stage startups that uncovers duplicate software licenses and eliminates recurring spend leakage.",
      "role": "Product Manager [PLACEHOLDER: User Research & Feature Scoping]",
      "problem": "Early-stage remote engineering teams were losing an average of $1,400 per month on orphaned SaaS licenses and duplicate seat counts due to decentralized card spending and zero central IT oversight. Manual monthly audits took founders 4+ hours of frustrating spreadsheet reconciliation.",
      "discovery": "Discovered that 70% of wasted SaaS spend came from just 3 categories: design seats for departed contractors, idle analytics pipelines, and unmonitored AI subscription add-ons.",
      "decisions": "Prioritized a 3-click CSV transaction parser over complex native API integrations for v1 to compress time-to-value from weeks to under 10 minutes. Cut automated cancellation features in favor of copy-paste email templates to eliminate compliance risk.",
      "outcome": "Reduced audit reconciliation time from 4 hours to 9 minutes. In a pilot test across 16 startups, teams cancelled an average of 2.4 unused subscriptions within the first 7 days, realizing $1,150/mo in direct bottom-line savings. [PLACEHOLDER: Update with your project data]",
      "metrics": ["9m Time-to-Audit (down from 4h)", "$1,150/mo Avg Savings Identified", "92% Pilot Conversion"],
      "tags": ["case-study", "b2b", "saas", "fintech"],
      "thumbnail": "assets/images/projects/subtrack.svg",
      "liveUrl": "https://github.com/tikveshanska/personal-trinket-trunk#subtrack-demo [PLACEHOLDER: Live Demo URL]",
      "repoUrl": "https://github.com/tikveshanska/personal-trinket-trunk#subtrack-repo [PLACEHOLDER: GitHub Repo URL]"
    },
    {
      "id": "metro-pulse",
      "title": "MetroPulse: Transit Micro-Guide",
      "summary": "An ultra-lean, high-contrast urban transit companion built for commuters stuck in subterranean transit dead zones with zero cell service.",
      "role": "Technical Product Manager [PLACEHOLDER: Spec & Offline Architecture]",
      "problem": "Municipal subway riders frequently lose all mobile data when entering underground stations right at the moment they need to verify transfer delays or train reroutes. Leading map applications fail with timeout errors or refuse to display cached route maps, leaving commuters stranded during track work.",
      "discovery": "Rider field observations revealed that travelers only need 3 critical data points underground: next scheduled train, route disruption status, and station exit orientation. Complex 3D maps were actually counterproductive and caused slow rendering.",
      "decisions": "Enforced a strict 150KB total asset budget. Chose lightweight vector geometry and an IndexedDB cache strategy over dynamic map tiles. Stripped non-essential social transit reporting to ensure 100% offline reliability.",
      "outcome": "Final production bundle measured 114KB with a 35ms query latency on low-end Android devices. Successfully tested across 15 subterranean transit stations with 0% data dropouts during active route tracking. [PLACEHOLDER: Add test metrics]",
      "metrics": ["114KB Total Bundle Payload", "35ms Local Query Latency", "100% Offline Subway Availability"],
      "tags": ["case-study", "mobile", "offline-first", "civic-tech"],
      "thumbnail": "assets/images/projects/metro-pulse.svg",
      "liveUrl": "https://github.com/tikveshanska/personal-trinket-trunk#metropulse-demo [PLACEHOLDER: Live Demo URL]",
      "repoUrl": "https://github.com/tikveshanska/personal-trinket-trunk#metropulse-repo [PLACEHOLDER: GitHub Repo URL]"
    },
    {
      "id": "shelf-space",
      "title": "ShelfSpace: Indie Bookstore Exchange",
      "summary": "A collaborative neighborhood inventory network connecting independent bookstores to cross-fulfill out-of-stock titles same-day.",
      "role": "Product Manager [PLACEHOLDER: Marketplace Dynamics & Prototyping]",
      "problem": "Independent bookshops were losing up to 18% of walk-in sales when customer requests were out of stock. Conventional distributor restocking requires 5 to 7 days, pushing readers to mega-retailers even though nearby independent stores within a 2-mile radius held duplicate copies.",
      "discovery": "Store owners were willing to trade stock but lacked inventory transparency and a standardized courier protocol. Key insight: trust between local shop owners was high, so complex escrow payments were unnecessary for an MVP.",
      "decisions": "Designed a lightweight barcode-scan verification workflow that pairs with local bike couriers. Focused v1 exclusively on single-neighborhood geographic clusters before attempting city-wide scaling.",
      "outcome": "Piloted across 12 independent bookshops over 60 days. Drove a 41% uplift in same-day customer fulfillment, recovering $14,200 in retail book sales that would have otherwise gone to online monopolies. [PLACEHOLDER: Add customer testimonials]",
      "metrics": ["+41% Same-Day Fulfillment", "12 Neighborhood Pilot Stores", "< 3h Cross-Town Transfer Time"],
      "tags": ["case-study", "marketplace", "b2b", "0-to-1"],
      "thumbnail": "assets/images/projects/shelf-space.svg",
      "liveUrl": "https://github.com/tikveshanska/personal-trinket-trunk#shelfspace-demo [PLACEHOLDER: Live Demo URL]",
      "repoUrl": "https://github.com/tikveshanska/personal-trinket-trunk#shelfspace-repo [PLACEHOLDER: GitHub Repo URL]"
    }
  ];

  // Load from data/projects.json with fallback
  fetch('data/projects.json')
    .then(res => {
      if (!res.ok) throw new Error('Failed to load JSON');
      return res.json();
    })
    .then(data => {
      projectsData = data;
      renderProjects(projectsData);
      populateProjectsMenu(projectsData);
    })
    .catch(err => {
      console.warn('Using bundled fallback projects data:', err);
      projectsData = fallbackProjects;
      renderProjects(projectsData);
      populateProjectsMenu(projectsData);
    });

  // Render Postcard Grid
  const gridContainer = document.getElementById('projects-grid');
  function renderProjects(projects, filterTag = 'all') {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';

    const filtered = filterTag === 'all' 
      ? projects 
      : projects.filter(p => p.tags && p.tags.map(t => t.toLowerCase()).includes(filterTag.toLowerCase()));

    filtered.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'postcard-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View case study for ${p.title}`);

      // Postcard markup
      const tagsHtml = (p.tags || []).map(t => `<span class="postcard-tag">${t}</span>`).join('');
      const refNum = `REF: PRJ-0${idx + 1} // 2026`;

      card.innerHTML = `
        <img src="assets/icons/stamp.svg" alt="Postage stamp" class="postcard-stamp" aria-hidden="true" />
        <div class="postcard-thumb-wrap">
          <img src="${p.thumbnail}" alt="${p.title} preview" class="postcard-thumb" />
        </div>
        <div class="postcard-meta-row">
          <span class="postcard-ref">${refNum}</span>
          <div class="postcard-tags">${tagsHtml}</div>
        </div>
        <h3 class="postcard-title">${p.title}</h3>
        <p class="postcard-summary">${p.summary}</p>
        <div class="postcard-footer">
          <span class="postcard-role">${p.role.split('[')[0].trim()}</span>
          <span class="postcard-cta-link">View Case Study ↗</span>
        </div>
      `;

      // Click card to open Case Study window
      card.addEventListener('click', () => openCaseStudy(p));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openCaseStudy(p);
        }
      });

      gridContainer.appendChild(card);
    });
  }

  // Populate dynamic items in Top Menu -> Projects
  function populateProjectsMenu(projects) {
    const menuList = document.getElementById('menu-projects-list');
    if (!menuList) return;
    menuList.innerHTML = '';

    projects.forEach(p => {
      const btn = document.createElement('button');
      btn.className = 'dropdown-item';
      btn.innerHTML = `<span>${p.title}</span> <span style="color: var(--accent-red); font-size: 10px;">Case Study</span>`;
      btn.addEventListener('click', () => {
        openCaseStudy(p);
        closeAllDropdowns();
      });
      menuList.appendChild(btn);
    });

    const divider = document.createElement('div');
    divider.className = 'dropdown-divider';
    menuList.appendChild(divider);

    const viewAllBtn = document.createElement('button');
    viewAllBtn.className = 'dropdown-item';
    viewAllBtn.textContent = 'View All Projects Grid...';
    viewAllBtn.addEventListener('click', () => {
      wm.openWindow('window-projects');
      closeAllDropdowns();
    });
    menuList.appendChild(viewAllBtn);
  }

  // Project Tag Filters
  const filterBtns = document.querySelectorAll('.filter-tag-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.getAttribute('data-tag');
      renderProjects(projectsData, tag);
    });
  });

  // 4. Open Case Study Window
  const caseStudyWin = document.getElementById('window-case-study');
  function openCaseStudy(project) {
    if (!caseStudyWin) return;

    // Browser chrome elements
    const urlDisplay = document.getElementById('case-study-url-display');
    const launchBtn = document.getElementById('case-study-launch-btn');
    const repoBtn = document.getElementById('case-study-repo-btn');
    const backBtn = document.getElementById('case-study-back-btn');

    // Content elements
    const titleEl = document.getElementById('case-study-title');
    const tagsContainer = document.getElementById('case-study-tags');
    const summaryEl = document.getElementById('case-study-summary');
    const metricsContainer = document.getElementById('case-study-metrics');
    const problemEl = document.getElementById('case-study-problem');
    const roleEl = document.getElementById('case-study-role');
    const discoveryEl = document.getElementById('case-study-discovery');
    const decisionsEl = document.getElementById('case-study-decisions');
    const outcomeEl = document.getElementById('case-study-outcome');

    // Fill data
    if (urlDisplay) urlDisplay.textContent = project.liveUrl;
    if (launchBtn) {
      launchBtn.href = project.liveUrl;
      launchBtn.target = "_blank";
      launchBtn.rel = "noopener noreferrer";
    }
    if (repoBtn) {
      if (project.repoUrl) {
        repoBtn.href = project.repoUrl;
        repoBtn.target = "_blank";
        repoBtn.rel = "noopener noreferrer";
        repoBtn.style.display = "inline-flex";
      } else {
        repoBtn.style.display = "none";
      }
    }

    if (backBtn) {
      backBtn.onclick = () => {
        wm.openWindow('window-projects');
      };
    }

    if (titleEl) titleEl.textContent = project.title;
    if (summaryEl) summaryEl.textContent = project.summary;
    if (roleEl) roleEl.textContent = project.role;
    if (problemEl) problemEl.textContent = project.problem;
    if (discoveryEl) discoveryEl.textContent = project.discovery || "Deep customer interviews and qualitative surveys [PLACEHOLDER: Discovery Details].";
    if (decisionsEl) decisionsEl.textContent = project.decisions || "Prioritized core MVP features, managed technical scope trade-offs [PLACEHOLDER: Key Decisions].";
    if (outcomeEl) outcomeEl.textContent = project.outcome;

    // Tags
    if (tagsContainer) {
      tagsContainer.innerHTML = (project.tags || [])
        .map(t => `<span class="postcard-tag">${t}</span>`)
        .join('');
    }

    // Metrics Chips
    if (metricsContainer) {
      const metrics = project.metrics || ["Key Metric [PLACEHOLDER]", "Impact [PLACEHOLDER]"];
      metricsContainer.innerHTML = metrics
        .map(m => `<div class="metric-card">★ ${m}</div>`)
        .join('');
    }

    // Open and focus window
    wm.openWindow('window-case-study');
  }

  // 5. Desktop Icons Click / Double Click Handlers
  const desktopIcons = document.querySelectorAll('.desktop-icon-btn');
  desktopIcons.forEach(iconBtn => {
    const targetWinId = iconBtn.getAttribute('data-target-window');
    const targetProject = iconBtn.getAttribute('data-target-project');

    // Selection styling on click
    iconBtn.addEventListener('click', (e) => {
      desktopIcons.forEach(i => i.classList.remove('selected'));
      iconBtn.classList.add('selected');

      // On small screens or single-click, open immediately
      if (window.innerWidth <= 960) {
        openTarget();
      }
    });

    // Double-click to open window (classic OS metaphor)
    iconBtn.addEventListener('dblclick', () => {
      openTarget();
    });

    // Keyboard trigger
    iconBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        openTarget();
      }
    });

    function openTarget() {
      if (targetProject) {
        const found = projectsData.find(p => p.id === targetProject) || fallbackProjects.find(p => p.id === targetProject);
        if (found) {
          openCaseStudy(found);
          return;
        }
      }
      if (targetWinId) {
        wm.openWindow(targetWinId);
      }
    }
  });

  // Deselect desktop icons when clicking empty canvas
  document.querySelector('.desktop-workspace').addEventListener('click', (e) => {
    if (!e.target.closest('.desktop-icon-btn') && !e.target.closest('.os-window') && !e.target.closest('.top-menu-bar')) {
      desktopIcons.forEach(i => i.classList.remove('selected'));
    }
  });

  // 6. Top Menu Bar & Dropdown Actions
  const menuItems = document.querySelectorAll('.menu-item');
  function closeAllDropdowns() {
    menuItems.forEach(m => m.classList.remove('active'));
  }

  menuItems.forEach(item => {
    const btn = item.querySelector('.menu-btn');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasActive = item.classList.contains('active');
        closeAllDropdowns();
        if (!wasActive) item.classList.add('active');
      });
    }
  });

  // Close dropdowns on outside click
  document.addEventListener('click', () => {
    closeAllDropdowns();
  });

  // Global Dropdown Item Action Delegation
  document.querySelectorAll('[data-action]').forEach(actionBtn => {
    actionBtn.addEventListener('click', (e) => {
      const action = actionBtn.getAttribute('data-action');
      closeAllDropdowns();

      switch (action) {
        case 'open-about':
          wm.openWindow('window-about');
          break;
        case 'open-projects':
          wm.openWindow('window-projects');
          break;
        case 'open-contact':
          wm.openWindow('window-contact');
          break;
        case 'open-resume':
          wm.openWindow('window-resume');
          break;
        case 'cascade-windows':
          wm.cascadeWindows();
          break;
        case 'tile-windows':
          wm.tileWindows();
          break;
        case 'reset-positions':
          wm.resetPositions();
          break;
        case 'close-all':
          wm.closeAllWindows();
          break;
        case 'toggle-widget':
          const widget = document.querySelector('.system-widget');
          if (widget) {
            widget.style.display = widget.style.display === 'none' ? 'block' : 'none';
          }
          break;
      }
    });
  });

  // Quick Action Buttons inside Welcome Window
  const welcomeExploreBtn = document.getElementById('btn-explore-projects');
  if (welcomeExploreBtn) {
    welcomeExploreBtn.addEventListener('click', () => wm.openWindow('window-projects'));
  }

  const welcomeAboutBtn = document.getElementById('btn-explore-about');
  if (welcomeAboutBtn) {
    welcomeAboutBtn.addEventListener('click', () => wm.openWindow('window-about'));
  }

  // 7. Mixtape Player Toggle (Retro Audio Widget)
  const tapeBtn = document.getElementById('btn-play-tape');
  const tapeContainer = document.querySelector('.widget-mixtape');
  if (tapeBtn && tapeContainer) {
    let isPlaying = false;
    tapeBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      if (isPlaying) {
        tapeBtn.textContent = '⏸ PAUSE';
        tapeContainer.classList.add('playing');
      } else {
        tapeBtn.textContent = '▶ PLAY';
        tapeContainer.classList.remove('playing');
      }
    });
  }

  // 8. Staggered Entrance of Initial Windows on Desktop
  if (window.innerWidth > 960) {
    // Bring Welcome Window to front
    const welcomeObj = wm.windows.find(w => w.id === 'window-welcome');
    if (welcomeObj) {
      setTimeout(() => {
        wm.focusWindow(welcomeObj);
      }, 100);
    }
  }
});
