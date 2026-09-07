(() => {
    const resourceName = typeof window.GetParentResourceName === 'function'
        ? window.GetParentResourceName()
        : null;

    const noiseMeter = document.getElementById('noise-meter');
    const noiseText = document.getElementById('noise-text');
    const noiseValue = document.getElementById('noise-value');
    const noiseFill = document.getElementById('noise-fill');
    const noiseStatus = document.getElementById('noise-status');

    const houseObjectives = document.getElementById('house-objectives');
    const houseTier = document.getElementById('house-tier');
    const searchObjective = document.getElementById('search-objective');
    const furnitureObjective = document.getElementById('furniture-objective');
    const searchCount = document.getElementById('search-count');
    const furnitureCount = document.getElementById('furniture-count');
    const safeObjectiveStatus = document.getElementById('safe-objective-status');
    const objectiveTotalLeft = document.getElementById('objective-total-left');

    const challenge = document.getElementById('collect-challenge');
    const progressRing = document.getElementById('challenge-progress-ring');
    const keyWrap = challenge.querySelector('.challenge-key-wrap');
    const stageText = document.getElementById('challenge-stage');
    const keyText = document.getElementById('challenge-key');
    const timeFill = document.getElementById('challenge-time-fill');
    const percentText = document.getElementById('challenge-percent');
    const instructionText = document.getElementById('challenge-instruction');
    const hintText = document.getElementById('challenge-hint');

    const circumference = 100;
    const keyMap = {
        E: { code: 'KeyE', label: 'E' },
        Q: { code: 'KeyQ', label: 'Q' },
        R: { code: 'KeyR', label: 'R' },
        F: { code: 'KeyF', label: 'F' },
        G: { code: 'KeyG', label: 'G' },
        X: { code: 'KeyX', label: 'X' },
    };

    let state = null;
    let animationFrame = 0;
    let closeTimer = 0;
    let noiseHideTimer = 0;
    let objectiveHideTimer = 0;

    function postNui(name, payload) {
        if (!resourceName) {
            return Promise.resolve({ success: true });
        }

        return fetch(`https://${resourceName}/${name}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' },
            body: JSON.stringify(payload || {}),
        }).catch(() => null);
    }

    function clamp(value, minimum, maximum) {
        return Math.max(minimum, Math.min(maximum, value));
    }

    function setChallengeProgress(value) {
        const progress = clamp(value, 0, 100);
        progressRing.style.strokeDashoffset = String(circumference * (1 - progress / 100));
        percentText.textContent = `${Math.round(progress)}%`;
    }

    function setTimeRemaining(value) {
        timeFill.style.transform = `scaleX(${clamp(value, 0, 100) / 100})`;
    }

    function pulseKey() {
        keyWrap.classList.remove('hit');
        void keyWrap.offsetWidth;
        keyWrap.classList.add('hit');
    }

    function finishChallenge(success, reason) {
        if (!state || state.finishing) {
            return;
        }

        state.finishing = true;
        state.active = false;
        state.spaceHeld = false;
        progressRing.classList.toggle('complete', success);
        challenge.dataset.stage = success ? 'complete' : 'failed';
        stageText.textContent = success ? 'SECURED' : 'FAILED';
        keyText.textContent = success ? '\u2713' : '\u00d7';
        instructionText.textContent = success ? 'CARRIED' : 'RETRY';
        hintText.textContent = success ? 'ITEM READY' : 'INTERACTION CANCELLED';

        closeTimer = window.setTimeout(() => {
            challenge.classList.remove('visible');
            challenge.setAttribute('aria-hidden', 'true');
            postNui('furnitureCollectResult', { success, reason });
            state = null;
        }, 450);
    }

    function beginCarryStage(timestamp) {
        state.stage = 'carry';
        state.progress = 0;
        state.stageStartedAt = timestamp;
        state.lastFrameAt = timestamp;
        state.spaceHeld = false;
        challenge.dataset.stage = 'carry';
        progressRing.classList.add('carrying');
        stageText.textContent = 'LIFT';
        keyText.textContent = 'SPACE';
        instructionText.textContent = 'HOLD';
        hintText.textContent = 'KEEP HOLDING TO CARRY';
        setChallengeProgress(0);
        setTimeRemaining(100);
        postNui('furnitureCollectStage', { stage: 'carry' });
    }

    function updateChallenge(timestamp) {
        if (!state || !state.active) {
            return;
        }

        const deltaSeconds = Math.min(0.05, Math.max(0, timestamp - state.lastFrameAt) / 1000);
        state.lastFrameAt = timestamp;
        const elapsedSeconds = (timestamp - state.stageStartedAt) / 1000;

        if (state.stage === 'smash') {
            const remaining = 100 * (1 - elapsedSeconds / state.smashDuration);
            setTimeRemaining(remaining);

            if (state.keyPool.length > 1 && timestamp >= state.nextKeyChangeAt) {
                let nextTarget = state.target;
                while (nextTarget.code === state.target.code) {
                    nextTarget = state.keyPool[Math.floor(Math.random() * state.keyPool.length)];
                }

                state.target = nextTarget;
                state.targetHeld = false;
                keyText.textContent = state.target.label;
                pulseKey();
                state.nextKeyChangeAt = timestamp + state.keyChangeInterval;
            }

            if (!state.targetHeld) {
                state.progress = Math.max(0, state.progress - state.decayRate * deltaSeconds);
                setChallengeProgress(state.progress);
            }

            if (elapsedSeconds >= state.smashDuration) {
                finishChallenge(false, 'smash_timeout');
                return;
            }
        } else if (state.stage === 'carry') {
            const remaining = 100 * (1 - elapsedSeconds / state.carryTimeout);
            setTimeRemaining(remaining);

            const fillPerSecond = 100 / (state.holdDuration / 1000);
            if (state.spaceHeld) {
                state.progress += fillPerSecond * deltaSeconds;
            } else {
                state.progress -= fillPerSecond * 0.85 * deltaSeconds;
            }

            state.progress = clamp(state.progress, 0, 100);
            setChallengeProgress(state.progress);

            if (state.progress >= 100) {
                finishChallenge(true, 'completed');
                return;
            }

            if (elapsedSeconds >= state.carryTimeout) {
                finishChallenge(false, 'carry_timeout');
                return;
            }
        }

        animationFrame = window.requestAnimationFrame(updateChallenge);
    }

    function openChallenge(config) {
        window.clearTimeout(closeTimer);
        window.cancelAnimationFrame(animationFrame);

        const possibleKeys = Array.isArray(config.possibleKeys)
            ? config.possibleKeys.map((key) => String(key).toUpperCase()).filter((key) => keyMap[key])
            : [];
        const keyPool = possibleKeys.length ? possibleKeys : Object.keys(keyMap);
        const targetName = keyPool[Math.floor(Math.random() * keyPool.length)];

        state = {
            active: true,
            finishing: false,
            stage: 'smash',
            progress: 0,
            target: keyMap[targetName],
            keyPool: keyPool.map((keyName) => keyMap[keyName]),
            targetHeld: false,
            spaceHeld: false,
            smashDuration: Math.max(3, Number(config.smashDuration) || 10),
            keyPressValue: Math.max(1, Number(config.keyPressValue) || 11),
            decayRate: Math.max(0, Number(config.decayRate) || 6),
            keyChangeInterval: Math.max(300, Number(config.keyChangeInterval) || 1000),
            holdDuration: Math.max(750, Number(config.holdDuration) || 2200),
            carryTimeout: Math.max(3, Number(config.carryTimeout) || 8),
            stageStartedAt: performance.now(),
            lastFrameAt: performance.now(),
            nextKeyChangeAt: performance.now() + Math.max(300, Number(config.keyChangeInterval) || 1000),
        };

        challenge.dataset.stage = 'smash';
        challenge.classList.add('visible');
        challenge.setAttribute('aria-hidden', 'false');
        progressRing.classList.remove('carrying', 'complete');
        stageText.textContent = 'SMASH';
        keyText.textContent = state.target.label;
        instructionText.textContent = 'MASH';
        hintText.textContent = 'TAP THE DISPLAYED KEY';
        setChallengeProgress(0);
        setTimeRemaining(100);
        animationFrame = window.requestAnimationFrame(updateChallenge);
    }

    function closeChallenge() {
        window.clearTimeout(closeTimer);
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        if (state) {
            state.active = false;
            state.spaceHeld = false;
            state.targetHeld = false;
        }
        state = null;
        challenge.classList.remove('visible');
        challenge.setAttribute('aria-hidden', 'true');
    }

    function updateNoise(rawNoise) {
        const noise = clamp(Number(rawNoise) || 0, 0, 100);
        noiseFill.style.width = `${noise}%`;
        noiseValue.textContent = `${Math.round(noise)}%`;

        if (noise >= 80) {
            noiseMeter.dataset.level = 'danger';
            noiseStatus.textContent = 'DANGER';
        } else if (noise >= 55) {
            noiseMeter.dataset.level = 'warning';
            noiseStatus.textContent = 'CAUTION';
        } else {
            noiseMeter.dataset.level = 'quiet';
            noiseStatus.textContent = 'STEALTH';
        }
    }

    function updateObjectives(data = {}) {
        const tierLabels = {
            lowend: 'SMALL',
            small: 'SMALL',
            midend: 'MEDIUM',
            medium: 'MEDIUM',
            highend: 'HARD',
            mansion: 'HARD',
            hard: 'HARD',
        };
        const searchTotal = Math.max(0, Number(data.searchTotal) || 0);
        const furnitureTotal = Math.max(0, Number(data.furnitureTotal) || 0);
        const searchDone = clamp(Number(data.searchDone) || 0, 0, searchTotal);
        const furnitureDone = clamp(Number(data.furnitureDone) || 0, 0, furnitureTotal);
        const searchLeft = searchTotal - searchDone;
        const furnitureLeft = furnitureTotal - furnitureDone;
        const totalLeft = searchLeft + furnitureLeft;
        const safeOpened = data.safeOpened === true;
        const safeReady = totalLeft === 0;
        const rawTier = String(data.houseType || '').toLowerCase();

        houseTier.textContent = tierLabels[rawTier] || String(data.houseType || 'HOUSE').toUpperCase();
        searchCount.textContent = searchLeft === 0 ? 'CLEARED' : `${searchLeft} LEFT`;
        furnitureCount.textContent = furnitureLeft === 0 ? 'CLEARED' : `${furnitureLeft} LEFT`;
        objectiveTotalLeft.textContent = totalLeft === 0 ? 'ALL CLEARED' : `${totalLeft} TOTAL LEFT`;
        safeObjectiveStatus.textContent = safeOpened ? 'SAFE OPENED' : safeReady ? 'SAFE READY' : 'SAFE LOCKED';
        searchObjective.classList.toggle('complete', searchLeft === 0);
        furnitureObjective.classList.toggle('complete', furnitureLeft === 0);
        houseObjectives.dataset.ready = String(safeReady);
        houseObjectives.dataset.opened = String(safeOpened);
    }

    function showObjectives(data) {
        window.clearTimeout(objectiveHideTimer);
        updateObjectives(data);
        houseObjectives.style.display = 'block';
        houseObjectives.setAttribute('aria-hidden', 'false');
        window.requestAnimationFrame(() => houseObjectives.classList.add('visible'));
    }

    function hideObjectives() {
        houseObjectives.classList.remove('visible');
        houseObjectives.setAttribute('aria-hidden', 'true');
        objectiveHideTimer = window.setTimeout(() => {
            houseObjectives.style.display = 'none';
        }, 180);
    }

    window.addEventListener('keydown', (event) => {
        if (!state || !state.active) {
            return;
        }

        if (event.code === 'Escape') {
            event.preventDefault();
            finishChallenge(false, 'cancelled');
            return;
        }

        if (state.stage === 'smash' && event.code === state.target.code) {
            event.preventDefault();
            if (state.targetHeld || event.repeat) {
                return;
            }

            state.targetHeld = true;
            state.progress = clamp(state.progress + state.keyPressValue, 0, 100);
            setChallengeProgress(state.progress);
            pulseKey();

            if (state.progress >= 100) {
                beginCarryStage(performance.now());
            }
        } else if (state.stage === 'carry' && event.code === 'Space') {
            event.preventDefault();
            state.spaceHeld = true;
        }
    });

    window.addEventListener('keyup', (event) => {
        if (!state) {
            return;
        }

        if (state.stage === 'smash' && event.code === state.target.code) {
            state.targetHeld = false;
        } else if (event.code === 'Space') {
            state.spaceHeld = false;
        }
    });

    window.addEventListener('blur', () => {
        if (state) {
            state.targetHeld = false;
            state.spaceHeld = false;
        }
    });

    window.addEventListener('message', (event) => {
        const message = event.data || {};

        if (message.action === 'show') {
            window.clearTimeout(noiseHideTimer);
            noiseMeter.style.display = 'block';
            noiseMeter.setAttribute('aria-hidden', 'false');
            updateNoise(0);
            window.requestAnimationFrame(() => noiseMeter.classList.add('visible'));
        } else if (message.action === 'hide') {
            noiseMeter.classList.remove('visible');
            noiseMeter.setAttribute('aria-hidden', 'true');
            noiseHideTimer = window.setTimeout(() => {
                noiseMeter.style.display = 'none';
            }, 180);
        } else if (message.action === 'update') {
            updateNoise(message.noise);
        } else if (message.action === 'updateText') {
            noiseText.textContent = String(message.text || 'NOISE').toUpperCase();
        } else if (message.action === 'showObjectives') {
            showObjectives(message.data || {});
        } else if (message.action === 'updateObjectives') {
            updateObjectives(message.data || {});
        } else if (message.action === 'hideObjectives') {
            hideObjectives();
        } else if (message.action === 'openFurnitureCollect') {
            openChallenge(message.data || {});
        } else if (message.action === 'closeFurnitureCollect') {
            closeChallenge();
        }
    });

    window.__rlHouseRobberyDemo = {
        openChallenge,
        showNoise(noise = 42) {
            noiseMeter.style.display = 'block';
            noiseMeter.classList.add('visible');
            updateNoise(noise);
        },
        showObjectives,
        updateObjectives,
        hideObjectives,
    };

    if (!resourceName) {
        const demoParams = new URLSearchParams(window.location.search);
        if (demoParams.has('collectDemo') || demoParams.has('carryDemo') || demoParams.has('noiseDemo') || demoParams.has('objectivesDemo')) {
            document.getElementById('root').style.display = 'none';
            document.getElementById('safe-root').style.display = 'none';
            challenge.querySelector('.challenge-stack').style.animation = 'none';
        }
        if (demoParams.has('noiseDemo')) {
            window.__rlHouseRobberyDemo.showNoise(Number(demoParams.get('noiseDemo')) || 42);
        }
        if (demoParams.has('objectivesDemo')) {
            const demoTier = demoParams.get('objectivesDemo') || 'small';
            const demoTotals = {
                small: { searchTotal: 5, furnitureTotal: 9 },
                medium: { searchTotal: 8, furnitureTotal: 6 },
                hard: { searchTotal: 10, furnitureTotal: 10 },
            };
            const totals = demoTotals[demoTier] || demoTotals.small;
            showObjectives({
                houseType: demoTier,
                searchTotal: totals.searchTotal,
                searchDone: Math.min(2, totals.searchTotal),
                furnitureTotal: totals.furnitureTotal,
                furnitureDone: Math.min(4, totals.furnitureTotal),
            });
        }
        if (demoParams.has('collectDemo') || demoParams.has('carryDemo')) {
            openChallenge({
                possibleKeys: ['R'],
                smashDuration: 10,
                keyPressValue: 11,
                decayRate: 6,
                holdDuration: 2200,
                carryTimeout: 8,
            });
            if (demoParams.has('carryDemo')) {
                beginCarryStage(performance.now());
            }
        }
    }
})();
