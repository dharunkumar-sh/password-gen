import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Sparkles } from "lucide-react";
import PasswordDisplay from "./PasswordDisplay";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import PasswordTemplates, { PasswordTemplate } from "./PasswordTemplates";
import { addPasswordToHistory } from "@/lib/passwordUtils";
import { Separator } from "@/components/ui/separator";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const AutomaticMode = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });

  const generatePassword = useCallback(() => {
    let charset = "";
    if (options.lowercase) charset += LOWERCASE;
    if (options.uppercase) charset += UPPERCASE;
    if (options.numbers) charset += NUMBERS;
    if (options.symbols) charset += SYMBOLS;

    if (!charset) {
      setPassword("");
      return;
    }

    let result = "";
    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);

    for (let i = 0; i < length[0]; i++) {
      result += charset[array[i] % charset.length];
    }

    setPassword(result);
    addPasswordToHistory(result);
  }, [length, options]);

  useEffect(() => {
    generatePassword();
  }, []);

  const applyTemplate = (template: PasswordTemplate) => {
    setLength([template.length]);
    setOptions({
      lowercase: template.lowercase,
      uppercase: template.uppercase,
      numbers: template.numbers,
      symbols: template.symbols,
    });
    // Generate will be triggered by the useEffect when options change
    setTimeout(generatePassword, 100);
  };

  const toggleOption = (key: keyof typeof options) => {
    const newOptions = { ...options, [key]: !options[key] };
    // Ensure at least one option is selected
    if (!Object.values(newOptions).some(Boolean)) return;
    setOptions(newOptions);
  };

  const optionsList = [
    { key: "lowercase" as const, label: "Lowercase", hint: "a-z" },
    { key: "uppercase" as const, label: "Uppercase", hint: "A-Z" },
    { key: "numbers" as const, label: "Numbers", hint: "0-9" },
    { key: "symbols" as const, label: "Symbols", hint: "!@#$%" },
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <PasswordDisplay password={password} onRegenerate={generatePassword} />

      <div className="glass-card p-6 md:p-8 space-y-8">
        <PasswordStrengthIndicator password={password} showDetails={true} />

        <Separator />

        <PasswordTemplates onSelectTemplate={applyTemplate} />

        <Separator />

        {/* Length Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              Password Length
            </span>
            <span className="text-2xl font-bold gradient-text">
              {length[0]}
            </span>
          </div>
          <Slider
            value={length}
            onValueChange={setLength}
            min={4}
            max={64}
            step={1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-4">
          <span className="text-sm text-muted-foreground font-medium">
            Character Types
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {optionsList.map(({ key, label, hint }) => (
              <div
                key={key}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  options[key]
                    ? "bg-primary/10 border-primary/50"
                    : "bg-secondary/30 border-border/50 hover:border-border"
                }`}
                onClick={() => toggleOption(key)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{label}</span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {hint}
                  </span>
                </div>
                <Switch
                  checked={options[key]}
                  onCheckedChange={() => toggleOption(key)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          variant="glow"
          size="lg"
          onClick={generatePassword}
          className="w-full"
        >
          <Sparkles className="h-5 w-5" />
          Generate New Password
        </Button>
      </div>
    </div>
  );
};

export default AutomaticMode;
