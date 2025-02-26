ALTER TABLE users ADD COLUMN referred_by VARCHAR(42) REFERENCES users(id) ON DELETE CASCADE;
CREATE INDEX idx_users_referred_by ON users(referred_by);
