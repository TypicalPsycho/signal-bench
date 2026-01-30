// Shared local store for demo flow (no backend).
(() => {
  const STORAGE_KEY = "sb.ui.demo.v1";

  const load = () => {
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    }catch(_){}
    return {
      me: null,
      auth: { isAuthed: false },
      u01: null,
      u03: {},
      casefiles: [],
      activeCaseId: null,
      messages: {},
      preferences: {},
      feedback: []
    };
  };

  const save = (store) => {
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); }catch(_){}
  };

  const clear = () => {
    try{ localStorage.removeItem(STORAGE_KEY); }catch(_){}
  };

  const seed = () => {
    const store = load();
    const id = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
    store.me = store.me || { id: id(), email: "demo@signalbench.ai" };
    store.auth.isAuthed = true;
    store.u01 = store.u01 || { fullName: "Brant Nieminski", nickname: "Brant" };
    store.casefiles = [
      { id: id(), role: "CFO", company: "SignalBench", stage: "screen" },
      { id: id(), role: "CFO", company: "McDonalds", stage: "validate" },
      { id: id(), role: "CFO", company: "Tractor Supply", stage: "advance" }
    ];
    store.activeCaseId = store.casefiles[0].id;
    store.messages[store.activeCaseId] = [
      { id: id(), role: "assistant", content: "Welcome back. Ready to screen this role?", createdAt: new Date().toISOString() }
    ];
    save(store);
    return store;
  };

  window.UIStore = { load, save, clear, seed };
})();
