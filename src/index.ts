import { axureReady, findHiddenParentNode, foldRootNode, isHiddenNode } from './location';

async function run() {
  const { selectedItem, toolBar } = await axureReady();

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
    const currentEle = document.querySelector<HTMLElement>('#sitemapTreeContainer .sitemapHighlight');
    if (currentEle) {
      /**
       * 判断当前菜单是否被折叠
       * 1. 如果折叠了，向上找到隐藏的ul（display:none）
       * 2. 点击ul的前一个节点的子节点a.sitemapPlusMinusLink进行展开
       */
      if (isHiddenNode(currentEle)) {
        const ulEle = findHiddenParentNode(currentEle);
        // 点击展开
        ulEle?.previousElementSibling?.querySelector<HTMLElement>('a.sitemapPlusMinusLink')?.click();
      }
      // 滚动到可视区域
      currentEle.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error('========== 未找到选中的菜单！===========');
    }
  });
}

run();
