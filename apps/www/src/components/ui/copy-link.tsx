"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { useOrigin } from "@/hooks/use-origin";
import { useToast } from "@/hooks/use-toast";

interface ReferLinkProps {
  title: string;
  description: string;
  link: string;
}

export function CopyLink({ title, description, link }: ReferLinkProps) {
  const { toast } = useToast();
  const onCopy = () => {
    navigator.clipboard.writeText(origin + link);
    toast({
      title: "Success",
      description: "Link copied to clipboard!",
    });
  };

  const origin = useOrigin();

  return (
    <Card className="mt-0">
      <div className="flex items-stretch justify-between gap-2 flex-grow">
        <div
          title={`You will earn 100 points for completing this quest`}
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon icon={faTrophy} className="h-7 w-7 text-white" />
          <span className="font-jersey text-center text-white text-[32px] font-normal font-['Jersey M54'] leading-relaxed">
            100
          </span>
        </div>
        <div className="flex flex-col items-end justify-end gap-1.5 sm:gap-2 pt-2">
          <CardTitle className="text-white text-[15px] leading-normal md:text-base">
            Add more points for
          </CardTitle>
          <CardDescription className="text-white text-[15px] leading-normal md:text-base">
            sharing our referral link
          </CardDescription>
        </div>
      </div>

      <CardContent className="flex flex-col items-end justify-end pt-7">
        {/* <code className="relative rounded bg-[#ffffff1a] px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold  overflow-hidden whitespace-nowrap text-ellipsis">
          {origin + link}
        </code> */}
        <Button
          onClick={onCopy}
          className="text-sm ml-2 rounded-full border-white/20"
        >
          Share
        </Button>
      </CardContent>
    </Card>
  );
}
