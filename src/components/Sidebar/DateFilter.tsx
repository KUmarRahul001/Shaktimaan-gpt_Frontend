import React from 'react';

interface DateFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ value, onChange }) => {
  return (
    <div className="mt-4">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};