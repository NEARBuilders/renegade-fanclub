const VALID_QUEST_SOURCE = 'eth-denver-avalanche-v-wild';
const QUEST_SOURCE_KEY = 'quest_source';

export function isValidQuestSource(source: string): boolean {
  return source === VALID_QUEST_SOURCE;
}

export function storeQuestSource(source: string): void {
  if (isValidQuestSource(source)) {
    localStorage.setItem(QUEST_SOURCE_KEY, source);
  }
}

export function getStoredQuestSource(): string | null {
  return localStorage.getItem(QUEST_SOURCE_KEY);
}

export function clearQuestSource(): void {
  localStorage.removeItem(QUEST_SOURCE_KEY);
}
