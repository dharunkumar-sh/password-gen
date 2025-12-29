import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check, Eye, EyeOff, RefreshCw, QrCode } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import QRCodeLib from "qrcode";

interface PasswordDisplayProps {
  password: string;
  onRegenerate?: () => void;
  showRegenerate?: boolean;
}

const PasswordDisplay = ({
  password,
  onRegenerate,
  showRegenerate = true,
}: PasswordDisplayProps) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (password && canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, password, {
        width: 256,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      }).catch(() => {
        // Silently handle QR code generation errors
      });
    }
  }, [password]);

  const handleCopy = async () => {
    if (!password) {
      toast({
        title: "No password to copy",
        description: "Generate a password first",
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

  const displayPassword = visible
    ? password || "Click Generate"
    : password
    ? "•".repeat(password.length)
    : "Click Generate";

  return (
    <div className="glass-card p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground font-medium">
            Generated Password
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisible(!visible)}
              className="h-9 w-9"
            >
              {visible ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative bg-secondary/50 rounded-xl p-6 border border-border/50 backdrop-blur-sm overflow-hidden">
            <p
              className={`password-display text-center break-all ${
                password ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {displayPassword}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          <Button
            variant="glow"
            onClick={handleCopy}
            className="flex-1 min-w-[140px] max-w-[200px]"
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

          {showRegenerate && onRegenerate && (
            <Button
              variant="glass"
              onClick={onRegenerate}
              className="flex-1 min-w-[140px] max-w-[200px]"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          )}

          {password && (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 min-w-[140px] max-w-[200px]"
                >
                  <QrCode className="h-4 w-4" />
                  QR Code
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Password QR Code</DialogTitle>
                  <DialogDescription>
                    Scan this QR code to share the password with nearby devices
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center gap-4 p-4">
                  <div className="bg-white p-4 rounded-lg">
                    <canvas ref={canvasRef} />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Keep this QR code private as it contains your password
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordDisplay;
