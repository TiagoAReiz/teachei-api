"use client";

import { Fragment, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function Dialog({ isOpen, onClose, children, className }: DialogProps) {
  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={cn(
            "bg-surface rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-auto animate-scale-in",
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </Fragment>
  );
}

function DialogHeader({ className, children, onClose, ...props }: {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div className={cn("flex items-center justify-between p-6 pb-4", className)} {...props}>
      <div className="flex-1">{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-2 -mr-2 rounded-full text-muted hover:text-foreground hover:bg-muted/10 transition-colors"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

function DialogTitle({ className, ...props }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn("text-xl font-bold text-foreground", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }: { className?: string; children: ReactNode }) {
  return (
    <p
      className={cn("text-sm text-muted mt-1", className)}
      {...props}
    />
  );
}

function DialogContent({ className, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("px-6 pb-4", className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex gap-3 p-6 pt-4", className)} {...props} />
  );
}

export { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent, DialogFooter };



