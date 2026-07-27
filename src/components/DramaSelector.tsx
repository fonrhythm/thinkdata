import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../constants/colors';

interface DramaSelectorProps {
  onSelectDrama: (dramaId: string) => void;
}

export default function DramaSelector({ onSelectDrama }: DramaSelectorProps) {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    platform: '',
    historicalPeriod: '',
    episodes: 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddDrama = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'dramas'), {
        userId: user.uid,
        ...formData,
        currentEpisode: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setSuccess(true);
      setTimeout(() => {
        onSelectDrama(docRef.id);
        setShowForm(false);
        setFormData({
          title: '',
          year: new Date().getFullYear(),
          platform: '',
          historicalPeriod: '',
          episodes: 1,
        });
        setSuccess(false);
      }, 1000);
    } catch (error) {
      console.error('Error adding drama:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4" style={{ color: COLORS.primary.dark }}>
          欢迎来到启发式思考系统
        </h1>
        <p className="text-gray-600 text-lg">
          选择一部剧，开始你的五层深度分析之旅
        </p>
      </div>

      {!showForm ? (
        <div className="text-center">
          <button
            onClick={() => setShowForm(true)}
            className="px-8 py-4 text-white rounded-lg font-medium text-lg transition hover:shadow-lg"
            style={{ backgroundColor: COLORS.primary.main }}
          >
            + 添加新剧
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6" style={{ color: COLORS.primary.dark }}>
            添加新剧集
          </h2>

          <form onSubmit={handleAddDrama}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
                剧名
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: COLORS.primary.light }}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
                  年份
                </label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{ borderColor: COLORS.primary.light }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
                  平台
                </label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  placeholder="e.g., Netflix, 腾讯视频"
                  className="w-full px-4 py-2 border rounded-lg"
                  style={{ borderColor: COLORS.primary.light }}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
                历史背景
              </label>
              <input
                type="text"
                value={formData.historicalPeriod}
                onChange={(e) => setFormData({ ...formData, historicalPeriod: e.target.value })}
                placeholder="e.g., 明朝, 泰国历代"
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: COLORS.primary.light }}
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
                总集数
              </label>
              <input
                type="number"
                value={formData.episodes}
                onChange={(e) => setFormData({ ...formData, episodes: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
                style={{ borderColor: COLORS.primary.light }}
                min="1"
                required
              />
            </div>

            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg">
                ✅ 剧集已添加！
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3 rounded-lg text-white font-medium"
                style={{ backgroundColor: loading ? COLORS.primary.light : COLORS.primary.main }}
              >
                {loading ? '添加中...' : '开始分析'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 rounded-lg font-medium"
                style={{ backgroundColor: COLORS.neutral.gray200, color: COLORS.primary.dark }}
              >
                取消
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
