import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { COLORS } from '../../constants/colors';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: COLORS.primary.lighter }}>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center" style={{ color: COLORS.primary.dark }}>
          启发式思考系统
        </h1>
        <p className="text-center text-gray-600 mb-8">深度分析你的BL年代剧</p>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
              邮箱
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: COLORS.primary.light, '--tw-ring-color': COLORS.primary.main } as any}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: COLORS.primary.dark }}>
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: COLORS.primary.light, '--tw-ring-color': COLORS.primary.main } as any}
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-white rounded-lg font-medium transition"
            style={{ backgroundColor: loading ? COLORS.primary.light : COLORS.primary.main }}
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          没有账户？{' '}
          <a href="/register" style={{ color: COLORS.accent.rose }} className="font-medium hover:underline">
            注册
          </a>
        </p>
      </div>
    </div>
  );
}
