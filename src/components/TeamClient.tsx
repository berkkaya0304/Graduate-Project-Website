"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";

export type Member = {
  name: string;
  role: string;
  email?: string;
  responsibilities: string[];
  avatarUrl?: string;
  github?: string;
  linkedin?: string;
  skills?: string[];
  bio?: string;
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9ığüşöç\s-]/g, "").replace(/\s+/g, "-");
}

export default function TeamClient({ 
  members, 
  advisor, 
  juryMembers 
}: { 
  members: Member[]; 
  advisor?: Member; 
  juryMembers?: Member[]; 
}) {
  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("Hepsi");
  const [sortBy, setSortBy] = useState<"name" | "role">("name");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [selected, setSelected] = useState<Member | null>(null);

  const roles = useMemo(() => {
    const set = new Set<string>();
    for (const m of members) set.add(m.role);
    return ["Hepsi", ...Array.from(set)];
  }, [members]);

  const filteredMembers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = members.filter((m) => {
      const matchesQuery =
        q.length === 0 ||
        m.name.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        (m.email ? m.email.toLowerCase().includes(q) : false) ||
        (m.skills ? m.skills.join(" ").toLowerCase().includes(q) : false);
      const matchesRole = roleFilter === "Hepsi" || m.role === roleFilter;
      return matchesQuery && matchesRole;
    });
    const sorted = [...base].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name, "tr");
      return a.role.localeCompare(b.role, "tr");
    });
    return sorted;
  }, [members, query, roleFilter, sortBy]);

  return (
    <div className="grid gap-6">
      <header className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Takım Üyeleri</h1>
            <p className="mt-2 opacity-90">
              Ekip üyeleri, roller ve ana sorumluluklar. Toplam {filteredMembers.length} üye listeleniyor.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="sr-only" htmlFor="search">Ara</label>
            <input
              id="search"
              placeholder="İsim, rol veya e-posta ara"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary-600)]"
            />
            <label className="sr-only" htmlFor="role">Rol</label>
            <select
              id="role"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary-600)]"
            >
              {roles.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="sort">Sırala</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "name" | "role")}
              className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[var(--color-primary-600)]"
            >
              <option value="name">İsme göre</option>
              <option value="role">Role göre</option>
            </select>
            <div className="inline-flex rounded-md border border-[var(--color-border)] overflow-hidden">
              <button
                type="button"
                onClick={() => setView("grid")}
                className={`px-3 py-2 text-sm ${view === "grid" ? "bg-[var(--color-primary-600)] text-white" : "bg-[var(--color-card)]"}`}
                aria-pressed={view === "grid"}
                aria-label="Izgara görünüm"
              >
                Izgara
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                className={`px-3 py-2 text-sm ${view === "list" ? "bg-[var(--color-primary-600)] text-white" : "bg-[var(--color-card)]"}`}
                aria-pressed={view === "list"}
                aria-label="Liste görünüm"
              >
                Liste
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Team Members */}
      <section className="card p-6">
        <h2 className="text-xl font-semibold mb-4">Takım Üyeleri ({filteredMembers.length})</h2>
        <div className={view === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "grid gap-3"}>
          {filteredMembers.map((m) => (
            <article key={m.name} className="card p-5">
              <div className={view === "grid" ? "flex items-start gap-3" : "flex items-start gap-3"}>
                {m.avatarUrl ? (
                  <Image
                    alt={m.name}
                    src={m.avatarUrl}
                    width={48}
                    height={48}
                    className="size-12 rounded-full bg-[var(--muted)] object-contain p-1"
                    unoptimized
                  />
                ) : (
                  <div className="size-12 rounded-full bg-[var(--muted)] grid place-items-center text-sm opacity-80">
                    {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-medium truncate">{m.name}</h3>
                      <p className="opacity-80 text-sm truncate">{m.role}</p>
                      {m.email ? (
                        <div className="mt-1 flex items-center gap-2">
                          <a
                            className="text-[var(--color-primary-600)] text-sm truncate hover:underline"
                            href={`mailto:${m.email}`}
                          >
                            {m.email}
                          </a>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard?.writeText(m.email || "")}
                            className="text-xs opacity-80 hover:opacity-100 border border-[var(--color-border)] rounded px-2 py-0.5"
                            aria-label="E-postayı kopyala"
                          >
                            Kopyala
                          </button>
                        </div>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                        onClick={() => setSelected(m)}
                        aria-haspopup="dialog"
                        aria-expanded={selected?.name === m.name}
                        aria-controls={`member-${m.name.replace(/\s+/g, "-")}-dialog`}
                      >
                        Detay
                      </button>
                      <a
                        className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                        href={`/team/${slugify(m.name)}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Yeni pencerede aç"
                      >
                        Aç
                      </a>
                    </div>
                  </div>

                  {m.skills && m.skills.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.skills.map((s) => (
                        <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-[color:var(--muted)/0.6]">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <ul className="list-disc ms-5 mt-3 text-sm opacity-90 space-y-1">
                    {m.responsibilities.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Advisor */}
      {advisor && (
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Danışman</h2>
          <div className="card p-5">
            <div className="flex items-start gap-3">
              {advisor.avatarUrl ? (
                <Image
                  alt={advisor.name}
                  src={advisor.avatarUrl}
                  width={48}
                  height={48}
                  className="size-12 rounded-full bg-[var(--muted)] object-contain p-1"
                  unoptimized
                />
              ) : (
                <div className="size-12 rounded-full bg-[var(--muted)] grid place-items-center text-sm opacity-80">
                  {advisor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{advisor.name}</h3>
                    <p className="opacity-80 text-sm truncate">{advisor.role}</p>
                    {advisor.email ? (
                      <div className="mt-1 flex items-center gap-2">
                        <a
                          className="text-[var(--color-primary-600)] text-sm truncate hover:underline"
                          href={`mailto:${advisor.email}`}
                        >
                          {advisor.email}
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                      onClick={() => setSelected(advisor)}
                      aria-haspopup="dialog"
                      aria-expanded={selected?.name === advisor.name}
                      aria-controls={`member-${advisor.name.replace(/\s+/g, "-")}-dialog`}
                    >
                      Detay
                    </button>
                    <a
                      className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                      href={`/team/${slugify(advisor.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Yeni pencerede aç"
                    >
                      Aç
                    </a>
                  </div>
                </div>

                {advisor.skills && advisor.skills.length > 0 ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {advisor.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-[color:var(--muted)/0.6]">
                        {s}
                      </span>
                    ))}
                  </div>
                ) : null}

                <ul className="list-disc ms-5 mt-3 text-sm opacity-90 space-y-1">
                  {advisor.responsibilities.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Jury Members */}
      {juryMembers && juryMembers.length > 0 && (
        <section className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Jüri Üyeleri ({juryMembers.length})</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {juryMembers.map((m) => (
              <article key={m.name} className="card p-5">
                <div className="flex items-start gap-3">
                  {m.avatarUrl ? (
                    <Image
                      alt={m.name}
                      src={m.avatarUrl}
                      width={48}
                      height={48}
                      className="size-12 rounded-full bg-[var(--muted)] object-contain p-1"
                      unoptimized
                    />
                  ) : (
                    <div className="size-12 rounded-full bg-[var(--muted)] grid place-items-center text-sm opacity-80">
                      {m.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="font-medium truncate">{m.name}</h3>
                        <p className="opacity-80 text-sm truncate">{m.role}</p>
                        {m.email ? (
                          <div className="mt-1 flex items-center gap-2">
                            <a
                              className="text-[var(--color-primary-600)] text-sm truncate hover:underline"
                              href={`mailto:${m.email}`}
                            >
                              {m.email}
                            </a>
                          </div>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                          onClick={() => setSelected(m)}
                          aria-haspopup="dialog"
                          aria-expanded={selected?.name === m.name}
                          aria-controls={`member-${m.name.replace(/\s+/g, "-")}-dialog`}
                        >
                          Detay
                        </button>
                        <a
                          className="text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                          href={`/team/${slugify(m.name)}`}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Yeni pencerede aç"
                        >
                          Aç
                        </a>
                      </div>
                    </div>

                    {m.skills && m.skills.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.skills.map((s) => (
                          <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-[color:var(--muted)/0.6]">
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <ul className="list-disc ms-5 mt-3 text-sm opacity-90 space-y-1">
                      {m.responsibilities.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {selected ? (
        <div
          role="dialog"
          aria-modal="true"
          id={`member-${selected.name.replace(/\s+/g, "-")}-dialog`}
          className="fixed inset-0 z-50 grid place-items-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative max-w-lg w-full card p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              {selected.avatarUrl ? (
                <Image alt={selected.name} src={selected.avatarUrl} width={56} height={56} className="size-14 rounded-full bg-[var(--muted)] object-contain p-1" unoptimized />
              ) : null}
              <div className="min-w-0">
                <h2 className="text-xl font-semibold truncate">{selected.name}</h2>
                <p className="opacity-80">{selected.role}</p>
                {selected.email ? (
                  <a className="text-[var(--color-primary-600)] text-sm hover:underline" href={`mailto:${selected.email}`}>{selected.email}</a>
                ) : null}
              </div>
              <button
                type="button"
                className="ms-auto text-sm border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                onClick={() => setSelected(null)}
                aria-label="Kapat"
              >
                Kapat
              </button>
            </div>
            {selected.bio ? (
              <p className="mt-4 text-sm opacity-90">{selected.bio}</p>
            ) : null}
            {selected.skills && selected.skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full border border-[var(--color-border)] bg-[color:var(--muted)/0.6]">
                    {s}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex items-center gap-4 mt-4 text-sm">
              {selected.github ? (
                <a className="hover:underline" href={selected.github} target="_blank" rel="noreferrer">GitHub</a>
              ) : null}
              {selected.linkedin ? (
                <a className="hover:underline" href={selected.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              ) : null}
              <a
                className="ms-auto text-xs border border-[var(--color-border)] rounded px-2 py-1 hover:border-[var(--color-primary-600)]"
                href={`/team/${slugify(selected.name)}`}
                target="_blank"
                rel="noreferrer"
              >
                Yeni pencerede aç
              </a>
            </div>
            <ul className="list-disc ms-5 mt-4 text-sm opacity-90 space-y-1">
              {selected.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}


