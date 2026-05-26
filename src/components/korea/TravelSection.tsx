'use client';

import { Volume2, MapPin as MapPinIcon } from 'lucide-react';
import { travelCities } from '@/data/korea';

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export function TravelSection() {
  return (
    <div className="space-y-4">
      {travelCities.map((city) => (
        <div key={city.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{city.emoji}</span>
            <div>
              <h2 className="text-lg font-bold text-[var(--text-primary)]">
                {city.name}
                <span className="text-sm font-normal text-[var(--text-muted)] ml-2">{city.nameKo}</span>
              </h2>
              <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed">{city.description}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
              <MapPinIcon size={14} /> 推荐景点
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {city.attractions.map((attr) => (
                <div key={attr.name} className="bg-[var(--bg-card-hover)] rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-[var(--text-primary)]">{attr.name}</span>
                    <span className="text-xs text-[var(--text-muted)]">{attr.nameKo}</span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{attr.desc}</p>
                </div>
              ))}
            </div>
          </div>
          {city.phrases.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2">实用短语</h3>
              <div className="space-y-2">
                {city.phrases.map((phrase, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-[var(--bg-input)] rounded-xl px-3 py-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--text-primary)] font-medium">{phrase.ko}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{phrase.zh}</p>
                    </div>
                    <button
                      onClick={() => speakKorean(phrase.ko)}
                      className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                      title="听发音"
                    >
                      <Volume2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
