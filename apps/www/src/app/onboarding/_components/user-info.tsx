"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserProfile } from "@/lib/hooks/use-user-profile";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface UserInfoProps {
  initialEmail?: string;
  onNext: (username: string, email: string) => Promise<void>;
}

export function UserInfo({ initialEmail, onNext }: UserInfoProps) {
  const { data: profile, isLoading: profileLoading } = useUserProfile();
  const [username, setUsername] = useState(profile?.username || "");
  const [email, setEmail] = useState(initialEmail || profile?.email || "");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoading = profileLoading || isSubmitting;

  // Update fields if profile or initialEmail loads after component mount
  useEffect(() => {
    if (initialEmail && !email) {
      setEmail(initialEmail);
    } else if (profile?.email && !email) {
      setEmail(profile.email);
    }
    if (profile?.username && !username) {
      setUsername(profile.username);
    }
  }, [profile, initialEmail, email, username]);

  const handleSubmit = async () => {
    if (isLoading || profileLoading) return;

    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    // Validate username
    if (!trimmedUsername) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username is required",
      });
      return;
    }

    // Username validation rules
    if (trimmedUsername.length < 3) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username must be at least 3 characters long",
      });
      return;
    }

    if (trimmedUsername.length > 30) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Username must be less than 30 characters",
      });
      return;
    }

    // Only allow letters, numbers, underscores, and hyphens
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedUsername)) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Username can only contain letters, numbers, underscores, and hyphens",
      });
      return;
    }

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Valid email is required",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onNext(trimmedUsername, trimmedEmail);
    } catch (error) {
      console.error("Failed to submit:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Input
            placeholder="Choose a username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder={
              initialEmail ? "Confirm your email" : "Enter your email"
            }
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
      </div>

      <div>
        <Button
          onClick={handleSubmit}
          disabled={!username.trim() || !email.trim() || isLoading}
          className="w-full"
        >
          {isLoading ? "Loading..." : "Next"}
        </Button>
      </div>
    </div>
  );
}
