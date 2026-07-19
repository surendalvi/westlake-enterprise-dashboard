/**
 * Westlake Enterprise Dashboard Application Logic
 * Powered by Ingenero Digital Solutions
 */

class WestlakeDashboardApp {
  constructor() {
    this.data = WESTLAKE_DATA;
    this.currentModule = 'exec'; // 'exec', 'module1', 'module2'
    this.currentScope = 'enterprise'; // 'enterprise', 'site', 'asset'
    this.currentAssetPerspective = 'process'; // 'process' or 'amh'
    this.selectedSite = 'all';
    this.selectedAssetId = 'P1-F03'; // Default asset
    this.sidebarCollapsed = false;
    this.isLightTheme = false;

    // AI Key Settings
    this.apiKey = localStorage.getItem('ingenero_ai_key') || '';
    this.apiProvider = localStorage.getItem('ingenero_ai_provider') || 'gemini-auto';

    this.charts = {};
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.populateAssetDropdown();
      this.renderBreadcrumbs();
      this.renderAiModelsGrid();
      this.renderExecView();
      this.renderModule1View();
      this.renderModule2View();
      this.renderAssetView();
      this.initCharts();
      this.initSchematicHoverTooltips();
      this.runSimulator();
      this.loadApiKeyStatus();
    });
  }

  // Theme Toggle (Dark / Light Mode)
  toggleTheme() {
    this.isLightTheme = !this.isLightTheme;
    const body = document.body;
    const icon = document.getElementById('themeToggleIcon');
    const label = document.getElementById('themeToggleLabel');

    if (this.isLightTheme) {
      body.classList.add('light-theme');
      icon.innerText = '☀️';
      label.innerText = 'Light Theme';
    } else {
      body.classList.remove('light-theme');
      icon.innerText = '🌙';
      label.innerText = 'Dark Theme';
    }

    const textColor = this.isLightTheme ? '#0f172a' : '#94a3b8';
    Object.values(this.charts).forEach(chart => {
      if (chart && chart.options && chart.options.scales) {
        if (chart.options.scales.x) chart.options.scales.x.ticks.color = textColor;
        if (chart.options.scales.y) chart.options.scales.y.ticks.color = textColor;
        chart.update();
      }
    });
  }

  // Sidebar Toggle
  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    const sidebar = document.getElementById('sidebar');
    if (this.sidebarCollapsed) {
      sidebar.classList.add('collapsed');
    } else {
      sidebar.classList.remove('collapsed');
    }
  }

  // Navigation Logic
  switchModule(moduleKey, scopeKey = 'enterprise') {
    this.currentModule = moduleKey;
    this.currentScope = scopeKey;

    if (moduleKey === 'module1' && scopeKey === 'asset') {
      this.currentAssetPerspective = 'process';
    } else if (moduleKey === 'module2' && scopeKey === 'asset') {
      this.currentAssetPerspective = 'amh';
    }

    document.querySelectorAll('.view-section').forEach(sec => sec.style.display = 'none');
    document.querySelectorAll('.sidebar-item').forEach(item => item.classList.remove('active'));

    if (moduleKey === 'exec') {
      document.getElementById('viewExec').style.display = 'block';
      document.getElementById('navExec').classList.add('active');
    } else if (moduleKey === 'module1') {
      if (scopeKey === 'site') {
        document.getElementById('viewMod1').style.display = 'block';
        document.getElementById('navMod1Site').classList.add('active');
      } else if (scopeKey === 'asset') {
        document.getElementById('viewAsset').style.display = 'block';
        document.getElementById('navMod1Asset').classList.add('active');
      } else {
        document.getElementById('viewMod1').style.display = 'block';
        document.getElementById('navMod1').classList.add('active');
      }
    } else if (moduleKey === 'module2') {
      document.getElementById('viewMod2').style.display = 'block';
      if (scopeKey === 'site') {
        document.getElementById('navMod2Site').classList.add('active');
      } else if (scopeKey === 'asset') {
        document.getElementById('viewAsset').style.display = 'block';
        document.getElementById('viewMod2').style.display = 'none';
        document.getElementById('navMod2Asset').classList.add('active');
      } else {
        document.getElementById('navMod2').classList.add('active');
      }
    }

    if (scopeKey === 'asset') {
      document.getElementById('viewExec').style.display = 'none';
      document.getElementById('viewMod1').style.display = 'none';
      document.getElementById('viewMod2').style.display = 'none';
      document.getElementById('viewAsset').style.display = 'block';
      this.renderAssetView();
      this.switchAssetPerspective(this.currentAssetPerspective);
    }

    this.updateScopeButtons();
    this.renderBreadcrumbs();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  setScope(scopeKey) {
    this.currentScope = scopeKey;
    this.switchModule(this.currentModule, scopeKey);
  }

  switchAssetPerspective(perspective) {
    this.currentAssetPerspective = perspective;
    document.getElementById('assetTabProcess').classList.remove('active');
    document.getElementById('assetTabAmh').classList.remove('active');

    if (perspective === 'process') {
      document.getElementById('assetTabProcess').classList.add('active');
      document.getElementById('assetPerspectiveProcessContainer').style.display = 'block';
      document.getElementById('assetPerspectiveAmhContainer').style.display = 'none';
    } else {
      document.getElementById('assetTabAmh').classList.add('active');
      document.getElementById('assetPerspectiveProcessContainer').style.display = 'none';
      document.getElementById('assetPerspectiveAmhContainer').style.display = 'block';
    }
    
    this.renderAssetHeroHeader();
  }

  updateScopeButtons() {
    document.querySelectorAll('.scope-btn').forEach(btn => btn.classList.remove('active'));
    if (this.currentScope === 'enterprise') document.getElementById('scopeEnterpriseBtn').classList.add('active');
    else if (this.currentScope === 'site') document.getElementById('scopeSiteBtn').classList.add('active');
    else if (this.currentScope === 'asset') document.getElementById('scopeAssetBtn').classList.add('active');
  }

  handleSiteChange(siteId) {
    this.selectedSite = siteId;
    this.renderExecView();
    this.renderModule1View();
    this.renderModule2View();
    this.populateAssetDropdown();
  }

  handleAssetSelect(assetId) {
    this.selectedAssetId = assetId;
    this.renderAssetView();
  }

  renderBreadcrumbs() {
    const container = document.getElementById('breadcrumbTrail');
    let siteLabel = "All Target Sites";
    if (this.selectedSite !== 'all') {
      const s = this.data.sites.find(item => item.id === this.selectedSite);
      if (s) siteLabel = s.name;
    }

    let modTitle = "Executive Opportunity";
    if (this.currentModule === 'module1') modTitle = "Process & Energy Hub";
    else if (this.currentModule === 'module2') modTitle = "Asset Metric Hub (AMH)";

    let scopeLabel = "Enterprise Wide";
    if (this.currentScope === 'site') scopeLabel = `Site View (${siteLabel})`;
    else if (this.currentScope === 'asset') {
      const furnace = this.data.furnaces.find(f => f.id === this.selectedAssetId);
      const persLabel = this.currentAssetPerspective === 'amh' ? 'AMH Maintenance' : 'Process';
      scopeLabel = `Asset Deep-Dive [${persLabel}] (${furnace ? furnace.name : this.selectedAssetId})`;
    }

    const html = `
      <span class="breadcrumb-item" onclick="window.app.switchModule('exec', 'enterprise')">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
        Westlake Enterprise
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item" onclick="window.app.switchModule('${this.currentModule}', 'enterprise')">
        ${modTitle}
      </span>
      <span class="breadcrumb-separator">/</span>
      <span class="breadcrumb-item active">
        ${scopeLabel}
      </span>
    `;

    container.innerHTML = html;
  }

  initSchematicHoverTooltips() {
    const pins = document.querySelectorAll('.schematic-pass-pin');
    const tooltip = document.getElementById('tmtHoverTooltip');

    pins.forEach(pin => {
      pin.addEventListener('mouseenter', (e) => {
        const pass = pin.getAttribute('data-pass');
        const temp = pin.getAttribute('data-temp');
        const status = pin.getAttribute('data-status');
        const rec = pin.getAttribute('data-rec');

        document.getElementById('tmtTooltipPass').innerText = pass;
        document.getElementById('tmtTooltipTemp').innerText = temp;
        document.getElementById('tmtTooltipStatus').innerText = status;
        document.getElementById('tmtTooltipRec').innerText = rec;

        tooltip.classList.add('active');
      });

      pin.addEventListener('mousemove', (e) => {
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY + 15}px`;
      });

      pin.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
      });
    });
  }

  renderAiModelsGrid() {
    const grid = document.getElementById('aiModelsGrid');
    if (!grid) return;

    let html = '';
    this.data.enterprise.aiModels.forEach(m => {
      html += `
        <div class="ai-model-card">
          <div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.3rem;">
              <span style="font-size:0.68rem; font-weight:800; color:var(--accent-orange);">${m.id}</span>
              <span class="model-badge-active">● ${m.status}</span>
            </div>
            <div style="font-weight:700; font-size:0.85rem; color:var(--text-primary); line-height:1.2; margin-bottom:0.3rem;">${m.name}</div>
            <div style="font-size:0.72rem; color:var(--text-secondary); margin-bottom:0.5rem;">${m.type}</div>
          </div>
          <div>
            <div style="display:flex; align-items:baseline; justify-content:space-between;">
              <span style="font-size:0.7rem; color:var(--text-muted);">Accuracy Score:</span>
              <span class="model-accuracy-pill">${m.accuracy}</span>
            </div>
          </div>
        </div>
      `;
    });
    grid.innerHTML = html;
  }

  openDomainGlossary(termKey) {
    const info = this.data.domainGlossary[termKey];
    if (!info) return;

    document.getElementById('glossaryTitle').innerText = info.title;
    document.getElementById('glossaryWhat').innerText = info.whatIsIt;
    document.getElementById('glossaryPhysics').innerText = info.physicsModel;
    document.getElementById('glossaryImpact').innerText = info.financialImpact;

    document.getElementById('glossaryModal').classList.add('active');
  }

  closeDomainGlossary() {
    document.getElementById('glossaryModal').classList.remove('active');
  }

  renderExecView() {
    const presContainer = document.getElementById('execPrescriptionsList');
    let presHtml = '';
    this.data.prescriptions.level1.forEach(p => {
      presHtml += `
        <div class="prescription-item">
          <div class="prescription-main">
            <div>
              <span class="prescription-tag tag-high">${p.urgency} URGENCY</span>
              <span class="prescription-tag tag-process">${p.category}</span>
            </div>
            <div class="prescription-head">${p.title}</div>
            <div class="prescription-desc">${p.description}</div>
            <button class="prescription-action-btn" onclick="alert('Directive Executed: ${p.action}')">⚡ ${p.action}</button>
          </div>
          <div>
            <div class="prescription-impact">+${p.impact}</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); text-align:right; margin-top:0.25rem;">Opportunity Value</div>
          </div>
        </div>
      `;
    });
    presContainer.innerHTML = presHtml;

    const tbody = document.getElementById('siteMatrixTbody');
    let tableHtml = '';
    const filteredSites = this.selectedSite === 'all' ? this.data.sites : this.data.sites.filter(s => s.id === this.selectedSite);

    filteredSites.forEach(s => {
      let badgeClass = `site-badge-${s.id}`;
      tableHtml += `
        <tr class="clickable" onclick="window.app.handleSiteChange('${s.id}')">
          <td style="font-weight:700; color:var(--text-primary);">
            <span class="site-badge ${badgeClass}">${s.name}</span>
          </td>
          <td style="color:var(--text-secondary);">${s.location}</td>
          <td><span style="color:${s.color}; font-weight:700;">${s.onlineFurnaces} Online</span> / ${s.totalFurnaces} Total</td>
          <td><span style="color:var(--accent-emerald); font-weight:700;">${s.avgThermalEfficiency}%</span></td>
          <td>${s.specificEnergy} MMBtu/MT</td>
          <td>${s.ethyleneYield} wt%</td>
          <td style="color:var(--accent-orange); font-weight:700;">$${s.processOppYr.toFixed(2)} MM / yr</td>
          <td style="color:var(--accent-emerald); font-weight:700;">$${s.assetOppYr.toFixed(2)} MM / yr</td>
          <td style="font-family:var(--font-display); font-weight:800; color:var(--accent-amber); font-size:1rem;">$${s.totalOpportunityYr.toFixed(2)} MM / yr</td>
          <td>
            <button style="background:${s.color}25; border:1px solid ${s.color}; color:${s.color}; padding:0.25rem 0.6rem; border-radius:var(--radius-sm); font-size:0.75rem; cursor:pointer;" onclick="event.stopPropagation(); window.app.handleSiteChange('${s.id}')">
              Filter Site
            </button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = tableHtml;
  }

  renderModule1View() {
    const presContainer = document.getElementById('module1PrescriptionsList');
    let html = '';
    this.data.prescriptions.module1.forEach(p => {
      html += `
        <div class="prescription-item">
          <div class="prescription-main">
            <div class="prescription-tag tag-process">Target: ${p.targetAsset}</div>
            <div class="prescription-head">${p.title}</div>
            <div class="prescription-desc">${p.description}</div>
          </div>
          <div class="prescription-impact">+${p.impact}</div>
        </div>
      `;
    });
    presContainer.innerHTML = html;

    const tbody = document.getElementById('fleetRankingTbody');
    let fleetHtml = '';
    let furnaces = this.data.furnaces;
    if (this.selectedSite !== 'all') {
      furnaces = furnaces.filter(f => f.siteId === this.selectedSite);
    }
    const sorted = [...furnaces].sort((a, b) => b.opportunityDayMM - a.opportunityDayMM);

    sorted.forEach((f, idx) => {
      const statusClass = f.status === 'ONLINE' ? 'status-online' : 'status-decoking';
      const badgeClass = `site-badge-${f.siteId}`;

      fleetHtml += `
        <tr class="clickable" onclick="window.app.handleAssetSelect('${f.id}')">
          <td style="font-weight:700; color:var(--accent-orange);">#${idx + 1}</td>
          <td style="font-weight:700; color:var(--text-primary);">${f.name} <span style="font-size:0.75rem; color:var(--text-muted);">(${f.designClass})</span></td>
          <td><span class="site-badge ${badgeClass}">${f.siteName}</span></td>
          <td><span class="status-pill ${statusClass}"><span class="status-dot"></span>${f.status}</span></td>
          <td>${f.runDays} / ${f.maxTargetRunDays} days</td>
          <td style="color:${f.thermalEfficiency >= 93 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; font-weight:700;">${f.thermalEfficiency}%</td>
          <td>${f.specificEnergy}</td>
          <td>${f.ethyleneYield}%</td>
          <td style="color:${f.deltaPressureBar > 0.5 ? 'var(--accent-rose)' : 'var(--text-primary)'}; font-weight:700;">${f.deltaPressureBar} bar</td>
          <td style="font-family:var(--font-display); font-weight:700; color:var(--accent-amber);">$${(f.processOppDayMM * 365).toFixed(2)} MM / yr</td>
          <td>
            <button style="background:rgba(255,107,0,0.15); border:1px solid var(--accent-orange); color:var(--accent-orange); padding:0.25rem 0.6rem; border-radius:var(--radius-sm); font-size:0.75rem; cursor:pointer;" onclick="event.stopPropagation(); window.app.handleAssetSelect('${f.id}')">
              Coil Detail ➔
            </button>
          </td>
        </tr>
      `;
    });
    tbody.innerHTML = fleetHtml;
  }

  renderModule2View() {
    const presContainer = document.getElementById('module2PrescriptionsList');
    let html = '';
    this.data.prescriptions.module2.forEach(p => {
      html += `
        <div class="prescription-item">
          <div class="prescription-main">
            <div class="prescription-tag tag-medium">AMH Maintenance Directive</div>
            <div class="prescription-head">${p.title}</div>
            <div class="prescription-desc">${p.description}</div>
          </div>
          <div class="prescription-impact">+${p.impact}</div>
        </div>
      `;
    });
    presContainer.innerHTML = html;

    const tbody = document.getElementById('amhSiteMatrixTbody');
    if (!tbody) return;

    let amhHtml = '';
    const filteredSites = this.selectedSite === 'all' ? this.data.sites : this.data.sites.filter(s => s.id === this.selectedSite);

    filteredSites.forEach(s => {
      const amh = s.amhMetrics;
      const badgeClass = `site-badge-${s.id}`;
      amhHtml += `
        <tr class="clickable" onclick="window.app.handleSiteChange('${s.id}')">
          <td style="font-weight:700; color:var(--text-primary);">
            <span class="site-badge ${badgeClass}">${s.name}</span>
          </td>
          <td style="font-family:var(--font-display); font-weight:700; color:var(--accent-emerald);">$${amh.totalMaintSpendYrMM.toFixed(2)} MM / yr</td>
          <td>$${amh.maintSpendPerDay.toLocaleString()} / day</td>
          <td style="font-weight:700; color:var(--accent-orange);">$${amh.costPerTonEthylene} / MT</td>
          <td><strong>${amh.totalWorkOrders}</strong> orders</td>
          <td><span style="color:var(--accent-rose); font-weight:700;">${amh.unplannedBreakIns}</span> (${(amh.unplannedBreakIns / amh.totalWorkOrders * 100).toFixed(0)}%)</td>
          <td style="color:var(--accent-emerald); font-weight:700;">${amh.predictiveRatioPct}%</td>
          <td><strong style="color:var(--accent-cyan);">${amh.mtbfDays}</strong> days</td>
          <td>${amh.mttrHours} hrs</td>
          <td style="font-size:0.8rem;">${amh.laborEmployeesPct}% Emp / ${amh.laborEmbeddedPct}% Emb / ${amh.laborSpecializedPct}% Spec</td>
        </tr>
      `;
    });
    tbody.innerHTML = amhHtml;
  }

  renderAssetHeroHeader() {
    const furnace = this.data.furnaces.find(f => f.id === this.selectedAssetId) || this.data.furnaces[0];
    const badgeClass = `site-badge-${furnace.siteId}`;
    const heroContainer = document.getElementById('assetHeroContainer');

    if (this.currentAssetPerspective === 'amh') {
      const sap = furnace.sapMaintenance;
      heroContainer.innerHTML = `
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.12), var(--bg-card)); border:1px solid var(--accent-emerald); border-radius:var(--radius-lg); padding:1.5rem 2rem; margin-bottom:1.5rem; display:grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap:1.5rem; align-items:center; box-shadow: 0 4px 20px rgba(16,185,129,0.15);">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <span class="site-badge ${badgeClass}">${furnace.siteName}</span>
              <span style="font-size:0.75rem; color:var(--accent-emerald); font-weight:700;">AMH ASSET METRICS PERSPECTIVE</span>
            </div>
            <div style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--text-primary);">${furnace.name}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.2rem;">
              SAP ID: <strong style="color:var(--text-primary);">${furnace.sapId}</strong> | Design: ${furnace.designClass}
            </div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Annual SAP Maint Spend</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">$${sap.totalCostYrMM.toFixed(3)} MM / yr</div>
            <div style="font-size:0.75rem; color:var(--accent-emerald); margin-top:0.2rem;">$${sap.costPerDay} / operating day</div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Asset Reliability Score</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--accent-emerald); margin-top:0.25rem;">${sap.reliabilityScore}</div>
            <div style="font-size:0.75rem; color:${sap.creepDamageIndex > 0.7 ? 'var(--accent-rose)' : 'var(--text-secondary)'}; margin-top:0.2rem;">Creep Index: ${sap.creepDamageIndex} (${sap.failureRiskRating})</div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">AMH Maintenance Opportunity</div>
            <div style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; color:var(--accent-emerald); margin-top:0.25rem;">+$${(furnace.assetOppDayMM * 365).toFixed(3)} MM / yr</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Break-in & Labor Optimization</div>
          </div>
        </div>
      `;
    } else {
      heroContainer.innerHTML = `
        <div style="background:linear-gradient(135deg, rgba(255,107,0,0.12), var(--bg-card)); border:1px solid var(--accent-orange); border-radius:var(--radius-lg); padding:1.5rem 2rem; margin-bottom:1.5rem; display:grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap:1.5rem; align-items:center; box-shadow: 0 4px 20px rgba(255,107,0,0.15);">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.3rem;">
              <span class="site-badge ${badgeClass}">${furnace.siteName}</span>
              <span style="font-size:0.75rem; color:var(--accent-orange); font-weight:700;">PROCESS EFFICIENCY PERSPECTIVE</span>
            </div>
            <div style="font-family:var(--font-display); font-size:2rem; font-weight:800; color:var(--text-primary);">${furnace.name}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:0.2rem;">
              SAP ID: <strong style="color:var(--text-primary);">${furnace.sapId}</strong> | Design: ${furnace.designClass}
            </div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Run Cycle Status</div>
            <div style="font-size:1.3rem; font-weight:700; color:var(--text-primary); margin-top:0.25rem;">${furnace.runDays} / ${furnace.maxTargetRunDays} Days</div>
            <div style="font-size:0.75rem; color:var(--accent-orange); margin-top:0.2rem;">Coil Age: ${furnace.coilAgeYears} Years</div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Thermal Efficiency</div>
            <div style="font-size:1.3rem; font-weight:700; color:${furnace.thermalEfficiency >= 93 ? 'var(--accent-emerald)' : 'var(--accent-amber)'}; margin-top:0.25rem;">${furnace.thermalEfficiency}%</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Delta-P: ${furnace.deltaPressureBar} bar</div>
          </div>

          <div style="border-left:1px solid var(--border-color); padding-left:1.25rem;">
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Process Opportunity</div>
            <div style="font-family:var(--font-display); font-size:1.6rem; font-weight:800; color:var(--accent-orange); margin-top:0.25rem;">+$${(furnace.processOppDayMM * 365).toFixed(3)} MM / yr</div>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:0.2rem;">Energy & Yield Optimization</div>
          </div>
        </div>
      `;
    }
  }

  populateAssetDropdown() {
    const dropdown = document.getElementById('assetSelectDropdown');
    let furnaces = this.data.furnaces;
    if (this.selectedSite !== 'all') {
      furnaces = furnaces.filter(f => f.siteId === this.selectedSite);
    }
    let html = '';
    furnaces.forEach(f => {
      html += `<option value="${f.id}" ${f.id === this.selectedAssetId ? 'selected' : ''}>${f.siteName} - ${f.name} (${f.designClass})</option>`;
    });
    dropdown.innerHTML = html;
  }

  renderAssetView() {
    const furnace = this.data.furnaces.find(f => f.id === this.selectedAssetId) || this.data.furnaces[0];

    this.renderAssetHeroHeader();

    const processPresList = document.getElementById('assetProcessPrescriptionsList');
    let phtml = '';
    furnace.prescriptions.process.forEach(p => {
      phtml += `
        <div class="prescription-item" style="border-color:var(--border-color);">
          <div class="prescription-main">
            <div class="prescription-head" style="color:var(--accent-orange);">⚡ Process Prescription</div>
            <div class="prescription-desc" style="font-size:0.9rem; color:var(--text-primary);">${p}</div>
          </div>
          <button class="prescription-action-btn" onclick="alert('Process command sent to DCS for asset ${furnace.name}')">Apply Action</button>
        </div>
      `;
    });
    processPresList.innerHTML = phtml;

    const tmtGrid = document.getElementById('tmtHeatmapGrid');
    let tmtHtml = '';
    furnace.tmtPasses.forEach((temp, idx) => {
      let tempClass = 'temp-normal';
      if (temp > 1030) tempClass = 'temp-hotspot';
      else if (temp > 1005) tempClass = 'temp-warning';

      tmtHtml += `
        <div class="tmt-pass-card" style="border-color: ${temp > 1030 ? 'var(--accent-rose)' : 'var(--border-color)'};">
          <div class="tmt-pass-title">Pass ${idx + 1}</div>
          <div class="tmt-pass-temp ${tempClass}">${temp} °C</div>
          <div style="font-size:0.65rem; color:var(--text-muted); margin-top:0.3rem;">${temp > 1030 ? 'HOT-SPOT' : 'Normal'}</div>
        </div>
      `;
    });
    tmtGrid.innerHTML = tmtHtml;

    const amhPresList = document.getElementById('assetAmhPrescriptionsList');
    let ahtml = '';
    furnace.prescriptions.amh.forEach(p => {
      ahtml += `
        <div class="prescription-item" style="border-color:var(--border-color);">
          <div class="prescription-main">
            <div class="prescription-head" style="color:var(--accent-emerald);">🛠️ AMH Reliability Directive</div>
            <div class="prescription-desc" style="font-size:0.9rem; color:var(--text-primary);">${p}</div>
          </div>
          <button class="prescription-action-btn" style="border-color:var(--accent-emerald); color:var(--accent-emerald);" onclick="alert('AMH Directive logged in SAP for asset ${furnace.name}')">Execute Directive</button>
        </div>
      `;
    });
    amhPresList.innerHTML = ahtml;

    const compGrid = document.getElementById('assetComponentScopeGrid');
    const comp = furnace.sapMaintenance.componentScope;
    compGrid.innerHTML = `
      <div style="background:var(--bg-primary); padding:0.85rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-size:0.75rem; color:var(--text-muted);">Convection Module Spend</div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${comp.convection}</div>
      </div>
      <div style="background:var(--bg-primary); padding:0.85rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-size:0.75rem; color:var(--text-muted);">Radiant Coils & Retubes</div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--accent-orange);">${comp.radiantCoils}</div>
      </div>
      <div style="background:var(--bg-primary); padding:0.85rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-size:0.75rem; color:var(--text-muted);">Refractory Insulation</div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${comp.refractory}</div>
      </div>
      <div style="background:var(--bg-primary); padding:0.85rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
        <div style="font-size:0.75rem; color:var(--text-muted);">Burner Assemblies</div>
        <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary);">${comp.burners}</div>
      </div>
    `;

    const relCard = document.getElementById('assetReliabilityCard');
    const sap = furnace.sapMaintenance;
    relCard.innerHTML = `
      <div style="display:grid; grid-template-columns: repeat(2, 1fr); gap:1rem; margin-bottom:1rem;">
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Reliability Index</div>
          <div style="font-size:1.4rem; font-weight:800; color:var(--accent-emerald);">${sap.reliabilityScore}</div>
        </div>
        <div>
          <div style="font-size:0.75rem; color:var(--text-muted);">Creep Damage Index</div>
          <div style="font-size:1.4rem; font-weight:800; color:${sap.creepDamageIndex > 0.7 ? 'var(--accent-rose)' : 'var(--accent-amber)'};">${sap.creepDamageIndex}</div>
        </div>
      </div>
      <div style="background:var(--bg-primary); padding:0.85rem; border-radius:var(--radius-md); font-size:0.85rem; color:var(--text-secondary);">
        <div>Failure Risk Rating: <strong style="color:${sap.failureRiskRating === 'HIGH' ? 'var(--accent-rose)' : 'var(--text-primary)'};">${sap.failureRiskRating}</strong></div>
        <div style="margin-top:0.3rem;">Labor Allocation: <strong>${sap.laborMix}</strong></div>
        <div style="margin-top:0.3rem;">Repair vs Replace: <strong>${sap.repairVsReplace}</strong></div>
      </div>
    `;

    const woTbody = document.getElementById('assetWorkOrdersTbody');
    const orders = this.data.workOrders.filter(w => w.furnaceId === furnace.id || w.siteId === furnace.siteId);
    let woHtml = '';
    
    if (orders.length === 0) {
      woHtml = `<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:2rem;">No recent SAP work orders reported for ${furnace.name}. Asset operating cleanly.</td></tr>`;
    } else {
      orders.forEach(w => {
        woHtml += `
          <tr>
            <td style="font-weight:700; color:var(--accent-orange);">${w.id}</td>
            <td>${w.date}</td>
            <td><span class="prescription-tag ${w.category === 'EMERGENCY' ? 'tag-high' : 'tag-medium'}">${w.category}</span></td>
            <td style="font-weight:600; color:var(--text-primary);">${w.type}</td>
            <td>${w.component}</td>
            <td style="font-family:var(--font-display); font-weight:700; color:var(--accent-amber);">$${w.costMM} MM (${w.costUSD})</td>
            <td style="font-size:0.8rem; color:var(--text-secondary);">${w.laborMix}</td>
            <td style="font-size:0.8rem; color:var(--text-secondary);">${w.description}</td>
          </tr>
        `;
      });
    }
    woTbody.innerHTML = woHtml;
  }

  runSimulator() {
    const feed = parseFloat(document.getElementById('simFeedSlider').value);
    const cot = parseFloat(document.getElementById('simCotSlider').value);
    const shc = parseFloat(document.getElementById('simShcSlider').value);

    document.getElementById('simFeedVal').innerText = `${feed.toFixed(1)} MT/hr`;
    document.getElementById('simCotVal').innerText = `${cot.toFixed(0)} °C`;
    document.getElementById('simShcVal').innerText = `${shc.toFixed(2)}`;

    const ethYield = (34.0 + (cot - 840) * 0.08 - (shc - 0.45) * 4.0).toFixed(2);
    const specNrg = (13.4 - (cot - 840) * 0.015 + (feed - 28) * 0.05).toFixed(2);
    const dailyOppMM = (0.00052 + (ethYield - 34.0) * 0.00045 + (13.8 - specNrg) * 0.00032) * 365;

    document.getElementById('simOutEth').innerText = `${ethYield} wt%`;
    document.getElementById('simOutNrg').innerText = `${specNrg} MMBtu`;
    document.getElementById('simOutOpp').innerText = `$${dailyOppMM.toFixed(2)} MM / yr`;
  }

  initCharts() {
    const textColor = this.isLightTheme ? '#0f172a' : '#94a3b8';

    const ctxSite = document.getElementById('chartSiteOpportunity').getContext('2d');
    this.charts.siteOpp = new Chart(ctxSite, {
      type: 'bar',
      data: {
        labels: this.data.sites.map(s => s.name),
        datasets: [
          { label: 'Process Opportunity (MM$/yr)', data: this.data.sites.map(s => s.processOppYr), backgroundColor: '#FF6B00' },
          { label: 'AMH Asset Opportunity (MM$/yr)', data: this.data.sites.map(s => s.assetOppYr), backgroundColor: '#10b981' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxDrivers = document.getElementById('chartOpportunityDrivers').getContext('2d');
    this.charts.drivers = new Chart(ctxDrivers, {
      type: 'doughnut',
      data: {
        labels: ['Specific Energy ($1.25 MM)', 'Coking & Run Length ($0.98 MM)', 'Decoke Delta-P ($0.89 MM)', 'Unplanned Repair ($1.12 MM)', 'Labor Mix ($1.00 MM)'],
        datasets: [{ data: [1.25, 0.98, 0.89, 1.12, 1.00], backgroundColor: ['#FF6B00', '#F97316', '#10b981', '#f59e0b', '#8b5cf6'] }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right', labels: { color: textColor, font: { size: 11 } } } }
      }
    });

    const ctxSoft = document.getElementById('chartSoftSensors').getContext('2d');
    this.charts.softSensors = new Chart(ctxSoft, {
      type: 'line',
      data: {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
        datasets: [
          { label: 'Soft Sensor Instant Yield (Real-Time)', data: [34.2, 34.5, 34.8, 35.1, 34.9, 35.2, 35.0], borderColor: '#FF6B00', tension: 0.3, borderWidth: 3 },
          { label: 'Physical GC Sample (20-min delay)', data: [34.0, 34.2, 34.5, 34.8, 34.8, 35.0, 34.9], borderColor: '#f43f5e', borderDash: [5, 5], tension: 0.1 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxAmhSpend = document.getElementById('chartAmhSiteSpend').getContext('2d');
    this.charts.amhSpend = new Chart(ctxAmhSpend, {
      type: 'bar',
      data: {
        labels: this.data.sites.map(s => s.name),
        datasets: [
          { label: 'Convection Module ($ MM)', data: this.data.sites.map(s => s.amhMetrics.componentSpendMM.convection), backgroundColor: '#FF6B00' },
          { label: 'Radiant Coils ($ MM)', data: this.data.sites.map(s => s.amhMetrics.componentSpendMM.radiantCoils), backgroundColor: '#06B6D4' },
          { label: 'Refractory ($ MM)', data: this.data.sites.map(s => s.amhMetrics.componentSpendMM.refractory), backgroundColor: '#10B981' },
          { label: 'Burners ($ MM)', data: this.data.sites.map(s => s.amhMetrics.componentSpendMM.burners), backgroundColor: '#8B5CF6' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxAmhRel = document.getElementById('chartAmhSiteReliability').getContext('2d');
    this.charts.amhRel = new Chart(ctxAmhRel, {
      type: 'bar',
      data: {
        labels: this.data.sites.map(s => s.name),
        datasets: [
          { label: 'MTBF (Mean Days Between Failures)', data: this.data.sites.map(s => s.amhMetrics.mtbfDays), backgroundColor: '#10B981' },
          { label: 'MTTR (Mean Repair Hours)', data: this.data.sites.map(s => s.amhMetrics.mttrHours), backgroundColor: '#f59e0b' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxSap = document.getElementById('chartSapCategories').getContext('2d');
    this.charts.sapCategories = new Chart(ctxSap, {
      type: 'bar',
      data: {
        labels: ['Calvert City', 'LACC Ethylene', 'Petro 1', 'Petro 2'],
        datasets: [
          { label: 'Predictive (%)', data: [65, 68, 62, 52], backgroundColor: '#10b981' },
          { label: 'Reactive (%)', data: [23, 21, 25, 30], backgroundColor: '#f59e0b' },
          { label: 'Emergency (%)', data: [12, 11, 13, 18], backgroundColor: '#f43f5e' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxLabor = document.getElementById('chartLaborMix').getContext('2d');
    this.charts.laborMix = new Chart(ctxLabor, {
      type: 'bar',
      data: {
        labels: ['Calvert City', 'LACC Ethylene', 'Petro 1', 'Petro 2'],
        datasets: [
          { label: 'Westlake Employees', data: [58, 62, 55, 44], backgroundColor: '#FF6B00' },
          { label: 'Embedded Contractors', data: [28, 26, 30, 34], backgroundColor: '#8b5cf6' },
          { label: 'Specialized Contractors', data: [14, 12, 15, 22], backgroundColor: '#f59e0b' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { stacked: true, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: { legend: { labels: { color: textColor } } }
      }
    });

    const ctxSolomon = document.getElementById('chartSolomonBenchmark').getContext('2d');
    const calvertPoints = this.data.furnaces.filter(f => f.siteId === 'calvert').map(f => ({ x: f.coilAgeYears, y: f.sapMaintenance.costPerDay, name: f.name, site: f.siteName }));
    const laccPoints = this.data.furnaces.filter(f => f.siteId === 'lacc').map(f => ({ x: f.coilAgeYears, y: f.sapMaintenance.costPerDay, name: f.name, site: f.siteName }));
    const petro1Points = this.data.furnaces.filter(f => f.siteId === 'petro1').map(f => ({ x: f.coilAgeYears, y: f.sapMaintenance.costPerDay, name: f.name, site: f.siteName }));
    const petro2Points = this.data.furnaces.filter(f => f.siteId === 'petro2').map(f => ({ x: f.coilAgeYears, y: f.sapMaintenance.costPerDay, name: f.name, site: f.siteName }));

    this.charts.solomon = new Chart(ctxSolomon, {
      type: 'scatter',
      data: {
        datasets: [
          { label: 'Calvert City Complex', data: calvertPoints, backgroundColor: '#FF6B00', pointRadius: 7, pointHoverRadius: 10 },
          { label: 'LACC Ethylene', data: laccPoints, backgroundColor: '#06B6D4', pointRadius: 7, pointHoverRadius: 10 },
          { label: 'Petro 1 Olefins', data: petro1Points, backgroundColor: '#10B981', pointRadius: 7, pointHoverRadius: 10 },
          { label: 'Petro 2 Olefins', data: petro2Points, backgroundColor: '#8B5CF6', pointRadius: 7, pointHoverRadius: 10 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: { title: { display: true, text: 'Coil Age (Years)', color: textColor }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } },
          y: { title: { display: true, text: 'Maintenance Cost ($/Day)', color: textColor }, grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: textColor } }
        },
        plugins: {
          legend: { position: 'top', labels: { color: textColor, font: { size: 12, weight: 'bold' } } },
          tooltip: {
            callbacks: {
              label: (context) => `${context.raw.name} (${context.raw.site}): ${context.raw.x} yrs coil age, $${context.raw.y}/day maint cost`
            }
          }
        }
      }
    });
  }

  openPitchModal() {
    document.getElementById('pitchModal').classList.add('active');
  }

  closePitchModal() {
    document.getElementById('pitchModal').classList.remove('active');
  }

  toggleAiChat() {
    document.getElementById('aiChatWindow').classList.toggle('active');
  }

  toggleApiKeyDrawer() {
    const drawer = document.getElementById('aiApiDrawer');
    drawer.classList.toggle('active');
  }

  loadApiKeyStatus() {
    const input = document.getElementById('aiApiKeyInput');
    const providerSelect = document.getElementById('aiProviderSelect');
    const status = document.getElementById('aiApiKeyStatus');

    if (this.apiKey) {
      input.value = this.apiKey;
      providerSelect.value = this.apiProvider;
      status.style.color = 'var(--accent-emerald)';
      status.innerText = `Key active (${this.apiProvider.toUpperCase()} REST Connected)`;
    } else {
      status.style.color = 'var(--text-muted)';
      status.innerText = 'Using Ingenero Built-In Physics Engine';
    }
  }

  saveApiKey() {
    const key = document.getElementById('aiApiKeyInput').value.trim();
    const provider = document.getElementById('aiProviderSelect').value;

    this.apiKey = key;
    this.apiProvider = provider;

    if (key) {
      localStorage.setItem('ingenero_ai_key', key);
      localStorage.setItem('ingenero_ai_provider', provider);
    } else {
      localStorage.removeItem('ingenero_ai_key');
      localStorage.removeItem('ingenero_ai_provider');
    }

    this.loadApiKeyStatus();
    this.toggleApiKeyDrawer();
  }

  sendChipQuestion(text) {
    document.getElementById('aiChatInput').value = text;
    this.sendAiMessage();
  }

  async sendAiMessage() {
    const input = document.getElementById('aiChatInput');
    const query = input.value.trim();
    if (!query) return;

    const messages = document.getElementById('aiChatMessages');
    messages.innerHTML += `<div class="chat-msg user">${query}</div>`;
    input.value = '';

    messages.scrollTop = messages.scrollHeight;

    const thinkingId = 'thinking_' + Date.now();
    messages.innerHTML += `<div id="${thinkingId}" class="chat-msg agent" style="color:var(--text-muted); font-style:italic;">⚡ Analyzing Westlake plant telemetry & models...</div>`;
    messages.scrollTop = messages.scrollHeight;

    if (this.apiKey) {
      try {
        const response = await this.callExternalLLM(query);
        document.getElementById(thinkingId).remove();
        messages.innerHTML += `<div class="chat-msg agent">${response}</div>`;
      } catch (err) {
        document.getElementById(thinkingId).remove();
        console.warn('API call failed, falling back to Ingenero Built-In Engine:', err);
        const fallbackResp = this.generateDomainEngineResponse(query);
        messages.innerHTML += `<div class="chat-msg agent"><span style="font-size:0.75rem; color:var(--accent-amber);">[API Key Status: ${err.message}. Showing Ingenero Domain Engine Response]</span><br><br>${fallbackResp}</div>`;
      }
    } else {
      setTimeout(() => {
        document.getElementById(thinkingId).remove();
        const response = this.generateDomainEngineResponse(query);
        messages.innerHTML += `<div class="chat-msg agent">${response}</div>`;
        messages.scrollTop = messages.scrollHeight;
      }, 400);
    }
  }

  // ROBUST MULTI-MODEL FALLBACK ENGINE FOR GEMINI & OPENAI
  async callExternalLLM(userQuery) {
    const systemPrompt = `You are the Ingenero AI Plant Diagnostic Assistant for Westlake Corporation's petrochemical plants (Calvert City, LACC Ethylene, Petro 1 Olefins, Petro 2 Olefins).
    Data Context: Total Opportunity = $5.24 MM/yr ($0.01435 MM/day). Process Opp = $3.12 MM/yr, AMH Asset Opp = $2.12 MM/yr across 24 furnaces.
    Petro 1 P1-F03 has a hot-spot at Pass 4 (1045°C). Calvert CF-103 decoke can be terminated early based on CPR Delta-P kinetics.
    Always format responses concisely with engineering facts, metrics in MM$, and action recommendations.`;

    if (this.apiProvider.startsWith('openai')) {
      const model = this.apiProvider === 'openai-gpt4o' ? 'gpt-4o' : 'gpt-4o-mini';
      const url = `https://api.openai.com/v1/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userQuery }
          ]
        })
      });
      const json = await res.json();
      if (json.error) throw new Error(json.error.message || 'OpenAI API Error');
      return json.choices[0].message.content;
    } else {
      // GEMINI AUTOMATIC MODEL FALLBACK ENDPOINTS ARRAY
      const candidateEndpoints = [
        { ver: 'v1beta', model: 'gemini-2.0-flash' },
        { ver: 'v1beta', model: 'gemini-1.5-flash' },
        { ver: 'v1beta', model: 'gemini-1.5-pro' },
        { ver: 'v1',     model: 'gemini-1.5-flash' },
        { ver: 'v1beta', model: 'gemini-pro' }
      ];

      // Reorder if user selected a specific model
      if (this.apiProvider !== 'gemini-auto') {
        const selectedModelName = this.apiProvider;
        candidateEndpoints.sort((a, b) => (a.model === selectedModelName ? -1 : 1));
      }

      let lastError = null;
      for (const ep of candidateEndpoints) {
        try {
          const url = `https://generativelanguage.googleapis.com/${ep.ver}/models/${ep.model}:generateContent?key=${this.apiKey}`;
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${userQuery}` }] }]
            })
          });

          const json = await res.json();
          if (res.ok && json.candidates && json.candidates[0] && json.candidates[0].content) {
            return json.candidates[0].content.parts[0].text;
          }
          if (json.error) {
            lastError = new Error(json.error.message || `Gemini ${ep.model} error`);
          }
        } catch (e) {
          lastError = e;
        }
      }
      throw lastError || new Error('Gemini API key connection failed on all endpoint models.');
    }
  }

  // Comprehensive Ingenero Plant Domain NLP Engine
  generateDomainEngineResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('hot') || q.includes('tmt') || q.includes('pass 4') || q.includes('temperature') || q.includes('skin')) {
      return `<strong>🔥 Real-Time TMT Hot-Spot Diagnostic:</strong><br>
      • <strong>Alert Asset</strong>: Petro 1 Olefins — <strong>Furnace P1-F03</strong><br>
      • <strong>Hot-Spot Pass</strong>: Pass 4 TMT reading <strong>1045°C</strong> (Threshold: 1030°C)<br>
      • <strong>Root Cause</strong>: Localized burner #4 flame impingement and draft imbalance.<br>
      • <strong>Action Directive</strong>: Trim Pass 4 fuel gas valve position by <strong>-3.5%</strong> immediately. This prevents emergency tube failure and captures <strong>+$0.00068 MM / day ($680/day)</strong> in margin recovery.`;
    }

    if (q.includes('decoke') || q.includes('cpr') || q.includes('delta-p') || q.includes('co2') || q.includes('spall')) {
      return `<strong>📉 CPR Decoke Kinetics Model (Zero CO/CO2 Dependence):</strong><br>
      • <strong>Active Decoke Unit</strong>: Calvert City Complex — <strong>Furnace CF-103</strong><br>
      • <strong>Decoke Kinetics Trajectory</strong>: Differential pressure (CPR delta-P) has returned to clean baseline of <strong>0.12 bar</strong>.<br>
      • <strong>Ingenero Physics Recommendation</strong>: Terminate steam-air decoke cycle immediately to save <strong>5.5 hours</strong> of unnecessary steam-air tube oxidation degradation.<br>
      • <strong>Financial Impact</strong>: Captures <strong>+$0.408 MM / yr ($0.00112 MM / day)</strong> in added online production availability across the fleet.`;
    }

    if (q.includes('opportunity') || q.includes('money') || q.includes('margin') || q.includes('total') || q.includes('roi')) {
      return `<strong>💰 Enterprise Realizable Opportunity Overview:</strong><br>
      • <strong>Total Enterprise Opp</strong>: <strong>$5.24 MM / yr</strong> ($0.01435 MM / day)<br>
      • <strong>Module 1 (Process Hub)</strong>: <strong>$3.12 MM / yr</strong> (59.5% - Energy & Monomer Yield)<br>
      • <strong>Module 2 (AMH Maintenance)</strong>: <strong>$2.12 MM / yr</strong> (40.5% - SAP Categorization & Labor Mix)<br>
      • <strong>Site Breakdown</strong>:<br>
        - LACC Ethylene: <strong>$1.85 MM / yr</strong><br>
        - Calvert City: <strong>$1.42 MM / yr</strong><br>
        - Petro 1 Olefins: <strong>$1.15 MM / yr</strong><br>
        - Petro 2 Olefins: <strong>$0.82 MM / yr</strong>`;
    }

    if (q.includes('sap') || q.includes('labor') || q.includes('contractor') || q.includes('work order') || q.includes('maintenance')) {
      return `<strong>🛠️ AMH SAP Maintenance & Labor Mix Analysis:</strong><br>
      • <strong>Unplanned Break-Ins</strong>: 77 out of 434 total work orders across fleet are emergency break-ins.<br>
      • <strong>Labor Optimization Opportunity</strong>: Shifting routine convection sootblower maintenance at Calvert City from specialized external contractors to embedded Westlake maintenance crews saves <strong>+$0.456 MM / yr ($0.00125 MM / day)</strong>.<br>
      • <strong>NLP Auto-Classifier</strong>: Reclassifying unassigned SAP text logs isolates repeat burner tile spalling in Petro 1.`;
    }

    if (q.includes('roadmap') || q.includes('plan') || q.includes('deploy') || q.includes('timeline') || q.includes('weeks')) {
      return `<strong>📑 24-Week Engineering Deployment Roadmap (8,750 Man-Hours):</strong><br>
      • <strong>Phase 1 (Wks 1-4)</strong>: OPC-UA & PI Web API Extraction Setup.<br>
      • <strong>Phase 2 (Wks 5-12)</strong>: Kinetic Severity & SAP Model Calibration.<br>
      • <strong>Phase 3 (Wks 13-16)</strong>: Baseline Solomon Metrics Site Validation.<br>
      • <strong>Phase 4 (Wks 17-22)</strong>: Fleet-wide Rollout (Calvert, LACC, Petro 1 & 2).<br>
      • <strong>Phase 5 (Wks 23-24)</strong>: Functional Specifications Handover & Training.`;
    }

    const foundFurnace = this.data.furnaces.find(f => q.includes(f.id.toLowerCase()) || q.includes(f.name.toLowerCase()));
    if (foundFurnace) {
      return `<strong>Asset Telemetry for ${foundFurnace.name} (${foundFurnace.siteName}):</strong><br>
      • <strong>Status</strong>: ${foundFurnace.status} (${foundFurnace.runDays}/${foundFurnace.maxTargetRunDays} days on stream)<br>
      • <strong>Thermal Efficiency</strong>: ${foundFurnace.thermalEfficiency}% | Specific Energy: ${foundFurnace.specificEnergy} MMBtu/MT<br>
      • <strong>Coil Delta-P (CPR)</strong>: ${foundFurnace.deltaPressureBar} bar | Coil Age: ${foundFurnace.coilAgeYears} years<br>
      • <strong>SAP Maint Spend</strong>: $${foundFurnace.sapMaintenance.totalCostYrMM} MM/yr ($${foundFurnace.sapMaintenance.costPerDay}/day)<br>
      • <strong>Process Opp</strong>: +$${(foundFurnace.processOppDayMM * 365).toFixed(2)} MM/yr | <strong>AMH Opp</strong>: +$${(foundFurnace.assetOppDayMM * 365).toFixed(2)} MM/yr`;
    }

    return `<strong>⚡ Ingenero Diagnostic Engine:</strong><br>
    I am connected to Westlake's 4 target sites (Calvert City, LACC, Petro 1, Petro 2) and 24 cracking furnaces. Total realizable enterprise opportunity is <strong>$5.24 MM / yr</strong>.<br><br>
    You can ask me about:<br>
    • Specific assets like <strong>P1-F03</strong> or <strong>CF-103</strong><br>
    • <strong>TMT Hot-Spots</strong> and burner balancing<br>
    • <strong>CPR Decoke Kinetics</strong> (zero CO/CO2 dependence)<br>
    • <strong>SAP Work Orders</strong> and labor mix optimization<br>
    • <strong>24-Week Proposal Roadmap</strong>`;
  }
}

window.app = new WestlakeDashboardApp();
