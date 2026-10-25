import { FaExclamationTriangle, FaTrash, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import Modal from './Modal';

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed? This action may not be reversible.',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'danger',
  isLoading = false,
}) {
  const iconAndColors = {
    danger: {
      icon: FaTrash,
      iconBg: 'bg-rose-100 text-rose-600',
      btnClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
    },
    warning: {
      icon: FaExclamationTriangle,
      iconBg: 'bg-amber-100 text-amber-600',
      btnClass: 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-500/20',
    },
    primary: {
      icon: FaCheckCircle,
      iconBg: 'bg-blue-100 text-blue-600',
      btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20',
    },
  }[variant] || {
    icon: FaExclamationTriangle,
    iconBg: 'bg-rose-100 text-rose-600',
    btnClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/20',
  };

  const IconComponent = iconAndColors.icon;

  const footer = (
    <>
      <button
        type="button"
        onClick={onClose}
        disabled={isLoading}
        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        disabled={isLoading}
        className={`px-4 py-2 text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-50 ${iconAndColors.btnClass}`}
      >
        {isLoading && <FaSpinner className="animate-spin text-xs" />}
        <span>{confirmLabel}</span>
      </button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      preventClose={isLoading}
      footer={footer}
    >
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl shrink-0 ${iconAndColors.iconBg}`}>
          <IconComponent className="text-lg" />
        </div>
        <div className="text-xs text-slate-600 leading-relaxed pt-1">
          {message}
        </div>
      </div>
    </Modal>
  );
}
