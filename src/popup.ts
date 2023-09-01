document.addEventListener('DOMContentLoaded', () => {
  getCurrentUrl().then((url) => {
    setUrl(url);

    if (!url) {
      document.querySelector<HTMLElement>('#operation')!.style.display = 'none';
    } else {
      const $switch = document.querySelector<HTMLInputElement>('#enableSwitch');
      // 初始化启用状态
      initStatus($switch!);

      // 监听事件
      $switch!.addEventListener('change', (e) => {
        const checked = (e.target as HTMLInputElement).checked;
        chrome.storage.sync.get('allowUrls').then(({ allowUrls }) => {
          const index = allowUrls.indexOf(url);
          if (checked && index === -1) {
            chrome.storage.sync.set({ allowUrls: (allowUrls as unknown as string[]).concat(url) }).then(() => {
              chrome.tabs.reload();
            });
          } else if (!checked && index > -1) {
            allowUrls.splice(index, 1);
            chrome.storage.sync.set({ allowUrls }).then(() => {
              chrome.tabs.reload();
            });
          }
        });
      });
    }
  });
});

/**
 * 获取当前网站url
 * @returns
 */
function getCurrentUrl() {
  return chrome.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    try {
      const url = new URL(tabs[0].url!).hostname;
      return url;
    } catch (err) {
      return '';
    }
  });
}

/**
 * 设置url标题
 */
function setUrl(url = '当前网站不可用！！！') {
  const $url = document.querySelector('#url');
  if ($url) {
    $url.textContent = url;
  }
}

/**
 * 设置状态
 * @param el
 */
function initStatus(el: HTMLInputElement) {
  Promise.all([getCurrentUrl(), chrome.storage.sync.get('allowUrls')]).then(([url, { allowUrls = [] }]) => {
    el.checked = allowUrls.includes(url);
  });
}
