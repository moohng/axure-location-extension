// 添加上下文菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'enableMenu',
    title: '在此网站上启用',
    contexts: ['page'],
  });
  chrome.contextMenus.create({
    id: 'disableMenu',
    title: '在此网站上停用',
    contexts: ['page'],
  });
});

// 监听事件
chrome.contextMenus.onClicked.addListener(async (info) => {
  const { allowUrls = [] } = await chrome.storage.sync.get('allowUrls');

  const url = new URL(info.pageUrl);
  const hostname = url.hostname || url.pathname;
  const index = allowUrls.indexOf(hostname);

  // 启用
  if (info.menuItemId === 'enableMenu' && index === -1) {
    await chrome.storage.sync.set({ allowUrls: (allowUrls as unknown as string[]).concat(hostname) });
    // 刷新当前页面
    chrome.tabs.reload();
  } else if (info.menuItemId === 'disableMenu' && index > -1) {
    allowUrls.splice(index, 1);
    await chrome.storage.sync.set({ allowUrls });
    // 刷新当前页面
    chrome.tabs.reload();
  }
});
