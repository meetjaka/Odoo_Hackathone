import React from 'react';
import clsx from 'clsx';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> = ({ children, className }) => (
  <div className={clsx('overflow-x-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))]', className)}>
    <table className="min-w-full divide-y divide-[hsl(var(--border))]">{children}</table>
  </div>
);

export default Table; 