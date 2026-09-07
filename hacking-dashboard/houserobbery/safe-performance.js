(function () {
    'use strict';

    const safeRoot = document.getElementById('safe-root');
    const replayFlag = '__rlSafeInputReplay';
    const directionKeys = new Set(['ArrowLeft', 'ArrowRight', 'a', 'A', 'd', 'D']);
    let queuedKeys = [];
    let animationFrame;

    function safeIsOpen() {
        return safeRoot && safeRoot.childElementCount > 0;
    }

    function replayKey(input) {
        const replay = new KeyboardEvent('keydown', {
            key: input.key,
            code: input.code,
            repeat: input.repeat,
            ctrlKey: input.ctrlKey,
            shiftKey: input.shiftKey,
            altKey: input.altKey,
            metaKey: input.metaKey,
            bubbles: true,
            cancelable: true,
        });
        Object.defineProperty(replay, replayFlag, { value: true });
        window.dispatchEvent(replay);
    }

    function flushInputs() {
        animationFrame = undefined;
        const keys = queuedKeys;
        queuedKeys = [];

        // React 18 batches these native events into one visual commit while
        // every functional dial update still runs in its original order.
        const replayAll = function () {
            for (const input of keys) {
                replayKey(input);
            }
        };
        if (window.ReactDOM && typeof window.ReactDOM.flushSync === 'function') {
            window.ReactDOM.flushSync(replayAll);
        } else {
            replayAll();
        }
    }

    function scheduleFlush() {
        if (animationFrame === undefined) {
            animationFrame = requestAnimationFrame(flushInputs);
        }
    }

    window.addEventListener('keydown', function (event) {
        if (event[replayFlag] || event.isComposing || !safeIsOpen()) {
            return;
        }

        if (!directionKeys.has(event.key)) {
            // Preserve exact ordering when a number is locked or the minigame
            // is closed before the next animation frame.
            if (queuedKeys.length > 0) {
                if (animationFrame !== undefined) {
                    cancelAnimationFrame(animationFrame);
                }
                flushInputs();
            }
            return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();
        queuedKeys.push({
            key: event.key,
            code: event.code,
            repeat: event.repeat,
            ctrlKey: event.ctrlKey,
            shiftKey: event.shiftKey,
            altKey: event.altKey,
            metaKey: event.metaKey,
        });
        scheduleFlush();
    }, true);

    window.addEventListener('message', function (event) {
        let payload = event.data;
        if (typeof payload === 'string') {
            try {
                payload = JSON.parse(payload);
            } catch (_) {
                return;
            }
        }

        if (payload && payload.action === 'safe:close') {
            queuedKeys = [];
            if (animationFrame !== undefined) {
                cancelAnimationFrame(animationFrame);
                animationFrame = undefined;
            }
        }
    });
})();
