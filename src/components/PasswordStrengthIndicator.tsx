import { useMemo } from "react";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PasswordStrengthIndicatorProps {
  password: string;
  showDetails?: boolean;
}

const PasswordStrengthIndicator = ({
  password,
  showDetails = false,
}: PasswordStrengthIndicatorProps) => {
  const formatTimeToCrack = (seconds: number): string => {
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    if (seconds < 315360000) return `${Math.round(seconds / 31536000)} years`;
    if (seconds < 3153600000)
      return `${Math.round(seconds / 315360000)} decades`;
    if (seconds < 31536000000)
      return `${Math.round(seconds / 3153600000)} centuries`;
    return "Millions of years";
  };

  const analysis = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: "No Password",
        color: "bg-muted",
        entropy: 0,
        timeToCrack: "Instantly",
        details: {
          hasLowercase: false,
          hasUppercase: false,
          hasNumbers: false,
          hasSymbols: false,
          length: 0,
          uniqueChars: 0,
        },
      };
    }

    let score = 0;

    // Character set analysis
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    const uniqueChars = new Set(password).size;

    // Length checks
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;

    // Character type checks
    if (hasLowercase) score += 1;
    if (hasUppercase) score += 1;
    if (hasNumbers) score += 1;
    if (hasSymbols) score += 1;

    // Variety check
    if (uniqueChars >= password.length * 0.7) score += 1;

    // Calculate entropy (bits)
    let charsetSize = 0;
    if (hasLowercase) charsetSize += 26;
    if (hasUppercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 32;

    const entropy = Math.log2(Math.pow(charsetSize, password.length));

    // Calculate time to crack (rough estimate)
    // Assuming 10 billion guesses per second
    const combinations = Math.pow(charsetSize, password.length);
    const seconds = combinations / 10_000_000_000;
    const timeToCrack = formatTimeToCrack(seconds);

    let label = "Weak";
    let color = "bg-destructive";

    if (score <= 2) {
      label = "Weak";
      color = "bg-destructive";
    } else if (score <= 4) {
      label = "Fair";
      color = "bg-warning";
    } else if (score <= 6) {
      label = "Good";
      color = "bg-primary";
    } else {
      label = "Strong";
      color = "bg-success";
    }

    return {
      score: Math.min(Math.ceil(score / 2), 4),
      label,
      color,
      entropy: Math.round(entropy),
      timeToCrack,
      details: {
        hasLowercase,
        hasUppercase,
        hasNumbers,
        hasSymbols,
        length: password.length,
        uniqueChars,
      },
    };
  }, [password]);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Password Strength
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="text-xs">
                  Strength is calculated based on length, character variety, and
                  entropy. Higher entropy means more possible combinations.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <span
          className={`text-sm font-semibold ${
            analysis.score === 1
              ? "text-destructive"
              : analysis.score === 2
              ? "text-warning"
              : analysis.score === 3
              ? "text-primary"
              : analysis.score === 4
              ? "text-success"
              : "text-muted-foreground"
          }`}
        >
          {analysis.label}
        </span>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full transition-all duration-500 ${
              level <= analysis.score ? analysis.color : "bg-muted"
            }`}
          />
        ))}
      </div>

      {showDetails && password && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
            <p className="text-xs text-muted-foreground">Entropy</p>
            <p className="text-lg font-bold gradient-text">
              {analysis.entropy} bits
            </p>
          </div>
          <div className="bg-secondary/30 rounded-lg p-3 border border-border/30">
            <p className="text-xs text-muted-foreground">Time to Crack</p>
            <p className="text-sm font-semibold text-foreground">
              {analysis.timeToCrack}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrengthIndicator;
