'use client';

import { useState } from 'react';
import Link from 'next/link';

export function DevToolsOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-72 rounded-lg border border-border bg-card p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-card-foreground">Dev Tools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Close
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Views</h4>
              <div className="flex flex-col gap-2">
                <Link
                  href="/customer"
                  className="rounded bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  👩‍🔧 Customer View
                </Link>
                <Link
                  href="/driver"
                  className="rounded bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  🚛 Driver View
                </Link>
                <Link
                  href="/dispatch"
                  className="rounded bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  🎧 Dispatch View
                </Link>
              </div>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-medium text-muted-foreground">Mock State</h4>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => console.log('Action: Force Status: Pending')}
                  className="rounded border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  Set: Pending
                </button>
                <button
                  onClick={() => console.log('Action: Force Status: Dispatched')}
                  className="rounded border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  Set: Dispatched
                </button>
                <button
                  onClick={() => console.log('Action: Force Status: En Route')}
                  className="rounded border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  Set: En Route
                </button>
                <button
                  onClick={() => console.log('Action: Force Status: On Scene')}
                  className="rounded border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  Set: On Scene
                </button>
                <button
                  onClick={() => console.log('Action: Force Status: Completed')}
                  className="rounded border border-border bg-background px-3 py-2 text-left text-sm hover:bg-muted"
                >
                  Set: Completed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-primary p-3 text-primary-foreground shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Open Dev Tools"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
            <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
        </button>
      )}
    </div>
  );
}
