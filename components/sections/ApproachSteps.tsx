interface Step {
  number: string;
  title: string;
  description: string;
}

export function ApproachSteps({
  steps,
  arabic = false,
}: {
  steps: Step[];
  arabic?: boolean;
}) {
  return (
    <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      {steps.map((step) => (
        <li key={step.number} className="border-t border-gold pt-5">
          <span className="font-heading text-sm text-ink">{step.number}</span>
          <h3
            className={`mt-2 text-lg font-medium text-ink ${
              arabic ? "font-heading-ar" : "font-heading"
            }`}
          >
            {step.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
