"use client";

import { useState } from "react";
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
}

export const SweatcoinModal = ({
  isOpen,
  onClose,
  onComplete,
}: SweatcoinModalProps) => {
  const [username, setUsername] = useState("");

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return; // Prevent empty submissions
    // create function to verify username

    onComplete(username);
    onClose();
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

        <form onSubmit={handleComplete} className="py-8 space-y-4">
          <h3 className="font-bold mb-2">How to join Sweatcoin:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Go to Sweateconomy and download the app</li>
            <li>Create a new account</li>
            <li>Enter Username</li>
          </ul>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-black text-white rounded-full px-4 p-2 mt-2 w-full border border-gray-500 "
          />

          <p className="text-sm text-gray-300">
            By clicking "Complete Sign-up", you'll earn points in RNG Fan Club
            and be redirected to download Sweatcoin.
          </p>

          <DialogFooter className="flex justify-between items-center">
            <Button
              type="button"
              onClick={onClose}
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-900"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-white text-black hover:bg-gray-200"
              disabled={!username.trim()} // Disable button if username is empty
            >
              Complete Sign-up
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
