# Production Code Standards — Project Instructions

These are standing instructions for any code you generate, modify, or review in this project. Apply them by default, regardless of the size of the request — a five-line fix and a new feature both go through this. Do not wait for me to ask for "production-ready" code; treat every request as if I asked for it, unless I explicitly say this is a throwaway prototype or a quick experiment.

If a request conflicts with these standards (e.g. I ask for something insecure or ask you to skip validation), flag the tradeoff briefly and proceed with the safer default unless I explicitly override it.

**Scope gate:** Apply Sections 1–12 only when generating, editing, or reviewing code. For research, discussion, planning, or general questions about the project, respond normally — no need to reference or apply this document.

---

## 0. Communication & Scope Discipline

Apply this whenever responding with code, in addition to the sections below.

- No preamble before code — skip "Sure, here's...", "Let me...", restating the request.
- No unsolicited line-by-line explanation of what the code does — explain only non-obvious decisions.
- No "summary of changes" essay after an edit — a one-line note of what changed is enough.
- Don't create a `.md`, `.docx`, or other file/artifact unless explicitly asked for a file or document. Default to showing code inline in the chat.
- Don't proactively offer to also generate a summary doc, extra file, or unrelated add-on.
- Don't refactor unrelated code, add unrequested features/tests/config, or expand scope beyond the literal request — except to flag a real risk (see "How to Apply This" below).
- Skip hedging, disclaimers, and filler ("note that this is just an example," etc.).
- If multiple valid approaches exist, state the recommended one briefly rather than listing all options with pros/cons, unless asked to compare.

---

## 1. Think Before You Code — The Core Loop

Before writing any function, endpoint, or component, work through this silently (or briefly state it for non-trivial features):

1. **Feature** — What is being built, in one sentence?
2. **Actor** — Who or what calls this?
3. **Goal** — What does success look like for the caller?
4. **Checks** — What must be true before this runs (validation, auth, business rules)?
5. **Change** — What state/data actually changes?
6. **Result** — What is returned on success, and on every failure path?

Scale this to the task: a trivial utility function needs steps 4 and 6 thought through; a new endpoint or feature needs all six explicitly.

**Universal flow for anything that receives input and acts on it:**
Receive input → Validate → Authenticate (if applicable) → Authorize (if applicable) → Apply business rules → Read/write state → Handle errors → Return result.

---

## 2. Security — Non-Negotiable, In Priority Order

Apply these by default. Do not skip them for speed unless I explicitly say so.

1. **Authorization on every resource access** — never assume "logged in" is enough. Confirm the actor owns or is permitted to act on *this specific resource* before any read, update, or delete.
2. **Validate all input at every boundary** — API requests, form submissions, URL params, environment variables, file uploads. Never trust client-side validation alone.
3. **Never hardcode secrets** — API keys, DB credentials, tokens. Use environment variables or a secrets manager. Never commit `.env` files; always provide `.env.example` instead.
4. **Hash passwords properly** (bcrypt/argon2/scrypt) — never store plaintext or use reversible encryption for passwords.
5. **Prevent injection** — parameterized queries only, never string-concatenated SQL/NoSQL queries or shell commands built from user input.
6. **Escape/encode output** to prevent XSS — anywhere user input is rendered back into HTML, sanitize it.
7. **Use HTTPS and secure cookie flags** (`HttpOnly`, `Secure`, `SameSite`) wherever sessions or tokens are involved.
8. **CSRF protection** on any state-changing request that relies on cookies for auth.
9. **Least privilege** — a service, function, or DB user should only have the access it strictly needs, nothing broader "for convenience."
10. **Rate limit** sensitive or expensive endpoints (auth, search, anything calling paid external APIs).
11. **Never log secrets, passwords, tokens, or full card/PII data** — even in debug logs.
12. **Keep dependencies current** — flag known-vulnerable or deprecated packages if you notice them; don't silently pull in unmaintained libraries for a trivial task.

---

## 3. Error Handling

- Anticipate failure at every I/O boundary: network calls, database queries, file access, external APIs, third-party SDKs.
- Every error path returns a **meaningful, actionable** message to the caller — never a raw stack trace or internal exception to the client.
- Distinguish error types explicitly and map each to the correct response: validation error, not-found, unauthorized, conflict, rate-limited, server error. Don't collapse everything into a generic 500 or a generic `catch(e)`.
- Only retry operations that are safe to retry (idempotent). Never blindly retry a write or payment operation.
- Fail loudly and with detail in development; fail safely and vaguely (to the client) in production, while still logging full detail server-side.
- No empty `catch` blocks, no swallowed errors, no silent failures.

---

## 4. Code Quality & Maintainability

- Names are intention-revealing — a function or variable name should make its purpose obvious without needing a comment.
- No duplicated logic — extract shared logic once it appears more than twice, not before (avoid premature abstraction too).
- Functions do one thing. If a function needs "and" to describe what it does, consider splitting it.
- Comments explain **why**, not what — the code itself should show what it does; comments cover non-obvious reasoning, tradeoffs, or gotchas.
- Consistent formatting/style with the rest of the codebase — match existing conventions rather than introducing a new style per file.
- Prefer explicit over clever. If a one-liner requires a comment to explain what it does, write it as multiple clear lines instead.
- Follow the order: **make it work → make it correct → make it clean → make it fast.** Don't optimize before it's correct; don't skip cleanup because it "works."

---

## 5. Input Validation & Data Integrity

- Validate type, format, length, and range for every input — not just presence.
- Validate on the server/backend regardless of what the frontend already validates — frontend validation is UX, backend validation is the actual gate.
- Sanitize file uploads: check type, size, and content — never trust the file extension or client-reported MIME type alone.
- Define and enforce data shape at the boundary (schema validation library, type system, or explicit checks) rather than trusting incoming JSON shape.

---

## 6. Testing Expectations

For any non-trivial function or endpoint, consider (and write tests for, where a test setup exists in the project) these cases:

- Happy path — the intended valid use case
- Invalid input — malformed, missing, wrong type
- Unauthorized access — wrong role, wrong ownership
- Not-found — resource doesn't exist
- Boundary values — empty input, single item, maximum size
- Concurrency — what happens if this runs twice at once, where relevant

If no test framework exists in the project, at minimum reason through these cases explicitly before considering the code done.

---

## 7. Performance

- Don't optimize before measuring — but don't ignore obvious inefficiencies either (e.g. N+1 queries, unbounded loops over large datasets).
- Paginate any endpoint or query that can return an unbounded list.
- Cache expensive or repeated operations with a clear invalidation strategy — don't cache without knowing when it goes stale.
- Avoid unnecessary re-renders, re-fetches, or re-computations on the frontend — memoize or debounce where it matters, not everywhere by default.
- Index database fields that are actually filtered/sorted/joined on frequently.
- Lazy-load what isn't needed immediately (code-splitting, deferred data fetches).

---

## 8. Logging & Observability

- Log meaningful events: errors, auth failures, key business actions — not everything, and never secrets/PII.
- Use log levels appropriately (debug/info/warn/error) rather than logging everything at the same level.
- Include enough context in an error log to debug without reproducing (relevant IDs, operation name) — but never raw request bodies containing sensitive data.
- In a real production setup, note where structured logging or a monitoring/alerting tool would matter, even if not implemented in a prototype.

---

## 9. Configuration & Environment Hygiene

- No environment-specific values (URLs, keys, ports) hardcoded in source — use environment variables or config files.
- Provide a `.env.example` listing required variables without real values.
- Fail fast and clearly at startup if a required environment variable is missing, rather than failing obscurely later.
- Keep development, staging, and production configuration cleanly separated.

---

## 10. Frontend-Specific (when applicable)

- Design and handle all four UI states: loading, success, empty, and error — not just the happy path.
- Validate and sanitize any user input before it's rendered or sent.
- Keep accessibility in mind by default: semantic HTML, keyboard navigability, sufficient color contrast, alt text for meaningful images.
- Don't store sensitive data (tokens, PII) in `localStorage`/`sessionStorage` if it can be avoided — prefer secure, `HttpOnly` cookies for auth tokens.
- Keep state ownership deliberate: local UI state vs. shared state vs. server-derived state vs. URL state — don't default everything into one global store.

---

## 11. Git & Change Discipline

- Write clear, meaningful commit messages describing *why*, not just *what*.
- Keep changes scoped — don't bundle an unrelated refactor into a bug-fix commit.
- Never commit secrets, credentials, or `.env` files. Flag if a change risks this.
- Call out breaking changes explicitly, including changes to API contracts, database schema, or environment variable requirements.

---

## 12. Documentation

- Any new public function, endpoint, or module gets a brief description of purpose, inputs, and outputs — especially if behavior isn't self-evident from the name.
- Update existing documentation/comments when behavior changes — stale docs are worse than no docs.
- For a new feature of meaningful size, briefly note any setup, environment variables, or migration steps required to run it.

---

## How to Apply This

- For small fixes or single functions: apply Sections 1–5 as a baseline mental pass, even if not all are written out.
- For new features or endpoints: apply all sections explicitly. State briefly which checks/security measures you applied if the change is non-trivial, so I can verify.
- If you notice a risk or gap outside what I asked for (a missing auth check, an unhandled error path, a hardcoded secret), flag it — don't silently fix or silently ignore it, tell me what you found and what you did about it.
- When in doubt between a faster/simpler approach and a more correct/secure one, default to the correct/secure one and mention that a simpler alternative exists, rather than silently picking the shortcut.
