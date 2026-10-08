// Public browser settings only. The Supabase anon/publishable key is safe to expose
// when Row Level Security is enabled and the SQL policies in supabase/setup.sql are applied.
// NEVER put a service_role/secret key, account password, or private token in this file.
window.HOMIESSHOP_CONFIG = {
  checkoutMode: "database", // or "messenger"
  supabaseUrl: "https://ievhdpradeetrsxcnokv.supabase.co",
  supabaseAnonKey: "sb_publishable_sWnor-Qm6uWXZKpMmF3xGw_Y8GEzs5U",
  privacyPolicyUrl: "",
  usdPerEur: 1.08,
  telegram: "",
  whatsapp: ""
};
