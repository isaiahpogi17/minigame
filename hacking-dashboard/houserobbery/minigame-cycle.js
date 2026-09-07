(function (global) {
    'use strict';

    const DEFAULT_SPEEDS = Object.freeze([700, 650, 600, 550, 500, 450]);
    const MINIMUM_INTERVAL = 350;

    function normalizeSpeedCurve(configuredSpeeds) {
        const source = Array.isArray(configuredSpeeds) && configuredSpeeds.length
            ? configuredSpeeds
            : DEFAULT_SPEEDS;

        return source.map((value, index) => {
            const fallback = DEFAULT_SPEEDS[Math.min(index, DEFAULT_SPEEDS.length - 1)];
            const parsed = Number(value);
            return Math.max(MINIMUM_INTERVAL, Number.isFinite(parsed) ? parsed : fallback);
        });
    }

    function getAttemptSpeed(configuredSpeeds, failedAttempts) {
        const curve = normalizeSpeedCurve(configuredSpeeds);
        const attemptIndex = Math.max(0, Math.floor(Number(failedAttempts) || 0));
        return curve[Math.min(attemptIndex, curve.length - 1)];
    }

    function hasStarted(selectedDigits) {
        return Array.isArray(selectedDigits)
            && selectedDigits.some((digit) => digit !== null && digit !== undefined);
    }

    function rotateUnlockedPools(pools, selectedDigits, lockedColumns) {
        if (!Array.isArray(pools)) return [];

        return pools.map((pool, columnIndex) => {
            const selected = selectedDigits && selectedDigits[columnIndex] !== null
                && selectedDigits[columnIndex] !== undefined;
            const locked = lockedColumns && lockedColumns[columnIndex] === true;

            if (selected || locked || !Array.isArray(pool) || pool.length < 2) {
                return pool;
            }

            return [...pool.slice(1), pool[0]];
        });
    }

    global.HouseRobberyDecryptorCycle = Object.freeze({
        DEFAULT_SPEEDS,
        MINIMUM_INTERVAL,
        normalizeSpeedCurve,
        getAttemptSpeed,
        hasStarted,
        rotateUnlockedPools,
    });
})(window);
