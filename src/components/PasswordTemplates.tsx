import React from "react";
import { Button } from "@/components/ui/button";
import { Shield, Code, Wifi, Mail, CreditCard, User } from "lucide-react";

export interface PasswordTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  color: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const PASSWORD_TEMPLATES: PasswordTemplate[] = [
  {
    id: "ultra-secure",
    name: "Ultra Secure",
    description: "Maximum security with all character types",
    icon: Shield,
    length: 32,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    color: "text-red-500",
  },
  {
    id: "memorable",
    name: "Memorable",
    description: "Easier to remember without symbols",
    icon: User,
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
    color: "text-blue-500",
  },
  {
    id: "wifi",
    name: "WiFi Password",
    description: "Perfect for routers (no symbols)",
    icon: Wifi,
    length: 20,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: false,
    color: "text-cyan-500",
  },
  {
    id: "email",
    name: "Email Account",
    description: "Balanced security for email",
    icon: Mail,
    length: 18,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    color: "text-green-500",
  },
  {
    id: "pin",
    name: "PIN Code",
    description: "Numbers only for PIN codes",
    icon: CreditCard,
    length: 6,
    lowercase: false,
    uppercase: false,
    numbers: true,
    symbols: false,
    color: "text-yellow-500",
  },
  {
    id: "database",
    name: "Database/API",
    description: "Strong for development use",
    icon: Code,
    length: 24,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    color: "text-purple-500",
  },
];

interface PasswordTemplatesProps {
  onSelectTemplate: (template: PasswordTemplate) => void;
}

const PasswordTemplates = ({ onSelectTemplate }: PasswordTemplatesProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Quick Templates</h3>
        <p className="text-xs text-muted-foreground">
          Choose a preset configuration for common use cases
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {PASSWORD_TEMPLATES.map((template) => {
          const Icon = template.icon;
          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className="group relative bg-secondary/30 hover:bg-secondary/50 border border-border/50 hover:border-primary/50 rounded-xl p-4 text-left transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`${template.color} opacity-80 group-hover:opacity-100 transition-opacity`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">
                    {template.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1 text-xs">
                    <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded">
                      {template.length} chars
                    </span>
                    {template.lowercase && (
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        a-z
                      </span>
                    )}
                    {template.uppercase && (
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        A-Z
                      </span>
                    )}
                    {template.numbers && (
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        0-9
                      </span>
                    )}
                    {template.symbols && (
                      <span className="px-1.5 py-0.5 bg-muted rounded">
                        !@#
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PasswordTemplates;
