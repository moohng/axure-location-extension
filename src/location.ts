/**
 * 由于Axure的菜单数据是异步加载的，
 * 因此这里通过循环来等待菜单加载完成
 */
export function axureReady() {
  let MAX_TRY_COUNT = 100;

  return new Promise<{ selectedItem: Element; toolBar: Element } | null>(async (resolve) => {
    let isAllowUrl = /axshare.com$/.test(location.origin);
    if (!isAllowUrl) {
      const { allowUrls = [] } = await chrome.storage.sync.get('allowUrls');
      isAllowUrl = allowUrls.includes(location.origin);
    }

    if (isAllowUrl) {
      let timer = setInterval(() => {
        // 避免不可预知情况导致无限循环
        if (MAX_TRY_COUNT <= 0) {
          clearInterval(timer);

          resolve(null);
        }
        MAX_TRY_COUNT--;

        const selectedItem = document.querySelector('#sitemapTreeContainer .sitemapHighlight');
        const toolBar = document.querySelector('#sitemapToolbar');

        // 保证左侧导航数据已加载完成
        if (selectedItem && toolBar) {
          clearInterval(timer);

          resolve({ selectedItem, toolBar });
        }
      }, 500);
    } else {
      resolve(null);
    }
  });
}

/**
 * 是否隐藏的节点
 * @param {HTMLElement} node
 */
export function isHiddenNode(node: HTMLElement) {
  return node.offsetWidth === 0 && node.offsetHeight === 0;
}

/**
 * 找到被隐藏（折叠）的ul父节点
 * @param {HTMLElement} node
 */
export function findHiddenParentNode(node: HTMLElement) {
  if (!node) {
    return null;
  }
  if (String.prototype.toUpperCase.call(node.tagName) === 'UL' && window.getComputedStyle(node).display === 'none') {
    return node;
  }
  return findHiddenParentNode(node.parentElement!);
}

/**
 * 一键折叠其他根节点
 */
export function foldRootNode() {
  const rootUlEle = document.querySelector('#sitemapTreeContainer .sitemapTree');
  for (const item of [...(rootUlEle?.children as unknown as HTMLElement[])]) {
    if (
      !item.querySelector('.sitemapHighlight') &&
      item.lastElementChild &&
      window.getComputedStyle(item.lastElementChild).display !== 'none'
    ) {
      (item.firstChild as HTMLElement)?.querySelector<HTMLElement>('a.sitemapPlusMinusLink')?.click();
    }
  }
}
