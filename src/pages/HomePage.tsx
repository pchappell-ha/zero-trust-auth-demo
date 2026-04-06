import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, LogOut, Loader2, User, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Toaster } from '@/components/ui/sonner';
export function HomePage() {
  const { user, isPending } = useAuth();
  const handleLogout = () => {
    // Standard Cloudflare Access logout endpoint
    window.location.href = '/cdn-cgi/access/logout';
  };
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/10">
      <ThemeToggle />
      {/* Subtlest background texture */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {isPending ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center space-y-4"
            >
              <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                Verifying Identity
              </p>
            </motion.div>
          ) : user ? (
            <motion.div
              key="authenticated"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md"
            >
              <div className="space-y-8 text-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
                      <User className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border border-border">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h1 className="text-sm font-medium text-muted-foreground tracking-[0.2em] uppercase">
                    Access Granted
                  </h1>
                  <p className="text-3xl md:text-4xl font-display font-semibold tracking-tight break-all">
                    {user.email}
                  </p>
                </div>
                <div className="pt-8">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleLogout}
                    className="group h-12 px-8 rounded-full border-input hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    <LogOut className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="unauthenticated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-2xl bg-destructive/5 flex items-center justify-center border border-destructive/10">
                  <Lock className="w-8 h-8 text-destructive" />
                </div>
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-display font-semibold">Not Authenticated</h1>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Cloudflare Access session could not be verified. Please ensure you are behind a Zero Trust tunnel.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="fixed bottom-8 left-0 right-0 z-10 pointer-events-none">
        <div className="flex flex-col items-center justify-center space-y-4 px-4">
          <p className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-[0.3em]">
            Secured by Cloudflare Zero Trust
          </p>
          <div className="text-[10px] text-muted-foreground/30 text-center max-w-xs">
            Note: Request limits apply to AI infrastructure. Access depends on authenticated headers.
          </div>
        </div>
      </footer>
      <Toaster position="bottom-center" />
    </div>
  );
}