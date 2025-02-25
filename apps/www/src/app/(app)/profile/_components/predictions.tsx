import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { faCheck, faClock, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Game,
  PredictionResponse,
  Team,
  TeamResponse,
} from "@renegade-fanclub/types";
import Link from "next/link";

interface PredictionsProps {
  predictions: PredictionResponse[];
  teams: TeamResponse[];
  games: Game[];
}

export default function Predictions({
  predictions,
  teams,
  games,
}: PredictionsProps) {
  // Create maps for team names and game details
  const teamMap = new Map(teams.map((team) => [team.id, team.name]));
  const gameMap = new Map(games.map((game) => [game.id, game]));
  return (
    <Card>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle>Predictions</CardTitle>
      </CardHeader>

      {predictions.length > 0 ? (
        <CardContent className="p-0">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {predictions.map((prediction) => (
                <CarouselItem key={prediction.id} className="p-0 basis-[200px]">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0 flex flex-col items-center justify-center text-center space-y-3">
                      <div
                        className={cn(
                          "mb-2 text-sm font-medium flex items-center gap-1",
                          prediction.pointsEarned === null
                            ? "text-yellow-500" // Pending
                            : prediction.pointsEarned > 0
                              ? "text-green-500" // Won
                              : "text-red-500", // Lost
                        )}
                      >
                        {prediction.pointsEarned === null ? (
                          <>
                            <FontAwesomeIcon
                              icon={faClock}
                              className="h-4 w-4"
                            />
                            <span>Pending</span>
                          </>
                        ) : prediction.pointsEarned > 0 ? (
                          <>
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="h-4 w-4"
                            />
                            <span>+{prediction.pointsEarned}</span>
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faX} className="h-4 w-4" />
                            <span>0</span>
                          </>
                        )}
                      </div>
                      <div className="text-xs space-y-1">
                        <div className="font-semibold text-sm">
                          {teamMap.get(prediction.predictedWinnerId) ||
                            "Unknown Team"}
                        </div>
                        {gameMap.get(prediction.gameId) && (
                          <>
                            <div className="text-white/60">
                              {gameMap.get(prediction.gameId)?.gameType ||
                                "Game"}
                            </div>
                            <div className="text-white/60">
                              {new Date(
                                gameMap.get(prediction.gameId)?.startTime || "",
                              ).toLocaleDateString()}
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* <CarouselNext className="h-12 w-12 text-xl border-none m-0 text-white" /> */}
          </Carousel>
        </CardContent>
      ) : (
        <div className="flex flex-col items-start py-4 px-4 sm:px-6 gap-4">
          <p className="text-white/60">No predictions yet</p>
          <Link href="/games">
            <Button variant="outline">Make Predictions</Button>
          </Link>
        </div>
      )}
    </Card>
  );
}
