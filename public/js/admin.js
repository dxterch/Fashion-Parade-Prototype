// Fashion Parade Admin JS

// Expandable volunteer rows
document.querySelectorAll('.expandable-row').forEach(row => {
  row.addEventListener('click', (e) => {
    // Don't expand if clicking form elements
    if (e.target.closest('form') || e.target.closest('select') || e.target.closest('button')) return;
    const id = row.dataset.id;
    const detail = document.getElementById(`detail-${id}`);
    if (detail) {
      const isOpen = detail.style.display !== 'none';
      detail.style.display = isOpen ? 'none' : 'table-row';
      row.style.background = isOpen ? '' : '#fdf8f2';
    }
  });
});

// Auto-dismiss flash messages
document.querySelectorAll('.flash').forEach(f => {
  setTimeout(() => {
    f.style.opacity = '0';
    f.style.transition = 'opacity 0.4s';
    setTimeout(() => f.remove(), 400);
  }, 4000);
});

// Confirm dangerous actions
document.querySelectorAll('[data-confirm]').forEach(el => {
  el.addEventListener('click', (e) => {
    if (!confirm(el.dataset.confirm)) e.preventDefault();
  });
});
