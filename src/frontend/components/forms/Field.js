import { cloneElement, isValidElement } from 'react';

// Shared input styling for the multi-step workflow forms (counselling, admission details, payment).
export const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm ' +
  'transition-colors duration-150 motion-reduce:transition-none hover:border-gray-400 ' +
  'focus:border-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-600/15 ' +
  'aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15 disabled:cursor-not-allowed disabled:bg-gray-100';

function describedBy(id, hint, error) {
  const ids = [];
  if (hint) ids.push(`${id}-hint`);
  if (error) ids.push(`${id}-error`);
  return ids.length ? ids.join(' ') : undefined;
}

// Label + control + hint + error. The single child control receives id, aria-invalid, aria-describedby
// and aria-required so every field is announced correctly by assistive technology.
export function Field({ id, label, required, hint, error, className = '', children }) {
  const control = isValidElement(children)
    ? cloneElement(children, {
        id,
        'aria-invalid': error ? 'true' : 'false',
        'aria-describedby': describedBy(id, hint, error),
        'aria-required': required ? 'true' : undefined,
      })
    : children;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-gray-800">
        {label}{' '}
        {required
          ? <span className="text-red-700" aria-hidden="true">*</span>
          : <span className="font-normal text-gray-500">(optional)</span>}
      </label>
      {control}
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-gray-500">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}

// Radio group rendered as selectable pill cards. `id` is placed on the first radio so that the
// validation helper can move focus to the group.
export function ChoiceGroup({ id, name, legend, required, hint, error, options, value, onChange, className = '' }) {
  return (
    <fieldset
      className={className}
      aria-invalid={error ? 'true' : 'false'}
      aria-describedby={describedBy(id, hint, error)}
      aria-required={required ? 'true' : undefined}
    >
      <legend className="mb-1.5 text-sm font-semibold text-gray-800">
        {legend}{' '}
        {required
          ? <span className="text-red-700" aria-hidden="true">*</span>
          : <span className="font-normal text-gray-500">(optional)</span>}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none focus-within:ring-4 focus-within:ring-brand-600/15 ${
                selected
                  ? 'border-brand-700 bg-brand-50 text-brand-900'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              <input
                type="radio"
                id={i === 0 ? id : undefined}
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 accent-[#185c36]"
              />
              {opt.label}
            </label>
          );
        })}
      </div>
      {hint && <p id={`${id}-hint`} className="mt-1.5 text-xs leading-relaxed text-gray-500">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </fieldset>
  );
}

// Single checkbox with label text, used for consent and the document checklist.
export function CheckboxField({ id, name, checked, onChange, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-gray-700">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#185c36] focus:ring-brand-600"
        />
        <span>{children}</span>
      </label>
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{error}</p>}
    </div>
  );
}
