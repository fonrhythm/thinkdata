import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, LAYERS } from '../../constants';

interface Layer5UltimateProps {
  dramaId: string;
  onComplete: () => void;
}

export default function Layer5Ultimate({ dramaId, onComplete }: Layer5UltimateProps) {
  const { user } = useAuth();
  const layer = LAYERS[4]; // 第五层
  const section = layer.sections[0];
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [finalThoughts, setFinalThoughts] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSaveReflection = async () => {
    if (!user) {
      alert('请先登录');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        dramaId,
        episode: 1,
        layerId: 5,
        sceneDescription: finalThoughts,
        myThoughts: JSON.stringify(reflections),
        selectedQuestions: Object.keys(reflections),
        tags: ['ultimate'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSaved(true);
      onComplete();
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save reflection:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary.dark }}>
        {layer.title}
      </h2>

      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.dark }}>
          {layer.icon} 最后的自我对话
        </h3>
        <p className="text-gray-700">
          这一层邀请你从看剧回到看自己。这不是对剧的分析，而是对自己的反思。
        </p>
      </div>

      <div className="space-y-6">
        {section.questions.map((question, idx) => (
          <div key={idx} className="p-6 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
            <p className="font-medium text-gray-800 mb-4">{question}</p>
            <textarea
              value={reflections[`q-${idx}`] || ''}
              onChange={(e) =>
                setReflections({
                  ...reflections,
                  [`q-${idx}`]: e.target.value,
                })
              }
              placeholder="自我反思..."
              className="w-full px-4 py-3 border rounded-lg"
              style={{ borderColor: COLORS.primary.light }}
              rows={4}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
        <h3 className="font-bold mb-4" style={{ color: COLORS.primary.dark }}>
          最终思考
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          总结一下，这个分析过程对你的意义是什么？
        </p>
        <textarea
          value={finalThoughts}
          onChange={(e) => setFinalThoughts(e.target.value)}
          placeholder="你的最终想法..."
          className="w-full px-4 py-3 border rounded-lg"
          style={{ borderColor: COLORS.primary.light }}
          rows={5}
        />
      </div>

      <div className="mt-8 flex gap-4">
        <button
          onClick={handleSaveReflection}
          className="flex-1 py-3 rounded-lg text-white font-medium"
          style={{ backgroundColor: COLORS.accent.rose }}
        >
          💾 保存反思
        </button>
      </div>

      {saved && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          ✅ 反思已保存！🎉
        </div>
      )}
    </div>
  );
}
