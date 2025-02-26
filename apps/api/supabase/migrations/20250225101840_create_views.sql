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