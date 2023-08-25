/**
 * 是否隐藏的节点
 * @param {HTMLElement} node
 */
export function isHiddenNode(node) {
  return node.offsetWidth === 0 && node.offsetHeight === 0;
}

/**
 *
 * @param {HTMLElement} node
 */
export function findHiddenParentNode(node) {
  if (String.prototype.toUpperCase.call(node.tagName) === 'UL' && window.getComputedStyle(node).display === 'none') {
    return node;
  }
  return findHiddenParentNode(node.parentElement);
}
