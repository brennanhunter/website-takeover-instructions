type IconProps = { className?: string };

/* Solid marks */

export function GitHubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function VercelIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 3 22 21H2z" />
    </svg>
  );
}

/* Line icons */

function Line({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function GlobeIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </Line>
  );
}

export function LayersIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" opacity="0.55" />
    </Line>
  );
}

export function LockIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </Line>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Line>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Line>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 2" />
    </Line>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </Line>
  );
}

export function SendIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </Line>
  );
}

export function ShieldIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 3l7 3v5.5c0 4-2.9 6.9-7 8-4.1-1.1-7-4-7-8V6z" />
      <path d="m9 12 2 2 4-4" />
    </Line>
  );
}

export function ArrowUpIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </Line>
  );
}

export function ArrowRightIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Line>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="m6 9 6 6 6-6" />
    </Line>
  );
}

export function RotateIcon({ className }: IconProps) {
  return (
    <Line className={className}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </Line>
  );
}
