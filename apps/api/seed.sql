-- Insert test users
INSERT INTO users (id, username, email) VALUES ('test-user-id', 'testuser', 'test@example.com');
-- Note: test-user-no-profile is not inserted, so it will trigger the no profile flow

-- Insert sports
INSERT INTO sports (id, name, description, abbreviation, external_id) VALUES (1, 'Football', 'American Football', 'NFL', 'NFL');

-- Insert teams
INSERT INTO teams (sport_id, name, abbreviation, external_id, api_metadata) VALUES (1, 'Philadelphia Eagles', 'PHI', 'PHI', '{"location":"Philadelphia, Pennsylvania","colors":{"primary":"#004C54","secondary":"#A5ACAF"},"conference":"NFC","division":"NFC East"}');
INSERT INTO teams (sport_id, name, abbreviation, external_id, api_metadata) VALUES (1, 'Kansas City Chiefs', 'KC', 'KC', '{"location":"Kansas City, Missouri","colors":{"primary":"#E31837","secondary":"#FFB612"},"conference":"AFC","division":"AFC West"}');

-- Insert the current campaign
INSERT INTO campaigns (name, description, start_date, end_date, status) VALUES ('The Big Game', 'Predict the winner of the big game', '2025-01-01', '2025-02-09', 'active');

-- Insert the big game
INSERT INTO games (campaign_id, sport_id, home_team_id, away_team_id, start_time, game_type, points_value, status, api_metadata) 
VALUES (1, 1, 1, 2, '2025-02-09 18:30:00', 'superbowl', 10, 'upcoming', '{"game_id": 1, "game_type": "superbowl"}');

-- Insert quests
INSERT INTO quests (campaign_id, name, description, points_value, verification_type, verification_data, start_date, end_date) 
VALUES 
  -- Twitter follow quest
  (1, 'Follow', '@rngfanclub on X', 100, 'social_follow', 
    '{"platform": "twitter", "action": "follow", "intent_url": "https://twitter.com/intent/follow?screen_name=rngfanclub"}',
    '2024-02-01', '2024-02-28'),
  
  -- Sweatcoin follow quest
  (1, 'Follow', '@SweatEconomy on X', 100, 'social_follow',
    '{"platform": "twitter", "action": "follow", "intent_url": "https://x.com/SweatEconomy"}',
    '2024-02-01', '2024-02-28'),
  
  -- Instagram follow quest
  (1, 'Follow', '@rngfanclub on Instagram', 100, 'social_follow',
    '{"platform": "Instagram", "action": "follow", "intent_url": "https://www.instagram.com/rngfanclub/"}',
    '2024-02-01', '2024-02-28'),
  
  -- Sweatcoin signup quest
  (1, 'Sign-up', 'with Sweatcoin', 250, 'signup_scan',
    '{"action": "sign-up", "platform": "sweatcoin", "app_url": "https://apps.apple.com/us/app/sweat-wallet/id1619316571"}',
    '2024-02-01', '2024-02-28'),
  
  -- Referral quest
  (1, 'Refer a friend', 'and they create an account', 100, 'invite',
    '{"action": "copy"}',
    '2024-02-01', '2024-02-28'),
  
  -- QR code quest
  (1, 'Scan QR Code', 'Located on the billboard', 500, 'scan_qrcode',
    '{"action": "scan", "intent_url": "123456789"}',
    '2024-02-01', '2024-02-28'),
  
  -- Walking quest
  (1, 'Walk 2000 steps and', 'post a screenshot on X', 1000, 'social_post',
    '{"action": "post", "platform": "twitter", "intent_url": "https://twitter.com/intent/tweet?text=@rngfanclub @sweateconomy [ATTACH SCREENSHOT OF 2000 STEPS IN SWEATCOIN MOBILE APP]"}',
    '2024-02-01', '2024-02-28');
