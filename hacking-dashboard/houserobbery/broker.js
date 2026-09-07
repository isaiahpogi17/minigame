(() => {
    const app = document.getElementById('broker-app');
    const resource = typeof GetParentResourceName === 'function' ? GetParentResourceName() : 'rl_houserobbery';
    let toastTimer;
    let state = {
        data: null,
        hasJob: false,
        schedule: {},
        mode: 'operations',
        selectedItem: null,
        search: '',
        hasOpenTrunk: false,
    };

    const post = async (event, payload = {}) => {
        try {
            const response = await fetch(`https://${resource}/${event}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (_) {
            return { ok: false, message: 'The encrypted channel did not respond.' };
        }
    };

    const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    })[char]);
    const money = value => `$${Math.max(0, Number(value) || 0).toLocaleString('en-US')}`;
    const moneyRange = (minimum, maximum) => {
        const min = Math.max(0, Number(minimum) || 0);
        const max = Math.max(min, Number(maximum) || min);
        return min === max ? money(min) : `${money(min)} - ${money(max)}`;
    };

    function xpPercent(stats) {
        if (stats.isMaxLevel) return 100;
        return Math.max(0, Math.min(100, (Number(stats.currentLevelXP || 0) / Math.max(1, Number(stats.nextLevelXP || 1))) * 100));
    }

    function toast(message, success = false) {
        const element = app.querySelector('.broker-toast');
        if (!element) return;
        element.textContent = message || 'Action completed.';
        element.className = `broker-toast show${success ? ' success' : ''}`;
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => element.className = 'broker-toast', 2400);
    }

    function icon(name, danger = false) {
        const icons = {
            assignment: '<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5M5.5 10.5V20h13v-9.5M9.5 14a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Zm5 0H19m-2 0v2"/></svg>',
            cancel: '<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
            special: '<svg viewBox="0 0 24 24"><path d="M8 18v2m8-2v2M7 10a5 5 0 0 1 10 0v3l2 2v3H5v-3l2-2v-3Zm3 1h.01M14 11h.01M10 15h4"/></svg>',
            salvage: '<svg viewBox="0 0 24 24"><path d="M3 6h11v11H3V6Zm11 4h4l3 3v4h-7v-7ZM7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>',
        };
        return `<span class="operation-icon${danger ? ' danger' : ''}" aria-hidden="true">${icons[name] || ''}</span>`;
    }

    function header() {
        return `<header class="dashboard-header">
            <div class="operative-mark" aria-hidden="true">⌂</div>
            <div class="operative-copy">
                <div class="session-chips"><span>GATEWAY ONLINE</span><span>ENCRYPTED SESSION</span></div>
                <h1><em>HOUSE</em> OPERATIVE STATUS</h1>
                <div class="online-line"><i></i><span>ONLINE // ENCRYPTED</span></div>
            </div>
            <button class="dashboard-close" data-action="close" aria-label="Close">×</button>
        </header>`;
    }

    function sidebar() {
        const stats = state.data.stats || {};
        const xpLabel = stats.isMaxLevel
            ? 'MAX LEVEL'
            : `${Number(stats.currentLevelXP || 0).toLocaleString()} / ${Number(stats.nextLevelXP || 0).toLocaleString()}`;
        const accepting = state.schedule?.accepting === true;
        const activeLabel = state.hasJob ? 'Active' : 'None';
        return `<aside class="dashboard-sidebar">
            <section class="dashboard-card reputation-card">
                <span class="card-label">REPUTATION</span>
                <strong class="level-value">LVL ${Number(stats.level || 1)}</strong>
                <div class="chart-mark" aria-hidden="true">⌁</div>
                <div class="xp-heading"><span>XP PROGRESS</span><b>${xpLabel}</b></div>
                <div class="xp-track"><i style="width:${xpPercent(stats)}%"></i></div>
            </section>
            <section class="dashboard-card mission-data-card">
                <span class="card-label section-border">MISSION DATA</span>
                <div class="data-line"><span>Total Sold</span><b class="money-text">${money(stats.total_sold || 0)}</b></div>
                <div class="data-line"><span>Active Assignment</span><b class="${state.hasJob ? 'danger-text' : 'inactive-text'}">${activeLabel}</b></div>
                <div class="data-line"><span>Job Intake</span><b class="${accepting ? 'ready-text' : 'danger-text'}">${accepting ? 'Ready' : 'Closed'}</b></div>
                <div class="data-line"><span>House Network</span><b class="ready-text">Online</b></div>
            </section>
        </aside>`;
    }

    function operationsView() {
        const accepting = state.schedule?.accepting === true;
        const action = state.hasJob ? 'cancel-job' : 'request-job';
        const disabled = !state.hasJob && !accepting;
        const title = state.hasJob ? 'CANCEL ASSIGNMENT' : accepting ? 'START ASSIGNMENT' : 'INTAKE CLOSED';
        const description = state.hasJob
            ? 'Burn the active house file and clear your current route.'
            : accepting
                ? 'Request one job. The NPC selects the property class and location.'
                : 'Assignments open from 22:00 to 05:30 Los Santos time.';
        return `<section class="dashboard-main">
            <span class="main-label">AVAILABLE OPERATIONS</span>
            <div class="operations-grid">
                <button class="operation-card${state.hasJob ? ' alert-card' : ''}" data-action="${action}" ${disabled ? 'disabled' : ''}>
                    ${icon(state.hasJob ? 'cancel' : 'assignment', state.hasJob)}
                    <div class="operation-copy"><h3>${title}</h3><p>${description}</p></div>
                </button>
                <button class="operation-card coming-soon" disabled>
                    ${icon('special', true)}
                    <span class="soon-chip">NOT AVAILABLE</span>
                    <div class="operation-copy"><h3>SPECIAL TARGET</h3><p>High-risk residential targets and exclusive contracts are coming soon.</p></div>
                </button>
                <button class="operation-card operation-card-wide" data-mode="salvage">
                    ${icon('salvage')}
                    <div class="operation-copy"><h3>SALVAGE EXCHANGE</h3><p>Reserve recovered appliances and sell them securely for black money.</p></div>
                </button>
            </div>
        </section>`;
    }

    function filteredItems() {
        const query = state.search.trim().toLowerCase();
        return (state.data.sellItems || []).filter(item =>
            !query || item.label.toLowerCase().includes(query) || item.name.toLowerCase().includes(query)
        );
    }

    function salvageRows() {
        const items = filteredItems();
        if (!items.length) return '<div class="empty-state">NO RECOVERED GOODS FOUND</div>';
        return items.map(item => `<button class="salvage-row${state.selectedItem === item.name ? ' active' : ''}${item.count < 1 ? ' unavailable' : ''}" data-item="${esc(item.name)}">
            <span class="salvage-image"><img src="${esc((state.data.iconPath || '') + item.image)}" alt="" onerror="this.style.display='none'"></span>
            <span><b>${esc(item.label)}</b><small>OWNED ${item.count}</small></span>
            <strong>${moneyRange(item.priceMin, item.priceMax)}</strong>
        </button>`).join('');
    }

    function basketBlock() {
        const basket = state.data.saleBasket || [];
        const unloadButton = state.hasOpenTrunk
            ? '<button class="trunk-unload" data-action="unload-trunk">UNLOAD OPEN TRUNK · 2S EACH</button>'
            : '';
        const lines = basket.length
            ? basket.map(item => `<div class="basket-line"><span>${item.amount}× ${esc(item.label)}</span><b>${moneyRange(item.subtotalMin, item.subtotalMax)}</b><button data-return-item="${esc(item.name)}">RETURN</button></div>`).join('')
            : '<div class="empty-state compact">NO GOODS RESERVED</div>';
        return `<section class="sale-manifest">
            <div class="manifest-heading"><span>SALE MANIFEST</span><strong>${moneyRange(state.data.basketTotalMin, state.data.basketTotalMax)}</strong></div>
            <div class="basket-lines custom-scrollbar">${lines}</div>
            <div class="basket-actions"><button class="secondary" data-action="sell-all">SELL ALL</button>${unloadButton}</div>
        </section>`;
    }

    function salvageDetail() {
        const items = state.data.sellItems || [];
        let item = items.find(entry => entry.name === state.selectedItem && entry.count > 0);
        if (!item) item = items.find(entry => entry.count > 0);
        if (!item) return `<div class="salvage-detail basket-only">${basketBlock()}</div>`;
        state.selectedItem = item.name;
        return `<div class="salvage-detail">
            <div class="selected-item">
                <div class="selected-image"><img src="${esc((state.data.iconPath || '') + item.image)}" alt="" onerror="this.style.display='none'"></div>
                <div class="selected-copy"><span class="card-label">RECOVERED PROPERTY</span><h3>${esc(item.label)}</h3><p>${moneyRange(item.priceMin, item.priceMax)} BLACK MONEY EACH // ${item.count} IN INVENTORY</p></div>
            </div>
            <div class="single-reserve-row"><button class="reserve-button" data-action="add-sale">ADD TO SALE</button></div>
            ${basketBlock()}
        </div>`;
    }

    function salvageView() {
        return `<section class="dashboard-main salvage-main">
            <div class="main-heading"><span class="main-label">SALVAGE EXCHANGE</span><button data-mode="operations"><span aria-hidden="true">←</span> BACK TO HOME</button></div>
            <div class="salvage-grid">
                <div class="salvage-list-panel">
                    <div class="search-box"><span>⌕</span><input id="salvage-search" value="${esc(state.search)}" placeholder="SEARCH RECOVERED GOODS..."></div>
                    <div class="salvage-list custom-scrollbar">${salvageRows()}</div>
                </div>
                ${salvageDetail()}
            </div>
        </section>`;
    }

    function render() {
        if (!state.data) return;
        const dashboardMode = state.mode === 'salvage' ? 'salvage-dashboard' : 'operations-dashboard';
        app.innerHTML = `<main class="operative-dashboard ${dashboardMode}">
            ${header()}
            <div class="dashboard-content">
                ${sidebar()}
                ${state.mode === 'salvage' ? salvageView() : operationsView()}
            </div>
        </main><div class="broker-toast"></div>`;
        app.classList.add('open');
        app.setAttribute('aria-hidden', 'false');
    }

    function hideDashboardLocally() {
        clearTimeout(toastTimer);
        app.classList.remove('open');
        app.setAttribute('aria-hidden', 'true');
        app.innerHTML = '';
    }

    async function sell(sellAll) {
        const response = await post('brokerSell', sellAll ? { sellAll: true } : {});
        if (response.data) state.data = response.data;
        render();
        toast(response.message, response.ok);
    }

    app.addEventListener('input', event => {
        if (event.target.id !== 'salvage-search') return;
        state.search = event.target.value;
        const list = app.querySelector('.salvage-list');
        if (list) list.innerHTML = salvageRows();
    });

    app.addEventListener('click', async event => {
        const mode = event.target.closest('[data-mode]')?.dataset.mode;
        if (mode) { state.mode = mode; render(); return; }

        const returnItem = event.target.closest('[data-return-item]')?.dataset.returnItem;
        if (returnItem) {
            hideDashboardLocally();
            void post('brokerReturnSaleItem', { item: returnItem });
            return;
        }

        const itemName = event.target.closest('[data-item]')?.dataset.item;
        if (itemName) { state.selectedItem = itemName; render(); return; }

        const action = event.target.closest('[data-action]')?.dataset.action;
        if (!action) return;
        if (action === 'close') {
            hideDashboardLocally();
            void post('brokerClose');
            return;
        }
        if (action === 'sell-basket') { await sell(false); return; }
        if (action === 'sell-all') {
            hideDashboardLocally();
            void post('brokerSell', { sellAll: true });
            return;
        }
        if (action === 'unload-trunk') {
            hideDashboardLocally();
            void post('brokerUnloadTrunk');
            return;
        }
        if (action === 'add-sale') {
            const item = state.data.sellItems.find(entry => entry.name === state.selectedItem);
            if (!item) return;
            const response = await post('brokerReserveSaleItem', { item: item.name, amount: 1 });
            if (response.data) state.data = response.data;
            render(); toast(response.message, response.ok); return;
        }
        if (action === 'cancel-job') {
            const response = await post('brokerCancelJob');
            if (response.ok) state.hasJob = false;
            render(); toast(response.message, response.ok); return;
        }
        if (action === 'request-job') {
            const button = event.target.closest('[data-action]');
            button.disabled = true;
            hideDashboardLocally();
            const response = await post('brokerRequestJob');
            if (response.ok) state.hasJob = true;
        }
    });

    window.addEventListener('keydown', event => {
        if (event.key === 'Escape' && app.classList.contains('open')) {
            event.preventDefault();
            hideDashboardLocally();
            void post('brokerClose');
        }
    });

    window.addEventListener('message', event => {
        const message = event.data || {};
        if (message.action === 'openBroker') {
            state = {
                data: message.data,
                hasJob: message.hasJob === true,
                schedule: message.schedule || {},
                mode: message.mode === 'salvage' ? 'salvage' : 'operations',
                selectedItem: null,
                search: '',
                hasOpenTrunk: message.hasOpenTrunk === true,
            };
            render();
        } else if (message.action === 'closeBroker') {
            hideDashboardLocally();
        }
    });
})();
