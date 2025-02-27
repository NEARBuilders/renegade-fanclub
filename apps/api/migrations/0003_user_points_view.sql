-- Create an optimized view for individual user points
CREATE VIEW user_points_summary AS
WITH user_total_points AS (
    SELECT 
        u.id as user_id,
        u.username,
        u.avatar,
        COALESCE(SUM(up.total_points), 0) as total_points,
        COALESCE(SUM(up.prediction_points), 0) as prediction_points,
        COALESCE(SUM(up.quest_points), 0) as quest_points,
        MAX(up.last_updated) as last_updated
    FROM users u
    LEFT JOIN user_points up ON u.id = up.user_id
    GROUP BY u.id, u.username, u.avatar
),
ranked_users AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (ORDER BY total_points DESC) as rank
    FROM user_total_points
)
SELECT * FROM ranked_users;
