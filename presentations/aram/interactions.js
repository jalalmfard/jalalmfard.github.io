(function () {
  const comparison = document.querySelector('#comparison');
  const compare = document.querySelector('.compare');
  if (comparison && compare) {
    const updateComparison = () => compare.style.setProperty('--split', comparison.value + '%');
    comparison.addEventListener('input', updateComparison);
    comparison.addEventListener('change', updateComparison);
    updateComparison();
  }

  const allScenes = [...document.querySelectorAll('.scene')];
  const chapterNav = document.querySelector('#chapters');
  if (chapterNav && chapterNav.children.length < allScenes.length && typeof go === 'function') {
    const finalButton = document.createElement('button');
    finalButton.setAttribute('aria-label', 'Studio');
    finalButton.title = 'Studio';
    finalButton.addEventListener('click', () => go(allScenes.length - 1));
    chapterNav.append(finalButton);
  }
})();
