// 添加上下文菜单
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'enableMenu',
    title: '一键启用 Axure Location',
    contexts: ['page'],
  });
});

// 监听事件
chrome.contextMenus.onClicked.addListener((info) => {
  chrome.storage.sync.get('allowUrls').then(({ allowUrls = [] }) => {
    const url = new URL(info.pageUrl).hostname;
    const index = allowUrls.indexOf(url);
    // 启用
    if (info.menuItemId === 'enableMenu' && index === -1) {
      chrome.storage.sync.set({ allowUrls: (allowUrls as unknown as string[]).concat(url) }).then(() => {
        // 刷新当前页面
        chrome.tabs.reload();
      });
    }
    // else if (info.menuItemId === 'disableMenu' && index > -1) {
    //   allowUrls.splice(index, 1);
    //   chrome.storage.sync.set({ allowUrls }).then(() => {
    //     // 刷新当前页面
    //     chrome.tabs.reload();
    //   });
    // }
    // #74BB11
    // #009CD9
    // #EB2084
  });
})
