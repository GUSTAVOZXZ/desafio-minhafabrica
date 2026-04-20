'use client';

interface BadgeProps {
  label: string;
  variant?: 'green' | 'blue' | 'gray';
}

const variants = {
  green: 'bg-green-100 text-green-700',
  blue:  'bg-indigo-100 text-indigo-700',
  gray:  'bg-gray-100 text-gray-600',
};

export default function Badge({ label, variant = 'gray' }: BadgeProps) {
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
      {label}
    </span>
  );
}