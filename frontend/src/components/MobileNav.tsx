import { Home, Heart, MessageCircle, User } from "lucide-react";

const items = [
  { icon: Home, label: "Home", active: true },
  { icon: Heart, label: "Saved" },
  { icon: MessageCircle, label: "Chat" },
  { icon: User, label: "Profile" },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden">
      <ul className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {items.map(({ icon: Icon, label, active }) => (
          <li key={label}>
            <button
              className={`flex flex-col items-center gap-0.5 rounded-xl px-4 py-1.5 text-[11px] font-medium transition-colors ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${active ? "fill-primary-soft" : ""}`} />
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
