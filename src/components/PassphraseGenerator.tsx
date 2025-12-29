import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { BookOpen, Sparkles } from "lucide-react";
import PasswordDisplay from "./PasswordDisplay";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPasswordToHistory } from "@/lib/passwordUtils";

// Expanded word lists for passphrases
const WORD_LISTS = {
  common: [
    "ability",
    "account",
    "achieve",
    "address",
    "advance",
    "against",
    "already",
    "another",
    "anxiety",
    "arrange",
    "balance",
    "battery",
    "believe",
    "between",
    "brother",
    "business",
    "cabinet",
    "captain",
    "careful",
    "century",
    "cabinet",
    "certain",
    "chamber",
    "chapter",
    "chicken",
    "citizen",
    "climate",
    "collect",
    "combine",
    "comfort",
    "company",
    "compare",
    "compete",
    "complex",
    "concept",
    "concern",
    "conduct",
    "confirm",
    "connect",
    "consent",
    "content",
    "context",
    "control",
    "convert",
    "correct",
    "council",
    "country",
    "courage",
    "culture",
    "current",
    "decimal",
    "declare",
    "default",
    "deliver",
    "density",
    "deposit",
    "develop",
    "digital",
    "discuss",
    "display",
    "distant",
    "dolphin",
    "dynamic",
    "eclipse",
    "educate",
    "element",
    "emotion",
    "evening",
    "exactly",
    "example",
    "exercise",
    "explain",
    "explore",
    "factory",
    "failure",
    "fashion",
    "feature",
    "fiction",
    "finance",
    "forward",
    "freedom",
    "gallery",
    "general",
    "glimpse",
    "gravity",
    "habitat",
    "harmony",
    "harvest",
    "healthy",
    "history",
    "horizon",
    "housing",
    "husband",
    "illusion",
    "improve",
    "include",
    "journey",
    "justice",
    "kitchen",
    "knowledge",
    "liberty",
    "library",
    "machine",
    "manager",
    "measure",
    "message",
    "million",
    "mineral",
    "mission",
    "mystery",
    "natural",
    "network",
    "observe",
    "october",
    "opinion",
    "organic",
    "outcome",
    "package",
    "paradox",
    "partner",
    "pattern",
    "penalty",
    "perfect",
    "phoenix",
    "picture",
    "pioneer",
    "plastic",
    "popular",
    "poverty",
    "practice",
    "prepare",
    "present",
    "prevent",
    "primary",
    "private",
    "problem",
    "process",
    "product",
    "profile",
    "program",
    "project",
    "promise",
    "protect",
    "provide",
    "publish",
    "purpose",
    "quality",
    "quarter",
    "question",
    "rainbow",
    "realize",
    "receive",
    "reflect",
    "regular",
    "release",
    "replace",
    "require",
    "reserve",
    "resolve",
    "respect",
    "respond",
    "restore",
    "reverse",
    "science",
    "section",
    "segment",
    "service",
    "Session",
    "silence",
    "similar",
    "society",
    "soldier",
    "solution",
    "someone",
    "special",
    "station",
    "storage",
    "strange",
    "strategy",
    "student",
    "subject",
    "success",
    "suggest",
    "support",
    "surface",
    "surplus",
    "survive",
    "suspect",
    "sustain",
    "teacher",
    "theater",
    "theory",
    "through",
    "tonight",
    "traffic",
    "transfer",
    "trigger",
    "trouble",
    "uniform",
    "universe",
    "unknown",
    "upgrade",
    "utility",
    "variety",
    "vehicle",
    "venture",
    "version",
    "victory",
    "village",
    "vintage",
    "virtual",
    "visible",
    "volcano",
    "volume",
    "warrior",
    "weather",
    "welcome",
    "western",
    "whisper",
    "witness",
    "wonderful",
    "workshop",
  ],
  memorable: [
    "apple",
    "banana",
    "cherry",
    "dragon",
    "eagle",
    "forest",
    "golden",
    "happy",
    "island",
    "jungle",
    "kitten",
    "lemon",
    "magic",
    "night",
    "ocean",
    "panda",
    "queen",
    "river",
    "sun",
    "tiger",
    "unicorn",
    "valley",
    "water",
    "yellow",
    "zebra",
    "adventure",
    "balloon",
    "castle",
    "diamond",
    "energy",
    "flower",
    "guitar",
    "honey",
    "icecream",
    "joyful",
    "koala",
    "lightning",
    "mountain",
    "ninja",
    "orange",
    "purple",
    "quantum",
    "rocket",
    "silver",
    "thunder",
    "umbrella",
    "violet",
    "winter",
    "crystal",
    "starlight",
  ],
  technical: [
    "algorithm",
    "application",
    "bandwidth",
    "benchmark",
    "binary",
    "blockchain",
    "boolean",
    "browser",
    "buffer",
    "cache",
    "callback",
    "cipher",
    "cluster",
    "compiler",
    "compute",
    "constant",
    "container",
    "database",
    "debugger",
    "decrypt",
    "deployment",
    "digital",
    "directory",
    "download",
    "element",
    "encrypt",
    "endpoint",
    "execute",
    "firewall",
    "framework",
    "frontend",
    "function",
    "gateway",
    "gigabyte",
    "hardware",
    "hosting",
    "integer",
    "interface",
    "kernel",
    "keyboard",
    "latency",
    "library",
    "localhost",
    "logic",
    "malware",
    "memory",
    "metadata",
    "monitor",
    "network",
    "object",
    "operating",
    "optimize",
    "overflow",
    "packet",
    "parameter",
    "password",
    "platform",
    "pointer",
    "protocol",
    "query",
    "recursion",
    "registry",
    "render",
    "repository",
    "router",
    "runtime",
    "sandbox",
    "script",
    "security",
    "server",
    "session",
    "snapshot",
    "software",
    "storage",
    "syntax",
    "terminal",
    "thread",
    "timeout",
    "token",
    "unicode",
    "upload",
    "variable",
    "virtual",
    "virus",
    "widget",
    "workflow",
  ],
};

const SEPARATORS = ["-", "_", ".", " ", ""];
const NUMBERS_POSITION = ["none", "prefix", "suffix", "between"] as const;

const PassphraseGenerator = () => {
  const [passphrase, setPassphrase] = useState("");
  const [wordCount, setWordCount] = useState([4]);
  const [wordList, setWordList] = useState<keyof typeof WORD_LISTS>("common");
  const [separator, setSeparator] = useState("-");
  const [capitalize, setCapitalize] = useState(true);
  const [numbersPosition, setNumbersPosition] =
    useState<(typeof NUMBERS_POSITION)[number]>("suffix");

  const generatePassphrase = useCallback(() => {
    const words = WORD_LISTS[wordList];
    const selectedWords: string[] = [];

    // Generate random words
    const array = new Uint32Array(wordCount[0]);
    crypto.getRandomValues(array);

    for (let i = 0; i < wordCount[0]; i++) {
      let word = words[array[i] % words.length];
      if (capitalize) {
        word = word.charAt(0).toUpperCase() + word.slice(1);
      }
      selectedWords.push(word);
    }

    // Add numbers based on position
    let result = "";
    if (numbersPosition === "prefix") {
      const num = Math.floor(Math.random() * 1000);
      result = num + separator + selectedWords.join(separator);
    } else if (numbersPosition === "suffix") {
      const num = Math.floor(Math.random() * 1000);
      result = selectedWords.join(separator) + separator + num;
    } else if (numbersPosition === "between") {
      result = selectedWords
        .map((word, i) => {
          if (i < selectedWords.length - 1) {
            return word + separator + Math.floor(Math.random() * 10);
          }
          return word;
        })
        .join(separator);
    } else {
      result = selectedWords.join(separator);
    }

    setPassphrase(result);
    addPasswordToHistory(result);
  }, [wordCount, wordList, separator, capitalize, numbersPosition]);

  useEffect(() => {
    generatePassphrase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-8 animate-slide-up">
      <PasswordDisplay
        password={passphrase}
        onRegenerate={generatePassphrase}
      />

      <div className="glass-card p-6 md:p-8 space-y-8">
        <div className="flex items-center gap-2 text-primary">
          <BookOpen className="h-5 w-5" />
          <h3 className="font-semibold">Passphrase Settings</h3>
        </div>

        <PasswordStrengthIndicator password={passphrase} />

        {/* Word Count Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">
              Number of Words
            </span>
            <span className="text-2xl font-bold gradient-text">
              {wordCount[0]}
            </span>
          </div>
          <Slider
            value={wordCount}
            onValueChange={setWordCount}
            min={2}
            max={8}
            step={1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>2 words</span>
            <span>8 words</span>
          </div>
        </div>

        {/* Word List Selection */}
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground font-medium">
            Word List
          </span>
          <Select
            value={wordList}
            onValueChange={(value: keyof typeof WORD_LISTS) =>
              setWordList(value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="common">
                Common Words (Easy to remember)
              </SelectItem>
              <SelectItem value="memorable">
                Memorable Words (Fun & creative)
              </SelectItem>
              <SelectItem value="technical">
                Technical Words (Tech-related)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Separator Selection */}
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground font-medium">
            Word Separator
          </span>
          <div className="grid grid-cols-5 gap-2">
            {SEPARATORS.map((sep) => (
              <Button
                key={sep || "none"}
                variant={separator === sep ? "default" : "outline"}
                onClick={() => setSeparator(sep)}
                className="h-12"
              >
                {sep === "" ? "None" : sep === " " ? "Space" : sep}
              </Button>
            ))}
          </div>
        </div>

        {/* Numbers Position */}
        <div className="space-y-3">
          <span className="text-sm text-muted-foreground font-medium">
            Numbers Position
          </span>
          <Select
            value={numbersPosition}
            onValueChange={(value: (typeof NUMBERS_POSITION)[number]) =>
              setNumbersPosition(value)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Numbers</SelectItem>
              <SelectItem value="prefix">Before Words</SelectItem>
              <SelectItem value="suffix">After Words</SelectItem>
              <SelectItem value="between">Between Words</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Capitalize Option */}
        <div className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-secondary/30">
          <div className="flex flex-col">
            <span className="font-medium">Capitalize First Letter</span>
            <span className="text-xs text-muted-foreground">
              Makes words easier to read
            </span>
          </div>
          <Switch checked={capitalize} onCheckedChange={setCapitalize} />
        </div>

        {/* Generate Button */}
        <Button
          variant="glow"
          size="lg"
          onClick={generatePassphrase}
          className="w-full"
        >
          <Sparkles className="h-5 w-5" />
          Generate New Passphrase
        </Button>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-primary">💡 Pro Tip:</span>{" "}
            Passphrases are easier to remember than random passwords while still
            being very secure. A 4-word passphrase can be stronger than a
            complex 12-character password!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassphraseGenerator;
