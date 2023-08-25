
let timer = setInterval(() => {
  const selectedItem = document.querySelector('#sitemapTreeContainer .sitemapHighlight');
  const toolBar = document.querySelector('#sitemapToolbar');

  // 保证左侧导航数据已加载完成
  if (selectedItem && toolBar) {
    clearInterval(timer);
    timer = null;

    // 一键折叠其他版本
    const rootUlEle = document.querySelector('#sitemapTreeContainer .sitemapTree');
    for (const item of rootUlEle.children) {
      if (!item.querySelector('.sitemapHighlight')) {
        item.firstChild.querySelector('a.sitemapPlusMinusLink')?.click();
      }
    }

    // 滚动到可视区域
    selectedItem.scrollIntoView({ behavior: 'smooth' });

    // 添加定位按钮
    const locationButton = document.createElement('div');
    locationButton.classList.add('sitemapToolbarButton', 'locationIcon');
    toolBar.appendChild(locationButton);

    locationButton.addEventListener('click', () => {
      const currentEle = document.querySelector('#sitemapTreeContainer .sitemapHighlight');
      if (currentEle) {
        /**
         * 判断当前菜单是否被折叠
         * 1. 如果折叠了，向上找到隐藏的ul（display:none）
         * 2. 点击ul的前一个节点的子节点a.sitemapPlusMinusLink进行展开
         */
        if (isHiddenNode(currentEle)) {
          const ulEle = findHiddenParentNode(currentEle);
          // 点击展开
          ulEle.previousElementSibling.querySelector('a.sitemapPlusMinusLink')?.click();
        }
        // 滚动到可视区域
        currentEle.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.error('========== 未找到选中的菜单！===========');
      }
    });
  }
}, 500);

/**
 * 是否隐藏的节点
 * @param {HTMLElement} node
 */
function isHiddenNode(node) {
  return node.offsetWidth === 0 && node.offsetHeight === 0;
}

/**
 *
 * @param {HTMLElement} node
 */
function findHiddenParentNode(node) {
  if (String.prototype.toUpperCase.call(node.tagName) === 'UL' && window.getComputedStyle(node).display === 'none') {
    return node;
  }
  return findHiddenParentNode(node.parentElement);
}
