import { FaCheck } from 'react-icons/fa';

// Accessible progress indicator. Completed steps are buttons so a user can go back and edit; the current
// step uses aria-current="step"; upcoming steps are inert. `maxReached` is the furthest step opened so far.
export default function Stepper({ steps, current, maxReached = current, onStepClick, label = 'Form progress' }) {
  const percent = Math.round(((current + 1) / steps.length) * 100);
  return (
    <nav aria-label={label}>
      <p className="mb-2 text-sm font-semibold text-gray-700 sm:hidden">
        Step {current + 1} of {steps.length}: <span className="text-brand-800">{steps[current].label}</span>
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 sm:hidden"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={current + 1}
        aria-label={`Step ${current + 1} of ${steps.length}`}
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-500 transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ol className="hidden items-start sm:flex">
        {steps.map((step, i) => {
          const done = i < current;
          const active = i === current;
          const reachable = i <= maxReached && !active && Boolean(onStepClick);
          const circle = (
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors motion-reduce:transition-none ${
                active
                  ? 'border-brand-700 bg-brand-700 text-white shadow-md'
                  : done
                    ? 'border-brand-700 bg-brand-50 text-brand-800'
                    : 'border-gray-300 bg-white text-gray-500'
              }`}
            >
              {done ? <FaCheck aria-hidden="true" className="text-xs" /> : i + 1}
            </span>
          );
          const text = (
            <span className={`mt-1.5 block text-xs font-semibold leading-tight ${active ? 'text-brand-900' : done ? 'text-gray-700' : 'text-gray-500'}`}>
              {step.label}
            </span>
          );
          return (
            <li key={step.id} className="relative flex flex-1 flex-col items-center text-center" aria-current={active ? 'step' : undefined}>
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`absolute right-1/2 top-[18px] h-0.5 w-full -translate-y-1/2 ${i <= current ? 'bg-brand-700' : 'bg-gray-200'}`}
                />
              )}
              {reachable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(i)}
                  className="relative z-10 flex flex-col items-center rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700 focus-visible:ring-offset-2"
                  aria-label={`Go to step ${i + 1}: ${step.label}`}
                >
                  {circle}
                  {text}
                </button>
              ) : (
                <div className="relative z-10 flex flex-col items-center">
                  {circle}
                  {text}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
