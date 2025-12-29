import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Trash2, Download, Clock, Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PasswordEntry {
  id: string;
  password: string;
  timestamp: number;
  length: number;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
}

const MAX_HISTORY = 50;

const PasswordHistory = () => {
  const [history, setHistory] = useState<PasswordEntry[]>([]);
  const [visiblePasswords, setVisiblePasswords] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const stored = localStorage.getItem("passwordHistory");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        // Invalid data, ignore
      }
    }

    // Listen for custom events from other components
    const handleNewPassword = (event: CustomEvent) => {
      const { password } = event.detail;
      addToHistory(password);
    };

    window.addEventListener("newPassword", handleNewPassword as EventListener);
    return () => {
      window.removeEventListener(
        "newPassword",
        handleNewPassword as EventListener
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToHistory = (password: string) => {
    if (!password) return;

    const entry: PasswordEntry = {
      id: `${Date.now()}-${Math.random()}`,
      password,
      timestamp: Date.now(),
      length: password.length,
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password),
      hasNumbers: /[0-9]/.test(password),
      hasSymbols: /[^a-zA-Z0-9]/.test(password),
    };

    const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
    setHistory(newHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(newHistory));
  };

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter((entry) => entry.id !== id);
    setHistory(newHistory);
    localStorage.setItem("passwordHistory", JSON.stringify(newHistory));
    toast({
      title: "Removed",
      description: "Password removed from history",
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("passwordHistory");
    setVisiblePasswords(new Set());
    toast({
      title: "History Cleared",
      description: "All passwords have been removed from history",
    });
  };

  const copyPassword = async (password: string) => {
    await navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  const exportHistory = () => {
    const dataStr = JSON.stringify(history, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `password-history-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported",
      description: "Password history exported successfully",
    });
  };

  const toggleVisibility = (id: string) => {
    const newVisible = new Set(visiblePasswords);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisiblePasswords(newVisible);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    return date.toLocaleDateString();
  };

  if (history.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
        <p className="text-muted-foreground">No password history yet</p>
        <p className="text-xs text-muted-foreground mt-2">
          Generated passwords will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Password History</h3>
          <p className="text-xs text-muted-foreground">
            {history.length} of {MAX_HISTORY} passwords stored locally
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportHistory}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear password history?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all {history.length} passwords
                  from your history. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearHistory}>
                  Clear History
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <Accordion type="single" collapsible className="space-y-2">
        {history.map((entry) => {
          const isVisible = visiblePasswords.has(entry.id);
          return (
            <AccordionItem
              key={entry.id}
              value={entry.id}
              className="glass-card border-border/50 rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3 flex-1 text-left">
                  <div className="flex-1">
                    <p className="font-mono text-sm">
                      {isVisible ? entry.password : "•".repeat(entry.length)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(entry.timestamp)} • {entry.length} chars
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {entry.hasLowercase && (
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                        a-z
                      </span>
                    )}
                    {entry.hasUppercase && (
                      <span className="px-2 py-1 bg-success/10 text-success rounded">
                        A-Z
                      </span>
                    )}
                    {entry.hasNumbers && (
                      <span className="px-2 py-1 bg-warning/10 text-warning rounded">
                        0-9
                      </span>
                    )}
                    {entry.hasSymbols && (
                      <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                        !@#
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleVisibility(entry.id)}
                      className="flex-1"
                    >
                      {isVisible ? (
                        <>
                          <EyeOff className="h-3 w-3" />
                          Hide
                        </>
                      ) : (
                        <>
                          <Eye className="h-3 w-3" />
                          Show
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyPassword(entry.password)}
                      className="flex-1"
                    >
                      <Copy className="h-3 w-3" />
                      Copy
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromHistory(entry.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default PasswordHistory;
