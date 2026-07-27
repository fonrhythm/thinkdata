import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { COLORS } from '../constants/colors';
import DramaSelector from './DramaSelector';
import LayerSelector from './ThinkingLayers/LayerSelector';

export default function MainLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDramaId, setCurrentDramaId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'selector' | 'layers'>('selector');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.primary.lighter }}>
      {/* 导航栏 */}
      <nav className="p-4 shadow-md" style={{ backgroundColor: COLORS.primary.main }}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            启发式思考系统
          </div>
          <div className="flex items-center gap-6">
            <span className="text-white text-sm">欢迎, {user?.displayName || user?.email}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg text-white text-sm transition"
              style={{ backgroundColor: COLORS.accent.rose }}
            >
              退出登录
            </button>
          </div>
        </div>
      </nav>

      {/* 主内容 */}
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {currentView === 'selector' ? (
            <DramaSelector
              onSelectDrama={(dramaId) => {
                setCurrentDramaId(dramaId);
                setCurrentView('layers');
              }}
            />
          ) : (
            <LayerSelector
              dramaId={currentDramaId!}
              onBack={() => {
                setCurrentDramaId(null);
                setCurrentView('selector');
              }}
            />
          )}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="p-6 mt-12 text-center text-gray-600 text-sm">
        <p>启发式思考系统 v1.0.0 © 2024</p>
      </footer>
    </div>
  );
}
