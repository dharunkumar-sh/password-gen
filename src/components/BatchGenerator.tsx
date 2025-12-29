import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, Download, Layers, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

interface GeneratedPassword {
  id: number;
  password: string;
  length: number;
  strength: string;
}

const BatchGenerator = () => {
  const [passwords, setPasswords] = useState<GeneratedPassword[]>([]);
  const [count, setCount] = useState([5]);
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const calculateStrength = (password: string): string => {
    let score = 0;
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    if (score <= 2) return "Weak";
    if (score <= 4) return "Fair";
    if (score <= 5) return "Good";
    return "Strong";
  };

  const generateBatch = useCallback(() => {
    let charset = "";
    if (options.lowercase) charset += LOWERCASE;
    if (options.uppercase) charset += UPPERCASE;
    if (options.numbers) charset += NUMBERS;
    if (options.symbols) charset += SYMBOLS;

    if (!charset) {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    const newPasswords: GeneratedPassword[] = [];

    for (let i = 0; i < count[0]; i++) {
      let password = "";
      const array = new Uint32Array(length[0]);
      crypto.getRandomValues(array);

      for (let j = 0; j < length[0]; j++) {
        password += charset[array[j] % charset.length];
      }

      newPasswords.push({
        id: Date.now() + i,
        password,
        length: password.length,
        strength: calculateStrength(password),
      });
    }

    setPasswords(newPasswords);
    toast({
      title: "Generated!",
      description: `${count[0]} passwords created successfully`,
    });
  }, [count, length, options]);

  const copyPassword = async (password: string, id: number) => {
    await navigator.clipboard.writeText(password);
    setCopiedId(id);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyAll = async () => {
    const allPasswords = passwords.map((p) => p.password).join("\n");
    await navigator.clipboard.writeText(allPasswords);
    toast({
      title: "All Copied!",
      description: `${passwords.length} passwords copied to clipboard`,
    });
  };

  const exportCSV = () => {
    const csv = [
      "Password,Length,Strength",
      ...passwords.map((p) => `"${p.password}",${p.length},${p.strength}`),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords-batch-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported!",
      description: "Passwords exported to CSV file",
    });
  };

  const exportJSON = () => {
    const json = JSON.stringify(passwords, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `passwords-batch-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Exported!",
      description: "Passwords exported to JSON file",
    });
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

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Weak":
        return "text-destructive";
      case "Fair":
        return "text-warning";
      case "Good":
        return "text-primary";
      case "Strong":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="glass-card p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-primary">
          <Layers className="h-5 w-5" />
          <h3 className="font-semibold">Batch Generation Settings</h3>
        </div>

        {/* Number of Passwords */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              Number of Passwords
            </span>
            <span className="text-2xl font-bold gradient-text">{count[0]}</span>
          </div>
          <Slider
            value={count}
            onValueChange={setCount}
            min={1}
            max={50}
            step={1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1</span>
            <span>50</span>
          </div>
        </div>

        {/* Password Length */}
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
          <div className="grid grid-cols-2 gap-3">
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
                  <span className="font-medium text-sm">{label}</span>
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
          onClick={generateBatch}
          className="w-full"
        >
          <Layers className="h-5 w-5" />
          Generate {count[0]} Password{count[0] !== 1 ? "s" : ""}
        </Button>
      </div>

      {/* Results */}
      {passwords.length > 0 && (
        <div className="glass-card p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">
              Generated Passwords ({passwords.length})
            </h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyAll}>
                <Copy className="h-4 w-4" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="h-4 w-4" />
                CSV
              </Button>
              <Button variant="outline" size="sm" onClick={exportJSON}>
                <Download className="h-4 w-4" />
                JSON
              </Button>
            </div>
          </div>

          <ScrollArea className="h-[400px] rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>Password</TableHead>
                  <TableHead className="w-24">Length</TableHead>
                  <TableHead className="w-24">Strength</TableHead>
                  <TableHead className="w-24">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {passwords.map((pwd, index) => (
                  <TableRow key={pwd.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-mono text-sm">
                      {pwd.password}
                    </TableCell>
                    <TableCell>{pwd.length}</TableCell>
                    <TableCell
                      className={`font-semibold ${getStrengthColor(
                        pwd.strength
                      )}`}
                    >
                      {pwd.strength}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyPassword(pwd.password, pwd.id)}
                      >
                        {copiedId === pwd.id ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default BatchGenerator;
