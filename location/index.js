/**
 * 由于Axure的菜单数据是异步加载的，
 * 因此这里通过循环来等待菜单加载完成
 */
let MAX_TRY_COUNT = 100;

let timer = setInterval(() => {
  // 避免不可预知情况导致无限循环
  if (MAX_TRY_COUNT <= 0) {
    clearInterval(timer);
    timer = null;
  }
  MAX_TRY_COUNT--;

  const selectedItem = document.querySelector('#sitemapTreeContainer .sitemapHighlight');
  const toolBar = document.querySelector('#sitemapToolbar');

  // 保证左侧导航数据已加载完成
  if (selectedItem && toolBar) {
    clearInterval(timer);
    timer = null;

    // 一键折叠其他版本
    foldRootNode();

    // 滚动到可视区域
    selectedItem.scrollIntoView({ behavior: 'smooth' });

    // 添加折叠按钮
    const foldButton = document.createElement('div');
    foldButton.classList.add('sitemapToolbarButton', 'foldIcon');
    toolBar.appendChild(foldButton);

    foldButton.addEventListener('click', () => {
      foldRootNode();
    });

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
 * 找到被隐藏（折叠）的ul父节点
 * @param {HTMLElement} node
 */
function findHiddenParentNode(node) {
  if (String.prototype.toUpperCase.call(node.tagName) === 'UL' && window.getComputedStyle(node).display === 'none') {
    return node;
  }
  return findHiddenParentNode(node.parentElement);
}

/**
 * 一键折叠其他根节点
 */
function foldRootNode() {
  const rootUlEle = document.querySelector('#sitemapTreeContainer .sitemapTree');
  for (const item of rootUlEle.children) {
    if (!item.querySelector('.sitemapHighlight') && window.getComputedStyle(item.lastElementChild).display !== 'none') {
      item.firstChild.querySelector('a.sitemapPlusMinusLink')?.click();
    }
  }
}
