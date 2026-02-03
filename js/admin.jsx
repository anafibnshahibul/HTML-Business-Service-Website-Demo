/* * Lumina Ultimate Admin - Encrypted Core 
 * Developed by Anaf (Pro Developer)
 * Version: 1.0.5
 */

(function() {
    // 1. SECURITY & DOMAIN LOCK
    // Restricts the script to run only on authorized domains
    if (window.location.hostname !== "lumina-port.netlify.app" && 
        window.location.hostname !== "localhost" && 
        window.location.hostname !== "127.0.0.1" && 
        window.location.protocol !== "file:") {
        
        document.body.innerHTML = "<div style='display:flex;justify-content:center;align-items:center;height:100vh;background:#000;color:red;font-family:sans-serif;text-align:center;'><h1>SECURITY BREACH:<br>UNAUTHORIZED DOMAIN!</h1></div>";
        return;
    }

    // 2. OBFUSCATED CREDENTIALS
    const _0x5f21 = ["\x41\x6e\x61\x66", "\x4c\x75\x6d\x69\x6e\x61\x32\x30\x32\x36", "\x31\x35\x32\x32\x39", "\x6c\x75\x6d\x69\x6e\x61\x5f\x61\x75\x74\x68", "\x74\x72\x75\x65"];
    const _authData = { u: _0x5f21[0], p: _0x5f21[1], k: _0x5f21[2] };

    // 3. LOGIN PROCESS
    window.handleLogin = function() {
        const _u = document.getElementById('userInput').value;
        const _p = document.getElementById('passInput').value;
        const _k = document.getElementById('keyInput').value;

        if (_u === _authData.u && _p === _authData.p && _k === _authData.k) {
            localStorage.setItem(_0x5f21[3], _0x5f21[4]); // Set auth session
            window.location.href = 'dashboard.html';
        } else {
            const errBox = document.getElementById('err');
            if (errBox) errBox.style.display = 'block';
            // This goes inside your handleLogin function after p === _authData.p
            if (_u === _authData.u && _p === _authData.p) {
                // Show the 2FA section
                document.getElementById('login-fields').style.display = 'none';
                document.getElementById('otp-area').style.display = 'block';
                
                // Set a hidden PIN for verification
                window.secretPin = "9900";
            }
        }
    };

    // 4. THEME & SETTINGS ENGINE
    // Function to apply styles to the entire dashboard
    window.executeTheme = function(theme, fontSize) {
        const root = document.documentElement;
        document.body.style.fontSize = fontSize;

        if (theme === 'dark') {
            // Dark Mode with Anaf's Special Blue Accent
            root.style.setProperty('--bg-body', '#121212');
            root.style.setProperty('--wp-sidebar', '#1a1a1a');
            root.style.setProperty('--wp-dark', '#000000');
            root.style.setProperty('--wp-blue', '#0048ff'); // Special Brand Color
            
            document.body.style.color = '#e0e0e0';
            document.querySelectorAll('.card').forEach(c => {
                c.style.background = '#1e1e1e';
                c.style.borderColor = '#333';
            });
            const topNav = document.querySelector('.top-nav');
            if(topNav) {
                topNav.style.background = '#1a1a1a';
                topNav.style.color = '#fff';
            }
        } else {
            // Reset to Standard Light/WordPress Theme
            root.style.setProperty('--bg-body', '#f0f0f1');
            root.style.setProperty('--wp-sidebar', '#2c3338');
            root.style.setProperty('--wp-dark', '#1d2327');
            root.style.setProperty('--wp-blue', '#2271b1');
            
            document.body.style.color = '#3c434a';
            document.querySelectorAll('.card').forEach(c => {
                c.style.background = '#fff';
                c.style.borderColor = '#ccd0d4';
            });
            const topNav = document.querySelector('.top-nav');
            if(topNav) {
                topNav.style.background = '#fff';
                topNav.style.color = '#000';
            }
        }
    };

    // Save settings to LocalStorage for persistence
    window.applySettings = function() {
        const theme = document.getElementById('theme-select').value;
        const fontSize = document.getElementById('font-size-select').value;

        localStorage.setItem('lumina_theme', theme);
        localStorage.setItem('lumina_fontsize', fontSize);

        window.executeTheme(theme, fontSize);
        alert("Settings Applied & Saved Successfully!");
    };

    // 5. PAGE LOAD PROTECTION & INITIALIZATION
    window.onload = () => {
        const isLoggedIn = localStorage.getItem(_0x5f21[3]) === _0x5f21[4];
        const isDashboard = window.location.pathname.includes('dashboard.html');
        const isLoginPage = window.location.pathname.includes('admin.html');

        // Security Guard: Redirect unauthorized users
        if (isDashboard) {
            if (!isLoggedIn) {
                window.location.href = 'admin.html';
            } else {
                document.body.style.display = 'flex'; // Show dashboard only if logged in
                const adminName = document.getElementById('admin-user');
                if (adminName) adminName.innerText = _authData.u;
            }
        }

        // Prevent logged-in users from seeing the login page again
        if (isLoginPage && isLoggedIn) {
            window.location.href = 'dashboard.html';
        }

        // Load Persisted Settings
        const savedTheme = localStorage.getItem('lumina_theme') || 'white';
        const savedFontSize = localStorage.getItem('lumina_fontsize') || '14px';
        
        // Update UI Select boxes if they exist
        if(document.getElementById('theme-select')) document.getElementById('theme-select').value = savedTheme;
        if(document.getElementById('font-size-select')) document.getElementById('font-size-select').value = savedFontSize;

        window.executeTheme(savedTheme, savedFontSize);

        // Update Date Display
        const dateDisplay = document.getElementById('date-display');
        if (dateDisplay) dateDisplay.innerText = new Date().toDateString();
    };

    // 6. DASHBOARD NAVIGATION
    window.logout = function() {
        localStorage.removeItem(_0x5f21[3]); // Clear session
        window.location.href = 'admin.html';
    };

// Updated Navigation with URL Hash support
window.openTab = function(e, tabName) {
    // 1. Update the URL Hash without reloading the page
    window.location.hash = tabName;

    // 2. Hide all panels and remove active class from buttons
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    
    // 3. Show the target panel
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        
        // Find the button and make it active (if triggered by click)
        if(e) {
            e.currentTarget.classList.add('active');
            document.getElementById('bread').innerText = e.currentTarget.innerText.trim();
        } else {
            // If triggered by URL, find the matching sidebar button
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                if(item.getAttribute('onclick').includes(tabName)) {
                    item.classList.add('active');
                    document.getElementById('bread').innerText = item.innerText.trim();
                }
            });
        }
    }
};

// Listen for URL hash changes (if user clicks back/forward button)
window.onhashchange = function() {
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash) {
        window.openTab(null, currentHash);
    }
};

    // 7. ANTI-HACKER PROTECTION
    // Disables Right-click and Developer Tool shortcuts
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.onkeydown = function(e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || (e.ctrlKey && e.keyCode == 85)) {
            return false;
        }
    };
})();
// --- ANTI-HACKER PROTECTION ---
    // Disable Right-Click
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Disable Inspect Element & View Source shortcuts
    document.onkeydown = function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (e.keyCode == 123 || 
            (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) || 
            (e.ctrlKey && e.keyCode == 85)) {
            return false;
        }
    };

    // Clear console to block snooping
    setInterval(() => {
        console.clear();
        console.log("%cSecurity Active - Anaf's Lumina Core", "color: red; font-size: 20px; font-weight: bold;");
    }, 1000);

    setInterval(function() {
    debugger;
    }, 100);

    (function() {
    function renderLoginForm() {
        const root = document.getElementById('root');
        root.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh;">
                <div class="auth-card" style="background: white; padding: 40px; border-radius: 4px; width: 340px;">
                    <h2 style="text-align: center; color: #1d2327;">Lumina Login</h2>
                    <input type="text" id="userInput" placeholder="Username" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccd0d4;">
                    <input type="password" id="passInput" placeholder="Password" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccd0d4;">
                    <input type="password" id="keyInput" placeholder="Pass Key" style="width: 100%; padding: 12px; margin-bottom: 15px; border: 1px solid #ccd0d4;">
                    <button onclick="handleLogin()" style="width: 100%; padding: 12px; background: #2271b1; color: white; border: none; font-weight: 600; cursor: pointer;">Log In</button>
                    <p id="err" style="color:red; display:none; text-align:center;">Access Denied!</p>
                </div>
            </div>
        `;
    }

    renderLoginForm();
    setInterval(function() {
        debugger;
    }, 100);
})();