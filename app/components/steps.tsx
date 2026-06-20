"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  MailIcon,
  RotateIcon,
} from "./icons";

const EMAIL = "hunter@xtremery.com";
const STORAGE_KEY = "handoff-progress-v1";

/* ---------- Context ---------- */

type StepsContextValue = {
  total: number;
  isDone: (id: string) => boolean;
  setDone: (id: string, done: boolean) => void;
  reset: () => void;
  completedCount: number;
  hydrated: boolean;
};

const StepsContext = createContext<StepsContextValue | null>(null);

function useSteps() {
  const ctx = useContext(StepsContext);
  if (!ctx) throw new Error("useSteps must be used within <StepsProvider>");
  return ctx;
}

export function StepsProvider({
  stepIds,
  children,
}: {
  stepIds: string[];
  children: ReactNode;
}) {
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load saved progress after mount (avoids SSR mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const ids: string[] = JSON.parse(raw);
        const next: Record<string, boolean> = {};
        ids.forEach((id) => {
          if (stepIds.includes(id)) next[id] = true;
        });
        setCompleted(next);
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, [stepIds]);

  // Persist on change (only after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      const ids = Object.keys(completed).filter((id) => completed[id]);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [completed, hydrated]);

  const setDone = useCallback((id: string, done: boolean) => {
    setCompleted((prev) => ({ ...prev, [id]: done }));
  }, []);

  const value = useMemo<StepsContextValue>(() => {
    const completedCount = stepIds.filter((id) => completed[id]).length;
    return {
      total: stepIds.length,
      isDone: (id) => Boolean(completed[id]),
      setDone,
      reset: () => setCompleted({}),
      completedCount,
      hydrated,
    };
  }, [completed, stepIds, setDone, hydrated]);

  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
}

/* ---------- Progress summary ---------- */

export function ProgressSummary() {
  const { total, completedCount, reset, hydrated } = useSteps();
  const pct = total > 0 ? (completedCount / total) * 100 : 0;
  const allDone = completedCount === total && total > 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Your progress
          </p>
          <p className="mt-0.5 text-lg font-bold text-slate-900">
            {allDone ? (
              <span className="text-emerald-600">All steps complete 🎉</span>
            ) : (
              <>
                {/* suppressHydrationWarning: count fills in once saved progress loads */}
                <span suppressHydrationWarning>{completedCount}</span> of {total}{" "}
                steps done
              </>
            )}
          </p>
        </div>
        {completedCount > 0 && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            <RotateIcon className="h-3.5 w-3.5" /> Reset
          </button>
        )}
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-[width] duration-500 ease-out"
          style={{ width: hydrated ? `${pct}%` : "0%" }}
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-500">
        {allDone
          ? "Nice work — you own every piece now. Keep this page handy until you've finished locking things down."
          : "Tick off each step as you go. Your progress is saved on this device, so you can come back any time."}
      </p>
    </div>
  );
}

/* ---------- Step shell (node + body + flow footer) ---------- */

type Hangup = { q: string; a: ReactNode };

export function StepShell({
  num,
  id,
  title,
  icon,
  nextId,
  isLast = false,
  troubleshooting,
  children,
}: {
  num: number;
  id: string;
  title: string;
  icon: ReactNode;
  nextId: string;
  isLast?: boolean;
  troubleshooting: Hangup[];
  children: ReactNode;
}) {
  const { isDone, setDone } = useSteps();
  const done = isDone(id);
  const [showHelp, setShowHelp] = useState(false);

  const scrollTo = useCallback((target: string) => {
    // Defer so layout settles before scrolling.
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }, []);

  const handleDid = () => {
    setDone(id, true);
    scrollTo(nextId);
  };

  return (
    <section id={id} className="scroll-mt-28">
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <span
          className={`relative flex h-12 w-12 flex-none items-center justify-center rounded-2xl text-white shadow-lg ring-8 ring-[var(--background)] transition-colors ${
            done
              ? "bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-emerald-600/20"
              : "bg-gradient-to-br from-indigo-600 to-violet-600 shadow-indigo-600/20"
          }`}
        >
          {done ? <CheckIcon className="h-5 w-5" /> : icon}
          <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-indigo-700 shadow ring-1 ring-slate-200">
            {num}
          </span>
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        {done && (
          <span
            suppressHydrationWarning
            className="ml-auto hidden items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 sm:inline-flex"
          >
            <CheckIcon className="h-3 w-3" /> Done
          </span>
        )}
      </div>

      {/* Body */}
      <div className="space-y-4">{children}</div>

      {/* Flow footer */}
      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
        {done ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <CheckIcon className="h-4 w-4" /> You marked this step done.
            </span>
            <div className="flex items-center gap-2">
              {!isLast && (
                <button
                  type="button"
                  onClick={() => scrollTo(nextId)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors hover:bg-slate-50"
                >
                  Next step <ArrowRightIcon className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setDone(id, false)}
                className="text-sm font-medium text-slate-400 underline-offset-2 hover:text-slate-600 hover:underline"
              >
                Undo
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="mb-3 text-sm font-medium text-slate-600">
              How did this step go?
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button
                type="button"
                onClick={handleDid}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
              >
                <CheckIcon className="h-4 w-4" />
                {isLast ? "I did this — finish" : "I did this — next step"}
              </button>
              <button
                type="button"
                onClick={() => setShowHelp((v) => !v)}
                aria-expanded={showHelp}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:flex-none"
              >
                I hit a snag
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    showHelp ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        )}

        {/* Troubleshooting panel */}
        {showHelp && !done && (
          <div className="mt-4 border-t border-slate-200 pt-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Common hang-ups
            </p>
            <ul className="space-y-3">
              {troubleshooting.map((item) => (
                <li
                  key={item.q}
                  className="rounded-xl border border-slate-200 bg-white p-3.5"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {item.q}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.a}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <MailIcon className="h-4 w-4 flex-none text-indigo-600" />
              Still stuck? Email me at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="font-semibold text-indigo-700 hover:text-indigo-900"
              >
                {EMAIL}
              </a>{" "}
              and I&rsquo;ll sort it out.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
