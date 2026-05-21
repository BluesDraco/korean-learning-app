'use client';

import Link from 'next/link';
import { ArrowLeft, Library } from 'lucide-react';
import { knowledgeCategories } from '@/data/knowledge';

export default function KnowledgePage() {
  return (
    <div className="py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">知识库</h1>
        <p className="text-slate-400 text-sm mt-1">按分类学习韩语单词，每个单词配有例句和用法提示</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {knowledgeCategories.map((cat) => (
          <Link
            key={cat.id}
            href={`/knowledge/${cat.slug}`}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all group"
          >
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
              {cat.name}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">{cat.nameKo}</p>
            <p className="text-xs text-slate-600 mt-2 line-clamp-2">{cat.description}</p>
            <p className="text-xs text-blue-500/70 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {cat.words.length} 个单词 →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
