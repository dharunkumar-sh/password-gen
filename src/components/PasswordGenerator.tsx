import { useState } from "react";
import {
  Shield,
  Lock,
  Key,
  History,
  Sparkles,
  BookOpen,
  Layers,
  Edit,
} from "lucide-react";
import ModeToggle from "./ModeToggle";
import AutomaticMode from "./AutomaticMode";
import ManualMode from "./ManualMode";
import PassphraseGenerator from "./PassphraseGenerator";
import BatchGenerator from "./BatchGenerator";
import PasswordHistory from "./PasswordHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type GeneratorMode =
  | "automatic"
  | "manual"
  | "passphrase"
  | "batch"
  | "history";

const PasswordGenerator = () => {
  const [mode, setMode] = useState<GeneratorMode>("automatic");

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.1)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Top glow */}
        <div className="absolute top-0 left-0 right-0 h-96 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.15),transparent_70%)]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 mb-6 glow-effect">
            <img src="logo.webp" alt="Cipher Key Logo" className="w-12 h-12" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 flex gap-2 justify-center">
            <span className="gradient-text">Cipher</span>
            <span className="text-foreground">Key</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Advanced password generation with multiple modes, templates, and
            security features
          </p>
        </header>

        {/* Tabs for different modes */}
        <div
          className="mb-8 animate-fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as GeneratorMode)}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5 h-auto p-1 bg-secondary/50">
              <TabsTrigger
                value="automatic"
                className="flex flex-col sm:flex-row items-center gap-1.5 py-2 px-2 text-xs sm:text-sm"
              >
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Random</span>
              </TabsTrigger>
              <TabsTrigger
                value="passphrase"
                className="flex flex-col sm:flex-row items-center gap-1.5 py-2 px-2 text-xs sm:text-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Passphrase</span>
              </TabsTrigger>
              <TabsTrigger
                value="batch"
                className="flex flex-col sm:flex-row items-center gap-1.5 py-2 px-2 text-xs sm:text-sm"
              >
                <Layers className="h-4 w-4" />
                <span className="hidden sm:inline">Batch</span>
              </TabsTrigger>
              <TabsTrigger
                value="manual"
                className="flex flex-col sm:flex-row items-center gap-1.5 py-2 px-2 text-xs sm:text-sm"
              >
                <Edit className="h-4 w-4" />
                <span className="hidden sm:inline">Manual</span>
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="flex flex-col sm:flex-row items-center gap-1.5 py-2 px-2 text-xs sm:text-sm"
              >
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="automatic" className="mt-8">
              <AutomaticMode />
            </TabsContent>

            <TabsContent value="passphrase" className="mt-8">
              <PassphraseGenerator />
            </TabsContent>

            <TabsContent value="batch" className="mt-8">
              <BatchGenerator />
            </TabsContent>

            <TabsContent value="manual" className="mt-8">
              <ManualMode />
            </TabsContent>

            <TabsContent value="history" className="mt-8">
              <PasswordHistory />
            </TabsContent>
          </Tabs>
        </div>

        {/* Footer */}
        <footer
          className="mt-12 text-center animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-center gap-6 text-muted-foreground flex-wrap">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Secure Generation</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4" />
              <span className="text-sm">Local Processing</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">No Data Collection</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/60 mt-4">
            Your passwords never leave your device • Built with security in mind
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PasswordGenerator;
