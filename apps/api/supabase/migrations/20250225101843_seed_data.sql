-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert test user
INSERT INTO users (id, username, email) 
VALUES 
    ('test-user-id', 'testuser', 'test@example.com');
-- Note: test-user-no-profile is not inserted, so it will trigger the no profile flow

-- Insert sports and teams
WITH inserted_sport AS (
    INSERT INTO sports (id, name, description, abbreviation, external_id) 
    VALUES 
        (uuid_generate_v4(), 'Football', 'American Football', 'NFL', 'NFL') 
    RETURNING id
),
inserted_teams AS (
    INSERT INTO teams (id, sport_id, name, abbreviation, external_id, api_metadata) 
    VALUES 
        (uuid_generate_v4(), (SELECT id FROM inserted_sport), 'Philadelphia Eagles', 'PHI', 'PHI', '{"location":"Philadelphia, Pennsylvania","colors":{"primary":"#004C54","secondary":"#A5ACAF"},"conference":"NFC","division":"NFC East"}'),
        (uuid_generate_v4(), (SELECT id FROM inserted_sport), 'Kansas City Chiefs', 'KC', 'KC', '{"location":"Kansas City, Missouri","colors":{"primary":"#E31837","secondary":"#FFB612"},"conference":"AFC","division":"AFC West"}')
    RETURNING id, name
)
SELECT * FROM inserted_teams;

-- Insert the current campaign
WITH campaign AS (
    INSERT INTO campaigns (id, name, description, start_date, end_date, status) 
    VALUES 
        (uuid_generate_v4(), 'The Big Game', 'Predict the winner of the big game', '2025-01-01', '2025-02-09', 'active')
    RETURNING id
)
-- Insert the big game
INSERT INTO games (id, campaign_id, sport_id, home_team_id, away_team_id, start_time, game_type, points_value, status, api_metadata)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM campaign), (SELECT id FROM sports WHERE abbreviation = 'NFL'), 
    (SELECT id FROM teams WHERE abbreviation = 'PHI'), 
    (SELECT id FROM teams WHERE abbreviation = 'KC'),
    '2025-02-09 18:30:00', 'superbowl', 10, 'upcoming', '{"game_id": 1, "game_type": "superbowl"}');

-- Insert twitter quest
WITH campaign AS (
    SELECT id FROM campaigns WHERE name = 'The Big Game'
)
INSERT INTO quests (id, campaign_id, name, description, points_value, verification_type, verification_data, start_date, end_date)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM campaign), 'Follow us', 'Follow @rngfanclub on X', 100, 'social_follow', 
    '{"platform": "twitter", "action": "follow", "intent_url": "https://twitter.com/intent/follow?screen_name=rngfanclub"}',
    '2025-01-01', '2025-02-09');

-- Insert prediction quest
WITH campaign AS (
    SELECT id FROM campaigns WHERE name = 'The Big Game'
)
INSERT INTO quests (id, campaign_id, name, description, points_value, verification_type, verification_data, start_date, end_date)
VALUES 
    (uuid_generate_v4(), (SELECT id FROM campaign), 'Predict the winner', 'Who will win the big game?', 10, 'prediction', 
    '{"game_id": 1, "game_link": "/games/1", "game_type": "superbowl"}', 
    '2025-01-01', '2025-02-09');
