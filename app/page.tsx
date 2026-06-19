import type { ReactNode } from "react";

/* ---------- Reusable building blocks ---------- */

function WhatItIs({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-base leading-7 text-slate-600">
      <span className="font-semibold text-slate-900">What it is: </span>
      {children}
    </p>
  );
}

type Tone = "you" | "dev";

function ActionBlock({
  tone,
  label,
  children,
}: {
  tone: Tone;
  label: string;
  children: ReactNode;
}) {
  const styles =
    tone === "you"
      ? {
          wrap: "border-emerald-200 bg-emerald-50/70",
          chip: "bg-emerald-600",
          marker: "marker:text-emerald-500",
        }
      : {
          wrap: "border-sky-200 bg-sky-50/70",
          chip: "bg-sky-700",
          marker: "marker:text-sky-500",
        };

  return (
    <div className={`rounded-2xl border ${styles.wrap} p-5 sm:p-6`}>
      <span
        className={`mb-4 inline-flex items-center gap-2 rounded-full ${styles.chip} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
      >
        {tone === "you" ? "You" : "Your developer"}
        <span className="font-medium normal-case opacity-90">— {label}</span>
      </span>
      <div className={`text-[15px] leading-7 text-slate-700 ${styles.marker}`}>
        {children}
      </div>
    </div>
  );
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 p-5">
      <span aria-hidden className="text-lg leading-7">
        💡
      </span>
      <p className="text-[15px] leading-7 text-amber-900">{children}</p>
    </div>
  );
}

function DevFillIn({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/40 p-5">
      <span className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
        <span aria-hidden>✏️</span> Developer to fill in
      </span>
      <p className="text-[15px] italic leading-7 text-slate-600">{children}</p>
    </div>
  );
}

function StepCard({
  num,
  id,
  title,
  children,
}: {
  num: number;
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-5 flex items-center gap-4">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-indigo-600 text-base font-semibold text-white shadow-sm">
          {num}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function ServiceCard({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-1.5 font-semibold text-slate-900">{name}</h3>
      <p className="text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}

/* ---------- Table of contents ---------- */

const TOC = [
  { id: "owning", label: "What you'll own" },
  { id: "checklist", label: "Before you start" },
  { id: "step-1", label: "1 · GitHub" },
  { id: "step-2", label: "2 · Vercel" },
  { id: "step-3", label: "3 · Your domain" },
  { id: "step-4", label: "4 · Other services" },
  { id: "step-5", label: "5 · Confirm it works" },
  { id: "step-6", label: "6 · Lock it down" },
  { id: "questions", label: "Questions to ask" },
];

/* ---------- Page ---------- */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
              ✓
            </span>
            <span className="font-semibold tracking-tight text-slate-900">
              Website Handoff
            </span>
          </div>
          <span className="text-sm font-medium text-slate-500">
            Owner&rsquo;s Guide
          </span>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center lg:py-20">
          <span className="mb-5 inline-block rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            Ownership Handoff
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Your Website Handoff Guide
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            This guide walks you through taking full ownership of your website.
            By the end, every account will be in <strong>your</strong> name, on{" "}
            <strong>your</strong> billing, and you&rsquo;ll be in complete
            control.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-500">
            Don&rsquo;t worry if you&rsquo;re not technical — most of your job is
            creating a couple of accounts and clicking &ldquo;Accept.&rdquo;
            Your developer handles all the behind-the-scenes work.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
            <span aria-hidden>⏱️</span> Set aside about 30–60 minutes — or do it
            together on a screen-share
          </div>
        </div>
      </section>

      {/* Body: sticky TOC + content */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12 lg:px-8 lg:py-16">
        {/* TOC */}
        <nav
          aria-label="Contents"
          className="mb-10 lg:sticky lg:top-24 lg:mb-0 lg:self-start"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            On this page
          </p>
          <ul className="space-y-1 border-l border-slate-200">
            {TOC.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-slate-600 transition-colors hover:border-indigo-500 hover:text-indigo-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <article className="max-w-3xl space-y-16">
          {/* What you'll own */}
          <section id="owning" className="scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              What you&rsquo;ll end up owning
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Your website is made of a few separate pieces, each living in its
              own service. Here&rsquo;s the plain-English version — the goal is
              to move all of these into accounts that belong to you.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ServiceCard name="GitHub">
                A secure storage locker that holds your website&rsquo;s code.
              </ServiceCard>
              <ServiceCard name="Vercel">
                The service that takes that code and publishes it live on the
                internet.
              </ServiceCard>
              <ServiceCard name="Your domain name">
                Your web address (e.g. yourbusiness.com).
              </ServiceCard>
              <ServiceCard name="Other services">
                Things like payments, email, or a database, if your site uses
                them. Your developer will tell you which apply.
              </ServiceCard>
            </div>
          </section>

          {/* Checklist */}
          <section id="checklist" className="scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Before you start — a quick checklist
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Have these ready:
            </p>
            <ul className="mt-6 space-y-3">
              {[
                {
                  t: "An email address you'll keep long term.",
                  d: "Use a business email if you have one, not a personal account you might lose access to.",
                },
                {
                  t: "A safe place to store passwords.",
                  d: "A password manager (1Password, Bitwarden, or your browser's built-in one) is ideal. You'll be creating a few logins.",
                },
                {
                  t: "A credit or debit card.",
                  d: "In case any service requires a paid plan.",
                },
                {
                  t: "About 30–60 minutes of uninterrupted time.",
                  d: "Enough to get through every step without rushing.",
                },
              ].map((item) => (
                <li
                  key={item.t}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 border-slate-300 text-xs text-slate-400"
                  >
                    ☐
                  </span>
                  <span className="text-[15px] leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {item.t}
                    </span>{" "}
                    {item.d}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Step 1 */}
          <StepCard num={1} id="step-1" title="GitHub — your website's code">
            <WhatItIs>
              A secure online locker that stores the code your site is built
              from.
            </WhatItIs>
            <ActionBlock tone="you" label="create your account">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Go to <strong>github.com</strong> and click{" "}
                  <strong>Sign up</strong>.
                </li>
                <li>
                  Create your account with your long-term email. Choose a
                  username (your business name works well) and a strong password
                  — save it.
                </li>
                <li>
                  Check your email and click the link to verify your account.
                </li>
                <li>
                  Send your new <strong>GitHub username</strong> to your
                  developer.
                </li>
              </ol>
            </ActionBlock>
            <ActionBlock tone="dev" label="transfers the code">
              <p>
                Transfers the code to your account. You&rsquo;ll receive an
                email from GitHub asking you to confirm.
              </p>
            </ActionBlock>
            <ActionBlock tone="you" label="then accept the transfer">
              <ol className="list-decimal space-y-2 pl-5" start={5}>
                <li>
                  Open that email and click the confirmation link. You may be
                  asked to type the project&rsquo;s name to confirm — just follow
                  the on-screen instructions. Done.
                </li>
              </ol>
            </ActionBlock>
            <Tip>
              The exact wording of buttons can change slightly over time, but
              you&rsquo;re always looking for &ldquo;Accept&rdquo; or
              &ldquo;Confirm.&rdquo;
            </Tip>
          </StepCard>

          {/* Step 2 */}
          <StepCard num={2} id="step-2" title="Vercel — what makes your site live">
            <WhatItIs>
              The service that publishes your website and keeps it online.
              Whenever a change is made, Vercel updates your live site
              automatically.
            </WhatItIs>
            <ActionBlock tone="you" label="sign up and connect GitHub">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Go to <strong>vercel.com</strong> and click{" "}
                  <strong>Sign Up</strong>.
                </li>
                <li>
                  Choose <strong>&ldquo;Continue with GitHub&rdquo;</strong> —
                  this links it to the account you just made, which keeps
                  everything tidy. Approve the connection when asked.
                </li>
              </ol>
            </ActionBlock>
            <ActionBlock tone="dev" label="moves the project to you">
              <p>
                Moves your website project into your Vercel account and
                reconnects it to your code so automatic updates keep working.
              </p>
            </ActionBlock>
            <ActionBlock tone="you" label="accept and set up billing">
              <ol className="list-decimal space-y-2 pl-5" start={3}>
                <li>
                  If you&rsquo;re asked to accept a project transfer, follow the
                  link and confirm.
                </li>
                <li>
                  <strong>Billing note:</strong> Vercel has a free tier, but
                  business websites usually need a paid plan (often around
                  $20/month). If prompted, add your payment card. Your developer
                  can confirm which plan your site needs.
                </li>
              </ol>
            </ActionBlock>
          </StepCard>

          {/* Step 3 */}
          <StepCard num={3} id="step-3" title="Your domain name — your web address">
            <WhatItIs>
              Your domain is your address on the internet — the thing people type
              to reach your site. It&rsquo;s registered through a company called
              a &ldquo;registrar&rdquo; (such as GoDaddy, Namecheap, Google
              Domains, or Vercel itself).
            </WhatItIs>
            <p className="text-[15px] leading-7 text-slate-700">
              What happens here depends on who currently owns the domain. Your
              developer will tell you which applies:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1.5 font-semibold text-slate-900">
                  If your developer holds it
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  They&rsquo;ll transfer it to you. This may involve creating an
                  account at the registrar, or accepting a transfer by email.
                  Follow their instructions.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="mb-1.5 font-semibold text-slate-900">
                  If you already own it
                </h3>
                <p className="text-sm leading-6 text-slate-600">
                  Nothing to move — your developer just makes sure it points to
                  your new Vercel project.
                </p>
              </div>
            </div>
            <DevFillIn>
              Where the domain is registered, and what the client needs to do —
              e.g. &ldquo;Create a Namecheap account and accept the transfer
              email,&rdquo; or &ldquo;You already own it, no action needed.&rdquo;
            </DevFillIn>
          </StepCard>

          {/* Step 4 */}
          <StepCard
            num={4}
            id="step-4"
            title="Other services — only if your site uses them"
          >
            <p className="text-[15px] leading-7 text-slate-700">
              Some websites rely on extra services. Common ones include:
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              <ServiceCard name="Payments">
                e.g. Stripe — if your site sells anything.
              </ServiceCard>
              <ServiceCard name="A database">
                e.g. Supabase — if your site stores customer info, orders, or
                accounts.
              </ServiceCard>
              <ServiceCard name="Email sending">
                If your site sends confirmations or notifications.
              </ServiceCard>
            </div>
            <p className="text-[15px] leading-7 text-slate-700">
              If your site uses any of these, they need to be moved into your own
              accounts too. Some — especially <strong>payment services</strong> —
              will ask you to verify your business identity and connect a bank
              account, so give yourself extra time for those.
            </p>
            <DevFillIn>
              List the specific services this site uses and what the client needs
              to set up for each. Delete this section if none apply.
            </DevFillIn>
          </StepCard>

          {/* Step 5 */}
          <StepCard num={5} id="step-5" title="Confirm everything works">
            <p className="text-[15px] leading-7 text-slate-700">
              Once your developer says the handoff is complete:
            </p>
            <ActionBlock tone="you" label="test your live site">
              <ol className="list-decimal space-y-2 pl-5">
                <li>
                  Visit your live website and click around. Make sure pages load
                  and look right.
                </li>
                <li>
                  If your site has a contact form, payments, or logins, test
                  those too.
                </li>
                <li>
                  Ask your developer to make one small change as a test, so you
                  can both confirm that updates still publish correctly under
                  your accounts.
                </li>
              </ol>
            </ActionBlock>
          </StepCard>

          {/* Step 6 */}
          <StepCard num={6} id="step-6" title="Lock it down (important)">
            <p className="text-[15px] leading-7 text-slate-700">
              Now that everything is yours, protect it:
            </p>
            <ul className="space-y-3">
              {[
                {
                  t: "Save every username and password",
                  d: "in your password manager.",
                },
                {
                  t: "Turn on two-factor authentication (2FA)",
                  d: "for GitHub and Vercel at minimum. This is a setting in each account that adds a second layer of security.",
                },
                {
                  t: "Save any “recovery codes”",
                  d: "these services give you, somewhere safe. They're your backup if you ever get locked out.",
                },
              ].map((item) => (
                <li
                  key={item.t}
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700"
                  >
                    🔒
                  </span>
                  <span className="text-[15px] leading-7 text-slate-700">
                    <span className="font-semibold text-slate-900">
                      {item.t}
                    </span>{" "}
                    {item.d}
                  </span>
                </li>
              ))}
            </ul>
          </StepCard>

          {/* Questions */}
          <section id="questions" className="scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              A few questions worth asking your developer
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              To make sure nothing is missed, ask:
            </p>
            <ol className="mt-6 space-y-3">
              {[
                "Which services does my site use that I now need to own? (Step 4)",
                "Who currently owns my domain, and what do I need to do? (Step 3)",
                "Are there any monthly costs I should expect, and for which services?",
                "Once I'm fully set up, am I on my own for changes, or will we have an ongoing arrangement for updates and maintenance?",
              ].map((q, i) => (
                <li
                  key={q}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-[15px] leading-7 text-slate-700">
                    {q}
                  </span>
                </li>
              ))}
            </ol>
          </section>

          {/* Closing */}
          <section className="rounded-3xl border border-indigo-200 bg-indigo-50 p-8 text-center">
            <p className="text-lg font-medium leading-8 text-indigo-900">
              Once every step is done and confirmed, you own your website
              outright — code, hosting, address, and all.
            </p>
          </section>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500 lg:px-8">
          Your Website Handoff Guide · Keep this page bookmarked until every step
          is complete.
        </div>
      </footer>
    </div>
  );
}
