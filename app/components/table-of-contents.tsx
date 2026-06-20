"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Contents"
      className="hidden lg:sticky lg:top-24 lg:block lg:self-start"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        On this page
      </p>
      <ul className="space-y-0.5 border-l border-slate-200">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`-ml-px flex items-center border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                  isActive
                    ? "border-indigo-600 font-semibold text-indigo-700"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
