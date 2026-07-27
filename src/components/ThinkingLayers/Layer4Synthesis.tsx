import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, THEORIES } from '../../constants';

interface Layer4SynthesisProps {
  dramaId: string;
  onComplete: () => void;
}

export default function Layer4Synthesis({ dramaId, onComplete }: Layer4SynthesisProps) {
  const { user } = useAuth();
  const [sceneDescription, setSceneDescription] = useState('');
  const [perspectives, setPerspectives] = useState<Record<string, string>>({});
  const [synthesis, setSynthesis] = useState('');
  const [saved, setSaved] = useState(false);

  const theoryList = Object.values(THEORIES);

  const handleSaveSynthesis = async () => {
    if (!user || !sceneDescription || !synthesis) {
      alert('请完成分析');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        dramaId,
        episode: 1,
        layerId: 4,
        sceneDescription,
        myThoughts: JSON.stringify({
          perspectives,
          synthesis,
        }),
        selectedQuestions: Object.keys(perspectives),
        tags: ['synthesis'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSaved(true);
      onComplete();
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save synthesis:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary.dark }}>
        第四层：综合反思
      </h2>

      <div className="mb-8 p-6 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
        <h3 className="font-bold mb-3" style={{ color: COLORS.primary.dark }}>场景描述</h3>
        <textarea
          value={sceneDescription}
          onChange={(e) => setSceneDescription(e.target.value)}
          placeholder="描述这一幕..."
          className="w-full px-4 py-3 border rounded-lg"
          style={{ borderColor: COLORS.primary.light }}
          rows={3}
        />
      </div>

      <div className="mb-8">
        <h3 className="font-bold mb-4" style={{ color: COLORS.primary.dark }}>
          不同理论视角的对话
        </h3>
        <p className="text-sm text-gray-600 mb-6">
          从每个理论角度简要记录你的想法，然后在最后综合
        </p>

        {theoryList.map((theory) => (
          <div key={theory.id} className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#FFF5F5', borderLeft: `4px solid ${COLORS.primary.main}` }}>
            <h4 className="font-bold mb-2">
              {theory.icon} {theory.name}
            </h4>
            <textarea
              value={perspectives[theory.id] || ''}
              onChange={(e) =>
                setPerspectives({
                  ...perspectives,
                  [theory.id]: e.target.value,
                })
              }
              placeholder={`从${theory.name}的角度，这一幕...`}
              className="w-full px-4 py-2 border rounded-lg text-sm"
              style={{ borderColor: COLORS.primary.light }}
              rows={2}
            />
          </div>
        ))}
      </div>

      <div className="mb-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="font-bold mb-3" style={{ color: COLORS.primary.dark }}>综合反思</h3>
        <p className="text-sm text-gray-600 mb-3">
          这些理论视角是否矛盾？如何共存？你倾向哪种解读？为什么？
        </p>
        <textarea
          value={synthesis}
          onChange={(e) => setSynthesis(e.target.value)}
          placeholder="综合各个理论的见解..."
          className="w-full px-4 py-3 border rounded-lg"
          style={{ borderColor: COLORS.primary.light }}
          rows={4}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSaveSynthesis}
          className="flex-1 py-3 rounded-lg text-white font-medium"
          style={{ backgroundColor: COLORS.accent.rose }}
        >
          💾 保存反思
        </button>
      </div>

      {saved && (
        <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
          ✅ 反思已保存！
        </div>
      )}
    </div>
  );
}
