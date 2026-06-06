'use client';

import { useRouter } from 'next/navigation';

const TOOLS = [
  { icon: '⚙', label: '文章拆解', desc: '粘贴韩文文章，生成概览、全文翻译、重点词汇、重点句子和语法解析。', href: '/ai/analyze', status: '使用', pills: ['阅读报告', '可保存'] },
  { icon: '✎', label: '短句写作', desc: '模仿写、填空写、自由写 1-3 句，Tori 帮你批改，写得更自然。', href: '/writing', status: '打开', pills: ['仿写', '自由写'] },
  { icon: '◈', label: '语法解释', desc: '结构、意思、使用场景、原文例句，每个语法点 3 分钟学会用。', href: '/grammar', status: '打开', pills: ['语法卡', '可保存'] },
  { icon: '⌨', label: '韩文打字', desc: '用设备韩文键盘输入，熟悉键盘位置，从字母开始练起。', href: '/typing', status: '练习', pills: ['键盘练习', '正确率'] },
];

export function DesktopAnalyzePage() {
  const router = useRouter();

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero tools">
        <span className="desktop-label">{'⚙ 工具'}</span>
        <h2>工具不是空入口，要有完整输出</h2>
        <p>文章拆解、写作练习、语法解释、韩文打字 —— 粘贴内容，直接开始学。</p>
      </div>

      {/* Tool list — matching demo: tool-list with tool-item */}
      <div className="desktop-section">
        <h2>工具箱</h2>
      </div>
      <div className="desktop-tool-list">
        {TOOLS.map((tool) => (
          <div key={tool.href} className="desktop-tool-item" onClick={() => router.push(tool.href)}>
            <div className="desktop-tool-icon">{tool.icon}</div>
            <div className="desktop-item-main">
              <h3>{tool.label}</h3>
              <p>{tool.desc}</p>
              <div className="desktop-pills">
                {tool.pills.map((p) => <span key={p}>{p}</span>)}
              </div>
            </div>
            <span className="desktop-status-pill">{tool.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
