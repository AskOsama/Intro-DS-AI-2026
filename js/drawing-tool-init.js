/**
 * Drawing-tool init for the DS-AI 2026 course.
 *
 * Loads after js/drawing-tool.js. Initialises the tool, then mounts a
 * small floating "✏︎" button bottom-end of the viewport that toggles
 * the annotation panel.
 *
 * The instructor presses it to start drawing on the page (highlighter,
 * pen, eraser, undo, etc.) during a live explanation. Students who
 * never click it see only the discreet button and are otherwise
 * undisturbed. Keyboard shortcut: Alt+D.
 */
(function () {
  if (typeof DrawingTool === 'undefined') {
    console.warn('drawing-tool-init.js: DrawingTool global missing — was drawing-tool.js loaded first?');
    return;
  }

  // Initialise — panel stays hidden until enable() / toggle() is called.
  DrawingTool.init();

  // Floating toggle button
  const btn = document.createElement('button');
  btn.id = 'dt-toggle';
  btn.type = 'button';
  btn.title = 'Annotate this page (Alt+D)';
  btn.setAttribute('aria-label', 'Toggle annotation tools');
  btn.textContent = '✏︎';
  Object.assign(btn.style, {
    position: 'fixed',
    bottom: '20px',
    insetInlineEnd: '20px',
    zIndex: '10000',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: '1px solid #d6cdb8',
    background: '#fbf8f0',
    color: '#14202e',
    cursor: 'pointer',
    fontSize: '20px',
    lineHeight: '1',
    boxShadow: '0 4px 14px rgba(20,32,46,0.18)',
    transition: 'background 0.18s ease, color 0.18s ease, transform 0.18s ease'
  });

  btn.addEventListener('mouseenter', function () {
    btn.style.background = '#a07c1d';
    btn.style.color = '#fff';
    btn.style.transform = 'translateY(-2px)';
  });
  btn.addEventListener('mouseleave', function () {
    btn.style.background = btn.dataset.active === '1' ? '#14202e' : '#fbf8f0';
    btn.style.color = btn.dataset.active === '1' ? '#fff' : '#14202e';
    btn.style.transform = 'none';
  });
  btn.addEventListener('click', function () {
    DrawingTool.toggle();
    const on = DrawingTool.isEnabled();
    btn.dataset.active = on ? '1' : '0';
    btn.title = on ? 'Stop annotating (Alt+D)' : 'Annotate this page (Alt+D)';
    btn.style.background = on ? '#14202e' : '#fbf8f0';
    btn.style.color = on ? '#fff' : '#14202e';
  });

  document.body.appendChild(btn);

  // Keyboard shortcut Alt+D — works even when the button is offscreen
  document.addEventListener('keydown', function (e) {
    if (e.altKey && (e.key === 'd' || e.key === 'D')) {
      e.preventDefault();
      btn.click();
    }
  });

  // Hide the button when printing
  const printStyle = document.createElement('style');
  printStyle.textContent = '@media print { #dt-toggle { display: none !important; } }';
  document.head.appendChild(printStyle);
})();
