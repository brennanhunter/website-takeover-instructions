import type { ReactNode } from "react";
import { ReadingProgress } from "./components/reading-progress";
import { TableOfContents } from "./components/table-of-contents";
import { StepsProvider, ProgressSummary, StepShell } from "./components/steps";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  GitHubIcon,
  GlobeIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  SendIcon,
  ShieldIcon,
  UserIcon,
  VercelIcon,
} from "./components/icons";

const EMAIL = "hunter@xtremery.com";

/* ---------- Reusable building blocks ---------- */

function WhatItIs({ children }: { children: ReactNode }) {
  return (
    <p className="mb-6 text-base leading-7 text-slate-600">
      <span className="font-semibold text-slate-900">What it is: </span>
      {children}
    </p>
  );
}

type Tone = "you" | "hunter";

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
          wrap: "border-emerald-200 bg-emerald-50/60",
          chip: "bg-emerald-600",
          marker: "marker:text-emerald-500",
          name: "You",
          icon: <UserIcon className="h-3.5 w-3.5" />,
        }
      : {
          wrap: "border-sky-200 bg-sky-50/60",
          chip: "bg-sky-700",
          marker: "marker:text-sky-500",
          name: "Hunter",
          icon: <SendIcon className="h-3.5 w-3.5" />,
        };

  return (
    <div className={`rounded-2xl border ${styles.wrap} p-5 sm:p-6`}>
      <span
        className={`mb-4 inline-flex items-center gap-1.5 rounded-full ${styles.chip} px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white`}
      >
        {styles.icon}
        {styles.name}
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

function HunterNote({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5">
      <span
        aria-hidden
        className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-indigo-600 text-white"
      >
        <SendIcon className="h-4 w-4" />
      </span>
      <div>
        <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-indigo-700">
          From Hunter
        </span>
        <p className="text-[15px] leading-7 text-indigo-950">{children}</p>
      </div>
    </div>
  );
}

function MailLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className={`font-semibold text-indigo-700 underline decoration-indigo-300 underline-offset-2 hover:decoration-indigo-600 ${className}`}
    >
      {EMAIL}
    </a>
  );
}

function ServiceCard({
  name,
  icon,
  children,
}: {
  name: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      <div className="mb-2.5 flex items-center gap-2.5">
        {icon && (
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-indigo-50 group-hover:text-indigo-700">
            {icon}
          </span>
        )}
        <h3 className="font-semibold text-slate-900">{name}</h3>
      </div>
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
];

const STEP_IDS = ["step-1", "step-2", "step-3", "step-4", "step-5", "step-6"];

/* Common hang-ups shown when someone clicks "I hit a snag" on a step. */
const TROUBLE: Record<string, { q: string; a: string }[]> = {
  "step-1": [
    {
      q: "I didn't get the verification email from GitHub.",
      a: "Check your spam/junk folder first. If it's not there, sign in to github.com, click your avatar → Settings → Emails, and use “Resend verification.” Double-check the address was typed correctly.",
    },
    {
      q: "The email asking me to accept the code transfer never arrived.",
      a: "That one only comes after I start the transfer on my end — it's sent from notifications@github.com. Give it a few minutes and check spam. If it's still missing, email me and I'll re-send it.",
    },
    {
      q: "It's asking me to type the project's name and won't accept it.",
      a: "Type it exactly as shown, with no extra spaces — easiest is to copy and paste it straight from the on-screen text.",
    },
    {
      q: "My preferred username is already taken.",
      a: "Add your city or a short word (e.g. acmeplumbing-fl). Whatever you land on is fine — just send it my way.",
    },
  ],
  "step-2": [
    {
      q: "“Continue with GitHub” didn't do anything / a popup got blocked.",
      a: "Allow popups for vercel.com and try again. If it seems stuck, refresh the page — you may already be signed in.",
    },
    {
      q: "It's asking me to create or pick a “team.”",
      a: "Choose the personal/hobby option for now. I'll help you sort out the right plan when I move the project over.",
    },
    {
      q: "I don't see any project to accept.",
      a: "I have to send it first. Once you've signed in with GitHub, email me the address on your Vercel account and I'll push the transfer to you.",
    },
    {
      q: "It's forcing me to enter a payment card.",
      a: "That's the paid-plan prompt. Check with me on which plan your site actually needs before you enter any card details.",
    },
  ],
  "step-3": [
    {
      q: "I don't know where my domain is registered.",
      a: "No problem — that's mine to figure out. Just ask and I'll look it up and tell you exactly what (if anything) you need to do.",
    },
    {
      q: "I got a domain-transfer email with an “authorization code.”",
      a: "Don't ignore it — forward it to me or follow the steps I sent. Those codes can expire in a few days, so sooner is better.",
    },
    {
      q: "The site loads, but the web address looks wrong or old.",
      a: "Domain changes can take a few hours to spread across the internet. If it still looks wrong after a day, email me and I'll check the settings.",
    },
  ],
  "step-4": [
    {
      q: "I'm not sure whether my site even uses these.",
      a: "You don't need to know — I'll tell you exactly which ones apply to your site, or confirm there's nothing to do here.",
    },
    {
      q: "Stripe is asking for business details and bank info.",
      a: "That's normal for taking payments. Have your business name, tax ID (EIN, or SSN if you're a sole proprietor), and a bank account ready.",
    },
    {
      q: "I'm being asked to verify my identity with a photo ID.",
      a: "Expected for payment processors — it protects your payouts. Use a real government ID and a clear photo.",
    },
  ],
  "step-5": [
    {
      q: "A page looks broken or an image is missing.",
      a: "Tell me which page and what you saw — I'll fix it before we call the handoff done.",
    },
    {
      q: "The contact form or checkout didn't work when I tested it.",
      a: "Send me what you did and what happened. Catching this now is exactly what this step is for.",
    },
  ],
  "step-6": [
    {
      q: "I can't find where to turn on two-factor authentication.",
      a: "GitHub: avatar → Settings → Password and authentication. Vercel: avatar → Settings → Authentication. Want to do it together? I'll hop on a screen-share.",
    },
    {
      q: "What am I supposed to do with the recovery codes?",
      a: "Save them in your password manager (or print them and store them somewhere safe). They're how you get back in if you ever lose your phone.",
    },
  ],
};

/* ---------- Page ---------- */

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ReadingProgress />

      {/* Sticky top bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 lg:px-8">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm">
              <ShieldIcon className="h-4 w-4" />
            </span>
            <span className="font-semibold tracking-tight text-slate-900">
              Website Handoff
            </span>
          </div>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-700 hover:text-indigo-900"
          >
            <MailIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{EMAIL}</span>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div aria-hidden className="hero-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute left-1/2 top-0 -z-0 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-200/40 via-violet-200/40 to-sky-200/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center lg:py-24">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 shadow-sm backdrop-blur">
            <ShieldIcon className="h-3.5 w-3.5" />
            Ownership Handoff
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Your Website{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Handoff Guide
            </span>
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
            I&rsquo;m Hunter, and I handle all the behind-the-scenes work.
            Whenever a step says to send me something or confirm a transfer,
            just email me and I&rsquo;ll take it from there.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-transform hover:-translate-y-0.5"
            >
              <MailIcon className="h-4 w-4" /> Email me: {EMAIL}
            </a>
            <a
              href="#step-1"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
            >
              Start with Step 1 <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500">
            <ClockIcon className="h-4 w-4" /> About 30–60 minutes — or we can do
            it together on a screen-share
          </div>
        </div>
      </section>

      {/* Body: sticky TOC + content */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 lg:grid lg:grid-cols-[15rem_1fr] lg:gap-12 lg:px-8 lg:py-16">
        <TableOfContents items={TOC} />

        {/* Content */}
        <article className="max-w-3xl">
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
              <ServiceCard name="GitHub" icon={<GitHubIcon className="h-4 w-4" />}>
                A secure storage locker that holds your website&rsquo;s code.
              </ServiceCard>
              <ServiceCard name="Vercel" icon={<VercelIcon className="h-4 w-4" />}>
                The service that takes that code and publishes it live on the
                internet.
              </ServiceCard>
              <ServiceCard
                name="Your domain name"
                icon={<GlobeIcon className="h-4 w-4" />}
              >
                Your web address (e.g. yourbusiness.com).
              </ServiceCard>
              <ServiceCard
                name="Other services"
                icon={<LayersIcon className="h-4 w-4" />}
              >
                Things like payments, email, or a database, if your site uses
                them. I&rsquo;ll tell you which ones apply to you.
              </ServiceCard>
            </div>
          </section>

          {/* Checklist */}
          <section id="checklist" className="mt-16 scroll-mt-28">
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
                  className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-md bg-emerald-100 text-emerald-700"
                  >
                    <CheckIcon className="h-3.5 w-3.5" />
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

          {/* Interactive step flow: progress + per-step "did this / hit a snag" */}
          <StepsProvider stepIds={STEP_IDS}>
            <div className="mt-16">
              <ProgressSummary />
            </div>

            {/* Steps — connected by a vertical timeline rail */}
            <div className="relative mt-10 space-y-16 before:absolute before:left-6 before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-indigo-200 before:via-slate-200 before:to-transparent">
            {/* Step 1 */}
            <StepShell
              num={1}
              id="step-1"
              nextId="step-2"
              troubleshooting={TROUBLE["step-1"]}
              title="GitHub — your website's code"
              icon={<GitHubIcon className="h-5 w-5" />}
            >
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
                    username (your business name works well) and a strong
                    password — save it.
                  </li>
                  <li>
                    Check your email and click the link to verify your account.
                  </li>
                  <li>
                    Email your new <strong>GitHub username</strong> to me at{" "}
                    <MailLink />.
                  </li>
                </ol>
              </ActionBlock>
              <ActionBlock tone="hunter" label="transfers the code">
                <p>
                  I&rsquo;ll transfer the code into your account. You&rsquo;ll
                  then get an email from GitHub asking you to confirm.
                </p>
              </ActionBlock>
              <ActionBlock tone="you" label="then accept the transfer">
                <ol className="list-decimal space-y-2 pl-5" start={5}>
                  <li>
                    Open that email and click the confirmation link. You may be
                    asked to type the project&rsquo;s name to confirm — just
                    follow the on-screen instructions. Done.
                  </li>
                </ol>
              </ActionBlock>
              <Tip>
                The exact wording of buttons can change slightly over time, but
                you&rsquo;re always looking for &ldquo;Accept&rdquo; or
                &ldquo;Confirm.&rdquo;
              </Tip>
            </StepShell>

            {/* Step 2 */}
            <StepShell
              num={2}
              id="step-2"
              nextId="step-3"
              troubleshooting={TROUBLE["step-2"]}
              title="Vercel — what makes your site live"
              icon={<VercelIcon className="h-5 w-5" />}
            >
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
              <ActionBlock tone="hunter" label="moves the project to you">
                <p>
                  I&rsquo;ll move your website project into your Vercel account
                  and reconnect it to your code so automatic updates keep
                  working.
                </p>
              </ActionBlock>
              <ActionBlock tone="you" label="accept and set up billing">
                <ol className="list-decimal space-y-2 pl-5" start={3}>
                  <li>
                    If you&rsquo;re asked to accept a project transfer, follow
                    the link and confirm.
                  </li>
                  <li>
                    <strong>Billing note:</strong> Vercel has a free tier, but
                    business websites usually need a paid plan (often around
                    $20/month). If prompted, add your payment card. Just ask me
                    and I&rsquo;ll confirm which plan your site needs.
                  </li>
                </ol>
              </ActionBlock>
            </StepShell>

            {/* Step 3 */}
            <StepShell
              num={3}
              id="step-3"
              nextId="step-4"
              troubleshooting={TROUBLE["step-3"]}
              title="Your domain name — your web address"
              icon={<GlobeIcon className="h-5 w-5" />}
            >
              <WhatItIs>
                Your domain is your address on the internet — the thing people
                type to reach your site. It&rsquo;s registered through a company
                called a &ldquo;registrar&rdquo; (such as GoDaddy, Namecheap,
                Google Domains, or Vercel itself).
              </WhatItIs>
              <p className="text-[15px] leading-7 text-slate-700">
                What happens here depends on who currently owns the domain —
                I&rsquo;ll tell you which of these applies to you:
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-1.5 font-semibold text-slate-900">
                    If I currently hold it
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    I&rsquo;ll transfer it to you. This may involve creating an
                    account at the registrar, or accepting a transfer by email —
                    I&rsquo;ll send you the exact steps.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="mb-1.5 font-semibold text-slate-900">
                    If you already own it
                  </h3>
                  <p className="text-sm leading-6 text-slate-600">
                    Nothing to move — I&rsquo;ll just make sure it points to your
                    new Vercel project.
                  </p>
                </div>
              </div>
              <HunterNote>
                I&rsquo;ll check where your domain is registered and email you
                exactly what to do — usually that&rsquo;s either clicking a
                transfer link or simply confirming you already own it. You
                won&rsquo;t have to figure it out on your own.
              </HunterNote>
            </StepShell>

            {/* Step 4 */}
            <StepShell
              num={4}
              id="step-4"
              nextId="step-5"
              troubleshooting={TROUBLE["step-4"]}
              title="Other services — only if your site uses them"
              icon={<LayersIcon className="h-5 w-5" />}
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
                If your site uses any of these, they need to be moved into your
                own accounts too. Some — especially{" "}
                <strong>payment services</strong> — will ask you to verify your
                business identity and connect a bank account, so give yourself
                extra time for those.
              </p>
              <HunterNote>
                I&rsquo;ll tell you which of these your site actually uses (if
                any) and walk you through moving each one into your accounts. If
                your site doesn&rsquo;t use any of them, there&rsquo;s nothing to
                do here.
              </HunterNote>
            </StepShell>

            {/* Step 5 */}
            <StepShell
              num={5}
              id="step-5"
              nextId="step-6"
              troubleshooting={TROUBLE["step-5"]}
              title="Confirm everything works"
              icon={<CheckIcon className="h-5 w-5" />}
            >
              <p className="text-[15px] leading-7 text-slate-700">
                Once I let you know the handoff is complete:
              </p>
              <ActionBlock tone="you" label="test your live site">
                <ol className="list-decimal space-y-2 pl-5">
                  <li>
                    Visit your live website and click around. Make sure pages
                    load and look right.
                  </li>
                  <li>
                    If your site has a contact form, payments, or logins, test
                    those too.
                  </li>
                  <li>
                    Ask me to make one small change as a test, so we can both
                    confirm that updates still publish correctly under your
                    accounts.
                  </li>
                </ol>
              </ActionBlock>
            </StepShell>

            {/* Step 6 */}
            <StepShell
              num={6}
              id="step-6"
              nextId="finish"
              isLast
              troubleshooting={TROUBLE["step-6"]}
              title="Lock it down (important)"
              icon={<LockIcon className="h-5 w-5" />}
            >
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
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-indigo-100 text-indigo-700"
                    >
                      <LockIcon className="h-4 w-4" />
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
            </StepShell>
            </div>

          {/* Contact CTA */}
          <section className="relative mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-8 text-center shadow-xl shadow-indigo-600/20">
            <div
              aria-hidden
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"
            />
            <div className="relative">
              <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur">
                <MailIcon className="h-6 w-6" />
              </span>
              <h2 className="text-xl font-bold text-white">
                Stuck on any step?
              </h2>
              <p className="mx-auto mt-2 max-w-md text-indigo-100">
                Don&rsquo;t guess — email me and I&rsquo;ll walk you through it,
                or we&rsquo;ll hop on a quick screen-share.
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-indigo-700 shadow-sm transition-transform hover:-translate-y-0.5"
              >
                <MailIcon className="h-4 w-4" /> {EMAIL}
              </a>
            </div>
          </section>

          {/* Closing — also the scroll target after the final step */}
          <section
            id="finish"
            className="mt-6 flex scroll-mt-28 items-center gap-4 rounded-3xl border border-emerald-200 bg-emerald-50 p-8"
          >
            <span
              aria-hidden
              className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm"
            >
              <CheckIcon className="h-6 w-6" />
            </span>
            <p className="text-lg font-medium leading-8 text-emerald-900">
              Once every step is done and confirmed, you own your website
              outright — code, hosting, address, and all.
            </p>
          </section>
          </StepsProvider>
        </article>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-slate-500 lg:px-8">
          Your Website Handoff Guide · Questions any time:{" "}
          <a
            href={`mailto:${EMAIL}`}
            className="font-medium text-indigo-700 hover:text-indigo-900"
          >
            {EMAIL}
          </a>
        </div>
      </footer>
    </div>
  );
}
