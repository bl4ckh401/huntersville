import type { ReactNode } from 'react';

/* ---------- Helpers ---------- */

export function hasText(value?: string | null): value is string {
  if (!value) return false;
  // Strip HTML tags to detect empty rich-text values like "<p></p>" or "<br>".
  const stripped = value.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  return stripped.length > 0;
}

export function isYes(value?: string | null): boolean {
  return typeof value === 'string' && value.trim().toLowerCase() === 'yes';
}

/* ---------- Section wrapper ---------- */

export function Section({
  id,
  icon,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string;
  icon?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mb-lg scroll-mt-[100px] ${className}`}>
      <div className="mb-md flex items-start gap-sm">
        {icon ? (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl  text-on-primary-container">
            <span className="material-symbols-outlined text-[22px]">{icon}</span>
          </span>
        ) : null}
        <div>
          <h2 className="font-title-lg text-[19px] leading-tight text-on-surface sm:text-title-lg">{title}</h2>
          {subtitle ? <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">{subtitle}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

/* ---------- Rich text (renders stored HTML safely styled) ---------- */

export function RichText({ html, className = '' }: { html: string; className?: string }) {
  return (
    <div
      className={`max-w-none font-body-md text-body-md leading-relaxed text-on-surface-variant [&_a]:text-primary [&_a]:underline [&_h3]:mb-2 [&_h3]:mt-3 [&_h3]:font-title-md [&_h3]:text-title-md [&_h3]:text-on-surface [&_li]:mb-1 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-3 [&_strong]:text-on-surface [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 ${className}`}
      // Content is authored by trusted admins through the experience builder.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ---------- Fact grid (key / value pairs) ---------- */

export type Fact = { label: string; value?: string | null; icon?: string };

export function FactGrid({ facts, columns = 2 }: { facts: Fact[]; columns?: 1 | 2 | 3 }) {
  const visible = facts.filter((fact) => hasText(fact.value));
  if (!visible.length) return null;

  const cols =
    columns === 3
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : columns === 1
        ? 'grid-cols-1'
        : 'sm:grid-cols-2';

  return (
    <div className={`grid grid-cols-1 gap-sm ${cols}`}>
      {visible.map((fact) => (
        <div
          key={fact.label}
          className="flex items-start gap-sm rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-md py-md"
        >
          {fact.icon ? (
            <span className="material-symbols-outlined mt-0.5 text-[20px] text-primary">{fact.icon}</span>
          ) : null}
          <div className="min-w-0">
            <p className="font-label-sm text-label-sm text-on-surface-variant">{fact.label}</p>
            <p className="mt-0.5 break-words font-body-md text-body-md font-medium text-on-surface">{fact.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Check list (included / not included / requirements) ---------- */

export function CheckList({
  items,
  variant = 'positive',
  columns = 2,
}: {
  items: string[];
  variant?: 'positive' | 'negative' | 'neutral';
  columns?: 1 | 2;
}) {
  if (!items.length) return null;

  const icon = variant === 'negative' ? 'cancel' : variant === 'neutral' ? 'chevron_right' : 'check_circle';
  const color =
    variant === 'negative' ? 'text-error' : variant === 'neutral' ? 'text-on-surface-variant' : 'text-primary';

  return (
    <ul className={`grid grid-cols-1 gap-x-md gap-y-sm ${columns === 2 ? 'sm:grid-cols-2' : ''}`}>
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="flex items-start gap-sm font-body-md text-body-md text-on-surface-variant">
          <span className={`material-symbols-outlined mt-0.5 shrink-0 text-[20px] ${color}`}>{icon}</span>
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Card container ---------- */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-md custom-shadow-card ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Pills ---------- */

export function PillRow({ items, tone = 'neutral' }: { items: string[]; tone?: 'neutral' | 'primary' | 'secondary' }) {
  if (!items.length) return null;
  const cls =
    tone === 'primary'
      ? 'bg-primary-container/50 text-on-primary-container'
      : tone === 'secondary'
        ? 'bg-secondary-container/50 text-on-secondary-container'
        : 'bg-surface-container text-on-surface-variant';
  return (
    <div className="flex flex-wrap gap-xs">
      {items.map((item) => (
        <span key={item} className={`rounded-full px-sm py-xs font-label-sm text-label-sm ${cls}`}>
          {item}
        </span>
      ))}
    </div>
  );
}
