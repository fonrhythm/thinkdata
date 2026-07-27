import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, LAYERS } from '../../constants';

interface Layer1SurfaceProps {
  dramaId: string;
  onComplete: () => void;
}

export default function Layer1Surface({ dramaId, onComplete }: Layer1SurfaceProps) {
  const { user } = useAuth();
  const layer = LAYERS[0]; // 第一层
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const section = layer.sections[currentSection];

  const handleSaveNote = async () => {
    if (!user) {
      alert('请先登录');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        dramaId,
        episode: 1,
        layerId: 1,
        sceneDescription: '',
        myThoughts: JSON.stringify(responses),
        selectedQuestions: Object.keys(responses),
        tags: ['surface'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary.dark }}>
        {layer.title}
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4" style={{ color: COLORS.primary.main }}>
          {section.title}
        </h3>
        <p className="text-gray-600 mb-6">你的直觉感受，无需推理</p>

        <div className="space-y-4">
          {section.questions.map((question, idx) => (
            <div key={idx} className="p-4 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
              <p className="font-medium text-gray-800 mb-3">{question}</p>
              <textarea
                value={responses[`${currentSection}-${idx}`] || ''}
                onChange={(e) =>
                  setResponses({
                    ...responses,
                    [`${currentSection}-${idx}`]: e.target.value,
                  })
                }
                placeholder="你的想法..."
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{ borderColor: COLORS.primary.light, '--tw-ring-color': COLORS.primary.main } as any}
                rows={3}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="px-6 py-2 rounded-lg disabled:opacity-50"
          style={{ backgroundColor: COLORS.primary.light, color: COLORS.primary.dark }}
        >
          ← 上一部分
        </button>
        <button
          onClick={() => setCurrentSection(Math.min(layer.sections.length - 1, currentSection + 1))}
          disabled={currentSection === layer.sections.length - 1}
          className="px-6 py-2 rounded-lg text-white"
          style={{ backgroundColor: currentSection === layer.sections.length - 1 ? COLORS.primary.light : COLORS.primary.main }}
        >
          下一部分 →
        </button>
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSaveNote}
          className="flex-1 py-3 rounded-lg text-white font-medium"
          style={{ backgroundColor: COLORS.accent.rose }}
        >
          💾 保存笔记
        </button>
      </div>

      {saved && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          ✅ 笔记已保存！
        </div>
      )}
    </div>
  );
}
