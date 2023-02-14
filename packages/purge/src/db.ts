let connected = false;

export async function initDb(initStorage: () => Promise<void>) {
  if (!connected) {
    await initStorage();
    connected = true;
  }
}
