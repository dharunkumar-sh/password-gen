import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Shuffle, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

const ManualMode = () => {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!password) {
      toast({
        title: "No password to copy",
        description: "Enter a password first",
        variant: "destructive",
      });
      return;
    }
    
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shufflePassword = () => {
    if (!password) return;
    const shuffled = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setPassword(shuffled);
    toast({
      title: "Shuffled!",
      description: "Characters have been randomized",
    });
  };

  const clearPassword = () => {
    setPassword("");
    toast({
      title: "Cleared",
      description: "Password field has been cleared",
    });
  };

  const characterCount = {
    total: password.length,
    lowercase: (password.match(/[a-z]/g) || []).length,
    uppercase: (password.match(/[A-Z]/g) || []).length,
    numbers: (password.match(/[0-9]/g) || []).length,
    symbols: (password.match(/[^a-zA-Z0-9]/g) || []).length,
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Password Input Area */}
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">Enter Your Password</span>
            <span className="text-xs text-muted-foreground font-mono">
              {password.length} characters
            </span>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-50 group-focus-within:opacity-75 transition-opacity" />
            <Textarea
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type or paste your password here..."
              className="relative min-h-[120px] bg-secondary/50 border-border/50 text-xl font-mono tracking-wider resize-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <PasswordStrengthIndicator password={password} />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <Button
            variant="glow"
            onClick={handleCopy}
            className="flex-1 min-w-[140px]"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Password
              </>
            )}
          </Button>
          
          <Button
            variant="glass"
            onClick={shufflePassword}
            disabled={!password}
            className="flex-1 min-w-[140px]"
          >
            <Shuffle className="h-4 w-4" />
            Shuffle
          </Button>
          
          <Button
            variant="outline"
            onClick={clearPassword}
            disabled={!password}
            className="flex-1 min-w-[140px]"
          >
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>
      </div>

      {/* Character Analysis */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-sm text-muted-foreground font-medium mb-4">Character Analysis</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Lowercase", value: characterCount.lowercase, color: "text-primary" },
            { label: "Uppercase", value: characterCount.uppercase, color: "text-success" },
            { label: "Numbers", value: characterCount.numbers, color: "text-warning" },
            { label: "Symbols", value: characterCount.symbols, color: "text-accent" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="bg-secondary/30 rounded-xl p-4 text-center border border-border/30"
            >
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-sm text-muted-foreground font-medium mb-4">💡 Password Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use at least 12 characters for better security
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Mix uppercase, lowercase, numbers, and symbols
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Avoid personal information like birthdays
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary">•</span>
            Use unique passwords for different accounts
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManualMode;
