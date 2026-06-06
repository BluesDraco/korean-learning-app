'use client';

export function DesktopPanel() {
  return (
    <aside className="desktop-panel">
      <div className="panel-card">
        <h3>快捷入口</h3>
        <p style={{ color: '#86746d', fontSize: 13, lineHeight: 1.55 }}>KPOP 跟唱、热点阅读、文章拆解、闪卡复习。</p>
      </div>
      <div className="panel-card">
        <h3>今日进度</h3>
        <p>打开 Tori 开始今天的学习</p>
        <div className="panel-progress">
          <span style={{ width: '0%' }} />
        </div>
      </div>
      <div className="panel-card">
        <h3>最近保存</h3>
        <p style={{ color: '#86746d' }}>开始学习后，保存的单词和句子会出现在这里。</p>
      </div>
    </aside>
  );
}
