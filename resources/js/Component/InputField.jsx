import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  required,
  showToggle,
  onToggle,
  showPassword,
  error = '',
  disabled = false,
  style = {},
  className = '',
  ...props
}) => {
  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    border: error ? '1px solid #fca5a5' : '1px solid #e5e7eb',
    background: error ? '#fef2f2' : '#fff',
    outline: 'none',
    transition: 'all 0.2s',
    fontSize: '1rem',
    ...style,
  };

  return (
    <div style={{ marginBottom: '1rem', position: 'relative', ...style }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
          }}
        >
          {label}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={4}
          style={inputStyle}
          className={className}
          {...props}
        />
      ) : (
        <input
          type={showToggle ? (showPassword ? 'text' : 'password') : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          style={inputStyle}
          className={className}
          {...props}
        />
      )}
      {showToggle && type !== 'textarea' && (
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            color: '#9ca3af',
          }}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
      {error && (
        <span
          style={{
            color: 'red',
            fontSize: '0.875rem',
            marginTop: '0.25rem',
            display: 'block',
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
