export function ComingSoon({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-sm border border-border px-6 py-10 text-center sm:py-14">
      <div className="mx-auto mb-4 h-1 w-10 bg-gold" aria-hidden="true" />
      <p className="text-lg font-medium text-ink sm:text-xl">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm text-muted sm:text-base">{body}</p>
    </div>
  );
}
