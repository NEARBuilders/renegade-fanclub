"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

interface SweatcoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (username: string) => void;
  appUrl: string;
}

export const SweatcoinModal = ({
  isOpen,
  onClose,
  onComplete,
  appUrl,
}: SweatcoinModalProps) => {
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return; // Prevent empty submissions

    setIsSubmitting(true);
    try {
      await onComplete(username);
      onClose();
    } catch (error) {
      console.error("Failed to complete signup:", error);
      toast({
        title: "Error",
        description: "Failed to complete signup. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-gradient-to-b from-[#1c1c1c] to-black rounded-lg border border-[#717171] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            Sign up with Sweatcoin
          </DialogTitle>
          <DialogDescription className="text-gray-200 mt-2">
            Join Sweatcoin to earn rewards for your steps!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleComplete} className="py-8 space-y-6">
          <h3 className="font-bold mb-2">How to win points:</h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-200">
            <li>
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline cursor-pointer font-medium"
              >
                Download the Sweatcoin app
              </a>
            </li>
            <li>Create a new account</li>
            <li>Enter your username below</li>
          </ul>

          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter your Sweatcoin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-black text-white rounded-full px-4 py-2 w-full border border-gray-500 focus:outline-none focus:border-blue-400"
            />
          </div>

          <p className="text-sm text-gray-300 mt-6">
            Enter your Sweatcoin username to earn points in RNG Fan Club.
          </p>

          <DialogFooter className="flex justify-between items-center">
            <Button
              type="button"
              onClick={onClose}
              className="bg-transparent border border-white text-white hover:bg-white hover:text-purple-900 transition-colors"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200 transition-colors"
              disabled={!username.trim() || isSubmitting}
            >
              {isSubmitting ? "Completing..." : "Complete Sign-up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
