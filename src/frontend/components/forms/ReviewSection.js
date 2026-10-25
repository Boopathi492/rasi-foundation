import { FaPen } from 'react-icons/fa';

// Read-only summary block for the review step, with an "Edit" control that jumps back to the source step.
export default function ReviewSection({ title, onEdit, items }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-gray-50/70 p-4 sm:p-5" aria-label={title}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="font-heading text-base font-bold text-gray-900">{title}</h3>
        {onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-brand-800 hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700"
            aria-label={`Edit ${title}`}
          >
            <FaPen aria-hidden="true" className="text-xs" /> Edit
          </button>
        )}
      </div>
      <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
        {items.map(([label, value, wide]) => (
          <div key={label} className={wide ? 'sm:col-span-2' : undefined}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
            <dd className="mt-0.5 break-words text-sm font-medium text-gray-900">{value || <span className="font-normal text-gray-500">Not provided</span>}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
