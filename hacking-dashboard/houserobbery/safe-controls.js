(function () {
    window.addEventListener('keydown', function (event) {
        if (event.code !== 'Space' || event.repeat || event.isComposing) {
            return;
        }

        const safeRoot = document.getElementById('safe-root');
        if (!safeRoot || safeRoot.childElementCount === 0) {
            return;
        }

        event.preventDefault();
        window.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Enter',
            code: 'Enter',
            bubbles: true,
        }));
    });
})();
