import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

// Accessible accordion: each question is a button controlling its answer panel (WAI-ARIA disclosure pattern).
export default function Faq({ items, idPrefix = 'faq' }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card">
            <h3>
              <button
                type="button"
                id={`${idPrefix}-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-a-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-sans text-base font-semibold text-gray-900 hover:text-forest focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest"
              >
                <span>{item.q}</span>
                <FaChevronDown aria-hidden="true" className={`shrink-0 text-sm text-crimson transition-transform duration-200 motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <div id={`${idPrefix}-a-${i}`} role="region" aria-labelledby={`${idPrefix}-q-${i}`} hidden={!isOpen} className="px-5 pb-5 text-sm leading-relaxed text-gray-700">
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
