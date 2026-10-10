// Alchemy Docs - Sidebar Toggle Controls
// Adds "Expand All" and "Collapse All" buttons to the sidebar

(function () {
    'use strict';

    function addToggleControls() {
        var sidebar = document.querySelector('.sidebar-scrollbox');
        if (!sidebar) return;

        // Don't add if already exists
        if (document.querySelector('.sidebar-toggle-controls')) return;

        // Create the button container
        var controls = document.createElement('div');
        controls.className = 'sidebar-toggle-controls';

        // Expand All button
        var expandBtn = document.createElement('button');
        expandBtn.textContent = '▼ Expand All';
        expandBtn.title = 'Expand all categories';
        expandBtn.addEventListener('click', function () {
            var toggles = sidebar.querySelectorAll('li.chapter-item');
            toggles.forEach(function (li) {
                // mdBook uses an <input type="checkbox"> or the 'open' class
                // to control fold state. We need to handle both approaches.
                var toggle = li.querySelector(':scope > .toggle > input[type="checkbox"]');
                if (toggle) {
                    toggle.checked = true;
                }
                // Also handle <details> if mdBook uses that
                var details = li.querySelector(':scope > details');
                if (details) {
                    details.open = true;
                }
                // Add expanded class
                li.classList.add('expanded');
                li.classList.remove('collapsed');
            });
        });

        // Collapse All button
        var collapseBtn = document.createElement('button');
        collapseBtn.textContent = '▶ Collapse All';
        collapseBtn.title = 'Collapse all categories';
        collapseBtn.addEventListener('click', function () {
            var toggles = sidebar.querySelectorAll('li.chapter-item');
            toggles.forEach(function (li) {
                var toggle = li.querySelector(':scope > .toggle > input[type="checkbox"]');
                if (toggle) {
                    toggle.checked = false;
                }
                var details = li.querySelector(':scope > details');
                if (details) {
                    details.open = false;
                }
                li.classList.remove('expanded');
                li.classList.add('collapsed');
            });
        });

        controls.appendChild(expandBtn);
        controls.appendChild(collapseBtn);

        // Insert at the top of the sidebar
        sidebar.insertBefore(controls, sidebar.firstChild);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addToggleControls);
    } else {
        addToggleControls();
    }
})();
