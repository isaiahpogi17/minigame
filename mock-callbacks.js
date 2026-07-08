// FiveM Callback Interceptor & Mock System
(function() {
    console.log("[Luma Mock SDK] Callback Interceptor Loaded");

    // Overwrite GetParentResourceName so scripts don't fail when checking resource name
    window.GetParentResourceName = function() {
        return "mock-resource";
    };

    // Override fetch to capture NUI callbacks
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
        if (typeof input === 'string' && (input.includes('krtshk-') || input.includes('glitch-') || input.includes('mock-resource') || input.startsWith('https://'))) {
            // Check if this looks like a FiveM callback URL
            if (input.includes('Result') || input.includes('Close') || input.includes('endGame') || input.includes('updateNotebook') || input.includes('cancelMinigame')) {
                console.log("[Luma Mock SDK] Intercepted Fetch POST:", input, init);
                
                let actionName = input.substring(input.lastIndexOf('/') + 1);
                let payload = {};
                if (init && init.body) {
                    try {
                        payload = JSON.parse(init.body);
                    } catch(e) {
                        payload = init.body;
                    }
                }
                
                // Route result to parent window
                window.parent.postMessage({
                    source: 'minigame-callback',
                    action: actionName,
                    payload: payload
                }, '*');
                
                // Return a mock success response
                return Promise.resolve(new Response(JSON.stringify({ status: "ok" }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                }));
            }
        }
        return originalFetch.apply(this, arguments);
    };

    // Helper to override jQuery AJAX (specifically $.post)
    const setupJQueryInterceptor = function() {
        if (window.jQuery) {
            console.log("[Luma Mock SDK] jQuery detected, hooking $.post and $.ajax");
            const originalPost = window.jQuery.post;
            window.jQuery.post = function(url, data, success, dataType) {
                if (typeof url === 'string' && (url.includes('krtshk-') || url.includes('glitch-') || url.includes('mock-resource'))) {
                    console.log("[Luma Mock SDK] Intercepted jQuery $.post:", url, data);
                    
                    let actionName = url.substring(url.lastIndexOf('/') + 1);
                    let payload = data;
                    if (typeof data === 'string') {
                        try {
                            payload = JSON.parse(data);
                        } catch(e) {}
                    }
                    
                    window.parent.postMessage({
                        source: 'minigame-callback',
                        action: actionName,
                        payload: payload
                    }, '*');
                    
                    if (typeof success === 'function') {
                        success('ok');
                    }
                    
                    // Return mock jqXHR object
                    return {
                        done: function(cb) { if (cb) cb('ok'); return this; },
                        fail: function() { return this; },
                        always: function(cb) { if (cb) cb(); return this; }
                    };
                }
                return originalPost.apply(this, arguments);
            };
        } else {
            // Check again shortly in case jQuery loads later in the DOM
            setTimeout(setupJQueryInterceptor, 100);
        }
    };
    setupJQueryInterceptor();

    // Hook native XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url) {
        this._url = url;
        this._method = method;
        return originalOpen.apply(this, arguments);
    };
    
    XMLHttpRequest.prototype.send = function(body) {
        const url = this._url;
        if (typeof url === 'string' && (url.includes('krtshk-') || url.includes('glitch-') || url.includes('mock-resource') || url.includes('updateNotebook'))) {
            console.log("[Luma Mock SDK] Intercepted XHR Send:", url, body);
            
            let actionName = url.substring(url.lastIndexOf('/') + 1);
            let payload = body;
            if (typeof body === 'string') {
                try {
                    payload = JSON.parse(body);
                } catch(e) {}
            }
            
            // Route to parent window
            window.parent.postMessage({
                source: 'minigame-callback',
                action: actionName,
                payload: payload
            }, '*');
            
            // Mock state of XHR object
            Object.defineProperty(this, 'readyState', { value: 4 });
            Object.defineProperty(this, 'status', { value: 200 });
            Object.defineProperty(this, 'responseText', { value: JSON.stringify({ status: "ok" }) });
            
            if (typeof this.onreadystatechange === 'function') {
                this.onreadystatechange();
            }
            if (typeof this.onload === 'function') {
                this.onload();
            }
            return;
        }
        return originalSend.apply(this, arguments);
    };
})();
