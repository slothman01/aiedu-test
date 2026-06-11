"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_PASSCODE, STORAGE_KEYS } from "@/lib/constants";

export function AdminAuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEYS.adminAuth);
    setAuthed(stored === "true");
    setChecking(false);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === DEMO_PASSCODE) {
      sessionStorage.setItem(STORAGE_KEYS.adminAuth, "true");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect passcode");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEYS.adminAuth);
    setAuthed(false);
    setPasscode("");
  };

  if (checking) {
    return (
      <div className="py-16 text-center text-muted-foreground">Checking access...</div>
    );
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md space-y-6 py-12">
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--navy)]/10">
            <Lock className="h-6 w-6 text-[var(--navy)]" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--navy)]">Admin access</h1>
          <p className="text-sm text-muted-foreground">
            Production: real auth + RBAC — see{" "}
            <a href="/process" className="font-semibold text-[var(--green)] underline">
              /process
            </a>
          </p>
        </div>

        <form
          onSubmit={login}
          className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="rounded-lg bg-secondary p-3 text-sm">
            <p className="font-bold text-[var(--green)]">Demo passcode</p>
            <p className="mt-1 font-mono font-semibold text-[var(--navy)]">
              {DEMO_PASSCODE}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="passcode">Enter passcode</Label>
            <Input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoComplete="current-password"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button type="submit" variant="aiedu" className="w-full">
            Enter admin
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={logout}>
          Sign out
        </Button>
      </div>
      {children}
    </div>
  );
}
