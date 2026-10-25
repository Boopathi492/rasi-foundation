import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';

const KINDS = {
  error: { icon: FaExclamationCircle, box: 'border-red-200 bg-red-50 text-red-900', role: 'alert' },
  success: { icon: FaCheckCircle, box: 'border-green-200 bg-green-50 text-green-900', role: 'status' },
  info: { icon: FaInfoCircle, box: 'border-amber-200 bg-amber-50 text-amber-900', role: 'note' },
};

// Inline banner. Errors use role="alert" so they are announced immediately.
export default function FormAlert({ kind = 'error', id, title, children }) {
  const { icon: Icon, box, role } = KINDS[kind] || KINDS.error;
  return (
    <div id={id} role={role} className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${box}`}>
      <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-base" />
      <div className="leading-relaxed">
        {title && <p className="font-semibold">{title}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}
