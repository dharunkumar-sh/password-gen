import { Pickaxe, Sparkles } from "lucide-react";

interface ModeToggleProps {
  mode: "automatic" | "manual";
  onModeChange: (mode: "automatic" | "manual") => void;
}

const ModeToggle = ({ mode, onModeChange }: ModeToggleProps) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative flex bg-secondary/50 rounded-lg p-1 backdrop-blur-sm border border-border/50">
        <div
          className={`absolute inset-y-1 w-[calc(50%-0.5rem)] bg-primary rounded-xl transition-transform duration-300 ease-out shadow-lg transform ${
            mode === "manual" ? "translate-x-full" : "translate-x-0"
          }`}
        />

        <button
          onClick={() => onModeChange("automatic")}
          className={`relative flex items-center justify-center gap-2 mr-3 ml-3 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-300 ${
            mode === "automatic"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Sparkles size={20} /> Automatic
        </button>

        <button
          onClick={() => onModeChange("manual")}
          className={`relative flex items-center justify-center gap-2 mr-3 ml-3 px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 ${
            mode === "manual"
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Pickaxe size={20} /> Manual Craft
        </button>
      </div>
    </div>
  );
};

export default ModeToggle;
