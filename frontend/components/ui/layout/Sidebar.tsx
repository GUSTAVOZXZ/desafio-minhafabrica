'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Package,
  LogOut,
  Factory,
} from 'lucide-react';

// Define os itens do menu lateral
const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/usuarios',  label: 'Usuários',  icon: Users },
  { href: '/admin/produtos',  label: 'Produtos',  icon: Package },
];

export default function Sidebar() {
  const pathname = usePathname(); // URL atual
  const router = useRouter();

  const handleLogout = () => {
    // Remove o token e redireciona para login
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-700 flex items-center gap-3">
        <Factory size={24} className="text-indigo-400" />
        <span className="font-bold text-lg tracking-tight">MinhaFábrica</span>
      </div>

      {/* Menu de navegação */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          // Verifica se o link é a página atual para destacar
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-colors duration-150
                ${isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
              `}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Botão de logout na parte de baixo */}
      <div className="px-3 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
            text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white
            transition-colors duration-150"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}