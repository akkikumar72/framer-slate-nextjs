import { createElement, Fragment, type ReactNode } from 'react';
import type { RichNode } from '@/lib/collections';
import styles from './collections.module.css';

function renderNode(node: RichNode, index: number): ReactNode {
  if (typeof node === 'string') return node;
  const tag = ['p', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'strong', 'em', 'br', 'a'].includes(node.tag) ? node.tag : 'span';
  const href = node.href?.startsWith('./') ? `/hulio/${node.href.slice(2)}` : node.href;
  return createElement(tag, { key: index, ...(tag === 'a' ? { href } : {}), ...(tag === 'p' && !node.children.length ? { 'aria-hidden': true } : {}) }, tag === 'br' ? undefined : node.children.map(renderNode));
}

export function RichContent({ blocks, className = '' }: { blocks: RichNode[]; className?: string }) {
  return <div className={`${styles.rich} ${className}`}>{blocks.map((node, index) => <Fragment key={index}>{renderNode(node, index)}</Fragment>)}</div>;
}
