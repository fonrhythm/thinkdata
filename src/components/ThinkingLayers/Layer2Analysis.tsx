import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useAuth } from '../../hooks/useAuth';
import { COLORS, LAYERS } from '../../constants';

interface Layer2AnalysisProps {
  dramaId: string;
  onComplete: () => void;
}

export default function Layer2Analysis({ dramaId, onComplete }: Layer2AnalysisProps) {
  const { user } = useAuth();
  const layer = LAYERS[1]; // 第二层
  const [sceneDescription, setSceneDescription] = useState('');
  const [analysisData, setAnalysisData] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleSaveAnalysis = async () => {
    if (!user || !sceneDescription) {
      alert('请先描述这一幕');
      return;
    }

    try {
      await addDoc(collection(db, 'notes'), {
        userId: user.uid,
        dramaId,
        episode: 1,
        layerId: 2,
        sceneDescription,
        myThoughts: JSON.stringify(analysisData),
        selectedQuestions: Object.keys(analysisData),
        tags: ['analysis'],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Failed to save analysis:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-8" style={{ color: COLORS.primary.dark }}>
        {layer.title}
      </h2>

      <div className="mb-8 p-6 bg-white rounded-lg">
        <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.main }}>
          场景描述
        </h3>
        <textarea
          value={sceneDescription}
          onChange={(e) => setSceneDescription(e.target.value)}
          placeholder="描述你要分析的场景...（时间点、人物、发生了什么）"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
          style={{ borderColor: COLORS.primary.light, '--tw-ring-color': COLORS.primary.main } as any}
          rows={4}
        />
      </div>

      <div className="space-y-6">
        {layer.sections.map((section) => (
          <div key={section.id} className="p-6 bg-white rounded-lg">
            <h3 className="text-lg font-bold mb-4" style={{ color: COLORS.primary.main }}>
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.questions.map((question, idx) => (
                <div key={idx}>
                  <p className="font-medium text-gray-800 mb-2">{question}</p>
                  <textarea
                    value={analysisData[`${section.id}-${idx}`] || ''}
                    onChange={(e) =>
                      setAnalysisData({
                        ...analysisData,
                        [`${section.id}-${idx}`]: e.target.value,
                      })
                    }
                    placeholder="你的分析..."
                    className="w-full px-4 py-2 border rounded-lg"
                    style={{ borderColor: COLORS.primary.light }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
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
  );
}
