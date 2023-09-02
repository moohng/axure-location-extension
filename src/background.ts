// 添加上下文菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'enableMenu',
    title: '一键启用 Axure Location',
    contexts: ['page'],
  });
});

// 监听事件
chrome.contextMenus.onClicked.addListener(async (info) => {
  const { allowUrls = [] } = await chrome.storage.sync.get('allowUrls');

  const url = new URL(info.pageUrl).hostname;
  const index = allowUrls.indexOf(url);

  // 启用
  if (info.menuItemId === 'enableMenu' && index === -1) {
    await chrome.storage.sync.set({ allowUrls: (allowUrls as unknown as string[]).concat(url) });
    // 刷新当前页面
    chrome.tabs.reload();
  }
});
