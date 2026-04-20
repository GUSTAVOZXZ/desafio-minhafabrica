'use client';

import { useEffect, useState } from 'react';
import { Users, Package, TrendingUp } from 'lucide-react';
import api from '@/services/api';
import { DashboardStats } from '@/types';

export default function DashboardPage() {
  const [stats, setStats]     = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Busca os dados assim que a página carrega
  useEffect(() => {
    api.get<DashboardStats>('/dashboard')
      .then(({ data }) => setStats(data))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      label: 'Total de Usuários',
      value: stats?.totalUsers ?? '—',
      icon: Users,
      color: 'bg-indigo-500',
      light: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Total de Produtos',
      value: stats?.totalProducts ?? '—',
      icon: Package,
      color: 'bg-emerald-500',
      light: 'bg-emerald-50 text-emerald-600',
    },
  ];

  return (
    <div>
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Visão geral do sistema
        </p>
      </div>

      {/* Cards de estatísticas */}
      {loading ? (
        // Esqueleto de loading (placeholder animado)
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 animate-pulse h-32 border" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(({ label, value, icon: Icon, light }) => (
            <div
              key={label}
              className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm
                flex items-center gap-5 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${light}`}>
                <Icon size={28} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-0.5">{value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Banner de boas-vindas */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-indigo-800
        rounded-xl p-6 text-white flex items-center gap-4">
        <TrendingUp size={36} className="opacity-80" />
        <div>
          <p className="font-semibold text-lg">Bem-vindo ao painel!</p>
          <p className="text-indigo-200 text-sm">
            Use o menu lateral para gerenciar usuários e produtos.
          </p>
        </div>
      </div>
    </div>
  );
}