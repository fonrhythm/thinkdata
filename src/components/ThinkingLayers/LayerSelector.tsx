import React, { useState } from 'react';
import { LAYERS } from '../../constants/layers';
import { COLORS } from '../../constants/colors';
import Layer1Surface from './Layer1Surface';
import Layer2Analysis from './Layer2Analysis';
import Layer3Theory from './Layer3Theory';
import Layer4Synthesis from './Layer4Synthesis';
import Layer5Ultimate from './Layer5Ultimate';

interface LayerSelectorProps {
  dramaId: string;
  onBack: () => void;
}

export default function LayerSelector({ dramaId, onBack }: LayerSelectorProps) {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);

  const layerComponents: { [key: number]: React.ComponentType<any> } = {
    1: Layer1Surface,
    2: Layer2Analysis,
    3: Layer3Theory,
    4: Layer4Synthesis,
    5: Layer5Ultimate,
  };

  if (selectedLayer !== null) {
    const LayerComponent = layerComponents[selectedLayer];
    return (
      <div>
        <button
          onClick={() => setSelectedLayer(null)}
          className="mb-6 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ backgroundColor: COLORS.primary.light, color: COLORS.primary.dark }}
        >
          ← 返回分层选择
        </button>
        <LayerComponent dramaId={dramaId} onComplete={() => setSelectedLayer(null)} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2" style={{ color: COLORS.primary.dark }}>
          选择分析层级
        </h2>
        <p className="text-gray-600">
          按照五层递进式框架，深度分析这部剧
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => setSelectedLayer(layer.id)}
            className="p-6 bg-white rounded-lg border-2 transition hover:shadow-lg text-left"
            style={{ borderColor: COLORS.primary.light }}
          >
            <div className="text-3xl mb-2">{layer.icon}</div>
            <h3 className="font-bold mb-2 text-sm" style={{ color: COLORS.primary.dark }}>
              {layer.name}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              {layer.description}
            </p>
            <span
              className="inline-block px-2 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: COLORS.accent.rose }}
            >
              {layer.difficulty}
            </span>
          </button>
        ))}
      </div>

      <button
        onClick={onBack}
        className="px-6 py-2 rounded-lg font-medium"
        style={{ backgroundColor: COLORS.neutral.gray200, color: COLORS.primary.dark }}
      >
        ← 返回剧集列表
      </button>
    </div>
  );
}
