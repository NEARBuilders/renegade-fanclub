import {
  AddFavoriteTeamRequest,
  AddSocialAccountRequest,
  GameStatus,
  PredictionResponse,
  ProfileResponse,
  SocialAccountResponse,
  UpdateProfileRequest,
} from "@renegade-fanclub/types";
import { requireAuth } from "../../middleware/auth";
import { createErrorResponse, createSuccessResponse } from "../../types/api";
import { Env } from "../../types/env";

// POST /api/v1/user/profile
export async function handleCreateUserProfile(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const profile: UpdateProfileRequest = await request.json();

    // No validation needed for initial profile creation
    // The middleware will handle redirecting to onboarding if needed

    // Check if user already exists by ID
    const existingUser = await env.DB.prepare(
      `SELECT id FROM users WHERE id = ?`,
    )
      .bind(userId)
      .first();

    let user;
    if (existingUser) {
      // Update existing user
      const stmt = env.DB.prepare(
        `
        UPDATE users 
        SET 
          username = ?,
          email = ?,
          avatar = ?,
          profile_data = ?,
          updated_at = datetime('now')
        WHERE id = ?
        RETURNING *
        `,
      ).bind(
        profile.username,
        profile.email,
        profile.avatar || null,
        JSON.stringify(profile.profileData || {}),
        userId,
      );

      user = await stmt.first();
    } else {
      // Check if username or email is taken by another user
      const takenUser = await env.DB.prepare(
        `SELECT id FROM users WHERE (username = ? OR email = ?) AND id != ?`,
      )
        .bind(profile.username, profile.email, userId)
        .first();

      if (takenUser) {
        return createErrorResponse(
          "CONFLICT",
          "Username or email already taken by another user",
          409,
          corsHeaders,
        );
      }

      // Get referredBy from JWT claims
      const referredBy = authenticatedRequest.user?.referredBy;

      // Insert new user
      const stmt = env.DB.prepare(
        `
        INSERT INTO users (
          id,
          username, 
          email, 
          avatar,
          profile_data,
          referred_by,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        RETURNING *
      `,
      ).bind(
        userId,
        profile.username,
        profile.email,
        profile.avatar || null,
        JSON.stringify(profile.profileData || {}),
        referredBy || null,
      );

      user = await stmt.first();

      // If this is a referred user, complete the quest for the referrer
      if (referredBy) {
        try {
          // Get the referral quest
          const questStmt = env.DB.prepare(
            `
            SELECT q.*, c.status as campaign_status
            FROM quests q
            JOIN campaigns c ON q.campaign_id = c.id
            WHERE q.verification_type = 'referral'
            AND c.status = 'active'
            LIMIT 1
          `,
          );

          const quest = await questStmt.first();
          if (quest) {
            // Complete the quest for the referrer
            await env.DB.batch([
              env.DB.prepare(
                `
                INSERT INTO user_quest_completions (
                  user_id, quest_id, points_earned, verification_proof
                )
                VALUES (?, ?, ?, ?)
              `,
              ).bind(
                referredBy,
                quest.id,
                quest.points_value,
                JSON.stringify({
                  type: "referral",
                  timestamp: new Date().toISOString(),
                }),
              ),
              env.DB.prepare(
                `
                INSERT INTO user_points (
                  user_id, campaign_id, total_points, prediction_points, quest_points
                )
                VALUES (?, ?, ?, 0, ?)
                ON CONFLICT(user_id, campaign_id) DO UPDATE SET
                  total_points = total_points + ?,
                  quest_points = quest_points + ?,
                  last_updated = datetime('now')
              `,
              ).bind(
                referredBy,
                quest.campaign_id,
                quest.points_value,
                quest.points_value,
                quest.points_value,
                quest.points_value,
              ),
            ]);
          }
        } catch (error) {
          console.error("[Complete Referral Quest Error]", error);
          // Don't fail user creation if quest completion fails
        }
      }

      user = await stmt.first();
    }

    if (!user) {
      return createErrorResponse(
        "INTERNAL_ERROR",
        "Failed to create user profile",
        500,
        corsHeaders,
      );
    }

    // Transform database result to match ProfileResponse type
    const profileResponse: ProfileResponse = {
      id: user.id as string,
      username: user.username as string,
      email: user.email as string,
      avatar: user.avatar as string | null,
      profileData: user.profile_data as Record<string, unknown>,
      createdAt: user.created_at as string,
      updatedAt: user.updated_at as string,
      favoriteTeams: [],
      favoriteSports: [],
    };

    return createSuccessResponse(profileResponse, corsHeaders);
  } catch (error) {
    console.error("[Create Profile Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to create user profile",
      500,
      corsHeaders,
    );
  }
}

// GET /api/v1/user/profile/:userId?
export async function handleGetUserProfile(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const requestedUserId =
      pathParts[pathParts.length - 1] === "profile"
        ? authenticatedRequest.user?.id
        : pathParts[pathParts.length - 1];

    const stmt = env.DB.prepare(
      `
      SELECT 
        u.*,
        json_group_array(DISTINCT t.id) as favorite_teams,
        json_group_array(DISTINCT s.id) as favorite_sports
      FROM users u
      LEFT JOIN user_favorite_teams uft ON u.id = uft.user_id
      LEFT JOIN teams t ON uft.team_id = t.id
      LEFT JOIN user_favorite_sports ufs ON u.id = ufs.user_id
      LEFT JOIN sports s ON ufs.sport_id = s.id
      WHERE u.id = ?
      GROUP BY u.id
    `,
    ).bind(requestedUserId);

    const profile = await stmt.first();

    if (!profile) {
      return createErrorResponse(
        "NOT_FOUND",
        "User profile not found",
        404,
        corsHeaders,
      );
    }

    // Transform database result to match ProfileResponse type
    const profileResponse: ProfileResponse = {
      id: profile.id as string,
      username: profile.username as string,
      email: profile.email as string,
      avatar: profile.avatar as string | null,
      profileData: profile.profile_data as Record<string, unknown>,
      createdAt: profile.created_at as string,
      updatedAt: profile.updated_at as string,
      favoriteTeams: JSON.parse(profile.favorite_teams as string),
      favoriteSports: JSON.parse(profile.favorite_sports as string),
    };
    return createSuccessResponse(profileResponse, corsHeaders);
  } catch (error) {
    console.error("[Get Profile Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to fetch user profile",
      500,
      corsHeaders,
    );
  }
}

// PATCH /api/v1/user/profile
export async function handleUpdateUserProfile(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const updates: UpdateProfileRequest = await request.json();

    // Build dynamic update query
    const updateFields: string[] = [];
    const values: any[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key !== "id" && key !== "created_at") {
        updateFields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updateFields.length === 0) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "No valid fields to update",
        400,
        corsHeaders,
      );
    }

    values.push(userId); // Add id for WHERE clause

    const stmt = env.DB.prepare(
      `
      UPDATE users 
      SET ${updateFields.join(", ")}, updated_at = datetime('now')
      WHERE id = ?
    `,
    ).bind(...values);

    await stmt.run();

    return createSuccessResponse({ success: true }, corsHeaders);
  } catch (error) {
    console.error("[Update Profile Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to update user profile",
      500,
      corsHeaders,
    );
  }
}

// POST /api/v1/user/favorites/teams
export async function handleAddFavoriteTeam(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const { teamId } = (await request.json()) as AddFavoriteTeamRequest;

    if (!teamId) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "Team ID is required",
        400,
        corsHeaders,
      );
    }

    const stmt = env.DB.prepare(
      `
      INSERT INTO user_favorite_teams (user_id, team_id)
      VALUES (?, ?)
    `,
    ).bind(userId, teamId);

    await stmt.run();

    return createSuccessResponse({ success: true }, corsHeaders);
  } catch (error) {
    console.error("[Add Favorite Team Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to add favorite team",
      500,
      corsHeaders,
    );
  }
}

// DELETE /api/v1/user/favorites/teams/:teamId
export async function handleRemoveFavoriteTeam(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const teamId = request.url.split("/").pop();

    if (!teamId) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "Team ID is required",
        400,
        corsHeaders,
      );
    }

    const stmt = env.DB.prepare(
      `
      DELETE FROM user_favorite_teams 
      WHERE user_id = ? AND team_id = ?
    `,
    ).bind(userId, teamId);

    await stmt.run();

    return createSuccessResponse({ success: true }, corsHeaders);
  } catch (error) {
    console.error("[Remove Favorite Team Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to remove favorite team",
      500,
      corsHeaders,
    );
  }
}

// GET /api/v1/predictions/mine
export async function handleGetUserPredictions(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const offset = (page - 1) * limit;

    const stmt = env.DB.prepare(
      `
      SELECT 
        up.*,
        g.start_time,
        g.status as game_status,
        g.points_value,
        ht.name as home_team_name,
        at.name as away_team_name,
        wt.name as predicted_winner_name
      FROM user_predictions up
      JOIN games g ON up.game_id = g.id
      JOIN teams ht ON g.home_team_id = ht.id
      JOIN teams at ON g.away_team_id = at.id
      JOIN teams wt ON up.predicted_winner_id = wt.id
      WHERE up.user_id = ?
      ORDER BY g.start_time DESC
      LIMIT ? OFFSET ?
    `,
    ).bind(userId, limit, offset);

    const predictions = await stmt.all();

    // Transform database results to match PredictionResponse type
    const predictionResponses: PredictionResponse[] = predictions.results.map(
      (p) => ({
        id: p.id as number,
        userId: p.user_id as string,
        gameId: p.game_id as number,
        predictedWinnerId: p.predicted_winner_id as number,
        pointsEarned: p.points_earned as number | null,
        createdAt: p.created_at as string,
        gameStartTime: p.start_time as string,
        gameStatus: p.game_status as GameStatus,
        pointsValue: p.points_value as number,
        homeTeamName: p.home_team_name as string,
        awayTeamName: p.away_team_name as string,
        predictedWinnerName: p.predicted_winner_name as string,
      }),
    );
    return createSuccessResponse(predictionResponses, corsHeaders);
  } catch (error) {
    console.error("[Get Predictions Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to fetch predictions",
      500,
      corsHeaders,
    );
  }
}

// GET /api/v1/predictions/:gameId
export async function handleGetGamePrediction(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const gameId = request.url.split("/").pop();

    if (!gameId) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "Game ID is required",
        400,
        corsHeaders,
      );
    }

    const stmt = env.DB.prepare(
      `
      SELECT 
        up.*,
        g.start_time,
        g.status as game_status,
        g.points_value,
        ht.name as home_team_name,
        at.name as away_team_name,
        wt.name as predicted_winner_name
      FROM user_predictions up
      JOIN games g ON up.game_id = g.id
      JOIN teams ht ON g.home_team_id = ht.id
      JOIN teams at ON g.away_team_id = at.id
      JOIN teams wt ON up.predicted_winner_id = wt.id
      WHERE up.user_id = ? AND up.game_id = ?
    `,
    ).bind(userId, gameId);

    const prediction = await stmt.first();

    if (!prediction) {
      return createErrorResponse(
        "NOT_FOUND",
        "Prediction not found",
        404,
        corsHeaders,
      );
    }

    // Transform database result to match PredictionResponse type
    const predictionResponse: PredictionResponse = {
      id: prediction.id as number,
      userId: prediction.user_id as string,
      gameId: prediction.game_id as number,
      predictedWinnerId: prediction.predicted_winner_id as number,
      pointsEarned: prediction.points_earned as number | null,
      createdAt: prediction.created_at as string,
      gameStartTime: prediction.start_time as string,
      gameStatus: prediction.game_status as GameStatus,
      pointsValue: prediction.points_value as number,
      homeTeamName: prediction.home_team_name as string,
      awayTeamName: prediction.away_team_name as string,
      predictedWinnerName: prediction.predicted_winner_name as string,
    };
    return createSuccessResponse(predictionResponse, corsHeaders);
  } catch (error) {
    console.error("[Get Game Prediction Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to fetch game prediction",
      500,
      corsHeaders,
    );
  }
}

// POST /api/v1/user/social
export async function handleAddSocialAccount(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const { platform, platformUserId, username } =
      (await request.json()) as AddSocialAccountRequest;

    if (!platform || !platformUserId) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "Platform and platform user ID are required",
        400,
        corsHeaders,
      );
    }

    const stmt = env.DB.prepare(
      `
      INSERT INTO user_social_accounts (user_id, platform, platform_user_id, username)
      VALUES (?, ?, ?, ?)
    `,
    ).bind(userId, platform, platformUserId, username || null);

    await stmt.run();

    return createSuccessResponse({ success: true }, corsHeaders);
  } catch (error) {
    console.error("[Add Social Account Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to add social account",
      500,
      corsHeaders,
    );
  }
}

// DELETE /api/v1/user/social/:platform
export async function handleRemoveSocialAccount(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;
    const platform = request.url.split("/").pop();

    if (!platform) {
      return createErrorResponse(
        "INVALID_PARAMS",
        "Platform is required",
        400,
        corsHeaders,
      );
    }

    const stmt = env.DB.prepare(
      `
      DELETE FROM user_social_accounts 
      WHERE user_id = ? AND platform = ?
    `,
    ).bind(userId, platform);

    await stmt.run();

    return createSuccessResponse({ success: true }, corsHeaders);
  } catch (error) {
    console.error("[Remove Social Account Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to remove social account",
      500,
      corsHeaders,
    );
  }
}

// GET /api/v1/user/social
export async function handleGetSocialAccounts(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;

    const stmt = env.DB.prepare(
      `
      SELECT platform, platform_user_id, username, verified, created_at
      FROM user_social_accounts
      WHERE user_id = ?
      ORDER BY created_at DESC
    `,
    ).bind(userId);

    const accounts = await stmt.all();

    // Transform database results to match SocialAccountResponse type
    const socialResponses: SocialAccountResponse[] = accounts.results.map(
      (a) => ({
        platform: a.platform as string,
        platformUserId: a.platform_user_id as string,
        username: a.username as string | null,
        verified: a.verified as boolean,
        createdAt: a.created_at as string,
      }),
    );
    return createSuccessResponse(socialResponses, corsHeaders);
  } catch (error) {
    console.error("[Get Social Accounts Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to fetch social accounts",
      500,
      corsHeaders,
    );
  }
}

// GET /api/v1/user/points
export async function handleGetUserPoints(
  request: Request,
  env: Env,
  corsHeaders: Record<string, string>,
): Promise<Response> {
  try {
    const authenticatedRequest = await requireAuth(request, env);
    const userId = authenticatedRequest.user?.id;

    const stmt = env.DB.prepare(
      `
      SELECT SUM(quest_points) as total_quest_points
      FROM user_points
      WHERE user_id = ?
      GROUP BY user_id
    `,
    ).bind(userId);

    const result = await stmt.first();
    const totalPoints = result?.total_quest_points ?? 0;

    return createSuccessResponse({ points: totalPoints }, corsHeaders);
  } catch (error) {
    console.error("[Get User Points Error]", error);
    return createErrorResponse(
      "INTERNAL_ERROR",
      "Failed to fetch user points",
      500,
      corsHeaders,
    );
  }
}
