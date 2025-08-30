import { Logo } from '@/components/icons';

export default function Header() {
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 border-b">
      <div className="container mx-auto flex items-center gap-3">
        <Logo className="size-8" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          FormAssist AI
        </h1>
      </div>
    </header>
  );
}
