import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, THEORIES } from '../../constants';

interface Layer3TheoryProps {
  dramaId: string;
  onComplete: () => void;
}

export default function Layer3Theory({ dramaId, onComplete }: Layer3TheoryProps) {
  const { user } = useAuth();
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);
  const [sceneDescription, setSceneDescription] = useState('');
  const [theoryAnalysis, setTheoryAnalysis] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const theoryList = Object.values(THEORIES);
  const selectedTheoryObj = selectedTheory ? THEORIES[selectedTheory as keyof typeof THEORIES] : null;

  const handleSaveAnalysis = async () => {
    if (!user || !selectedTheory || !sceneDescription) {
      alert('请填写所有必要字段');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        dramaId,
        episode: 1,
        layerId: 3,
        theoryId: selectedTheory,
        sceneDescription,
        myThoughts: JSON.stringify(theoryAnalysis),
        selectedQuestions: Object.keys(theoryAnalysis),
        tags: ['theory', selectedTheory],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSaved(true);
      onComplete();
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save analysis:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary.dark }}>
        第三层：理论审视
      </h2>

      {!selectedTheory ? (
        <div>
          <h3 className="text-xl font-bold mb-6" style={{ color: COLORS.primary.main }}>
            选择一个理论工具
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {theoryList.map((theory) => (
              <button
                key={theory.id}
                onClick={() => setSelectedTheory(theory.id)}
                className="p-6 text-left rounded-lg border-2 transition hover:shadow-lg"
                style={{ borderColor: COLORS.primary.light }}
              >
                <h4 className="text-lg font-bold mb-2" style={{ color: COLORS.primary.dark }}>
                  {theory.icon} {theory.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">{theory.description}</p>
                <ul className="text-xs space-y-1">
                  {theory.keyConceptsShort.slice(0, 2).map((concept, idx) => (
                    <li key={idx} className="text-gray-700">• {concept}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTheory(null)}
            className="mb-6 px-4 py-2 rounded-lg text-sm"
            style={{ backgroundColor: COLORS.primary.light, color: COLORS.primary.dark }}
          >
            ← 选择其他理论
          </button>

          <div className="mb-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.dark }}>
              {selectedTheoryObj?.icon} {selectedTheoryObj?.name}
            </h3>
            <p className="text-gray-700 mb-4">{selectedTheoryObj?.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium" style={{ color: COLORS.primary.main }}>核心概念：</h4>
              {selectedTheoryObj?.keyConceptsShort.map((concept, idx) => (
                <p key={idx} className="text-sm text-gray-700">• {concept}</p>
              ))}
            </div>
          </div>

          <div className="mb-6 p-6 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
            <h4 className="font-bold mb-3" style={{ color: COLORS.primary.dark }}>场景描述</h4>
            <textarea
              value={sceneDescription}
              onChange={(e) => setSceneDescription(e.target.value)}
              placeholder="描述你要分析的场景..."
              className="w-full px-4 py-3 border rounded-lg"
              style={{ borderColor: COLORS.primary.light }}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-bold" style={{ color: COLORS.primary.dark }}>启发性问题</h4>
            {selectedTheoryObj?.questions.map((question, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border" style={{ borderColor: COLORS.primary.light }}>
                <p className="font-medium text-gray-800 mb-3">{question}</p>
                <textarea
                  value={theoryAnalysis[`q-${idx}`] || ''}
                  onChange={(e) =>
                    setTheoryAnalysis({
                      ...theoryAnalysis,
                      [`q-${idx}`]: e.target.value,
                    })
                  }
                  placeholder="你的想法..."
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{ borderColor: COLORS.primary.light }}
                  rows={2}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSaveAnalysis}
              className="flex-1 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: COLORS.accent.rose }}
            >
              💾 保存分析
            </button>
          </div>

          {saved && (
            <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
              ✅ 分析已保存！
            </div>
          )}
        </div>
      )}
    </div>
  );
}
