const VALID_QUEST_SOURCE = "eth-denver-avalanche-v-wild";
const QUEST_SOURCE_KEY = "quest_source";
const QUEST_SOURCE_TIMESTAMP_KEY = "quest_source_timestamp";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function isValidQuestSource(source: string): boolean {
  return source === VALID_QUEST_SOURCE;
}

export function storeQuestSource(source: string): void {
  if (isValidQuestSource(source)) {
    localStorage.setItem(QUEST_SOURCE_KEY, source);
    localStorage.setItem(QUEST_SOURCE_TIMESTAMP_KEY, Date.now().toString());
  }
}

export function getStoredQuestSource(): string | null {
  const source = localStorage.getItem(QUEST_SOURCE_KEY);
  const timestamp = localStorage.getItem(QUEST_SOURCE_TIMESTAMP_KEY);

  if (!source || !timestamp) {
    return null;
  }

  // Check if source has expired
  const storedTime = parseInt(timestamp);
  if (Date.now() - storedTime > EXPIRATION_TIME) {
    clearQuestSource();
    return null;
  }

  return source;
}

export function clearQuestSource(): void {
  localStorage.removeItem(QUEST_SOURCE_KEY);
  localStorage.removeItem(QUEST_SOURCE_TIMESTAMP_KEY);
}
