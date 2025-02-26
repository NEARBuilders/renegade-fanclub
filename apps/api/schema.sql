
-- ====================================
-- TABLE DEFINITIONS
-- ====================================
-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- USERS table
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- EVM wallet address
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    avatar TEXT,
    profile_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SPORTS table
CREATE TABLE sports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    abbreviation TEXT UNIQUE,
    external_id TEXT UNIQUE
);

-- TEAMS table
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    abbreviation TEXT UNIQUE,
    external_id TEXT UNIQUE,
    api_metadata JSONB DEFAULT '{}'
);

-- User favorite teams table
CREATE TABLE user_favorite_teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, team_id)
);

-- CAMPAIGNS table
CREATE TABLE campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status TEXT NOT NULL
);

-- GAMES table
CREATE TABLE games (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
    home_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    away_team_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    game_type TEXT NOT NULL,
    points_value INTEGER NOT NULL,
    status TEXT NOT NULL,
    api_metadata JSONB DEFAULT '{}'
);

-- QUESTS table
CREATE TABLE quests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    points_value INTEGER NOT NULL,
    verification_type TEXT NOT NULL,
    verification_data JSONB DEFAULT '{}',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- USER_QUEST_COMPLETIONS table
CREATE TABLE user_quest_completions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    quest_id UUID REFERENCES quests(id) ON DELETE CASCADE,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- USER_POINTS table
CREATE TABLE user_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- CAMPAIGN_LEADERBOARD view
CREATE VIEW campaign_leaderboard AS
SELECT 
    u.id AS user_id,
    u.username,
    c.id AS campaign_id,
    c.name AS campaign_name,
    SUM(q.points_value) AS total_points
FROM users u
JOIN user_quest_completions uq ON u.id = uq.user_id
JOIN quests q ON uq.quest_id = q.id
JOIN campaigns c ON q.campaign_id = c.id
GROUP BY u.id, u.username, c.id, c.name
ORDER BY total_points DESC;

-- ALL_TIME_LEADERBOARD view
CREATE VIEW all_time_leaderboard AS
SELECT 
    u.id AS user_id,
    u.username,
    SUM(q.points_value) AS total_points
FROM users u
JOIN user_quest_completions uq ON u.id = uq.user_id
JOIN quests q ON uq.quest_id = q.id
GROUP BY u.id, u.username
ORDER BY total_points DESC;

-- ====================================
-- SECURITY POLICIES
-- ====================================

-- Enable Row Level Security (RLS) for all relevant tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sports ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quest_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;