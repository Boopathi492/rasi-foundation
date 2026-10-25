import { FaInbox, FaSpinner } from 'react-icons/fa';

export function TextInput({
  label,
  id,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  helperText = '',
  icon: Icon = null,
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-2xs">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="text-xs" />
          </div>
        )}
        <input
          id={id || name}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`w-full text-xs rounded-xl border transition-all font-medium py-2.5 ${
            Icon ? 'pl-10 pr-3.5' : 'px-3.5'
          } ${
            error
              ? 'border-rose-300 bg-rose-50/50 text-rose-900 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
              : 'border-slate-200 bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        />
      </div>
      {error ? (
        <p className="text-[11px] text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] text-slate-400">{helperText}</p>
      ) : null}
    </div>
  );
}

export function SelectInput({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  required = false,
  disabled = false,
  error = '',
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value ?? ''}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`w-full text-xs rounded-xl border px-3.5 py-2.5 transition-all font-medium bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        } disabled:opacity-50`}
      >
        {options.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.value;
          const lbl = typeof opt === 'string' ? opt : opt.label;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
}

export function TextArea({
  label,
  id,
  name,
  value,
  onChange,
  rows = 3,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  className = '',
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}
      <textarea
        id={id || name}
        name={name}
        rows={rows}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full text-xs rounded-xl border px-3.5 py-2.5 transition-all font-medium bg-slate-50/50 hover:bg-white focus:bg-white text-slate-900 ${
          error
            ? 'border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
            : 'border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
        } disabled:opacity-50`}
      />
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
    </div>
  );
}

export function StatusBadge({ status, label = null }) {
  const s = String(status || '').toLowerCase();
  const text = label || status || 'Unknown';

  const badgeStyles = {
    // Green success
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    active: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    verified: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',

    // Amber / Yellow warning
    pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
    in_progress: 'bg-amber-50 text-amber-700 border-amber-200/80',
    scheduled: 'bg-amber-50 text-amber-700 border-amber-200/80',
    contacted: 'bg-amber-50 text-amber-700 border-amber-200/80',

    // Red danger
    rejected: 'bg-rose-50 text-rose-700 border-rose-200/80',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200/80',
    failed: 'bg-rose-50 text-rose-700 border-rose-200/80',
    inactive: 'bg-rose-50 text-rose-700 border-rose-200/80',

    // Blue info
    new: 'bg-blue-50 text-blue-700 border-blue-200/80',
    archived: 'bg-slate-100 text-slate-600 border-slate-200',
  }[s] || 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 mr-1.5" />
      {text}
    </span>
  );
}

export function EmptyState({
  icon: Icon = FaInbox,
  title = 'No records found',
  description = 'There are no items to display at this moment.',
  action = null,
}) {
  return (
    <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
      <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
        <Icon className="text-xl" />
      </div>
      <h4 className="text-sm font-bold text-slate-800 mb-1">{title}</h4>
      <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

export function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="h-10 bg-slate-200 rounded-xl w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 bg-slate-100 rounded-xl w-full" />
      ))}
    </div>
  );
}
